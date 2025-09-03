// Cross-Platform Mobile App JavaScript
class MobileAppShowcase {
    constructor() {
        this.currentPlatform = 'ios';
        this.screens = {
            ios: {
                home: 'home',
                shop: 'shop',
                profile: 'profile'
            },
            android: {
                home: 'home',
                products: 'products',
                settings: 'settings'
            },
            web: {
                dashboard: 'dashboard',
                features: 'features'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupPlatformSwitching();
        this.setupMobileInteractions();
        this.startScreenAnimations();
        this.setupIntersectionObserver();
    }
    
    setupPlatformSwitching() {
        document.querySelectorAll('.platform-switcher .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = e.currentTarget.getAttribute('onclick').match(/'(.+?)'/)[1];
                this.switchPlatform(platform);
            });
        });
    }
    
    setupMobileInteractions() {
        // Add click interactions to feature items in mobile mockup
        document.querySelectorAll('.feature-item').forEach(item => {
            item.addEventListener('click', () => {
                this.showFeatureDetail(item.querySelector('span').textContent);
            });
        });
        
        // Add product item interactions
        document.querySelectorAll('.product-item').forEach(item => {
            item.addEventListener('click', () => {
                this.showProductDetail(item.querySelector('h6').textContent);
            });
        });
    }
    
    switchPlatform(platform) {
        this.currentPlatform = platform;
        
        // Update active button
        document.querySelectorAll('.platform-switcher .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update phone mockups visibility
        document.querySelectorAll('.phone-mockup').forEach(mockup => {
            mockup.classList.remove('active');
        });
        
        if (platform === 'web') {
            this.showWebVersion();
        } else {
            const targetMockup = document.querySelector(`.phone-mockup.${platform}`);
            if (targetMockup) {
                targetMockup.classList.add('active');
            }
            this.updateScreenContent(platform);
        }
        
        this.showNotification(`Switched to ${platform.charAt(0).toUpperCase() + platform.slice(1)} view`, 'info');
    }
    
    updateScreenContent(platform) {
        const screenContent = document.getElementById(`${platform}Screen`);
        if (!screenContent) return;
        
        // Add some dynamic content updates based on platform
        if (platform === 'ios') {
            this.updateiOSContent();
        } else if (platform === 'android') {
            this.updateAndroidContent();
        }
    }
    
    updateiOSContent() {
        // Simulate iOS-specific updates
        const features = document.querySelectorAll('#iosScreen .feature-item');
        features.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
    
    updateAndroidContent() {
        // Simulate Android-specific updates
        const products = document.querySelectorAll('#androidScreen .product-item');
        products.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    item.style.transform = 'translateX(0)';
                }, 200);
            }, index * 150);
        });
    }
    
    showWebVersion() {
        this.showNotification('Web version would open in a new tab with full PWA functionality', 'info');
        
        // Hide phone mockups and show web preview
        document.querySelectorAll('.phone-mockup').forEach(mockup => {
            mockup.style.opacity = '0.3';
        });
        
        setTimeout(() => {
            document.querySelectorAll('.phone-mockup').forEach(mockup => {
                mockup.style.opacity = '1';
            });
        }, 2000);
    }
    
    showFeatureDetail(featureName) {
        const details = {
            'Shop': 'Browse thousands of products with advanced search and filtering capabilities.',
            'Favorites': 'Save your favorite items and get notified when they go on sale.',
            'Profile': 'Manage your account, order history, and personal preferences.',
            'Settings': 'Customize app behavior, notifications, and privacy settings.'
        };
        
        this.showNotification(`${featureName}: ${details[featureName] || 'Feature details would be shown here'}`, 'info');
    }
    
    showProductDetail(productName) {
        this.showNotification(`Viewing ${productName} - Full product details, reviews, and purchase options would be displayed`, 'info');
    }
    
    startScreenAnimations() {
        // Animate screen content periodically
        setInterval(() => {
            this.animateScreenContent();
        }, 8000);
    }
    
    animateScreenContent() {
        const activeScreen = document.querySelector('.phone-mockup.active .screen-content, .phone-mockup:not(.android) .screen-content');
        if (activeScreen) {
            activeScreen.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                activeScreen.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    setupIntersectionObserver() {
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe tech layers
        document.querySelectorAll('.tech-layer').forEach(layer => {
            observer.observe(layer);
        });
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 350px; max-width: 400px;';
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Global functions for UI interactions
function switchPlatform(platform) {
    mobileApp.switchPlatform(platform);
}

function showMobileDemo() {
    mobileApp.showNotification('🚀 Live mobile demo launching! This would open the actual app in demo mode.', 'success');
    
    // Simulate demo launch
    setTimeout(() => {
        mobileApp.showNotification('📱 Demo app loaded successfully! Try interacting with the mobile interface.', 'info');
    }, 2000);
}

function downloadApp() {
    mobileApp.showNotification('📲 Download initiated! In production, this would redirect to App Store or Google Play.', 'info');
    
    // Simulate download progress
    setTimeout(() => {
        mobileApp.showNotification('⬇️ App package prepared! Demo APK/IPA would be available for testing.', 'success');
    }, 1500);
}

function showPWA() {
    mobileApp.showNotification('🌐 Progressive Web App launching in new tab...', 'info');
    
    // Simulate PWA launch
    setTimeout(() => {
        window.open('#', '_blank');
        mobileApp.showNotification('✨ PWA launched! Experience native-like performance in your browser.', 'success');
    }, 1000);
}

function scheduleDemo() {
    mobileApp.showNotification('📅 Demo scheduling system would open - connect with our mobile development team!', 'info');
}

// Initialize mobile app showcase
let mobileApp;
document.addEventListener('DOMContentLoaded', function() {
    mobileApp = new MobileAppShowcase();
    
    console.log('📱 Mobile App Showcase loaded successfully!');
    console.log('Features: Cross-platform demo, Interactive mockups, Platform switching');
    
    // Welcome message
    setTimeout(() => {
        mobileApp.showNotification('📱 Welcome to our Cross-Platform Mobile App showcase! Switch between iOS and Android views above.', 'success');
    }, 2000);
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to download buttons
    document.querySelectorAll('.download-section .btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to tech badges
    document.querySelectorAll('.tech-items .badge').forEach(badge => {
        badge.addEventListener('click', function() {
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = '#28a745';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.backgroundColor = originalBg;
                this.style.color = '';
            }, 200);
        });
    });
    
    // Simulate real-time updates in mobile screens
    setInterval(() => {
        // Update time in status bars
        const times = document.querySelectorAll('.time');
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        times.forEach(timeEl => {
            if (timeEl.closest('.android-header')) {
                timeEl.textContent = timeString;
            } else {
                timeEl.textContent = now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        });
        
        // Update battery percentage
        const batteryEl = document.querySelector('.battery');
        if (batteryEl) {
            const currentBattery = parseInt(batteryEl.textContent);
            const newBattery = Math.max(75, Math.min(100, currentBattery + Math.floor(Math.random() * 3 - 1)));
            batteryEl.textContent = newBattery + '%';
        }
    }, 30000); // Update every 30 seconds
});

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('🎯 Mobile App Showcase optimized for performance');
        console.log('💡 Try switching between iOS and Android views');
        console.log('📲 Click on app elements for interactive demos');
    });
}
