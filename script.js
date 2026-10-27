
document.addEventListener("DOMContentLoaded", () => {
  // 1. Automatically update the footer year
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 2. Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  function closeMenu() {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");

    if (menuToggle) {
      menuToggle.textContent = "☰";
    }
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close mobile menu with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle?.focus();
    }
  });

  // 3. Typing animation
  const typingText = document.querySelector("#typing-text");
  const phrases = [
    "Web Applications",
    "Creative Solutions",
    "Modern Websites"
  ];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typingText && !reduceMotion) {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        characterIndex++;
        typingText.textContent = phrase.slice(0, characterIndex);

        if (characterIndex === phrase.length) {
          deleting = true;
          setTimeout(typeEffect, 1300);
          return;
        }
      } else {
        characterIndex--;
        typingText.textContent = phrase.slice(0, characterIndex);

        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(typeEffect, deleting ? 45 : 85);
    }

    typeEffect();
  }

  // 4. Reveal elements when they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers and reduced-motion users
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 5. Active navigation link while scrolling
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".links a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          links.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            if (isActive) {
              link.classList.add("active");
              link.setAttribute("aria-current", "location");
            } else {
              link.classList.remove("active");
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 6. Back-to-top button
  const backToTop = document.querySelector(".back-to-top");

  function updateBackToTop() {
    if (backToTop) {
      backToTop.hidden = window.scrollY < 400;
    }
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth"
    });
  });

  // 7. Warn if example project links have not been replaced
  document.querySelectorAll("[data-placeholder]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
        console.warn(
          "Replace this example link with your real project URL."
        );
      }
    });
  });

  // 8. Helpful development message
  console.log("Portfolio initialized successfully!");
});
