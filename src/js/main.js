// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    disable: 'mobile'
});

// DOM Elements
const loader = document.querySelector('.loader');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('back-to-top');
const navbar = document.querySelector('.navbar');

// Loading Screen
window.addEventListener('load', () => {
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
});

// Prevent scroll during loading
document.body.style.overflow = 'hidden';

// Mobile Menu Toggle with improved accessibility
mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update aria-label
    mobileMenuBtn.setAttribute('aria-label', 
        isExpanded ? 'Open menu' : 'Close menu'
    );
});

// Close mobile menu when clicking outside or pressing Escape
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        closeMobileMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open menu');
}

// Smooth Scroll for Navigation Links with improved behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            closeMobileMenu();
        }
    });
});

// Navbar Scroll Effect with throttling
let lastScroll = 0;
const scrollThreshold = 50;

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
        if (currentScroll > lastScroll) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
    } else {
        navbar.classList.remove('scrolled', 'nav-hidden');
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
});

// Back to Top Button with improved visibility
const backToTopThreshold = 300;
let backToTopTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(backToTopTimeout);
    
    if (window.scrollY > backToTopThreshold) {
        backToTop.classList.add('visible');
    } else {
        backToTopTimeout = setTimeout(() => {
            backToTop.classList.remove('visible');
        }, 200);
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Service Cards Flip Effect with improved interaction
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const isFlipped = card.classList.contains('flipped');
        card.classList.toggle('flipped');
        
        // Update aria-label for accessibility
        const frontContent = card.querySelector('.service-card-front h4').textContent;
        const backContent = card.querySelector('.service-card-back h4').textContent;
        card.setAttribute('aria-label', 
            isFlipped ? `Service: ${frontContent}` : `Service details: ${backContent}`
        );
    });
});

// Gallery Image Modal with improved functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'modal';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
document.body.appendChild(modal);

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
        const description = item.querySelector('.gallery-overlay p')?.textContent || '';
        
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${img.src}" alt="${img.alt}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
                <button class="modal-close" aria-label="Close modal">&times;</button>
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.focus();
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form Validation with improved UX
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        const isValid = value !== '';
        
        input.classList.toggle('error', !isValid);
        
        // Update aria-invalid for accessibility
        input.setAttribute('aria-invalid', !isValid);
        
        // Show/hide error message
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }
        
        errorMessage.textContent = isValid ? '' : 'This field is required';
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        }
    });
}

// Intersection Observer for Fade-in Effects with improved performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-element').forEach(element => {
    observer.observe(element);
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true}); 