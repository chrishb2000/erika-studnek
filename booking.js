/* ========================================
   Booking Page JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Service Selection & Price Update
    // ========================================
    const serviceOptions = document.querySelectorAll('.service-option input[type="radio"]');
    const services = {
        individual: {
            name: { en: "Individual Therapy Session", es: "Sesión de Terapia Individual" },
            duration: { en: "50 min", es: "50 min" },
            price: "$80 USD"
        },
        couples: {
            name: { en: "Couples Therapy Session", es: "Sesión de Terapia de Pareja" },
            duration: { en: "60 min", es: "60 min" },
            price: "$120 USD"
        },
        family: {
            name: { en: "Family Therapy Session", es: "Sesión de Terapia Familiar" },
            duration: { en: "60 min", es: "60 min" },
            price: "$130 USD"
        },
        assessment: {
            name: { en: "Psychological Assessment", es: "Evaluación Psicológica" },
            duration: { en: "90 min", es: "90 min" },
            price: "$150 USD"
        },
        consultation: {
            name: { en: "Initial Consultation", es: "Consulta Inicial" },
            duration: { en: "30 min", es: "30 min" },
            price: "$40 USD"
        }
    };
    
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            const service = services[this.value];
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            
            // Update summary
            document.getElementById('summaryService').textContent = service.name[currentLang];
            document.getElementById('summaryDuration').textContent = service.duration[currentLang];
            document.getElementById('summaryPrice').textContent = service.price;
        });
    });
    
    // ========================================
    // Date Validation - Disable past dates
    // ========================================
    const preferredDateInput = document.getElementById('preferredDate');
    
    if (preferredDateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        preferredDateInput.setAttribute('min', today);
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        preferredDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
    
    // ========================================
    // Booking Form Validation & Submission
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearBookingErrors();
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('bookingEmail').value.trim();
            const phone = document.getElementById('bookingPhone').value.trim();
            const preferredDate = document.getElementById('preferredDate').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const timezone = document.getElementById('timezone').value;
            const sessionLanguage = document.getElementById('sessionLanguage').value;
            const termsBooking = document.getElementById('termsBooking').checked;
            const privacyBooking = document.getElementById('privacyBooking').checked;
            
            // Validation
            let isValid = true;
            
            if (!firstName) {
                showBookingError('firstNameError', 'Please enter your first name');
                isValid = false;
            }
            
            if (!lastName) {
                showBookingError('lastNameError', 'Please enter your last name');
                isValid = false;
            }
            
            if (!email) {
                showBookingError('bookingEmailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showBookingError('bookingEmailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!phone) {
                showBookingError('bookingPhoneError', 'Please enter your phone number');
                isValid = false;
            }
            
            if (!preferredDate) {
                showBookingError('preferredDateError', 'Please select a preferred date');
                isValid = false;
            }
            
            if (!preferredTime) {
                showBookingError('preferredTimeError', 'Please select a preferred time');
                isValid = false;
            }
            
            if (!timezone) {
                showBookingError('timezoneError', 'Please select your timezone');
                isValid = false;
            }
            
            if (!sessionLanguage) {
                showBookingError('sessionLanguageError', 'Please select a language');
                isValid = false;
            }
            
            if (!termsBooking) {
                showBookingError('termsBookingError', 'You must agree to the cancellation policy');
                isValid = false;
            }
            
            if (!privacyBooking) {
                showBookingError('privacyBookingError', 'You must accept the privacy policy');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // In a real implementation, this would send data to a server
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    document.getElementById('bookingSuccess').classList.add('show');
                    
                    // Scroll to success message
                    document.getElementById('bookingSuccess').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                    }, 3000);
                }, 2000);
            }
        });
    }
    
    // ========================================
    // Cancellation Policy Modal
    // ========================================
    const cancellationLink = document.querySelector('a[href="#cancellation"]');
    const cancellationModal = document.getElementById('cancellation-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    if (cancellationLink) {
        cancellationLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (cancellationModal) {
                cancellationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (closeButtons) {
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (cancellationModal) {
                    cancellationModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Close modal on outside click
    if (cancellationModal) {
        cancellationModal.addEventListener('click', (e) => {
            if (e.target === cancellationModal) {
                cancellationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cancellationModal) {
            cancellationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ========================================
    // Helper Functions
    // ========================================
    function showBookingError(elementId, message) {
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
    
    function clearBookingErrors() {
        document.querySelectorAll('.booking-form .error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        document.querySelectorAll('.booking-form input, .booking-form select').forEach(input => {
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
    const bookingInputs = bookingForm ? bookingForm.querySelectorAll('input, select') : [];
    
    bookingInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'bookingEmail' && this.value) {
                if (!isValidEmail(this.value)) {
                    showBookingError('bookingEmailError', 'Please enter a valid email address');
                    this.style.borderColor = 'var(--accent-color)';
                } else {
                    const errorEl = document.getElementById('bookingEmailError');
                    if (errorEl) {
                        errorEl.style.display = 'none';
                    }
                    this.style.borderColor = 'var(--bg-light)';
                }
            }
        });
    });
    
    // ========================================
    // Update Service Summary on Language Change
    // ========================================
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                const selectedService = document.querySelector('.service-option input[type="radio"]:checked');
                if (selectedService) {
                    const service = services[selectedService.value];
                    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
                    
                    document.getElementById('summaryService').textContent = service.name[currentLang];
                    document.getElementById('summaryDuration').textContent = service.duration[currentLang];
                }
            }, 100);
        });
    });
    
});
