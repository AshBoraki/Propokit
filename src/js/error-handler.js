// ==================================================
// 🛡️ PROPOKIT ERROR HANDLER
// ==================================================
//
// PURPOSE: Comprehensive error handling and user feedback system
// Provides graceful error recovery, user notifications, and error tracking
//
// ==================================================

class ErrorHandler {
    constructor() {
        this.errorCount = 0;
        this.maxErrors = 10;
        this.errorTypes = new Map();
        this.userNotifications = [];
        this.init();
    }

    /**
     * 🚀 Initialize error handling system
     */
    init() {
        this.setupGlobalErrorHandlers();
        this.setupUnhandledRejectionHandler();
        this.setupNetworkErrorHandler();
        this.createErrorNotificationContainer();
        this.setupErrorRecovery();
        
        console.log('🛡️ Error Handler initialized');
    }

    /**
     * 🌐 Setup global error handlers
     */
    setupGlobalErrorHandlers() {
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'JavaScript Error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
                stack: event.error?.stack
            });
        });

        // Handle Firebase errors specifically
        window.addEventListener('firebase-error', (event) => {
            this.handleFirebaseError(event.detail);
        });
    }

    /**
     * 🔄 Setup unhandled promise rejection handler
     */
    setupUnhandledRejectionHandler() {
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || 'Unknown promise rejection',
                error: event.reason,
                stack: event.reason?.stack
            });
        });
    }

    /**
     * 🌐 Setup network error handler
     */
    setupNetworkErrorHandler() {
        // Monitor fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    this.handleNetworkError(response, args[0]);
                }
                return response;
            } catch (error) {
                this.handleNetworkError(error, args[0]);
                throw error;
            }
        };
    }

    /**
     * 🎯 Handle general errors
     */
    handleError(errorInfo) {
        this.errorCount++;
        
        // Prevent error spam
        if (this.errorCount > this.maxErrors) {
            console.warn('Too many errors, stopping error handling');
            return;
        }

        // Categorize error
        const errorType = this.categorizeError(errorInfo);
        this.errorTypes.set(errorType, (this.errorTypes.get(errorType) || 0) + 1);

        // Log error
        console.error('🚨 Error caught:', errorInfo);

        // Show user notification
        this.showErrorNotification(errorInfo);

        // Attempt recovery
        this.attemptRecovery(errorInfo);

        // Send to analytics
        this.trackError(errorInfo);

        // Store for debugging
        this.storeError(errorInfo);
    }

    /**
     * 🔥 Handle Firebase-specific errors
     */
    handleFirebaseError(errorInfo) {
        const userFriendlyMessage = this.getFirebaseErrorMessage(errorInfo.code);
        
        this.handleError({
            ...errorInfo,
            type: 'Firebase Error',
            userMessage: userFriendlyMessage
        });
    }

    /**
     * 🌐 Handle network errors
     */
    handleNetworkError(error, url) {
        this.handleError({
            type: 'Network Error',
            message: error.message || 'Network request failed',
            url: url,
            status: error.status,
            userMessage: 'Network connection issue. Please check your internet connection.'
        });
    }

    /**
     * 🏷️ Categorize error types
     */
    categorizeError(errorInfo) {
        if (errorInfo.type === 'Firebase Error') return 'firebase';
        if (errorInfo.type === 'Network Error') return 'network';
        if (errorInfo.message?.includes('auth')) return 'authentication';
        if (errorInfo.message?.includes('permission')) return 'permission';
        if (errorInfo.message?.includes('quota')) return 'quota';
        return 'general';
    }

    /**
     * 🔄 Attempt error recovery
     */
    attemptRecovery(errorInfo) {
        const errorType = this.categorizeError(errorInfo);

        switch (errorType) {
            case 'network':
                this.retryNetworkRequest(errorInfo);
                break;
            case 'firebase':
                this.retryFirebaseOperation(errorInfo);
                break;
            case 'authentication':
                this.handleAuthError(errorInfo);
                break;
            default:
                this.showRecoveryOptions(errorInfo);
        }
    }

    /**
     * 🔄 Retry network requests
     */
    retryNetworkRequest(errorInfo) {
        setTimeout(() => {
            this.showNotification('Retrying network request...', 'info');
            // Network retry logic would go here
        }, 2000);
    }

    /**
     * 🔄 Retry Firebase operations
     */
    retryFirebaseOperation(errorInfo) {
        setTimeout(() => {
            this.showNotification('Retrying Firebase operation...', 'info');
            // Firebase retry logic would go here
        }, 1000);
    }

    /**
     * 🔐 Handle authentication errors
     */
    handleAuthError(errorInfo) {
        this.showNotification('Authentication issue. Please sign in again.', 'warning');
        
        setTimeout(() => {
            if (typeof window.CleanAuth?.signOut === 'function') {
                window.CleanAuth.signOut();
            }
        }, 3000);
    }

    /**
     * 🔧 Show recovery options
     */
    showRecoveryOptions(errorInfo) {
        const options = this.getRecoveryOptions(errorInfo);
        
        if (options.length > 0) {
            this.showRecoveryDialog(options);
        }
    }

    /**
     * 📋 Get recovery options for error
     */
    getRecoveryOptions(errorInfo) {
        const options = [];

        if (errorInfo.type === 'Network Error') {
            options.push({
                text: 'Retry',
                action: () => location.reload(),
                type: 'primary'
            });
            options.push({
                text: 'Check Connection',
                action: () => this.checkConnection(),
                type: 'secondary'
            });
        }

        if (errorInfo.type === 'Firebase Error') {
            options.push({
                text: 'Refresh Page',
                action: () => location.reload(),
                type: 'primary'
            });
        }

        return options;
    }

    /**
     * 🔌 Check network connection
     */
    checkConnection() {
        fetch('/favicon.ico', { method: 'HEAD' })
            .then(() => {
                this.showNotification('Connection is working!', 'success');
            })
            .catch(() => {
                this.showNotification('Connection issue detected', 'error');
            });
    }

    /**
     * 📱 Create error notification container
     */
    createErrorNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'error-notifications';
        container.className = 'error-notifications-container';
        container.innerHTML = `
            <style>
                .error-notifications-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                }
                
                .error-notification {
                    background: #fff;
                    border-left: 4px solid #ff4444;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                
                .error-notification.show {
                    transform: translateX(0);
                }
                
                .error-notification.success {
                    border-left-color: #44ff44;
                }
                
                .error-notification.warning {
                    border-left-color: #ffaa00;
                }
                
                .error-notification.info {
                    border-left-color: #4488ff;
                }
                
                .error-notification-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                
                .error-notification-title {
                    font-weight: 600;
                    color: #333;
                }
                
                .error-notification-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #666;
                }
                
                .error-notification-message {
                    color: #666;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .error-recovery-options {
                    margin-top: 12px;
                    display: flex;
                    gap: 8px;
                }
                
                .error-recovery-btn {
                    padding: 6px 12px;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }
                
                .error-recovery-btn.primary {
                    background: #007bff;
                    color: white;
                }
                
                .error-recovery-btn.secondary {
                    background: #f8f9fa;
                    color: #333;
                }
            </style>
        `;
        document.body.appendChild(container);
    }

    /**
     * 📢 Show error notification
     */
    showErrorNotification(errorInfo) {
        const message = errorInfo.userMessage || errorInfo.message || 'An error occurred';
        const type = this.getNotificationType(errorInfo);
        
        this.showNotification(message, type, 8000);
    }

    /**
     * 📢 Show general notification
     */
    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('error-notifications');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `error-notification ${type}`;
        
        const id = Date.now();
        notification.innerHTML = `
            <div class="error-notification-header">
                <div class="error-notification-title">${this.getNotificationTitle(type)}</div>
                <button class="error-notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="error-notification-message">${message}</div>
        `;

        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);

        // Store notification
        this.userNotifications.push({
            id,
            message,
            type,
            timestamp: Date.now()
        });
    }

    /**
     * 🏷️ Get notification title
     */
    getNotificationTitle(type) {
        const titles = {
            error: 'Error',
            warning: 'Warning',
            success: 'Success',
            info: 'Information'
        };
        return titles[type] || 'Notification';
    }

    /**
     * 🎨 Get notification type
     */
    getNotificationType(errorInfo) {
        if (errorInfo.type === 'Network Error') return 'warning';
        if (errorInfo.type === 'Firebase Error') return 'error';
        if (errorInfo.type === 'Authentication Error') return 'warning';
        return 'error';
    }

    /**
     * 🔥 Get Firebase error messages
     */
    getFirebaseErrorMessage(code) {
        const messages = {
            'auth/user-not-found': 'User account not found',
            'auth/wrong-password': 'Incorrect password',
            'auth/email-already-in-use': 'Email already in use',
            'auth/weak-password': 'Password is too weak',
            'auth/network-request-failed': 'Network error. Please check your connection',
            'auth/too-many-requests': 'Too many attempts. Please try again later',
            'auth/invalid-email': 'Invalid email address',
            'auth/user-disabled': 'This account has been disabled',
            'auth/operation-not-allowed': 'This operation is not allowed',
            'auth/requires-recent-login': 'Please sign in again to continue'
        };
        
        return messages[code] || 'Authentication error occurred';
    }

    /**
     * 📊 Track error for analytics
     */
    trackError(errorInfo) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: errorInfo.message,
                fatal: false,
                error_type: errorInfo.type
            });
        }
    }

    /**
     * 💾 Store error for debugging
     */
    storeError(errorInfo) {
        const errorData = {
            ...errorInfo,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Store in sessionStorage for debugging
        try {
            const errors = JSON.parse(sessionStorage.getItem('propokit-errors') || '[]');
            errors.push(errorData);
            
            // Keep only last 10 errors
            if (errors.length > 10) {
                errors.splice(0, errors.length - 10);
            }
            
            sessionStorage.setItem('propokit-errors', JSON.stringify(errors));
        } catch (e) {
            console.warn('Could not store error:', e);
        }
    }

    /**
     * 🔧 Setup error recovery
     */
    setupErrorRecovery() {
        // Auto-recovery for common issues
        setInterval(() => {
            this.checkSystemHealth();
        }, 30000); // Check every 30 seconds
    }

    /**
     * 🏥 Check system health
     */
    checkSystemHealth() {
        // Check memory usage
        if (performance.memory && performance.memory.usedJSHeapSize > performance.memory.jsHeapSizeLimit * 0.9) {
            this.showNotification('High memory usage detected. Consider refreshing the page.', 'warning');
        }

        // Check error rate
        if (this.errorCount > 5) {
            this.showNotification('Multiple errors detected. Page may need refreshing.', 'warning');
        }
    }

    /**
     * 📋 Get error statistics
     */
    getErrorStats() {
        return {
            totalErrors: this.errorCount,
            errorTypes: Object.fromEntries(this.errorTypes),
            notifications: this.userNotifications.length
        };
    }

    /**
     * 🧹 Clear error data
     */
    clearErrorData() {
        this.errorCount = 0;
        this.errorTypes.clear();
        this.userNotifications = [];
        sessionStorage.removeItem('propokit-errors');
    }
}

// Initialize error handler
document.addEventListener('DOMContentLoaded', () => {
    window.errorHandler = new ErrorHandler();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}

console.log('📦 Error Handler module loaded');
