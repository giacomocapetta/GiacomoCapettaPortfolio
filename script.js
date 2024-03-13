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