document.addEventListener('DOMContentLoaded', () => {
  // 1. Fetch and load Header component
  fetch('header.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch((error) => console.error('Error loading header:', error));

  // 2. Fetch and load Footer component
  fetch('footer.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch((error) => console.error('Error loading footer:', error));

  // 3. Elements setup for Filter and Search
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-tags .tag');
  const articles = document.querySelectorAll('.blog-grid .card');

  let activeCategory = 'all';

  // Category Filter Listener
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      activeCategory = button.getAttribute('data-category');
      filterArticles();
    });
  });

  // Real-time Search Listener
  searchInput.addEventListener('input', () => {
    filterArticles();
  });

  // Filter Logic Function
  function filterArticles() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    articles.forEach((article) => {
      const title = article.querySelector('.card-title').textContent.toLowerCase();
      const summary = article.querySelector('.post-summary').textContent.toLowerCase();
      const categories = article.getAttribute('data-category').toLowerCase();

      const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
      const matchesSearch = title.includes(searchTerm) || summary.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        article.style.display = 'flex';
      } else {
        article.style.display = 'none';
      }
    });
  }
});