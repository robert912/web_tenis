

function productCarouselAutoSet() { 
    $("#content .product-carousel, .banners-slider-carousel .product-carousel, .testimonial-area .product-carousel, .czcategory_listblock .product-carousel").each(function() {
        var objectID = $(this).attr('id');
        var myObject = objectID.replace('-carousel','');
        if(myObject.indexOf("-") >= 0)
            myObject = myObject.substring(0,myObject.indexOf("-"));		
        if(widthClassOptions[myObject])
            var myDefClass = widthClassOptions[myObject];
        else
            var myDefClass= 'grid_default_width';
        var slider = $("#content #" + objectID + ", .banners-slider-carousel #"+ objectID + ", .testimonial-area #"+ objectID + ", .czcategory_listblock #"+ objectID);
        slider.sliderCarousel({
            defWidthClss : myDefClass,
            subElement   : '.slider-item',
            subClass     : 'product-block',
            firstClass   : 'first_item_cz',
            lastClass    : 'last_item_cz',
            slideSpeed : 200,
            paginationSpeed : 800,
            autoPlay : false,
            stopOnHover : false,
            goToFirst : true,
            goToFirstSpeed : 1000,
            goToFirstNav : true,
            pagination : false,
            paginationNumbers: false,
            responsive: true,
            responsiveRefreshRate : 200,
            baseClass : "slider-carousel",
            theme : "slider-theme",
            autoHeight : true
        });
        
        var nextButton = $(this).parent().find('.next');
        var prevButton = $(this).parent().find('.prev');
        nextButton.click(function(){
            slider.trigger('slider.next');
        })
        prevButton.click(function(){
            slider.trigger('slider.prev');
        })
    });
}
//$(window).load(function(){productCarouselAutoSet();});
$(document).ready(function(){productCarouselAutoSet();});