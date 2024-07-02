document.addEventListener("DOMContentLoaded", () => {
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

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
        });
    }

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Codice per lo slider
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slider .progetti');
        const dots = document.querySelectorAll('.dot');
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        console.log('Number of slides:', slides.length); // Log numero di slide
        console.log('Showing slide:', currentSlide); // Log slide corrente
        document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, idx) => {
            dot.className = dot.className.replace(" active", "");
            if (idx === currentSlide) {
                dot.className += " active";
            }
        });
    }

    function nextSlide() {
        currentSlide++;
        console.log('Next slide:', currentSlide); // Log slide successiva
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        console.log('Previous slide:', currentSlide); // Log slide precedente
        showSlide(currentSlide);
    }

    function setCurrentSlide(index) {
        console.log('Setting current slide to:', index); // Log impostazione slide corrente
        currentSlide = index;
        showSlide(currentSlide);
    }

    function flipCard(button) {
        console.log('Flipping card'); // Log flip card
        const card = button.previousElementSibling; // Trova l'elemento .inner precedente
        if (card) {
            card.classList.toggle('flipped');
        } else {
            console.log('Card not found');
        }
    }

    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => setCurrentSlide(index));
    });

    showSlide(currentSlide);
    
    // Esponi la funzione setCurrentSlide al contesto globale per i punti di navigazione
    window.setCurrentSlide = setCurrentSlide;
    window.flipCard = flipCard; // Esponi la funzione flipCard al contesto globale per i pulsanti Flip
});
