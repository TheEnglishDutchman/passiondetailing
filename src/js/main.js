// Initialize AOS animations with performance optimizations
const initAOS = () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile'
    });
};

// Loading screen with performance optimization
const initLoader = () => {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // Hide loader after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
};

// Mobile menu functionality with accessibility
const initMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;

    const toggleMenu = () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-container')) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
};

// Smooth scrolling with performance optimization
const initSmoothScroll = () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
};

// Navbar scroll effect with performance optimization
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
};

// Back to top button with accessibility
const initBackToTop = () => {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const scrollThreshold = 300;

    const handleScroll = () => {
        if (window.pageYOffset > scrollThreshold) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
};

// Service card hover effects with performance optimization
const initServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
    });
};

// Form validation with accessibility and error handling
const initFormValidation = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const validateField = (field, validationFn) => {
        const isValid = validationFn(field.value);
        field.style.borderColor = isValid ? '#ffd700' : '#ff4444';
        return isValid;
    };

    const validations = {
        name: (value) => value.trim() !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^\d{10}$/.test(value.replace(/\D/g, '')),
        service: (value) => value !== '',
        message: (value) => value.trim() !== ''
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const fields = contactForm.elements;

        // Validate all fields
        Object.keys(validations).forEach(fieldName => {
            const field = fields[fieldName];
            if (field) {
                isValid = validateField(field, validations[fieldName]) && isValid;
            }
        });

        if (isValid) {
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Show success state
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }
    });

    // Real-time validation on input
    Object.keys(validations).forEach(fieldName => {
        const field = contactForm.elements[fieldName];
        if (field) {
            field.addEventListener('input', () => {
                validateField(field, validations[fieldName]);
            });
        }
    });
};

// Input field focus effects
const initInputFocus = () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
};

// Parallax effect with performance optimization
const initParallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const handleScroll = () => {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
};

// Intersection Observer for fade-in animations
const initIntersectionObserver = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .feature, .info-item').forEach(el => {
        observer.observe(el);
    });
};

// Button hover effects with performance optimization
const initButtonEffects = () => {
    const buttons = document.querySelectorAll('button, .cta-button, .service-cta');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
        });
        
        button.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
        });
    });
};

// Ripple effect for buttons
const initRippleEffect = () => {
    const buttons = document.querySelectorAll('button, .cta-button, .service-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initLoader();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initBackToTop();
    initServiceCards();
    initFormValidation();
    initInputFocus();
    initParallax();
    initIntersectionObserver();
    initButtonEffects();
    initRippleEffect();
}); 