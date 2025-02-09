(() => {
    const cards = [
        { title: "Card 1", content: "This is the content for card 1" },
        { title: "Card 2", content: "This is the content for card 2" },
        { title: "Card 3", content: "This is the content for card 3" },
        { title: "Card 4", content: "This is the content for card 4" },
        { title: "Card 5", content: "This is the content for card 5" }
      ];
    /*=======================================
    ========= Carrousel Principal ===========
    =======================================*/
    const carouselImages = document.querySelectorAll('.carousel-image');
    const carouselButtons = document.querySelectorAll('.carousel-button');
    const carouselDetails = document.querySelectorAll('.carousel-detail');
    let currentImageIndex = 0;
    let intervalId;

    function showImage(index) {
        clearInterval(intervalId);
        
        carouselImages.forEach(img => img.classList.remove('active'));
        carouselImages[index].classList.add('active');
        
        carouselButtons.forEach(btn => btn.classList.remove('active'));
        carouselButtons[index].classList.add('active');

        carouselDetails.forEach(btn => btn.classList.remove('active'));
        carouselDetails[index].classList.add('active');
        
        currentImageIndex = index;
        startAutoChange();
    }

    function changeCarouselImage() {
        const nextIndex = (currentImageIndex + 1) % carouselImages.length;
        showImage(nextIndex);
    }

    function startAutoChange() {
        clearInterval(intervalId);
        intervalId = setInterval(changeCarouselImage, 5000);
    }

    // Agregar event listeners a los botones
    carouselButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showImage(index);
        });
    });
    
    // Iniciar el carrusel automático
    startAutoChange();

    // ========= Fin Carrousel Principal ===========
})();