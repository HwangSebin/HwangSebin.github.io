$(document).ready(function() {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                //console.log(scroll);
                if (scroll >= 50) {
                    //console.log('a');
                    $(".subNavBox").addClass("scollOn");
                } else {
                    //console.log('a');
                    $(".subNavBox").removeClass("scollOff");
                }
            });
        }