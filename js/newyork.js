document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Header & Footer Loaders
    fetch('header.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(err => console.error('Error loading header:', err));

    fetch('footer.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(err => console.error('Error loading footer:', err));

    // Simple Accordion Toggle Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            const icon = item.querySelector('.accordion-icon');
            if (icon.textContent === '+') {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        });
    });
});