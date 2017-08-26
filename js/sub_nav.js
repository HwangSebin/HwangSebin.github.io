
$(function(){
      $('.subNavScroll').hide()
})
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
     //console.log(scroll);
    if (scroll >= 130) {
        //console.log('a');
        $('.subNavScroll').fadeIn(400);
    } else {
        //console.log('a');
        $('.subNavScroll').fadeOut(400);
    }
});