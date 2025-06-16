// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// DOM Elements
const loader = document.querySelector('.loader');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('back-to-top');

// Loading Screen
window.addEventListener('load', () => {
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Service Cards Flip Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Gallery Image Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="modal-close">&times;</button>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        for (const [key, value] of Object.entries(data)) {
            if (!value.trim()) {
                isValid = false;
                const input = contactForm.querySelector(`[name="${key}"]`);
                input.classList.add('error');
            }
        }

        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        }
    });

    // Remove error class on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
}

// Intersection Observer for Fade-in Effects
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