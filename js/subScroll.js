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

        // build scenes
        new ScrollMagic.Scene({
                triggerElement: "#subBackgroundWrap"
            })
            .setTween("#subBackgroundWrap > div", {
                y: "70%",
                ease: Linear.easeNone
            })
            .addTo(controller);
    }
})
