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

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const formGroups = contactForm.querySelectorAll('.form-group');
const submitButton = contactForm.querySelector('.submit-button');

// Validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]{10}$/,
    service: /^(interior|exterior|paint-correction|ceramic-coating|steam-cleaning|seat-restoration)$/
};

// Error messages
const errorMessages = {
    name: 'Please enter a valid name (2-50 characters, letters only)',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid 10-digit phone number',
    service: 'Please select a service',
    message: 'Message cannot exceed 500 characters'
};

// Real-time validation
formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    if (!input) return;

    const errorElement = group.querySelector('.error-message');
    
    input.addEventListener('input', () => {
        validateField(input, errorElement);
        updateSubmitButton();
    });

    input.addEventListener('blur', () => {
        validateField(input, errorElement);
        updateSubmitButton();
    });
});

function validateField(input, errorElement) {
    const value = input.value.trim();
    const fieldName = input.name;
    let isValid = true;
    let errorMessage = '';

    // Skip validation for empty required fields on input
    if (value === '' && input.required) {
        if (input.type === 'email' || input.type === 'tel') {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        } else {
            return;
        }
    } else if (value !== '') {
        if (patterns[fieldName] && !patterns[fieldName].test(value)) {
            isValid = false;
            errorMessage = errorMessages[fieldName];
        }

        if (fieldName === 'message' && value.length > 500) {
            isValid = false;
            errorMessage = errorMessages.message;
        }
    }

    // Update UI
    input.parentElement.classList.toggle('error', !isValid);
    input.parentElement.classList.toggle('success', isValid && value !== '');
    
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = isValid ? 'none' : 'block';
    }

    return isValid;
}

function updateSubmitButton() {
    const isValid = Array.from(formGroups).every(group => {
        const input = group.querySelector('input, select, textarea');
        if (!input || !input.required) return true;
        return validateField(input, group.querySelector('.error-message'));
    });

    submitButton.disabled = !isValid;
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const isValid = Array.from(formGroups).every(group => {
        const input = group.querySelector('input, select, textarea');
        if (!input) return true;
        return validateField(input, group.querySelector('.error-message'));
    });

    if (!isValid) {
        showFormFeedback('Please correct the errors before submitting.', 'error');
        return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showFormFeedback('Thank you for your inquiry! We will contact you shortly.', 'success');
        contactForm.reset();
        formGroups.forEach(group => {
            group.classList.remove('success', 'error');
        });
    } catch (error) {
        showFormFeedback('An error occurred. Please try again later.', 'error');
    } finally {
        submitButton.classList.remove('loading');
        updateSubmitButton();
    }
});

function showFormFeedback(message, type) {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('form-error');

    if (type === 'success') {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }

    // Scroll to feedback
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
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