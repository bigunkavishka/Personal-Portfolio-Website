
document.addEventListener("DOMContentLoaded", () => {
  // Update footer year automatically
  const footer = document.querySelector("footer p");

  if (footer) {
    footer.innerHTML =
      `&copy; ${new Date().getFullYear()} Bigun Kavishka. All rights reserved.`;
  }

  // Highlight the active navigation link
  const navLinks = document.querySelectorAll(".links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  // Handle a missing profile image
  const profileImage = document.querySelector(".hero-image img");

  if (profileImage) {
    profileImage.addEventListener("error", () => {
      console.warn("Profile image could not be loaded. Check its file path.");
    });
  }

  console.log("Portfolio website loaded successfully!");
});
