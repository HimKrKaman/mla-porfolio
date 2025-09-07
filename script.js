document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navAnchors = navLinks.querySelectorAll("a");

  function toggleNav(force) {
    const isOpen = typeof force === "boolean" ? force : !navLinks.classList.contains("open");
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

  navAnchors.forEach(a => a.addEventListener("click", () => {
    if (window.innerWidth <= 768) toggleNav(false);
  }));

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && navLinks.classList.contains("open")) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) toggleNav(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  /* Load hero/news from localStorage if set by admin panel (demo) */
  const savedHero = JSON.parse(localStorage.getItem("heroData"));
  if (savedHero && savedHero.heading) document.getElementById("hero-heading").textContent = savedHero.heading;
  if (savedHero && savedHero.image) document.getElementById("hero-image").src = savedHero.image;

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

  /* Simple demo form handlers */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thanks — your message has been recorded (demo).");
      contactForm.reset();
    });
  }

  const complaintForm = document.getElementById("complaint-form");
  if (complaintForm) {
    complaintForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thanks — your complaint has been recorded (demo).");
      complaintForm.reset();
    });
  }
});