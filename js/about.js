// --- Component Loader for Dynamic Header and Footer ---
const loadComponent = (targetId, filePath) => {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      targetElement.innerHTML = data;

      // Re-evaluate inline <script> tags inside loaded HTML components
      targetElement.querySelectorAll("script").forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    })
    .catch((err) => console.error(`Error loading ${filePath}:`, err));
};

// --- Page Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // Inject Header and Footer
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");

  // Accordion Toggle Logic for "What Sets FIND Apart"
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const icon = item.querySelector(".accordion-icon");

    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all active items
        accordionItems.forEach((i) => {
          i.classList.remove("active");
          const iIcon = i.querySelector(".accordion-icon");
          if (iIcon) iIcon.textContent = "+";
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active");
          if (icon) icon.textContent = "✕";
        }
      });
    }
  });

  // Left-to-Right Image Unwrap Scroll Observer
  const revealImg = document.querySelector(".reveal-img-left");
  if (revealImg) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(revealImg);
  }
});