//네비게이션 자바스크립트

$(document).ready(function () {
	// 스크롤시 nav 숨기기
    var didScroll;
    var lastScrollTop = 0;
    var delta = 3; //동작의 구현이 시작되는 위치
    var navbarHeight = $(".navBar,.navBarMini,.navMiniListTap").outerHeight(); //영향받을 요소 선택


    //스크롤시에 사용자가 스크롤했다는것을 알림
    $(window).scroll(function(event) {
        didScroll = true;
    });

    //hasScrolled()을 실행하고 didScroll상태를 재설정
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        //설정한 delta값보다 더 스크롤되었는지 확인
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        //헤더의 높이보다 더 스크롤되었는지 확인, 스크롤 방향이 위인지 아래인지 확인 
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $(".navBar,.navBarMini").removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $(".navBar,.navBarMini").removeClass('nav-up').addClass('nav-down');
            }
        }
        //현재 스크롤 위치를 지정
        lastScrollTop = st;
    };

    //햄버거 마우스 오버시 리스트 보이기
    $(".hambox").click(function() {
        var that = $(this);
        if (that.hasClass("is-open")) {
            that.removeClass("is-open").addClass("is-closed");
            $(".navMiniListTap").slideUp(200);
            $("body").animate({
                paddingTop: "90px"
            }, 300);
        } else {
            that.removeClass("is-closed").addClass("is-open");
            $(".navMiniListTap").slideDown(200);
            $("body").animate({
                paddingTop: "315px"
            }, 300);
        }
    });
})