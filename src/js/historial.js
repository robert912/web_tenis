const images = [
    { src: "https://i.postimg.cc/1X5zGSHT/storyintro1.jpg", alt: "IMG1", link: "#IMG1" },
    { src: "https://i.postimg.cc/yxQ8nGpN/storyintro2.jpg", alt: "IMG2", link: "#IMG2" },
    { src: "https://i.postimg.cc/mZ8kbcZG/storyintro3.jpg", alt: "IMG3", link: "#IMG3" },
    { src: "https://i.postimg.cc/kXH5bkt1/storyintro4.jpg", alt: "IMG4", link: "#IMG4" },
    { src: "https://i.postimg.cc/8Pc5s1sf/storyintro5.jpg", alt: "IMG5", link: "#IMG5" },
];

let selectedIndex = 4;
let slideElements = [];

function getClassName(index) {
    const relativeIndex = (index - selectedIndex + images.length) % images.length;
    if (relativeIndex === 0) return "selected";
    if (relativeIndex === 1) return "next";
    if (relativeIndex === 2) return "nextRightSecond";
    if (relativeIndex === images.length - 1) return "prev";//4
    if (relativeIndex === images.length - 2) return "prevLeftSecond";//3
    return relativeIndex > 2 ? "hideRight" : "hideLeft";
}

function createCarousel() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = '';
    
    images.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = getClassName(index);
        
        div.innerHTML = `
            <div class="img-wrap">
                <span class="img-text">${image.alt}</span>
                <img src="${image.src}" alt="${image.alt}">
            </div>
        `;
        
        carousel.appendChild(div);
        slideElements.push(div);
    });
}

function moveToSelected(direction) {
    if (direction === "next") {
        selectedIndex = (selectedIndex + 1) % images.length;
    } else if (direction === "prev") {
        selectedIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    }
    
    // Update classes for smooth transition
    slideElements.forEach((element, index) => {
        element.className = getClassName(index);
    });
}

// Initial creation
createCarousel();




    const carrusel = document.querySelector('.carrusel');
    const prevButton = document.querySelector('.carrusel-button.prev');
    const nextButton = document.querySelector('.carrusel-button.next');
    const slides = carrusel.children;
    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        carrusel.style.transform = `translateX(-${currentIndex * 25}%)`;
    }

    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    // Opcional: Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentIndex + 1);
        }
    });
