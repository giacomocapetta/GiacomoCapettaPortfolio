function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0)'; 
    }, 10);
}

function closeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.transform = 'translateX(100%)'; 
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 300);
}
const anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(anchor => {
  anchor.addEventListener('click', smoothScroll);
});
document.addEventListener('DOMContentLoaded', function() {
    var progettiElements = document.querySelectorAll('.progetti');
  
    progettiElements.forEach(function(element) {
      element.addEventListener('click', function() {
        // Alterna la classe 'active' per applicare la trasformazione 3D
        this.classList.toggle('active');
      });
    });
  });