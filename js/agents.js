document.addEventListener('DOMContentLoaded', () => {
  // Helper function to fetch and inject HTML partials
  const loadPartial = (elementId, filePath) => {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to load ${filePath}`);
        }
        return response.text();
      })
      .then((data) => {
        targetElement.innerHTML = data;
      })
      .catch((error) => console.error('Partial load error:', error));
  };

  // Load Header and Footer (Ensure header.html and footer.html are in the root directory)
  loadPartial('header-placeholder', 'header.html');
  loadPartial('footer-placeholder', 'footer.html');

  // Accordion Toggle
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach((acc) => {
        acc.classList.remove('active');
        const icon = acc.querySelector('.acc-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.acc-icon');
        if (icon) icon.textContent = '×';
      }
    });
  });

  // Client-side Search Filter
  const searchInput = document.getElementById('agentSearch');
  const agentCards = document.querySelectorAll('.agent-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      agentCards.forEach((card) => {
        const agentName = card.querySelector('.agent-name')?.textContent.toLowerCase() || '';
        const agentRole = card.querySelector('.agent-role')?.textContent.toLowerCase() || '';

        if (agentName.includes(searchTerm) || agentRole.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});