/* ========================================
   Contact Page JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Contact Form Validation & Submission
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;
            
            // Validation
            let isValid = true;
            
            if (!fullName) {
                showError('fullNameError', 'Please enter your full name');
                isValid = false;
            }
            
            if (!email) {
                showError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject) {
                showError('subjectError', 'Please select a subject');
                isValid = false;
            }
            
            if (!message) {
                showError('messageError', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (!privacy) {
                showError('privacyError', 'You must accept the privacy policy');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // In a real implementation, this would send data to a server
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    document.getElementById('formSuccess').classList.add('show');
                    contactForm.reset();
                    
                    // Scroll to success message
                    document.getElementById('formSuccess').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
    
    // ========================================
    // Helper Functions
    // ========================================
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error styling to input
            const input = errorElement.previousElementSibling;
            if (input) {
                input.style.borderColor = 'var(--accent-color)';
            }
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
            input.style.borderColor = 'var(--bg-light)';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ========================================
    // Input Validation on Blur
    // ========================================
    const formInputs = contactForm ? contactForm.querySelectorAll('input, select, textarea') : [];
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'email' && this.value) {
                if (!isValidEmail(this.value)) {
                    showError('emailError', 'Please enter a valid email address');
                    this.style.borderColor = 'var(--accent-color)';
                } else {
                    document.getElementById('emailError').style.display = 'none';
                    this.style.borderColor = 'var(--bg-light)';
                }
            }
            
            if (this.id === 'message' && this.value) {
                if (this.value.length < 10) {
                    showError('messageError', 'Message must be at least 10 characters');
                    this.style.borderColor = 'var(--accent-color)';
                } else {
                    document.getElementById('messageError').style.display = 'none';
                    this.style.borderColor = 'var(--bg-light)';
                }
            }
        });
    });
    
});
