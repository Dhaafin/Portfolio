// Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section, main');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Add scroll animation for project items
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

        document.querySelectorAll('.project-item').forEach(item => {
            observer.observe(item);
        });


// Resume Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll reveal animation
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

    // Initialize animations for resume elements
    function initResumeAnimations() {
        // Set initial states for animated elements
        const animatedElements = [
            '.profile-card',
            '.profile-image',
            '.skill-card'
        ];

        animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                // Set initial state
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                
                // Observe for intersection
                observer.observe(el);
            });
        });
    }

    // Skill card hover effects
    function initSkillCardEffects() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Add click ripple effect
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(78, 205, 196, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = (e.clientX - card.offsetLeft) + 'px';
                ripple.style.top = (e.clientY - card.offsetTop) + 'px';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Profile image parallax effect - DISABLED
    function initParallaxEffect() {
        // Parallax effect disabled to prevent image disappearing issue
        // const profileImage = document.querySelector('.resume-image-container');
        
        // if (profileImage) {
        //     window.addEventListener('scroll', function() {
        //         const scrolled = window.pageYOffset;
        //         const rate = scrolled * -0.5;
                
        //         if (isElementInViewport(profileImage)) {
        //             profileImage.style.transform = `translateY(${rate}px)`;
        //         }
        //     });
        // }
    }

    // Typing animation for profile text
    function initTypingAnimation() {
        const profileTexts = document.querySelectorAll('.profile-text p');
        
        profileTexts.forEach((text, index) => {
            const originalText = text.textContent;
            text.textContent = '';
            
            let charIndex = 0;
            const typingSpeed = 20;
            const startDelay = index * 1000 + 500;
            
            setTimeout(() => {
                const typeWriter = setInterval(() => {
                    if (charIndex < originalText.length) {
                        text.textContent += originalText.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typeWriter);
                    }
                }, typingSpeed);
            }, startDelay);
        });
    }

    // Utility function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Skills progress animation
    function initSkillsProgress() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Add skill level indicator (optional feature)
            const skillLevel = Math.floor(Math.random() * 40) + 60; // Random skill level 60-100%
            
            card.addEventListener('mouseenter', function() {
                // You can add skill level display here if needed
                console.log(`Skill level: ${skillLevel}%`);
            });
        });
    }

    // Dynamic background particles (optional)
    function initBackgroundParticles() {
        const resumeSection = document.querySelector('.resume-section');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(78, 205, 196, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
            particle.style.zIndex = '1';
            
            resumeSection.appendChild(particle);
        }
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0% {
                transform: translateY(0px);
                opacity: 1;
            }
            50% {
                transform: translateY(-20px);
                opacity: 0.5;
            }
            100% {
                transform: translateY(0px);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all functions
    initResumeAnimations();
    initSkillCardEffects();
    initParallaxEffect();
    initSkillsProgress();
    initBackgroundParticles();

    // Optional: Uncomment for typing animation
    // initTypingAnimation();

    // Smooth scrolling for internal links (if any)
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

    console.log('Resume section loaded successfully!');
});

// Experiences Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize experiences section animations and interactions
    initExperiencesSection();
});

function initExperiencesSection() {
    // Animate experience cards on scroll
    animateExperienceCards();
    
    // Add hover effects for experience items
    addExperienceItemHoverEffects();
    
    // Initialize timeline animations
    initTimelineAnimations();
}

function animateExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-category-card');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    // Create intersection observer for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Create intersection observer for items
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    // Set initial styles and observe cards
    experienceCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardObserver.observe(card);
    });
    
    // Set initial styles and observe items
    experienceItems.forEach((item, index) => {
        const isWorkExp = item.classList.contains('work-exp-item');
        item.style.opacity = '0';
        item.style.transform = isWorkExp ? 'translateX(-30px)' : 'translateX(30px)';
        item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        itemObserver.observe(item);
    });
}

function addExperienceItemHoverEffects() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach((item) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
            
            // Add glow effect to bullet points
            const bullets = this.querySelectorAll('.exp-list li::before');
            bullets.forEach(bullet => {
                bullet.style.textShadow = '0 0 10px currentColor';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            
            // Remove glow effect
            const bullets = this.querySelectorAll('.exp-list li::before');
            bullets.forEach(bullet => {
                bullet.style.textShadow = 'none';
            });
        });
    });
}

function initTimelineAnimations() {
    // Animate date badges
    const dateBadges = document.querySelectorAll('.exp-date');
    
    dateBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        badge.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Animate with delay
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 800 + (index * 150));
    });
    
    // Animate list items sequentially
    const listItems = document.querySelectorAll('.exp-list li');
    
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Group list items by their parent
    const expDescriptions = document.querySelectorAll('.exp-description');
    expDescriptions.forEach((desc) => {
        const items = desc.querySelectorAll('li');
        items.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            item.style.transition = 'all 0.4s ease';
        });
        listObserver.observe(desc);
    });
}

// Add smooth scrolling to experiences section if linked
function scrollToExperiences() {
    const experiencesSection = document.getElementById('experiences');
    if (experiencesSection) {
        experiencesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax effect for background
function addParallaxEffect() {
    const experiencesSection = document.querySelector('.experiences-section');
    
    if (experiencesSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (isElementInViewport(experiencesSection)) {
                experiencesSection.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
            }
        });
    }
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addParallaxEffect, 100);
});

// Handle window resize
window.addEventListener('resize', function() {
    // Re-initialize animations if needed
    const experienceCards = document.querySelectorAll('.experience-category-card');
    experienceCards.forEach(card => {
        if (window.innerWidth <= 768) {
            card.style.transform = 'none';
        }
    });
});

// Footer JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                e.preventDefault();
                
                // Add active state animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Smooth scroll to target section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without triggering page reload
                history.pushState(null, null, `#${targetSection}`);
            }
        });
    });
    
    // Contact link interactions with enhanced feedback
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show feedback for different contact methods
            const linkType = this.querySelector('i').className;
            
            if (linkType.includes('fa-envelope')) {
                // For email links, show a brief feedback
                showContactFeedback('Opening email client...', 'email');
            } else if (linkType.includes('fa-whatsapp')) {
                // For WhatsApp, show opening message
                showContactFeedback('Opening WhatsApp...', 'whatsapp');
            } else if (linkType.includes('fa-linkedin')) {
                // For LinkedIn, show opening message
                showContactFeedback('Opening LinkedIn...', 'linkedin');
            }
        });
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Function to show contact feedback
    function showContactFeedback(message, type) {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'contact-feedback';
        feedback.textContent = message;
        
        // Style the feedback element
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        // Add type-specific styling
        switch(type) {
            case 'email':
                feedback.style.borderLeft = '4px solid #EA4335';
                break;
            case 'whatsapp':
                feedback.style.borderLeft = '4px solid #25D366';
                break;
            case 'linkedin':
                feedback.style.borderLeft = '4px solid #0077B5';
                break;
        }
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 1500);
    }
    
    // Intersection Observer for footer animation
    const footer = document.querySelector('.footer');
    const footerElements = document.querySelectorAll('.footer-about, .footer-navigation, .footer-contact');
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide elements for animation
    footerElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        footerObserver.observe(element);
    });
    
    // Update copyright year dynamically
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-copyright p');
    if (copyrightText) {
        copyrightText.textContent = `Copyright © ${currentYear} Dhaafin. All Rights Reserved.`;
    }
    
    // Add keyboard navigation support
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    contactLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add ARIA labels for accessibility
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        link.setAttribute('aria-label', `Navigate to ${section} section`);
    });
    
    contactLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', `Contact via ${text}`);
    });
    
    console.log('Footer functionality loaded successfully!');
});