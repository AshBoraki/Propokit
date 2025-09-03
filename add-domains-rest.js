const https = require('https');
const fs = require('fs');

// Read the service account key
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-key.json', 'utf8'));

// Function to get access token from service account
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const jwt = require('jsonwebtoken');
    
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/identitytoolkit',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };
    
    const token = jwt.sign(payload, serviceAccount.private_key, { algorithm: 'RS256' });
    
    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${encodeURIComponent(token)}`;
    
    const options = {
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.access_token);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

// Function to add domains using Identity Toolkit API
async function addDomains() {
  try {
    console.log('🔧 Getting access token...');
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained');
    
    const projectId = 'denali-tech-f22e8';
    const domainsToAdd = [
      'propokit.com',
      'ashboraki.github.io',
      'localhost',
      '127.0.0.1'
    ];
    
    console.log('🌐 Adding domains:', domainsToAdd);
    
    // First, get current config
    const getConfigData = JSON.stringify({
      authorizedDomains: domainsToAdd
    });
    
    const options = {
      hostname: 'identitytoolkit.googleapis.com',
      port: 443,
      path: `/v2/projects/${projectId}/config`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(getConfigData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('📡 Response status:', res.statusCode);
        console.log('📡 Response headers:', res.headers);
        console.log('📡 Response body:', data);
        
        if (res.statusCode === 200) {
          console.log('✅ Domains added successfully!');
        } else {
          console.log('❌ Failed to add domains');
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Request error:', error);
    });
    
    req.write(getConfigData);
    req.end();
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Install jsonwebtoken if not available
const jwt = require('jsonwebtoken');
addDomains();
