// ==================================================
// 🚀 PROPOKIT PERFORMANCE OPTIMIZER
// ==================================================
//
// PURPOSE: Advanced performance optimization system
// This module provides intelligent performance enhancements
// including lazy loading, code splitting, and resource optimization
//
// ==================================================

class PerformanceOptimizer {
    constructor() {
        this.isSlowDevice = this.detectSlowDevice();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.observers = new Map();
        this.debounceTimers = new Map();
        this.init();
    }

    /**
     * 🔍 Detect slow devices for performance optimization
     */
    detectSlowDevice() {
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        const connection = navigator.connection;
        
        return (
            hardwareConcurrency < 4 ||
            deviceMemory < 4 ||
            (connection && connection.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType))
        );
    }

    /**
     * 🚀 Initialize performance optimizations
     */
    init() {
        this.setupLazyLoading();
        this.setupIntersectionObserver();
        this.setupDebouncedEvents();
        this.optimizeImages();
        this.setupPerformanceMonitoring();
        
        if (this.isSlowDevice) {
            this.enableSlowDeviceOptimizations();
        }
        
        console.log('🚀 Performance Optimizer initialized', {
            slowDevice: this.isSlowDevice,
            reducedMotion: this.prefersReducedMotion
        });
    }

    /**
     * 📸 Setup lazy loading for images and components
     */
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * 👁️ Setup intersection observer for animations
     */
    setupIntersectionObserver() {
        if (this.prefersReducedMotion) return;

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('[data-animate]').forEach(el => {
            animationObserver.observe(el);
        });
    }

    /**
     * ⏱️ Setup debounced events for performance
     */
    setupDebouncedEvents() {
        // Debounced scroll handler
        this.debounce('scroll', () => {
            this.handleScroll();
        }, 16); // ~60fps

        // Debounced resize handler
        this.debounce('resize', () => {
            this.handleResize();
        }, 250);

        // Debounced input handler
        this.debounce('input', () => {
            this.handleInput();
        }, 300);
    }

    /**
     * 🖼️ Optimize images for better performance
     */
    optimizeImages() {
        // Add loading="lazy" to all images
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });

        // Optimize image formats based on browser support
        if (this.supportsWebP()) {
            this.convertImagesToWebP();
        }
    }

    /**
     * 🔧 Enable optimizations for slow devices
     */
    enableSlowDeviceOptimizations() {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--transition', '0.2s ease');
        document.documentElement.style.setProperty('--transition-fast', '0.1s ease');
        
        // Disable heavy animations
        document.querySelectorAll('[data-heavy-animation]').forEach(el => {
            el.style.animation = 'none';
        });

        // Reduce image quality for slow connections
        if (navigator.connection && navigator.connection.effectiveType) {
            this.reduceImageQuality();
        }
    }

    /**
     * 📊 Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        this.logPerformanceMetric(entry);
                    });
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            } catch (e) {
                console.warn('Performance monitoring not available:', e);
            }
        }

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
                    console.warn('High memory usage detected:', memory);
                    this.triggerGarbageCollection();
                }
            }, 30000); // Check every 30 seconds
        }
    }

    /**
     * 🎯 Debounce function calls
     */
    debounce(key, func, wait) {
        const timer = this.debounceTimers.get(key);
        if (timer) clearTimeout(timer);
        
        const newTimer = setTimeout(() => {
            func();
            this.debounceTimers.delete(key);
        }, wait);
        
        this.debounceTimers.set(key, newTimer);
    }

    /**
     * 📝 Handle scroll events
     */
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update header state
        const header = document.querySelector('.site-header');
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }

        // Update scroll progress
        const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }

    /**
     * 📏 Handle resize events
     */
    handleResize() {
        // Update viewport units for mobile
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Trigger responsive updates
        this.dispatchEvent('optimizer:resize', { width: window.innerWidth, height: window.innerHeight });
    }

    /**
     * ⌨️ Handle input events
     */
    handleInput() {
        // Optimize form inputs
        document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
            if (input.value.length > 0) {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    }

    /**
     * 🖼️ Check WebP support
     */
    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    /**
     * 🔄 Convert images to WebP format
     */
    convertImagesToWebP() {
        document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]').forEach(img => {
            const originalSrc = img.src;
            const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            
            // Test if WebP version exists
            const testImg = new Image();
            testImg.onload = () => {
                img.src = webpSrc;
            };
            testImg.src = webpSrc;
        });
    }

    /**
     * 📉 Reduce image quality for slow connections
     */
    reduceImageQuality() {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('unsplash.com')) {
                // Add quality parameter for Unsplash images
                if (!img.src.includes('q=')) {
                    img.src += (img.src.includes('?') ? '&' : '?') + 'q=60&auto=format';
                }
            }
        });
    }

    /**
     * 📊 Log performance metrics
     */
    logPerformanceMetric(entry) {
        const metric = {
            name: entry.name,
            value: entry.value,
            startTime: entry.startTime,
            duration: entry.duration
        };

        console.log('📊 Performance Metric:', metric);

        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metric', {
                metric_name: entry.name,
                metric_value: Math.round(entry.value),
                metric_duration: Math.round(entry.duration)
            });
        }
    }

    /**
     * 🗑️ Trigger garbage collection
     */
    triggerGarbageCollection() {
        if (window.gc) {
            window.gc();
        }
        
        // Clear unused observers
        this.observers.forEach((observer, key) => {
            if (!document.querySelector(key)) {
                observer.disconnect();
                this.observers.delete(key);
            }
        });
    }

    /**
     * 📡 Dispatch custom events
     */
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    /**
     * 🎨 Add CSS optimizations
     */
    addCSSOptimizations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Performance optimizations */
            * {
                box-sizing: border-box;
            }
            
            img {
                max-width: 100%;
                height: auto;
            }
            
            [data-animate] {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            [data-animate].animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .scrolled {
                backdrop-filter: blur(10px);
                background: rgba(255, 255, 255, 0.95);
            }
            
            /* Reduce motion for accessibility */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 🔧 Cleanup resources
     */
    cleanup() {
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();
        
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}

console.log('📦 Performance Optimizer module loaded');
