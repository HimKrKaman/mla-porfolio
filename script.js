// script.js - toggles mobile nav, loads hero + news, closes menu on link click/resize
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navAnchors = navLinks.querySelectorAll("a");

  // Toggle function: add/remove .open and update aria
  function toggleNav(forceState) {
    const isOpen = typeof forceState === "boolean" ? forceState : !navLinks.classList.contains("open");
    if (isOpen) {
      navLinks.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
    } else {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleNav();
  });

  // Close nav when a link is clicked (useful on mobile)
  navAnchors.forEach(a => {
    a.addEventListener("click", () => {
      // if viewport is mobile width, close the menu
      if (window.innerWidth <= 768) toggleNav(false);
    });
  });

  // Close menu if user clicks outside of nav on small screens
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && navLinks.classList.contains("open")) {
      const clickInside = navLinks.contains(e.target) || hamburger.contains(e.target);
      if (!clickInside) toggleNav(false);
    }
  });

  // On resize, ensure nav's state matches desktop/mobile expectation
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      // ensure nav visible on desktop
      navLinks.classList.remove("open");
      navLinks.style.display = ""; // let CSS handle it
      hamburger.setAttribute("aria-expanded", "false");
    } else {
      // mobile: ensure nav hidden until explicit open
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  /* -------------------------
     Load hero & news from localStorage (Admin panel)
     ------------------------- */
  const savedHero = JSON.parse(localStorage.getItem("heroData"));
  if (savedHero && savedHero.heading) {
    const headingEl = document.getElementById("hero-heading");
    headingEl.textContent = savedHero.heading;
  }
  if (savedHero && savedHero.image) {
    const imgEl = document.getElementById("hero-image");
    // security note: we assume admin provides a safe URL relative to site
    imgEl.src = savedHero.image;
  }

  // Load news items
  const newsContainer = document.getElementById("news-container");
  const savedNews = JSON.parse(localStorage.getItem("newsItems")) || [];
  if (savedNews.length === 0) {
    newsContainer.innerHTML = `<div class="news-item"><h3>No news yet</h3><p>Use the admin panel to add news items.</p></div>`;
  } else {
    newsContainer.innerHTML = "";
    savedNews.forEach(item => {
      const div = document.createElement("div");
      div.className = "news-item";
      const time = item.date ? `<small style="opacity:.7;">${item.date}</small>` : "";
      div.innerHTML = `<h3>${item.title}</h3>${time}<p>${item.body}</p>`;
      newsContainer.appendChild(div);
    });
  }

  // Simple contact form handling (demo-only)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // demo behaviour: show a friendly message and reset
      alert("Thanks — your message has been recorded (demo).");
      contactForm.reset();
    });
  }
});