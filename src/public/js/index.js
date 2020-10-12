$(".slider-promotions")
.not(".slick-intialized")
.slick({
    prevArrow:".site-slider .slider-btn .prev",
    nextArrow:".site-slider .slider-btn .next",
    slidesToShow:5,
    slideToScroll:1,
    autoplaySpeed:3000
});

var buscador = $("#table").DataTable();
$("#input-search").keyup(function(){
    buscador.search($(this).val()).draw();
    if ($("#input-search").val() == "") {
        $(".content-search").fadeUp();
    } else {
        $(".content-search").fadeIn();
    }
})