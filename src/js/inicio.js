(() => {
    /*=======================================
    ============ Carrousel Marcas ===========
    =======================================*/
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        nav:true,
        mouseDrag: true,
        touchDrag: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:5
            }
        }
    })
    // ========= Fin Carrousel Marcas ===========




})();