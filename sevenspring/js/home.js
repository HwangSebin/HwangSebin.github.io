if (!RAV) var RAV = {};
else if (RAV && typeof (RAV) != "object") throw new Error("RAV is not an Object type");

RAV.Home = (function ($) {
    
    var $this = {},
        bannerTransitioned = false,
        sliderCombo = 0,
        tabletSize = 768,
        mobileSize = 450,
        slider = $('#slider'),
        history = $('#history'),
        scrollIndicator = $('.scrollIndicator'),
        crackers = slider.find('.crackers'),
        hidearrowpushdown = false;
    
    return {

        run: function () {
            $this = this;
        },

        mainHome: function (block) {

            var parallax = $('#recipe .parallax');

            if (tabletSize > $(window).innerWidth()) {

                $this.fallbackMobileAnimations();

                var fallback = parallax.attr('data-fallback');
                parallax.children().remove()
                parallax.append('<img class="fallback" src="' + fallback + '">');
                parallax.css('height', 'auto');
            } else if (tabletSize == $(window).innerWidth()) {

                var fallback = parallax.attr('data-fallback');
                parallax.children().remove()
                parallax.append('<img class="fallback" src="' + fallback + '">');
                parallax.css('height', 'auto');
            } else {
                var imgs = parallax.find("img");
                imgs.each(function (item) {
                    var el = $(imgs[item]);
                    el.attr("src", el.data("url"));
                });
            }

            $(window)
                .off('scroll')
                .on('scroll', function (e) {
                    $this.scrollIndicatorStatus("hide");
                    if (tabletSize > $(window).innerWidth()) {
                        return;
                    }
                    if (tabletSize < $(window).innerWidth()) {
                        $('.parallax').parallax({ scrolled: window.pageYOffset, windowHeight: window.innerHeight, isMobile: false });
                    }
                    var els = block.find('#history .floating, #recipe .floating');
                    els.each(function () {
                        var elThis = $(this),
                            elHeight = elThis.outerHeight(),
                            elTop = elThis.offset().top,
                            scroll = window.pageYOffset + window.innerHeight;
                        if (scroll > elTop + elHeight) {
                            $this.startAnimation(elThis);
                        }
                        if (scroll < elTop) {
                            elThis.data({ 'moving': 0 });
                            $this.resetAnimation(elThis);
                            if (elThis.next().hasClass('tooltip'))
                                elThis.next().hide();
                        }
                    });

                    $('#recipe .parallax').parallax();
                })
                .on('resize', function (ctx) {
                    if (!bannerTransitioned) $this.transitionBannerItems();
                    $this.bannerFallback(block);
                    $this.parallaxHeight();
                });

            if ($(window).innerWidth() > mobileSize) {
                setTimeout($this.transitionBannerItems, 500);
            }

            var total = $('#slider .crackers').length - 1;

            var el = $('#recipe .parallax'),
                els = el.find('img');
            els.each(function () {
                var elThis = $(this);
                elThis.data('top', elThis.position().top);
            });

            var els = $('#slider .crackers');
            els.each(function () {
                var elThis = $(this);
                elThis.data('left', elThis.attr('data-left'));
            });

            if (tabletSize <= $(window).innerWidth()) {
                var els = block.find('#history .floating, #recipe .floating');
                els.each(function () {
                    var elThis = $(this),
                        total = elThis.find('img').attr('data-frames'),
                        number,
                        src = elThis.find('img').attr('src').split('-'),
                        path;
                    for (; total > 1; total--) {
                        number = "0" + total;
                        path = src[0] + '-' + number.substr(-2) + '.png';
                        elThis.find('img:first').after('<img style="visibility: hidden; position: absolute;" src="' + path + '"/>');
                    }
                    elThis.find('img:not(:first)').imagesLoaded().done(function (instance) {
                        $(instance.elements).css({ display: 'none', visibility: 'visible', position: 'relative' });
                    });
                });
            }

            $this.parallaxHeight();
            $this.bannerFallback(block, true);
            scrollIndicator.on('click', function () {
                RAV.Global.goToPosition(undefined, 'history');
            });
        },

        scrollIndicatorStatus: function (status) {
            if (scrollIndicator != null && $(window).width() > mobileSize) {
                if (status === "show") {
                    scrollIndicator.stop().animate({ bottom: 0 }, 500);
                } else {
                    scrollIndicator.stop().animate({ bottom: -scrollIndicator.height() - 10 }, 300, function () {
                        this.remove();
                    });
                    scrollIndicator = null;
                }
            }
        },

        transitionBannerItems: function () {
            bannerTransitioned = true;
            sliderCombo++;

            if (sliderCombo > 4) $this.scrollIndicatorStatus("show");

            crackers.imagesLoaded()
                .done(function (instance) {
                    var crackers = $('#slider .crackers[data-combo="' + sliderCombo + '"]');

                    $.each(crackers, function () {
                        var cracker = $(this);
                        cracker.fadeIn(1000);
                    });
                    setTimeout($this.transitionBannerItems, 300);
                });
        },

        bannerFallback: function (block, firstRun) {
            var bannerPath = "/content/images/backgrounds/home_slider.jpg";
            if ($(window).innerWidth() <= mobileSize) {
                bannerPath = bannerPath.replace("home_slider", "home_slider_mobile");
            }

            if (!Modernizr.backgroundsize && firstRun) {
                block.find("#slider .innerWrapper")
                    .removeClass("bg")
                    .prepend("<img class=\"background\" src=\"" + bannerPath + "\" />");
            }

            var bannerEl = block.find("#slider .background");
            if (bannerEl.attr("src") != bannerPath) bannerEl.attr("src", bannerPath);
        },

        startAnimation: function (container) {
            var timerAnim;
            if (container.data('moving'))
                return;
            container.data({ 'moving': 1 });
            if (container.next().hasClass('tooltip'))
                container.next().fadeIn();
            var moveAnimation = function () {
                var current = container.find('img:visible');
                if (!current.next().length) {
                    clearInterval(timerAnim);
                } else {
                    current.hide();
                    current.next().show();
                }
            };
            timerAnim = setInterval(moveAnimation, 80);
        },

        resetAnimation: function (container) {
            container.find('img:visible').hide();
            container.find('img:first').show();
        },

        fallbackMobileAnimations: function () {
            var els = $('#history .floating, #recipe .floating');
            els.each(function () {
                var elThis = $(this),
                    path = elThis.find('img').attr('data-fallback');

                elThis.find('img').attr('src', path);

            });
        },

        parallaxHeight: function () {
            var el = $('#recipe .parallax');
            el.height(el.find("img").width() * 1.5);
        }
    }
}(jQuery));

$(function () {
    RAV.Home.run();
});