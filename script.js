

// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            
            // Add percentage text
            const percentageElement = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
            if (percentageElement && !percentageElement.textContent) {
                percentageElement.textContent = width + '%';
            }
        }
    });
}

// Animate Project Cards on Scroll
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add('visible');
        }
    });
}

// Typewriter Effect for Hero Title (Optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Active Navigation Link Highlight
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Form Submission Handler (if you add a contact form later)
function handleFormSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
    alert('Merci pour votre message ! Je vous répondrai bientôt.');
    e.target.reset();
}

// Initialize all animations and event listeners
function initPortfolio() {
    // Initialize typewriter effect on hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
    
    // Add active class to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize scroll animations
    animateSkillBars();
    animateProjectCards();
    setActiveNavLink();
    
    // Add form submission handler if form exists
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Event Listeners
window.addEventListener('scroll', () => {
    animateSkillBars();
    animateProjectCards();
    setActiveNavLink();
});

window.addEventListener('load', initPortfolio);
window.addEventListener('resize', () => {
    // Recalculate animations on resize
    animateSkillBars();
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--secondary) !important;
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--secondary);
    }
`;
document.head.appendChild(style);