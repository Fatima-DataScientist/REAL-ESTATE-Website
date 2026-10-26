document.addEventListener('DOMContentLoaded', () => {
  // Load Header snippet into placeholder
  fetch('header.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch((error) => console.error('Error loading header:', error));

  // Load Footer snippet into placeholder
  fetch('footer.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch((error) => console.error('Error loading footer:', error));
});