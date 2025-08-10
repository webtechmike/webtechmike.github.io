import { projects } from "./projects.js";

let currentSlide = 0;
const projectsGrid = document.getElementById("projectsGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carouselControls = document.getElementById("carouselControls");
const projectsSection = document.querySelector(".projects-section");

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

    updateControls();
}

function nextSlide() {
    if (currentSlide < projects.length - 1) {
        goToSlide(currentSlide + 1);
        scrollToProjectsSection();
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
        scrollToProjectsSection();
    }
}

function scrollToProjectsSection() {
    if (!projectsSection) return;

    const sectionRect = projectsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the section is not fully visible
    const isFullyVisible =
        sectionRect.top >= 0 && sectionRect.bottom <= windowHeight;

    if (!isFullyVisible) {
        // Scroll to the section with smooth animation
        projectsSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
}

// Initialize
renderProjects();
goToSlide(0);

// Add event listeners for navigation buttons
prevBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") previousSlide();
});

// Show/hide carousel controls based on scroll position
function updateCarouselControlsVisibility() {
    if (!projectsSection || !carouselControls) return;

    const sectionRect = projectsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Show controls when projects section is in view (with some margin)
    const isInView =
        sectionRect.top < windowHeight * 0.8 &&
        sectionRect.bottom > windowHeight * 0.2;

    if (isInView) {
        carouselControls.classList.add("visible");
    } else {
        carouselControls.classList.remove("visible");
    }
}

// Add scroll event listener
window.addEventListener("scroll", updateCarouselControlsVisibility);

// Initial check
updateCarouselControlsVisibility();

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
