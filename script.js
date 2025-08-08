import { projects } from "./projects.js";

let currentSlide = 0;
const projectsGrid = document.getElementById("projectsGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const navDots = document.getElementById("navDots");

function createProjectCard(project, index) {
    return `
        <div class="project-card fade-in" data-index="${index}" data-category="${
        project.category
    }">
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
                    ${project.technologies
                        .map((tech) => `<span class="tech-tag">${tech}</span>`)
                        .join("")}
                </div>
            </div>
        </div>
    `;
}

function renderProjects() {
    projectsGrid.innerHTML = projects
        .map((project, index) => createProjectCard(project, index))
        .join("");

    // Create navigation dots
    navDots.innerHTML = projects
        .map(
            (_, index) =>
                `<div class="nav-dot ${
                    index === 0 ? "active" : ""
                }" data-index="${index}"></div>`
        )
        .join("");

    updateControls();
}

function updateControls() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= projects.length - 1;
}

function goToSlide(index) {
    currentSlide = index;

    // Hide all cards
    document.querySelectorAll(".project-card").forEach((card) => {
        card.style.display = "none";
    });

    // Show current card
    const currentCard = document.querySelector(`[data-index="${index}"]`);
    if (currentCard) {
        currentCard.style.display = "block";
        currentCard.classList.add("slide-in");
    }

    // Update active dot
    document.querySelectorAll(".nav-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
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

// Add event listeners for navigation buttons
prevBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);

// Add event listeners for navigation dots
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-dot")) {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index);
    }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") previousSlide();
});

// Add click handlers to project cards
document.addEventListener("click", (e) => {
    if (e.target.closest(".project-card")) {
        const card = e.target.closest(".project-card");
        const index = parseInt(card.dataset.index);
        goToSlide(index);
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
    body.classList.add("light-theme");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    // Save theme preference
    const currentTheme = body.classList.contains("light-theme")
        ? "light"
        : "dark";
    localStorage.setItem("theme", currentTheme);
});
