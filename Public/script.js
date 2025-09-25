// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
});

// Carousel functionality for specialties
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const specialtyCards = document.querySelector('.specialty-cards');
    const cards = document.querySelectorAll('.specialty-card');
    
    if (prevBtn && nextBtn && specialtyCards) {
        let currentIndex = 0;
        const cardsPerView = getCardsPerView();
        
        function getCardsPerView() {
            const width = window.innerWidth;
            if (width >= 1200) return 4;
            if (width >= 768) return 3;
            if (width >= 480) return 2;
            return 1;
        }
        
        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth + 32; // 32px for gap
            const translateX = -currentIndex * cardWidth;
            specialtyCards.style.transform = `translateX(${translateX}px)`;
        }
        
        function nextSlide() {
            const maxIndex = Math.max(0, cards.length - getCardsPerView());
            currentIndex = Math.min(currentIndex + 1, maxIndex);
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            updateCarousel();
        });
    }
});

// Testimonials carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'block';
        }
        
        // Add active class to current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Fade-in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll('.consultation-card, .specialty-card, .article-card, .testimonial-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Phone number validation and formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('.phone-input');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
        
        phoneInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const sendSmsBtn = document.querySelector('.download-form .btn-primary');
                if (sendSmsBtn) {
                    sendSmsBtn.click();
                }
            }
        });
    }
});

// Send SMS functionality
document.addEventListener('DOMContentLoaded', function() {
    const sendSmsBtn = document.querySelector('.download-form .btn-primary');
    const phoneInput = document.querySelector('.phone-input');
    
    if (sendSmsBtn && phoneInput) {
        sendSmsBtn.addEventListener('click', function() {
            const phoneNumber = phoneInput.value;
            
            if (phoneNumber.length === 10) {
                // Simulate SMS sending
                const originalText = sendSmsBtn.textContent;
                sendSmsBtn.textContent = 'Sending...';
                sendSmsBtn.disabled = true;
                
                setTimeout(() => {
                    sendSmsBtn.textContent = 'SMS Sent!';
                    setTimeout(() => {
                        sendSmsBtn.textContent = originalText;
                        sendSmsBtn.disabled = false;
                        phoneInput.value = '';
                    }, 2000);
                }, 1500);
            } else {
                alert('Please enter a valid 10-digit phone number');
            }
        });
    }
});

// Consultation card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const consultationCards = document.querySelectorAll('.consultation-card');
    
    consultationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Specialty card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const specialtyCards = document.querySelectorAll('.specialty-card');
    
    specialtyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            const icon = this.querySelector('.specialty-icon');
            if (icon) {
                icon.style.backgroundColor = 'var(--primary-color)';
                icon.style.color = 'white';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('.specialty-icon');
            if (icon) {
                icon.style.backgroundColor = 'var(--bg-tertiary)';
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
});

// Article card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            const category = this.querySelector('.article-category');
            if (category) {
                category.style.color = 'var(--primary-dark)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const category = this.querySelector('.article-category');
            if (category) {
                category.style.color = 'var(--primary-color)';
            }
        });
    });
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });
});

// Loading animation for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close any modals or reset focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
});

// AI Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const notificationBadge = document.querySelector('.notification-badge');

    // Chatbot responses
    const responses = {
        'hello': 'Hello! I\'m your AI health assistant. How can I help you today?',
        'symptoms': 'I can help you understand common symptoms. Could you describe what you\'re experiencing?',
        'appointment': 'I can help you book an appointment. What type of doctor do you need to see?',
        'medicine': 'I can provide information about medications. What medicine are you asking about?',
        'emergency': 'If this is a medical emergency, please call emergency services immediately.',
        'default': 'I understand you\'re looking for health information. Let me connect you with a healthcare professional or provide relevant resources.'
    };

    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {   
            notificationBadge.style.display = 'none';
        }
    });

    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return responses.hello;
        } else if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
            return responses.symptoms;
        } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
            return responses.appointment;
        } else if (lowerMessage.includes('medicine') || lowerMessage.includes('drug') || lowerMessage.includes('medication')) {
            return responses.medicine;
        } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
            return responses.emergency;
        } else {
            return responses.default;
        }
    }
});

// Advanced Search Modal
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');
    const searchResults = document.getElementById('searchResults');

    // Mock doctor data
    const doctors = [
        { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', location: 'Mumbai', experience: '10+', fee: '1000+', rating: 4.8 },
        { name: 'Dr. Rajesh Kumar', specialty: 'Dermatology', location: 'Delhi', experience: '5-10', fee: '500-1000', rating: 4.6 },
        { name: 'Dr. Priya Sharma', specialty: 'Neurology', location: 'Bangalore', experience: '10+', fee: '1000+', rating: 4.9 },
        { name: 'Dr. Amit Patel', specialty: 'Orthopedics', location: 'Mumbai', experience: '5-10', fee: '500-1000', rating: 4.7 },
        { name: 'Dr. Neha Gupta', specialty: 'Pediatrics', location: 'Delhi', experience: '1-5', fee: '0-500', rating: 4.5 }
    ];

    searchBtn.addEventListener('click', function() {
        searchModal.classList.add('active');
        displaySearchResults(doctors);
    });

    searchClose.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });

    // Filter functionality
    const specialtyFilter = document.getElementById('specialtyFilter');
    const locationFilter = document.getElementById('locationFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const feeFilter = document.getElementById('feeFilter');

    [specialtyFilter, locationFilter, experienceFilter, feeFilter].forEach(filter => {
        filter.addEventListener('change', filterDoctors);
    });

    function filterDoctors() {
        const specialty = specialtyFilter.value.toLowerCase();
        const location = locationFilter.value.toLowerCase();
        const experience = experienceFilter.value;
        const fee = feeFilter.value;

        const filteredDoctors = doctors.filter(doctor => {
            return (!specialty || doctor.specialty.toLowerCase().includes(specialty)) &&
                   (!location || doctor.location.toLowerCase().includes(location)) &&
                   (!experience || doctor.experience === experience) &&
                   (!fee || doctor.fee === fee);
        });

        displaySearchResults(filteredDoctors);
    }

    function displaySearchResults(doctors) {
        searchResults.innerHTML = '';
        
        if (doctors.length === 0) {
            searchResults.innerHTML = '<p>No doctors found matching your criteria.</p>';
            return;
        }

        doctors.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            doctorCard.innerHTML = `
                <div class="doctor-info">
                    <h4>${doctor.name}</h4>
                    <p>${doctor.specialty}</p>
                    <div class="doctor-details">
                        <span><i class="fas fa-map-marker-alt"></i> ${doctor.location}</span>
                        <span><i class="fas fa-star"></i> ${doctor.rating}</span>
                        <span><i class="fas fa-rupee-sign"></i> ${doctor.fee}</span>
                    </div>
                </div>
                <div class="doctor-actions">
                    <button class="btn-secondary">View Profile</button>
                    <button class="btn-primary">Book Appointment</button>
                </div>
            `;
            searchResults.appendChild(doctorCard);
        });
    }
});

// Dashboard Modal
document.addEventListener('DOMContentLoaded', function() {
    const dashboardBtn = document.getElementById('dashboardBtn');
    const dashboardModal = document.getElementById('dashboardModal');
    const dashboardClose = document.getElementById('dashboardClose');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    dashboardBtn.addEventListener('click', function() {
        dashboardModal.classList.add('active');
    });

    dashboardClose.addEventListener('click', function() {
        dashboardModal.classList.remove('active');
    });

    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Notification System
document.addEventListener('DOMContentLoaded', function() {
    const notificationToast = document.getElementById('notificationToast');

    function showNotification(message) {
        const toastMessage = notificationToast.querySelector('.toast-message');
        toastMessage.textContent = message;
        notificationToast.classList.add('show');
        
        setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 3000);
    }

    // Simulate notifications
    setTimeout(() => {
        showNotification('Welcome to our advanced healthcare platform!');
    }, 2000);

    // Show notification when booking appointment
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Book Appointment') {
            showNotification('Appointment booking initiated!');
        }
    });
});

// Enhanced Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.consultation-card, .specialty-card, .article-card, .testimonial-card, .metric-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Real-time Features Simulation
document.addEventListener('DOMContentLoaded', function() {
    // Simulate real-time updates
    setInterval(() => {
        const healthScore = document.querySelector('.metric-value');
        if (healthScore && healthScore.textContent.includes('%')) {
            const currentScore = parseInt(healthScore.textContent);
            const newScore = Math.max(80, Math.min(95, currentScore + (Math.random() - 0.5) * 2));
            healthScore.textContent = Math.round(newScore) + '%';
            
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = Math.round(newScore) + '%';
            }
        }
    }, 10000); // Update every 10 seconds
});

// Enhanced Healthcare Platform Features
document.addEventListener('DOMContentLoaded', function() {
    // Language Selection
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            showNotification(`Language changed to ${selectedLanguage}`);
        });
    }

    // Hero Search Functionality
    const heroSearch = document.getElementById('heroSearch');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', function() {
            const query = heroSearch ? heroSearch.value : '';
            if (query.trim()) {
                // Trigger advanced search modal
                const searchBtn = document.getElementById('searchBtn');
                if (searchBtn) {
                    searchBtn.click();
                }
                showNotification(`Searching for: ${query}`);
            }
        });
    }

    // AI Symptom Checker
    const aiSymptomBtn = document.getElementById('aiSymptomBtn');
    const symptomModal = document.getElementById('symptomModal');
    const symptomClose = document.getElementById('symptomClose');
    const symptomCancel = document.getElementById('symptomCancel');
    const symptomCheck = document.getElementById('symptomCheck');
    const symptomText = document.getElementById('symptomText');

    if (aiSymptomBtn) {
        aiSymptomBtn.addEventListener('click', function() {
            symptomModal.classList.add('active');
        });
    }

    if (symptomClose || symptomCancel) {
        [symptomClose, symptomCancel].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    symptomModal.classList.remove('active');
                });
            }
        });
    }

    if (symptomCheck) {
        symptomCheck.addEventListener('click', function() {
            const symptoms = symptomText ? symptomText.value : '';
            if (symptoms.trim()) {
                // Simulate AI analysis
                setTimeout(() => {
                    showNotification('AI analysis complete! Check your dashboard for results.');
                    symptomModal.classList.remove('active');
                }, 2000);
            } else {
                showNotification('Please enter your symptoms first.');
            }
        });
    }

    // Symptom tag functionality
    const symptomTags = document.querySelectorAll('.symptom-tag');
    symptomTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const symptom = this.getAttribute('data-symptom');
            if (symptomText) {
                const currentText = symptomText.value;
                symptomText.value = currentText ? `${currentText}, ${symptom}` : symptom;
            }
        });
    });

    // Emergency SOS
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const emergencyClose = document.getElementById('emergencyClose');
    const emergencyCancel = document.getElementById('emergencyCancel');
    const emergencyContact = document.getElementById('emergencyContact');

    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            emergencyModal.classList.add('active');
        });
    }

    if (emergencyClose || emergencyCancel) {
        [emergencyClose, emergencyCancel].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    emergencyModal.classList.remove('active');
                });
            }
        });
    }

    if (emergencyContact) {
        emergencyContact.addEventListener('click', function() {
            showNotification('Connecting you with the nearest available doctor...');
            emergencyModal.classList.remove('active');
        });
    }

    // Login/Signup Modal
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const loginClose = document.getElementById('loginClose');
    const authForm = document.getElementById('authForm');
    const authTabs = document.querySelectorAll('.auth-tabs .tab-btn');

    if (loginBtn || signupBtn) {
        [loginBtn, signupBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    loginModal.classList.add('active');
                });
            }
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    // Auth tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide relevant fields
            const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
            const authName = document.getElementById('authName');
            const authPhone = document.getElementById('authPhone');
            
            if (tabType === 'signup') {
                if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'block';
                if (authName) authName.style.display = 'block';
                if (authPhone) authPhone.style.display = 'block';
            } else {
                if (confirmPasswordGroup) confirmPasswordGroup.style.display = 'none';
                if (authName) authName.style.display = 'none';
                if (authPhone) authPhone.style.display = 'none';
            }
        });
    });

    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const activeTab = document.querySelector('.auth-tabs .tab-btn.active');
            const tabType = activeTab ? activeTab.getAttribute('data-tab') : 'login';
            
            showNotification(`${tabType === 'login' ? 'Login' : 'Signup'} successful! Welcome to MediConnect.`);
            loginModal.classList.remove('active');
        });
    }

    // Enhanced Doctor Data with more details
    const enhancedDoctors = [
        { 
            name: 'Dr. Asha Verma', 
            specialty: 'General Physician', 
            location: 'Mumbai', 
            experience: '10+', 
            fee: '1000+', 
            rating: 4.6,
            availability: 'Available Today',
            languages: ['English', 'Hindi', 'Marathi']
        },
        { 
            name: 'Dr. Rohit Sen', 
            specialty: 'Dermatologist', 
            location: 'Bengaluru', 
            experience: '5-10', 
            fee: '500-1000', 
            rating: 4.8,
            availability: 'Available Tomorrow',
            languages: ['English', 'Hindi', 'Kannada']
        },
        { 
            name: 'Dr. Neha Shah', 
            specialty: 'Pediatrician', 
            location: 'Delhi', 
            experience: '5-10', 
            fee: '500-1000', 
            rating: 4.5,
            availability: 'Available Today',
            languages: ['English', 'Hindi', 'Punjabi']
        },
        { 
            name: 'Dr. Vikram Iyer', 
            specialty: 'Orthopedics', 
            location: 'Chennai', 
            experience: '10+', 
            fee: '1000+', 
            rating: 4.7,
            availability: 'Available Tomorrow',
            languages: ['English', 'Hindi', 'Tamil']
        }
    ];

    // Update search results with enhanced data
    if (typeof displaySearchResults === 'function') {
        // Override the existing function with enhanced version
        window.displaySearchResults = function(doctors) {
            const searchResults = document.getElementById('searchResults');
            if (!searchResults) return;
            
            searchResults.innerHTML = '';
            
            if (doctors.length === 0) {
                searchResults.innerHTML = '<p>No doctors found matching your criteria.</p>';
                return;
            }

            doctors.forEach(doctor => {
                const doctorCard = document.createElement('div');
                doctorCard.className = 'doctor-card';
                doctorCard.innerHTML = `
                    <div class="doctor-info">
                        <h4>${doctor.name}</h4>
                        <p>${doctor.specialty}</p>
                        <div class="doctor-details">
                            <span><i class="fas fa-map-marker-alt"></i> ${doctor.location}</span>
                            <span><i class="fas fa-star"></i> ${doctor.rating}</span>
                            <span><i class="fas fa-rupee-sign"></i> ${doctor.fee}</span>
                        </div>
                        <div class="doctor-availability">
                            <span class="availability-badge">${doctor.availability}</span>
                        </div>
                    </div>
                    <div class="doctor-actions">
                        <button class="btn-secondary">View Profile</button>
                        <button class="btn-primary">Book Appointment</button>
                    </div>
                `;
                searchResults.appendChild(doctorCard);
            });
        };
    }

    // Add availability badge styling
    const style = document.createElement('style');
    style.textContent = `
        .availability-badge {
            background: #e8f5e8;
            color: #2e7d32;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
            margin-top: 0.5rem;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);

    // Enhanced booking functionality
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Book Appointment') {
            showNotification('Appointment booking initiated! You will receive a confirmation shortly.');
        } else if (e.target.textContent === 'Book Test') {
            showNotification('Lab test booking initiated! We will contact you for scheduling.');
        } else if (e.target.textContent === 'Order Now') {
            showNotification('Medicine ordering initiated! Please upload your prescription.');
        } else if (e.target.textContent === 'Upload Record') {
            showNotification('Health record upload initiated! Please select your files.');
        } else if (e.target.textContent === 'Choose Plan') {
            showNotification('Health plan selection initiated! Our team will contact you.');
        }
    });

    // Enhanced notification system with different types
    function showNotification(message, type = 'info') {
        const notificationToast = document.getElementById('notificationToast');
        if (!notificationToast) return;

        const toastMessage = notificationToast.querySelector('.toast-message');
        const toastIcon = notificationToast.querySelector('i');
        
        toastMessage.textContent = message;
        
        // Update icon based on notification type
        if (type === 'success') {
            toastIcon.className = 'fas fa-check-circle';
            notificationToast.style.borderLeftColor = '#4caf50';
        } else if (type === 'warning') {
            toastIcon.className = 'fas fa-exclamation-triangle';
            notificationToast.style.borderLeftColor = '#ff9800';
        } else if (type === 'error') {
            toastIcon.className = 'fas fa-times-circle';
            notificationToast.style.borderLeftColor = '#f44336';
        } else {
            toastIcon.className = 'fas fa-bell';
            notificationToast.style.borderLeftColor = 'var(--primary-color)';
        }
        
        notificationToast.classList.add('show');
        
        setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 3000);
    }

    // Make showNotification globally available
    window.showNotification = showNotification;
});

// Console welcome message
console.log(`
🏥 Welcome to Enhanced MediConnect Platform!
✨ Advanced Features:
- AI-Powered Health Assistant
- Advanced Doctor Search & Filtering
- Real-time Health Dashboard
- Telemedicine Integration
- Smart Notifications
- Multi-language Support
- AI Symptom Checker
- Emergency SOS
- Diagnostics & Lab Tests
- Online Medicine Ordering
- Health Records Management
- Insurance & Health Plans
- Responsive Design
- Modern UI/UX with Animations
- Performance Optimized

Built with ❤️ for Smart India Hackathon
`);
