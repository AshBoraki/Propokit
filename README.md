# 📝 PropoKit - AI-Powered Proposal Software

<div align="center">
  <img src="https://img.shields.io/badge/Version-2.2.1-brightgreen.svg" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success.svg" alt="Status">
  <img src="https://img.shields.io/badge/Security-Enterprise%20Grade-green.svg" alt="Security">
</div>

<div align="center">
  <h3>Create Professional Business Proposals in Minutes, Not Hours</h3>
  <p>AI-powered proposal software for contractors, consultants, and business services</p>
</div>

---

## 🚀 What is PropoKit?

PropoKit is a comprehensive, AI-powered proposal generation application that helps professionals create stunning business proposals with customizable themes, QR codes, and professional layouts. Perfect for home automation professionals, contractors, consultants, and any business that needs to present detailed project proposals.

### ✨ Key Features

- 🤖 **AI-Powered Content Generation** - Powered by Gemini AI for instant product descriptions and scope of work
- 🎨 **6 Professional Themes** - Ocean Blue, Forest Green, Royal Purple, Sunset Orange, Midnight Black, Rose Gold
- 📱 **QR Code Integration** - Generate QR codes for websites, PDFs, and custom content
- 🖼️ **Image Management** - Upload, crop, and manage images with built-in tools
- 📄 **PDF Export** - Generate professional PDF proposals
- 🔐 **Secure Authentication** - Enterprise-grade security with Firebase
- 📊 **Performance Optimized** - Advanced performance monitoring and optimization
- ♿ **Accessibility Ready** - Full accessibility support and keyboard navigation

## 🎯 Who is PropoKit For?

### 🏠 Home Automation & Smart Home Services
Perfect for home automation professionals who need to show homeowners detailed equipment lists, scope of work, and comprehensive project proposals.

### 🔧 Home Services & Contractors
Ideal for electricians, plumbers, HVAC technicians, landscapers, and any home service professional.

### 🏢 Business Services & Consultants
Essential for business consultants, IT professionals, marketing agencies, and service providers.

### 💼 Anyone Who Needs Professional Proposals
Whether you're a freelancer, small business owner, or enterprise company, PropoKit helps you create stunning proposals that stand out.

## 🛠️ Technology Stack

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**
- **Bootstrap 4.5.2** - Responsive UI framework
- **Font Awesome 6.1.1** - Icon library
- **jQuery 3.5.1** - DOM manipulation
- **Google Fonts** - Typography (Inter, Montserrat, Poppins)

### Backend & Services
- **Firebase 9.0.0** - Authentication, Database, Storage
- **Google Places API** - Address autocomplete
- **Google Maps API** - Location services
- **QR Code Generators** - Dynamic QR code creation

### Security & Performance
- **Enterprise-grade authentication** with 30-minute session timeout
- **Automatic token refresh** every 5 minutes
- **Performance monitoring** with Core Web Vitals tracking
- **Error handling** with graceful recovery
- **Lazy loading** and image optimization

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Firebase services
- Google account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshBoraki/Propokit.git
   cd Propokit
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Sign in with Google**
   - Click "Sign In" button
   - Authenticate with your Google account
   - Start creating proposals!

### No Build Process Required
PropoKit is built with pure HTML, CSS, and JavaScript - no build tools or compilation needed!

## 📁 Project Structure

```
Propokit/
├── 📄 index.html                 # Landing page and authentication
├── 📄 CNAME                      # Custom domain configuration
├── 📁 src/
│   ├── 📁 js/                    # JavaScript modules
│   │   ├── 🔥 firebase-config.js      # Firebase configuration
│   │   ├── 🔐 clean-auth-system.js    # Authentication system
│   │   ├── 🛡️ error-handler.js        # Error handling
│   │   ├── 🚀 performance-optimizer.js # Performance optimization
│   │   ├── 🎨 ui-enhancer.js          # UI enhancements
│   │   ├── 📋 version-manager.js      # Version management
│   │   └── 🧭 app-router.js           # Application routing
│   ├── 📁 pages/                 # Application pages
│   │   └── 📄 dashboard.html          # Main application interface
│   ├── 📁 styles/                # CSS stylesheets
│   │   ├── 📁 shared/                 # Shared styles
│   │   └── 📁 pages/                  # Page-specific styles
│   └── 📁 components/            # Reusable components
├── 📁 security/
│   └── 📄 monitor.html               # Security monitoring dashboard
├── 📁 docs/                      # Documentation
│   ├── 📄 SECURITY_STATUS.md         # Security documentation
│   ├── 📄 PERFORMANCE_OPTIMIZATIONS.md # Performance docs
│   └── 📄 VERSION_MANAGEMENT.md      # Version management rules
└── 📁 public/                    # Static assets
```

## 🔐 Security Features

PropoKit implements enterprise-grade security measures:

- ✅ **30-minute session timeout** with activity tracking
- ✅ **Automatic token refresh** every 5 minutes
- ✅ **sessionStorage** for secure data storage
- ✅ **Firebase-only authentication** - no bypasses
- ✅ **Automatic logout** on browser close
- ✅ **Activity monitoring** (mouse, keyboard, scroll, touch)
- ✅ **Security monitoring dashboard** for administrators

## 🎨 Theming System

PropoKit includes 6 professional color themes:

- 🌊 **Ocean Blue** - Most popular business color
- 🌲 **Forest Green** - Money & success color
- 👑 **Royal Purple** - Creative & luxury color
- 🌅 **Sunset Orange** - Energy & innovation color
- 🌙 **Midnight Black** - Professional & trust color
- 🌹 **Rose Gold** - Premium & elegance color

Each theme includes:
- Custom color palettes
- QR code color schemes
- Button and UI element styling
- Professional gradients and effects

## 📊 Performance Features

- 🚀 **Lazy loading** for images and components
- 📱 **Device detection** for optimized performance
- 🖼️ **WebP support** for modern browsers
- 💾 **Memory management** with garbage collection
- 📈 **Core Web Vitals** monitoring
- ⚡ **Debounced events** for smooth interactions
- 🎯 **Intersection Observer** for efficient animations

## 🔧 Development

### Version Management
PropoKit follows semantic versioning (X.Y.Z):
- **X** = Major version (breaking changes)
- **Y** = Minor version (new features)
- **Z** = Patch version (bug fixes)

### Contributing
1. Fork the repository
2. Create a feature branch
3. Follow the version management rules
4. Submit a pull request

### Code Style
- Clean, commented code with JSDoc documentation
- Modular architecture with separated concerns
- CSS custom properties for theming
- Responsive design principles

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🆘 Support

### Documentation
- 📖 [Security Status](docs/SECURITY_STATUS.md)
- 🚀 [Performance Optimizations](docs/PERFORMANCE_OPTIMIZATIONS.md)
- 📋 [Version Management](docs/VERSION_MANAGEMENT.md)

### Issues
- 🐛 [Report Bugs](https://github.com/AshBoraki/Propokit/issues)
- 💡 [Request Features](https://github.com/AshBoraki/Propokit/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ashkan Boraki**
- GitHub: [@AshBoraki](https://github.com/AshBoraki)
- Email: [Ash@Denalitechs.com]

## 🙏 Acknowledgments

- Firebase for backend services
- Google for authentication and APIs
- Bootstrap for UI framework
- Font Awesome for icons
- All contributors and users

---

<div align="center">
  <p><strong>Ready to create professional proposals?</strong></p>
  <p>🚀 <a href="https://propokit.com">Try PropoKit Now</a> | 📖 <a href="docs/">Read Documentation</a> | 🐛 <a href="https://github.com/AshBoraki/Propokit/issues">Report Issues</a></p>
</div>
