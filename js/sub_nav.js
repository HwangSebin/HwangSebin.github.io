
$(function(){
      $('.subNavScroll').hide()
})
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
     //console.log(scroll);
    if (scroll >= 145) {
        //console.log('a');
        $('.subNavScroll').fadeIn(500);
    } else {
        //console.log('a');
        $('.subNavScroll').fadeOut(500);
    }
});