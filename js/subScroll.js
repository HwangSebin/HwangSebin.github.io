$(document).ready(function() {
    scroll();

    function scroll() {
        // init controller
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter",
                duration: "200%"
            }
        });
        var controller2 = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onEnter",
                duration: "130%"
            }
        });

        // build scenes
        new ScrollMagic.Scene({
                triggerElement: "#subBackgroundWrap"
            })
            .setTween("#subBackgroundWrap > div", {
                y: "70%",
                ease: Linear.easeNone
            })
            .addIndicators()
            .addTo(controller);

        new ScrollMagic.Scene({
                triggerElement: ".subBodyTxtWrap"
            })
            .setTween(".subBodyTxtWrap > div", {
                y: "10%",
                ease: Linear.easeNone
            })
            .addIndicators()
            .addTo(controller2);
    }
})
