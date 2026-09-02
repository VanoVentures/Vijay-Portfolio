"use strict";

/* ---------------------------------
   DOM references
---------------------------------- */

const body = document.body;
const navbar = document.getElementById("navbar");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

const backToTop = document.getElementById("backToTop");

const yearElement = document.getElementById("year");


/* ---------------------------------
   Theme
---------------------------------- */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.dataset.theme = "light";
    themeIcon.textContent = "☾";
} else {
    body.dataset.theme = "dark";
    themeIcon.textContent = "☼";
}

themeToggle.addEventListener("click", () => {

    const isLight = body.dataset.theme === "light";

    if (isLight) {
        body.dataset.theme = "dark";
        themeIcon.textContent = "☼";
        localStorage.setItem("portfolio-theme", "dark");
    } else {
        body.dataset.theme = "light";
        themeIcon.textContent = "☾";
        localStorage.setItem("portfolio-theme", "light");
    }
});


/* ---------------------------------
   Mobile navigation
---------------------------------- */

function closeMobileMenu() {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {

    link.addEventListener("click", () => {
        closeMobileMenu();
    });

});


/* ---------------------------------
   Navbar scroll behavior
---------------------------------- */

function updateNavbar() {

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


/* ---------------------------------
   Scroll reveal
---------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ---------------------------------
   Back to top
---------------------------------- */

function updateBackToTop() {

    if (window.scrollY > 600) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ---------------------------------
   Footer year
---------------------------------- */

yearElement.textContent = new Date().getFullYear();


/* ---------------------------------
   Close mobile menu with Escape
---------------------------------- */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMobileMenu();
    }

});


/* ---------------------------------
   Prevent mobile menu remaining open
   after resizing to desktop
---------------------------------- */

window.addEventListener("resize", () => {

    if (window.innerWidth > 1000) {
        closeMobileMenu();
    }

});