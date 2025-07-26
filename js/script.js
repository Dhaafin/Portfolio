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

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const filterButtons = document.querySelectorAll('.filter-btn');

// Project data dari HTML
let projectsData = [];

// Load projects dari HTML saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    loadProjectsFromHTML();
    renderProjects(projectsData);
    setupEventListeners();
});

// Ambil data projects dari HTML
function loadProjectsFromHTML() {
    const projectElements = document.querySelectorAll('.project-data');
    
    projectElements.forEach((element, index) => {
        const project = {
            id: index + 1,
            title: element.dataset.title,
            description: element.dataset.description,
            tech: element.dataset.tech.split(','),
            image: element.dataset.image,
            github: element.dataset.github,
            demo: element.dataset.demo,
            publications: element.dataset.publications,
            category: element.dataset.category,
            details: element.querySelector('.project-details').innerHTML
        };
        
        projectsData.push(project);
    });
}

// Render projects ke grid
function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    // Add animation
    setTimeout(() => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        });
    }, 100);
}

// Buat project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    
    // Cek apakah image adalah placeholder atau URL gambar asli
    const imageContent = project.image.includes('placeholder') ? 
        `<div class="project-placeholder">📁</div>` : 
        `<img src="${project.image}" alt="${project.title}" loading="lazy">`;
    
    card.innerHTML = `
        <div class="project-image">
            ${imageContent}
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
        </div>
        <div class="project-links">
            ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link primary">Demo</a>` : ''}
            ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>` : ''}
            ${project.publications ? `<a href="${project.publications}" target="_blank" class="project-link primary">Publications</a>` : ''}
        </div>
    `;
    
    // Add click handler untuk modal
    card.addEventListener('click', (e) => {
        // Jangan buka modal jika link yang diklik
        if (e.target.tagName === 'A') return;
        openModal(project);
    });
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.dataset.filter;
            const filteredProjects = filter === 'all' ? 
                projectsData : 
                projectsData.filter(project => project.category === filter);
            
            renderProjects(filteredProjects);
        });
    });
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Keyboard escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

// Buka modal dengan detail project
function openModal(project) {
    const imageContent = project.image.includes('placeholder') ? 
        `<div class="project-placeholder" style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem;">📁</div>` : 
        `<img src="${project.image}" alt="${project.title}" loading="lazy">`;
    
    modalBody.innerHTML = `
        <h2 class="modal-title">${project.title}</h2>
        
        <div class="modal-image">
            ${imageContent}
        </div>
        
        <div class="modal-detail-content">
            <p class="modal-description">${project.description}</p>
            
            <div class="modal-tech">
                ${project.tech.map(tech => `<span class="modal-tech-tag">${tech.trim()}</span>`).join('')}
            </div>
            
            <div class="modal-links">
                ${project.demo ? `<a href="${project.demo}" target="_blank" class="modal-link primary">🚀 Live Demo</a>` : ''}
                ${project.github ? `<a href="${project.github}" target="_blank" class="modal-link">💻 Source Code</a>` : ''}
                ${project.publications ? `<a href="${project.publications}" target="_blank" class="modal-link primary">💬 Show Publications</a>` : ''}
            </div>
            
            <div class="project-details">
                ${project.details}
            </div>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tutup modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Search functionality (optional)
function searchProjects(query) {
    const filteredProjects = projectsData.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );
    
    renderProjects(filteredProjects);
}

// Smooth scroll ke projects section (jika dipanggil dari nav)
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Export functions untuk digunakan di halaman lain
window.portfolioProjects = {
    scrollToProjects,
    searchProjects
};

// Certification Portfolio JavaScript
        class CertificationPortfolio {
            constructor() {
                this.initializeElements();
                this.bindEvents();
                this.updateStats();
            }

            initializeElements() {
                this.tabButtons = document.querySelectorAll('.cert-tab-btn');
                this.certCards = document.querySelectorAll('.cert-card');
                this.viewButtons = document.querySelectorAll('.cert-view-btn');
                this.totalCertsElement = document.getElementById('totalCerts');
                this.activeCertsElement = document.getElementById('activeCerts');
                this.categoriesElement = document.getElementById('categories');
            }

            bindEvents() {
                // Category filter events
                this.tabButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        this.handleCategoryFilter(e.target.dataset.category);
                    });
                });

                // Certificate view events
                this.viewButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.handleCertificateView(button.dataset.url);
                    });
                });

                // Add hover effects
                this.certCards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        this.addCardHoverEffect(card);
                    });

                    card.addEventListener('mouseleave', () => {
                        this.removeCardHoverEffect(card);
                    });
                });
            }

            handleCategoryFilter(category) {
                // Update active tab
                this.tabButtons.forEach(btn => {
                    btn.classList.remove('cert-active');
                });
                document.querySelector(`[data-category="${category}"]`).classList.add('cert-active');

                // Filter cards with animation
                this.certCards.forEach(card => {
                    card.classList.add('cert-fade-out');
                    
                    setTimeout(() => {
                        if (category === 'all' || card.dataset.category === category) {
                            card.style.display = 'block';
                            card.classList.remove('cert-fade-out');
                            card.classList.add('cert-fade-in');
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('cert-fade-in');
                        }
                    }, 150);
                });

                // Update statistics
                setTimeout(() => {
                    this.updateStats(category);
                }, 200);

                // Add ripple effect to clicked tab
                this.addRippleEffect(document.querySelector(`[data-category="${category}"]`));
            }

            handleCertificateView(url) {
                if (url) {
                    // Add click animation
                    const button = event.target.closest('.cert-view-btn');
                    button.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        button.style.transform = '';
                        // Open certificate in new tab
                        window.open(url, '_blank', 'noopener,noreferrer');
                    }, 150);
                }
            }

            updateStats(activeCategory = 'all') {
                const totalCerts = this.certCards.length;
                const visibleCards = activeCategory === 'all' 
                    ? this.certCards 
                    : document.querySelectorAll(`[data-category="${activeCategory}"]`);
                
                const activeCerts = visibleCards.length;
                const categories = new Set();
                
                this.certCards.forEach(card => {
                    categories.add(card.dataset.category);
                });

                // Animate number changes
                this.animateNumber(this.totalCertsElement, totalCerts);
                this.animateNumber(this.activeCertsElement, activeCerts);
                this.animateNumber(this.categoriesElement, categories.size);
            }

            animateNumber(element, targetValue) {
                const currentValue = parseInt(element.textContent) || 0;
                const increment = targetValue > currentValue ? 1 : -1;
                let current = currentValue;

                const animation = setInterval(() => {
                    current += increment;
                    element.textContent = current;

                    if (current === targetValue) {
                        clearInterval(animation);
                    }
                }, 50);
            }

            addRippleEffect(element) {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: cert-ripple 0.6s linear;
                    pointer-events: none;
                `;

                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width - size) / 2 + 'px';
                ripple.style.top = (rect.height - size) / 2 + 'px';

                element.style.position = 'relative';
                element.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }

            addCardHoverEffect(card) {
                const icon = card.querySelector('.cert-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            }

            removeCardHoverEffect(card) {
                const icon = card.querySelector('.cert-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        }

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cert-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize the certification portfolio when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new CertificationPortfolio();
        });

        // Additional utility functions
        function addNewCertification(certData) {
            const grid = document.getElementById('certificationsGrid');
            const newCard = createCertificationCard(certData);
            grid.appendChild(newCard);
            
            // Reinitialize to bind events to new card
            const portfolio = new CertificationPortfolio();
        }

        function createCertificationCard(data) {
            const card = document.createElement('div');
            card.className = 'cert-card';
            card.setAttribute('data-category', data.category);
            
            card.innerHTML = `
                <div class="cert-card-header">
                    <div class="cert-icon ${data.category}-icon">${data.icon}</div>
                    <div class="cert-badge ${data.category}-badge">${data.badgeText}</div>
                </div>
                <div class="cert-card-body">
                    <h3 class="cert-card-title">${data.title}</h3>
                    <p class="cert-issuer">${data.issuer}</p>
                    <p class="cert-date">${data.date}</p>
                    <p class="cert-description">${data.description}</p>
                </div>
                <div class="cert-card-footer">
                    <button class="cert-view-btn" data-url="${data.url}">
                        <span>Lihat Sertifikat</span>
                        <svg class="cert-external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </button>
                </div>
            `;
            
            return card;
        }

        // Smooth scroll to certification section (jika dipanggil dari navigasi)
        function scrollToCertifications() {
            document.getElementById('certification-portfolio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Export functions for external use
        window.CertificationUtils = {
            addNewCertification,
            scrollToCertifications
        };

// Optional: Initialize parallax effect (uncomment if desired)
// document.addEventListener('DOMContentLoaded', addParallaxEffect);
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