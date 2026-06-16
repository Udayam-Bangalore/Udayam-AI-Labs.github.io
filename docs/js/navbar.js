// js/navbar.js

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinksList = document.getElementById("nav-links");
  const allNavLinks = navLinksList.querySelectorAll("a");
  const dropdownToggles = navLinksList.querySelectorAll(".dropdown-toggle");
  const sections = document.querySelectorAll("section[id]");

  // 1. Navbar background and active link highlighting on scroll
  function handleScroll() {
    // Background change
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlighting
    let currentSectionId = "";
    const scrollPosition = window.scrollY + header.offsetHeight + 50;
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    allNavLinks.forEach((link) => {
      // ✅ FIX: Changed from .remove("c") to .remove("active-link")
      // This ensures previously active links are correctly de-highlighted.
      link.classList.remove("active-link"); 
      if (
        link.getAttribute("href").includes(currentSectionId) &&
        currentSectionId
      ) {
        link.classList.add("active-link");
      }
    });
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  function toggleMenu() {
    const isActive = navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    navOverlay.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isActive);
    document.body.style.overflow = isActive ? "hidden" : "";

    // Close any open dropdowns when closing the menu
    if (!isActive) {
      navLinksList
        .querySelectorAll(".dropdown")
        .forEach((d) => d.classList.remove("active"));
    }
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);
    navOverlay.addEventListener("click", toggleMenu);
  }

  // 3. Close mobile menu when a regular link is clicked
  allNavLinks.forEach((link) => {
    if (!link.classList.contains("dropdown-toggle")) {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          menuToggle.click();
        }
      });
    }
  });

  // 4. Handle dropdowns on mobile/tablet (FIXED LOGIC)
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      // We only want this click behavior on mobile viewports
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parentDropdown = this.closest(".dropdown");
        const wasActive = parentDropdown.classList.contains("active");

        // First, close all dropdowns to ensure a clean state.
        // This simplifies the logic and prevents potential conflicts.
        navLinksList.querySelectorAll(".dropdown").forEach((d) => {
          d.classList.remove("active");
          d.querySelector(".dropdown-toggle").setAttribute(
            "aria-expanded",
            "false"
          );
        });

        // If the clicked dropdown was NOT active before, it means the user wants to open it.
        // So, we add the 'active' class only to this one.
        if (!wasActive) {
          parentDropdown.classList.add("active");
          this.setAttribute("aria-expanded", "true");
        }
        // If it WAS active, it remains closed from the step above, which is the desired behavior for a toggle.
      }
    });
  });

  // 5. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});