// Crown Luxury Properties - Main JavaScript

// WhatsApp Order System
function sendWhatsAppMessage(product, location, price) {
    // WhatsApp number provided: +2348086331238
    const phoneNumber = '2348086331238';
    
    // Create pre-filled message
    const message = `Hello, I want to order:

Product: ${product}
Location: ${location}
Price: ${price}

Please confirm availability.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Property card animations
    const propertyCards = document.querySelectorAll('.property-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    propertyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Contact form handling (if needed in future)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Contact form submitted');
        });
    }
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('#navbarNav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarCollapse.classList.remove('show');
        });
    });
});

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(amount);
}

// Function to handle property inquiry
function inquireAboutProperty(propertyName, propertyLocation, propertyPrice) {
    // You can extend this to send data to Google Forms or other services
    console.log(`Inquiry about: ${propertyName} in ${propertyLocation} for ${propertyPrice}`);
    
    // Open the Google Form for scheduling viewings
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfMzZOnX78EYhcAZgqVouCTy-EuTWNP6k05o4AZmDkVkO99yg/viewform?usp=publish_editor';
    window.open(googleFormUrl, '_blank');
}

// Function to track user interactions (for analytics)
function trackInteraction(action, label) {
    // This can be extended to integrate with Google Analytics or other tracking services
    console.log(`Action: ${action}, Label: ${label}`);
}

// Add event listeners for tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track WhatsApp button clicks
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const propertyTitle = this.closest('.property-details').querySelector('.property-title').textContent;
            trackInteraction('WhatsApp Order', propertyTitle);
        });
    });
    
    // Track Google Form link clicks
    const googleFormLinks = document.querySelectorAll('a[href*="google.com/forms"]');
    googleFormLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackInteraction('Google Form Link', this.textContent.trim());
        });
    });
});

// Function to handle WhatsApp business hours check
function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Business hours: Monday to Friday, 9 AM to 6 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
}

// Enhanced WhatsApp function with business hours check
function sendWhatsAppMessageEnhanced(product, location, price) {
    const isBusinessTime = isBusinessHours();
    
    if (!isBusinessTime) {
        // Show a friendly message about business hours
        const userConfirmed = confirm(`Note: Our office hours are Monday-Friday, 9 AM - 6 PM.\n\nOutside business hours, we will respond first thing the next business day.\n\nWould you like to continue with your WhatsApp order?`);
        
        if (!userConfirmed) {
            return;
        }
    }
    
    // Proceed with the WhatsApp message
    sendWhatsAppMessage(product, location, price);
}

// Make functions available globally
window.sendWhatsAppMessage = sendWhatsAppMessage;
window.inquireAboutProperty = inquireAboutProperty;
window.sendWhatsAppMessageEnhanced = sendWhatsAppMessageEnhanced;
