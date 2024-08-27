document.addEventListener('DOMContentLoaded', function() {
    // Aggiungi event listeners dopo che il DOM è stato caricato
    const openSidebarButton = document.querySelector('nav .navlinks .open-sidebar');
    const closeSidebarButton = document.querySelector('nav .sidebar .close-sidebar');

    if (openSidebarButton && closeSidebarButton) {
        openSidebarButton.addEventListener('click', showSidebar);
        closeSidebarButton.addEventListener('click', closeSidebar);
    } else {
        console.error('Sidebar buttons not found');
    }
});

function showSidebar() {
    const sidebar = document.querySelector('nav .sidebar');
    if (sidebar) {
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.display = 'flex';
    } else {
        console.error('Sidebar element not found');
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('nav .sidebar');
    if (sidebar) {
        sidebar.style.transform = 'translateX(100%)';
        setTimeout(() => {
            sidebar.style.display = 'none';
        }, 300); // Tempo di transizione in millisecondi
    } else {
        console.error('Sidebar element not found');
    }
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
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlide = index;

    document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
        dot.className = dot.className.replace(" active", "");
        if (idx === currentSlide) {
            dot.className += " active";
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function setCurrentSlide(index) {
    showSlide(index);
}

function flipCard(button) {
    const card = button.closest('.inner');
    if (card) {
        card.classList.toggle('flipped');
    } else {
        console.error('Card not found');
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

document.addEventListener('DOMContentLoaded', (event) => {
    let slider = document.querySelector('.slider');
    let sliderItems = document.querySelectorAll('.progetti');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    const touchStart = (index) => {
        return function(event) {
            currentSlide = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        };
    };

    const touchMove = (event) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    };

    const touchEnd = () => {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentSlide < sliderItems.length - 1) currentSlide += 1;
        if (movedBy > 100 && currentSlide > 0) currentSlide -= 1;

        setPositionByIndex();
        slider.classList.remove('grabbing');
    };

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    };

    const animation = () => {
        setSliderPosition();
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    };

    const setSliderPosition = () => {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    };

    const setPositionByIndex = () => {
        currentTranslate = currentSlide * -window.innerWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.className = 'dot' + (idx === currentSlide ? ' active' : '');
        });
    };

    sliderItems.forEach((slide, index) => {
        const slideImage = slide.querySelector('img');
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());

        // Touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);

        // Mouse events (for testing on desktop)
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    window.addEventListener('resize', setPositionByIndex);
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

document.querySelectorAll('.img-progetti img').forEach(img => {
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal content, close the modal
modal.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
