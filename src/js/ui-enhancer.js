// ==================================================
// 🎨 PROPOKIT UI ENHANCER
// ==================================================
//
// PURPOSE: Modern UI enhancements and user experience improvements
// Provides smooth animations, interactive elements, and accessibility features
//
// ==================================================

class UIEnhancer {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.tooltips = new Map();
        this.init();
    }

    /**
     * 🚀 Initialize UI enhancements
     */
    init() {
        this.setupSmoothAnimations();
        this.setupInteractiveElements();
        this.setupTooltips();
        this.setupLoadingStates();
        this.setupAccessibilityFeatures();
        this.setupModernEffects();
        
        console.log('🎨 UI Enhancer initialized');
    }

    /**
     * ✨ Setup smooth animations
     */
    setupSmoothAnimations() {
        // Add CSS for animations
        this.addAnimationCSS();

        // Setup intersection observer for scroll animations
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements with animation classes
            document.querySelectorAll('[data-animate], .animate-on-scroll').forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    /**
     * 🎯 Setup interactive elements
     */
    setupInteractiveElements() {
        // Enhanced button interactions
        this.enhanceButtons();
        
        // Enhanced form interactions
        this.enhanceForms();
        
        // Enhanced card interactions
        this.enhanceCards();
        
        // Enhanced modal interactions
        this.enhanceModals();
    }

    /**
     * 💡 Setup tooltips
     */
    setupTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            this.createTooltip(element);
        });
    }

    /**
     * ⏳ Setup loading states
     */
    setupLoadingStates() {
        // Add loading states to buttons
        document.querySelectorAll('button, .btn').forEach(button => {
            this.addLoadingState(button);
        });

        // Add loading states to forms
        document.querySelectorAll('form').forEach(form => {
            this.addFormLoadingState(form);
        });
    }

    /**
     * ♿ Setup accessibility features
     */
    setupAccessibilityFeatures() {
        this.addKeyboardNavigation();
        this.addFocusManagement();
        this.addScreenReaderSupport();
        this.addHighContrastSupport();
    }

    /**
     * 🌟 Setup modern effects
     */
    setupModernEffects() {
        this.addGlassmorphismEffects();
        this.addGradientAnimations();
        this.addParticleEffects();
        this.addHoverEffects();
    }

    /**
     * 🎨 Add animation CSS
     */
    addAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Smooth animations */
            [data-animate] {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            [data-animate].animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Fade in animation */
            .fade-in {
                animation: fadeIn 0.6s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Slide up animation */
            .slide-up {
                animation: slideUp 0.8s ease-out;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Scale animation */
            .scale-in {
                animation: scaleIn 0.5s ease-out;
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            /* Enhanced button interactions */
            .btn-enhanced {
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
            }
            
            .btn-enhanced::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .btn-enhanced:hover::before {
                width: 300px;
                height: 300px;
            }
            
            .btn-enhanced:active {
                transform: scale(0.95);
            }
            
            /* Loading state */
            .btn-loading {
                position: relative;
                color: transparent !important;
            }
            
            .btn-loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                margin: -10px 0 0 -10px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Glassmorphism effects */
            .glass {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            /* Gradient animations */
            .gradient-animated {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            /* Hover effects */
            .hover-lift {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hover-lift:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
            
            /* Focus styles */
            .focus-enhanced:focus {
                outline: 2px solid #007bff;
                outline-offset: 2px;
            }
            
            /* High contrast mode */
            @media (prefers-contrast: high) {
                .glass {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: none;
                }
            }
            
            /* Reduced motion */
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
     * 🎯 Enhance buttons
     */
    enhanceButtons() {
        document.querySelectorAll('button, .btn').forEach(button => {
            button.classList.add('btn-enhanced', 'focus-enhanced');
            
            // Add ripple effect
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    /**
     * 📝 Enhance forms
     */
    enhanceForms() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.classList.add('focus-enhanced');
            
            // Add floating label effect
            if (input.placeholder) {
                this.addFloatingLabel(input);
            }
            
            // Add validation styling
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }

    /**
     * 🃏 Enhance cards
     */
    enhanceCards() {
        document.querySelectorAll('.card, [data-card]').forEach(card => {
            card.classList.add('hover-lift');
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * 🪟 Enhance modals
     */
    enhanceModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            // Add smooth open/close animations
            modal.addEventListener('show.bs.modal', () => {
                modal.classList.add('fade-in');
            });
            
            modal.addEventListener('hidden.bs.modal', () => {
                modal.classList.remove('fade-in');
            });
        });
    }

    /**
     * 💡 Create tooltip
     */
    createTooltip(element) {
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            white-space: nowrap;
        `;

        document.body.appendChild(tooltip);
        this.tooltips.set(element, tooltip);

        // Show tooltip on hover
        element.addEventListener('mouseenter', (e) => {
            this.showTooltip(tooltip, e.target);
        });

        element.addEventListener('mouseleave', () => {
            this.hideTooltip(tooltip);
        });
    }

    /**
     * 💡 Show tooltip
     */
    showTooltip(tooltip, target) {
        const rect = target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        tooltip.style.opacity = '1';
    }

    /**
     * 💡 Hide tooltip
     */
    hideTooltip(tooltip) {
        tooltip.style.opacity = '0';
    }

    /**
     * ⏳ Add loading state to button
     */
    addLoadingState(button) {
        const originalText = button.textContent;
        
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-loading')) return;
            
            this.classList.add('btn-loading');
            this.setAttribute('data-original-text', originalText);
            
            // Auto-remove loading state after 3 seconds
            setTimeout(() => {
                this.classList.remove('btn-loading');
            }, 3000);
        });
    }

    /**
     * 📝 Add form loading state
     */
    addFormLoadingState(form) {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('btn-loading');
            }
        });
    }

    /**
     * 🎯 Add floating label
     */
    addFloatingLabel(input) {
        const wrapper = document.createElement('div');
        wrapper.className = 'floating-label-wrapper';
        wrapper.style.position = 'relative';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const label = document.createElement('label');
        label.textContent = input.placeholder;
        label.className = 'floating-label';
        label.style.cssText = `
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            transition: all 0.3s ease;
            pointer-events: none;
            background: white;
            padding: 0 4px;
        `;
        
        wrapper.appendChild(label);
        
        input.addEventListener('focus', () => {
            label.style.top = '0';
            label.style.fontSize = '12px';
            label.style.color = '#007bff';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '50%';
                label.style.fontSize = '14px';
                label.style.color = '#666';
            }
        });
    }

    /**
     * ✅ Validate input
     */
    validateInput(input) {
        const isValid = input.checkValidity();
        
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    /**
     * 🎯 Add keyboard navigation
     */
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    const modal = bootstrap.Modal.getInstance(openModal);
                    if (modal) modal.hide();
                }
            }
            
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    /**
     * 🎯 Add focus management
     */
    addFocusManagement() {
        // Trap focus in modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('shown.bs.modal', () => {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            });
        });
    }

    /**
     * 📢 Add screen reader support
     */
    addScreenReaderSupport() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Button');
            }
        });
        
        // Add role attributes
        document.querySelectorAll('[data-role]').forEach(element => {
            element.setAttribute('role', element.getAttribute('data-role'));
        });
    }

    /**
     * 🎨 Add high contrast support
     */
    addHighContrastSupport() {
        const mediaQuery = window.matchMedia('(prefers-contrast: high)');
        
        const handleContrastChange = (e) => {
            if (e.matches) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        };
        
        mediaQuery.addListener(handleContrastChange);
        handleContrastChange(mediaQuery);
    }

    /**
     * 🪟 Add glassmorphism effects
     */
    addGlassmorphismEffects() {
        document.querySelectorAll('[data-glass]').forEach(element => {
            element.classList.add('glass');
        });
    }

    /**
     * 🌈 Add gradient animations
     */
    addGradientAnimations() {
        document.querySelectorAll('[data-gradient]').forEach(element => {
            element.classList.add('gradient-animated');
        });
    }

    /**
     * ✨ Add particle effects
     */
    addParticleEffects() {
        document.querySelectorAll('[data-particles]').forEach(element => {
            this.createParticleEffect(element);
        });
    }

    /**
     * ✨ Create particle effect
     */
    createParticleEffect(element) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        element.style.position = 'relative';
        element.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        const resizeCanvas = () => {
            canvas.width = element.offsetWidth;
            canvas.height = element.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * 🎯 Add hover effects
     */
    addHoverEffects() {
        document.querySelectorAll('[data-hover]').forEach(element => {
            element.classList.add('hover-lift');
        });
    }

    /**
     * 🎬 Animate element
     */
    animateElement(element) {
        const animationType = element.getAttribute('data-animate') || 'fade-in';
        element.classList.add(animationType);
    }

    /**
     * 💫 Create ripple effect
     */
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * 🧹 Cleanup resources
     */
    cleanup() {
        this.tooltips.forEach(tooltip => tooltip.remove());
        this.tooltips.clear();
        
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// Initialize UI enhancer
document.addEventListener('DOMContentLoaded', () => {
    window.uiEnhancer = new UIEnhancer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIEnhancer;
}

console.log('📦 UI Enhancer module loaded');
