if (!RAV) var RAV = {};
else if (RAV && typeof (RAV) != "object") throw new Error("RAV is not an Object type");

RAV.Init = (function ($) {
    
    var $this = {},
        $window;
    
    return {

        run: function () {
            $this = this;
            $window = $(window);

            if (!Modernizr.mq('only all')) {
                $.getScript("/content/Scripts/respond.min.js")
            }

            $this.loadInits();

            // Add a class for input placeholders
            $("html").addClass((Modernizr.input.placeholder ? "" : "no-") + "input-placeholder");

            // Fade the page in
            $('body').css({ opacity: 1 });

            //Add mobile overlay to DOM
            $("#wrapper").before("<div id='mobileBlocker'></div>");
        },

        loadInits: function () {
            for (var func in this) {
                if (typeof this[func] == 'function' && func.substr(0, 4) == 'init' && func != 'init') {
                    this[func]();
                }
            }
        },

        initGlobal: function () {
            $window.on("resize", RAV.Global.resize);
            RAV.Global.resize();

            var h = $(".cookie-banner").height();

            $(".cookie-banner").css({ height: 0, position: "static", visibility: "visible" }).delay(1000).animate({ height: h }, { duration: 800, complete: function () { $(this).height("auto"); } });

            $(".close-cookie").click(function () {
                document.cookie = 'RyvitaCookiesBanner=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                $(".cookie-banner").slideUp({ duration: 800,
                    complete: function () {
                        $(".cookie-banner").remove();
                    }
                });
            });
        },

        initHeader: function () {
            RAV.Global.mainNavigation($('#header'));
            $('body')
            .on("click", '#mainMenuControl', function (e) {
                e.preventDefault();
                // Show the mobile menu
                if ($("html").toggleClass("menu").hasClass("menu")) {
                    if (Modernizr.overflowscrolling) {
                        $("html,body").height($(window).height());
                    }
                }
                else {
                    // Hide the mobile menu
                    $("html").removeClass("menu");
                    $("html,body").height("auto");
                }
            })
            .on("click", '#mobileBlocker', function (e) {
                e.preventDefault();
                // Hide the mobile menu
                $("html").removeClass("menu");
                $("html,body").height("auto");
            });
            $('#countrySelect .canada').on('click', function () {
                $(this).addClass('visible');
            });
            $('#countrySelect .canada span').on('click', function () {
                $(this).parent().removeClass('visible');
            });
            
        },

        initGoTo: function () {
            RAV.Global.goTo();
        },

        initHome: function () {
            var el = $('.home');
            if (el.length)
                RAV.Home.mainHome(el);
        },

        initRecipe: function () {
            var el = $('body.recipe');
            if (el.length)
                RAV.Recipe.run(el);
        },

        initContact: function () {
            var el = $('body.contact');
            if (el.length)
                RAV.Contact.main(el);
        }
    }
}(jQuery));

$(function () {
    RAV.Init.run();
});

RAV.log = function (o) {
    if (window.console && o) window.console.log(o);
};