// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoading();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize theme toggle
    initThemeToggle();
    

    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize particles background
    initParticles();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize skills functionality
    initSkills();
});

// Loading screen
function initLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    
    // Handle navbar scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu when link is clicked
            menuBtn.classList.remove('open');
            navLinksContainer.classList.remove('open');
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section').forEach(section => {
            if (
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Show/hide back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

// Typing effect for the header
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const roles = [
        'Game Developer',
        'Web Developer',
        'Graphic Designer',
        'App Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    let erasingDelay = 75;
    let newTextDelay = 2000;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Erasing text
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Typing text
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        // Handle role change
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of typing
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            // Move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing effect
    setTimeout(type, newTextDelay);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && darkThemeMq.matches)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}



// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .about-content, .contact-content');
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        },
        {
            threshold: 0.1
        }
    );
    
    // Observe elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Particles background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4D61FC'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4D61FC',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Normally you would send this data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (replace with your own success handling)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Skills functionality
function initSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    const loadingOverlay = document.getElementById('skillLoadingOverlay');
    const projectsModal = document.getElementById('skillProjectsModal');
    const closeModal = document.getElementById('closeModal');
    
    // Skill data with projects
    const skillProjects = {
        'web-development': [
			{
                title: 'Game Suggestions Web',
                description: 'An real time games review checker site,.',
                image: 'img/game-suggest.jpg',
                tags: ['Javascript', 'Html+Css', 'Firebase'],
                liveLink: 'https://hasnain4700.github.io/Game-Suggestions/',
                githubLink: '#'
            },
			{
                title: 'Csv File Viewer',
                description: 'View csv files online without uploading.',
                image: 'img/csv-viewer.jpg',
                tags: ['Javascript', 'Html+Css'],
                liveLink: 'https://csvfileviewer.com/',
                githubLink: '#'
            },
			{
                title: 'Mobile shop pos',
                description: 'Point of sale system for moile shops.',
                image: 'img/mobile-shop-pos.jpg',
                tags: ['Javascript', 'Html+Css'],
                liveLink: 'https://hasnain4700.github.io/mobile-shop-managent/',
                githubLink: '#'
            },
			{
                title: 'Computer Shop pos',
                description: 'Point of sale system for computer shops.',
                image: 'img/computer-shop-pos.jpg',
                tags: ['Javascript', 'Html+Css'],
                liveLink: 'https://hasnain4700.github.io/computer-shop/',
                githubLink: '#'
            },
			{
                title: 'Munafa markaz project',
                description: 'A reselling plateform page for workers.',
                image: 'img/Munafa-markaz.jpg',
                tags: ['Javascript', 'Html+Css', 'Firbase'],
                liveLink: 'https://hasnain4700.github.io/Munafa-markaz-/',
                githubLink: '#'
            },
			{
                title: 'Willow floorig A client project',
                description: 'Client project.',
                image: 'img/willow-flooring.jpg',
                tags: ['Wordpress', 'Html+Css', 'Elementor'],
                liveLink: 'https://willow-flooring.com/',
                githubLink: '#'
            },
			{
                title: 'Space content website personal',
                description: 'personal website.',
                image: 'img/Science-360.jpg',
                tags: ['Blogger'],
                liveLink: 'https://www.science360.space/',
                githubLink: '#'
            },
			{
                title: 'Personal work tracker',
                description: 'Developed for perosnal works.',
                image: 'img/personal-work-tracker.jpg',
                tags: ['Html+Css', 'Javascript',],
                liveLink: 'https://hasnain4700.github.io/personal-work-tracker/',
                githubLink: '#'
            },
			{
                title: 'Temp mail Web',
                description: 'Temporary mails generation tool.',
                image: 'img/temp-mail.jpg',
                tags: ['Html+Css', 'Javascript', 'Api'],
                liveLink: 'https://hasnain4700.github.io/temp-mail/',
                githubLink: '#'
            },
        ],
        'game-development': [
            {
                title: 'Moto Madness',
                description: 'A 3D road runner game built with Unity featuring stunning visuals.',
                image: 'img/game-project1.jpg',
                tags: ['Unity', 'C#', '3D'],
                liveLink: '#',
                githubLink: '#'
            },
            {
                title: 'God of War Project',
                description: 'A Fanmade project of god of war game.',
                image: 'img/game-project2.jpg',
                tags: ['Unity', 'C#', '3D'],
                liveLink: '#',
                githubLink: '#'
            }
        ],
        'app-development': [
            {
                title: 'Ibadat tracker app',
                description: 'Salah Tracker lets you track prayers, earn rewards, level up with Quran, and help the poor.',
                image: 'img/salah-tracker.jpg',
                tags: ['Javascript', 'Firebase', 'Html+Css', 'Api'],
                liveLink: 'https://modsfire.com/d/x3ebBIJ8vQvStry',
                githubLink: '#'
            },
            {
                title: 'Mobile Load Management for shopkeepers',
                description: 'Mobile Load Management for shopkeepers.',
                image: 'img/load-managment.jpg',
                tags: ['Javascript', 'Html+css',],
                liveLink: 'https://modsfire.com/GltD87Q7Z3OX1Pr',
                githubLink: '#'
            },
			{
                title: 'Police Finder App',
                description: 'sim owner details graber.',
                image: 'img/police-finnder.jpg',
                tags: ['Javascript', 'Html+css', 'Api'],
                liveLink: 'https://modsfire.com/ye5Qa6Iq64Zh87J',
                githubLink: '#'
            }
        ],
        'graphic-design': [
            
        ]
    };
    
    // Add click event to skill cards
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skillType = card.getAttribute('data-skill');
            const skillTitle = card.querySelector('h3').textContent;
            
            // Show loading overlay
            showLoadingOverlay();
            
            // Simulate loading process
            simulateLoading(() => {
                // Hide loading overlay
                hideLoadingOverlay();
                
                // Show projects modal
                showProjectsModal(skillType, skillTitle, skillProjects[skillType]);
            });
        });
    });
    
    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            hideProjectsModal();
        });
    }
    
    // Close modal when clicking outside
    if (projectsModal) {
        projectsModal.addEventListener('click', (e) => {
            if (e.target === projectsModal) {
                hideProjectsModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideProjectsModal();
        }
    });
}

// Show loading overlay with sci-fi animation
function showLoadingOverlay() {
    const loadingOverlay = document.getElementById('skillLoadingOverlay');
    const progressFill = loadingOverlay.querySelector('.progress-fill');
    const progressText = loadingOverlay.querySelector('.progress-text');
    
    loadingOverlay.classList.add('active');
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 100);
}

// Hide loading overlay
function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('skillLoadingOverlay');
    loadingOverlay.classList.remove('active');
}

// Simulate loading process
function simulateLoading(callback) {
    // Simulate different loading stages
    const loadingTitle = document.querySelector('.loading-title');
    const loadingSubtitle = document.querySelector('.loading-subtitle');
    
    const stages = [
        { title: 'Initializing', subtitle: 'Skill Matrix' },
        { title: 'Analyzing', subtitle: 'Project Data' },
        { title: 'Loading', subtitle: 'Portfolio Items' },
        { title: 'Complete', subtitle: 'Ready to Display' }
    ];
    
    let currentStage = 0;
    const stageInterval = setInterval(() => {
        if (currentStage < stages.length) {
            loadingTitle.textContent = stages[currentStage].title;
            loadingSubtitle.textContent = stages[currentStage].subtitle;
            currentStage++;
        } else {
            clearInterval(stageInterval);
            setTimeout(callback, 500);
        }
    }, 800);
}

// Show projects modal
function showProjectsModal(skillType, skillTitle, projects) {
    const modal = document.getElementById('skillProjectsModal');
    const modalTitle = document.getElementById('modalSkillTitle');
    const projectsGrid = document.getElementById('modalProjectsGrid');
    
    // Set modal title
    modalTitle.textContent = skillTitle + ' Projects';
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Add projects to modal
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    // Show modal
    modal.classList.add('active');
}

// Hide projects modal
function hideProjectsModal() {
    const modal = document.getElementById('skillProjectsModal');
    modal.classList.remove('active');
}

// Create project card for modal
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'modal-project-card';
    
    const links = project.liveLink ? 
        `<a href="${project.liveLink}" class="modal-project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : '';
    
    const githubLink = project.githubLink ? 
        `<a href="${project.githubLink}" class="modal-project-link" target="_blank"><i class="fab fa-github"></i></a>` : '';
    
    const behanceLink = project.behanceLink ? 
        `<a href="${project.behanceLink}" class="modal-project-link" target="_blank"><i class="fab fa-behance"></i></a>` : '';
    
    const dribbbleLink = project.dribbbleLink ? 
        `<a href="${project.dribbbleLink}" class="modal-project-link" target="_blank"><i class="fab fa-dribbble"></i></a>` : '';
    
    card.innerHTML = `
        <div class="modal-project-img">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="modal-project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="modal-project-links">
                ${links}
                ${githubLink}
                ${behanceLink}
                ${dribbbleLink}
            </div>
        </div>
    `;
    
    return card;
} 