const projects = [
    {
        title: "Fullstack Engineer",
        company: "TEKSystems - Pacific Dental Services",
        duration: "Jan 2025 - Jul 2025",
        description: "Led modernization efforts including TypeScript implementation, testing frameworks, and dashboard development. Improved authentication with Okta integration and created comprehensive documentation.",
        technologies: ["TypeScript", "React", "C#", "ASP.NET", "GraphQL", "AWS", "PostgreSQL", "Docker"],
        category: "fullstack, leadership"
    },
    {
        title: "Frontend Engineer",
        company: "Insight Global - Capital Group",
        duration: "Oct 2022 - Oct 2024",
        description: "Led critical modernization for Retirement Planning Services, converting legacy JavaScript to TypeScript, implementing RTK Query, and enhancing deployment with AWS Code Pipelines.",
        technologies: ["TypeScript", "React", "Redux", "RTK Query", "AWS", "Material UI", "DataDog"],
        category: "frontend, leadership"
    },
    {
        title: "Frontend Engineer",
        company: "Bloom Protocol",
        duration: "Apr 2022 - Oct 2022",
        description: "Created utility functions and tests to support complex data transformations, consolidated documentation, and advised on module federation to improve developer experience and continuous delivery.",
        technologies: ["TypeScript", "React", "Mocha", "Chai", "Webpack", "Docker"],
        category: "frontend"
    },
    {
        title: "Specialist Senior",
        company: "Deloitte Consulting - Amazon",
        duration: "Jun 2021 - Apr 2022",
        description: "Led micro frontend development, built data transformation patterns, and created rich text editor using React Slate. Mentored junior developers and maintained 80%+ test coverage.",
        technologies: ["TypeScript", "React", "React Query", "Slate", "Jest", "Cypress"],
        category: "frontend, leadership"
    },
    {
        title: "Agency Lead Colleague",
        company: "Perficient - GM Financial",
        duration: "Jun 2019 - Jun 2021",
        description: "Led frontend development for MyAccount platform, refactored JavaScript modules, implemented OKTA integration, and developed internal design system using React.",
        technologies: ["React", "Node.js", "MongoDB", "Jenkins", "AEM", "SOA"],
        category: "fullstack, leadership"
    },
    {
        title: "Agency Lead Colleague",
        company: "Perficient - Owens Corning",
        duration: "Jun 2018 - Jun 2019",
        description: "Created a functional design system for an internal contractor portal for Owens Corning contractors.",
        technologies: ["Docker", "Ruby On Rails", "PostgreSQL", "React", "Redux", "Jest", "Enzyme"],
        category: "fullstack"
    },
    {
        title: "Agency Lead Colleague",
        company: "Perficient - Cedars Sinai",
        duration: "Jun 2017 - Jun 2018",
        description: "Created and prototyped components that would eventually become a drag and drop design system for Cedars Sinai and their internal design system. They would go on to migrate thousands of web pages to the new design system.",
        technologies: ["AEM", "JavaScript", "Handlebars", "SCSS", "Grunt"],
        category: "frontend, leadership"
    }
];

let currentSlide = 0;
const projectsGrid = document.getElementById('projectsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const navDots = document.getElementById('navDots');

function createProjectCard(project, index) {
    return `
        <div class="project-card fade-in" data-index="${index}" data-category="${project.category}">
            <div class="project-thumbnail">
                <div class="project-thumbnail-title">${project.title}</div>
                <div class="project-thumbnail-company">${project.company}</div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <div class="project-duration">${project.duration}</div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderProjects() {
    projectsGrid.innerHTML = projects.map((project, index) => createProjectCard(project, index)).join('');

    // Create navigation dots
    navDots.innerHTML = projects.map((_, index) =>
        `<div class="nav-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>`
    ).join('');

    updateControls();
}

function updateControls() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= projects.length - 1;
}

function goToSlide(index) {
    currentSlide = index;

    // Hide all cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = 'none';
    });

    // Show current card
    const currentCard = document.querySelector(`[data-index="${index}"]`);
    if (currentCard) {
        currentCard.style.display = 'block';
        currentCard.classList.add('slide-in');
    }

    // Update active dot
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    updateControls();
}

function nextSlide() {
    if (currentSlide < projects.length - 1) {
        goToSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Initialize
renderProjects();
goToSlide(0);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
});

// Add click handlers to project cards
document.addEventListener('click', (e) => {
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        const index = parseInt(card.dataset.index);
        goToSlide(index);
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Save theme preference
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
});
