// Google Sheets integration for contact form
// This script uses Google Forms to submit data to Google Sheets
// Replace the FORM_ACTION_URL with your actual Google Form action URL

const FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScLVqHZGaoHz46HJGRNMEDtd6nCPbO_-Xnz-vc7MW1-w0ALgQ/formResponse';


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                phone: formData.get('phone'),
                apartmentNumber: formData.get('apartmentNumber'),
                superficie: formData.get('superficie'),
                floor: formData.get('floor'),
                block: formData.get('block'),
                apartmentPrice: formData.get('apartmentPrice'),
                paymentDate: formData.get('paymentDate'),
                paymentAmount: formData.get('paymentAmount'),
                remainingAmount: formData.get('remainingAmount'),
                totalPayments: formData.get('totalPayments'),
                totalRemaining: formData.get('totalRemaining'),
                total: formData.get('total'),
                message: formData.get('message')
            };
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Submit form
            submitForm(data);
        });
    }
});

function validateForm(data) {
    // Basic validation
    if (!data.firstName || !data.lastName) {
        showMessage('Please enter your full name.', 'error');
        return false;
    }
    
    if (!data.phone) {
        showMessage('Please enter your phone number.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(data) {
    // Show loading message
    showMessage('Submitting your request...', 'loading');
    
    // Create form data for Google Forms
    const googleFormData = new FormData();
    
    // These field names need to match your Google Form field names
    // You can find these by inspecting your Google Form
    googleFormData.append('entry.997410062', data.firstName); 
    googleFormData.append('entry.907615912', data.firstName);
    googleFormData.append('entry.1221313216', data.phone); // Phone
    googleFormData.append('entry.444555666', data.apartmentNumber); // Apartment Number
    googleFormData.append('entry.777888999', data.superficie); // Superficie
    googleFormData.append('entry.123456789', data.floor); // Floor
    googleFormData.append('entry.999888777', data.block); // Block
    googleFormData.append('entry.666555444', data.apartmentPrice); // Apartment Price
    googleFormData.append('entry.333222111', data.paymentDate); // Payment Date
    googleFormData.append('entry.111222333', data.paymentAmount); // Payment Amount
    googleFormData.append('entry.444555666', data.remainingAmount); // Remaining Amount
    googleFormData.append('entry.777888999', data.totalPayments); // Total Payments
    googleFormData.append('entry.999888777', data.totalRemaining); // Total Remaining
    googleFormData.append('entry.666555444', data.total); // Total
    googleFormData.append('entry.333222111', data.message); // Message
    
    // Submit to Google Forms
    fetch(FORM_ACTION_URL, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
    })
    .then(() => {
        showMessage('Thank you! Your request has been submitted successfully.', 'success');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            hideMessage();
        }, 5000);
    })
    .catch((error) => {
        console.error('Error:', error);
        showMessage('Sorry, there was an error submitting your request. Please try again.', 'error');
    });
}

function showMessage(message, type) {
    // Remove existing message if any
    hideMessage();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-md ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    messageDiv.textContent = message;
    
    // Add close button for loading messages
    if (type === 'loading') {
        messageDiv.style.cursor = 'pointer';
        messageDiv.title = 'Click to dismiss';
        messageDiv.onclick = hideMessage;
    }
    
    document.body.appendChild(messageDiv);
    
    // Auto-hide non-loading messages after 3 seconds
    if (type !== 'loading') {
        setTimeout(hideMessage, 3000);
    }
}

function hideMessage() {
    const existingMessage = document.querySelector('.fixed.top-4.right-4');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to property cards
    const propertyCards = document.querySelectorAll('.group');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add scroll animation for sections
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
    
    // Observe sections that should animate
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});