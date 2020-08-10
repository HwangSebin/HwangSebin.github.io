function getCookie(name) {
  const cookie = document.cookie;
  if (document.cookie !== "") {
    const cookie_array = cookie.split("; ");
    for ( let index in cookie_array) {
      const cookie_name = cookie_array[index].split("=");
      if (cookie_name[0] === name) {
        return cookie_name[1];
      }
    }
  }
}

function setCookie(name, value, expiredays) {
  const date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString();
}

function isTouchDevice() {
  return 'ontouchstart' in window;
}

/**
 * 가로 마우스 스크롤
 */
function initScrollbooster() {
  if (isTouchDevice()) {
    return;
  }
  const viewports = $('.horizontal-scroll-viewport');
  if (viewports.length) {
    viewports.each(function() {
      new ScrollBooster({
        viewport: $(this)[0],
        content: $(this).find('.scrollable-content')[0],
        bounce: false,
        // scrollMode: 'transform',
        scrollMode: 'native',
        direction: 'horizontal',
        // lockScrollOnDragDirection: 'horizontal',
        pointerMode: 'mouse',
        emulateScroll: false,
      });
    });
  }
}

/**
 * IE11 sticky nav
 */
function stickyNav() {
  if (/rv:11/.test(navigator.userAgent)) {
    $('html').addClass('ie11');
    $("#sectionNav").sticky({topSpacing:0, zIndex: 10});
  }
}

$(function() {

  if (isTouchDevice()) {
    $('html').addClass('touch');
  } else {
    $('html').addClass('not-touch');
  }

  initScrollbooster();
  $('#chargebackModal').on('shown.bs.modal', function () {
    initScrollbooster();
  })

  stickyNav();

  /**
   * 상단 공지사항
   */
  const $headerNotice = $('#headerNotice');
  if ($headerNotice.length) {
    const cookieCheck = getCookie('headerNoticeYN');
    if (cookieCheck === "N") {
      $headerNotice.remove();
    } else {
      $headerNotice.show();

      $headerNotice.find('button.close').on('click', function() {
        const isChecked = $('#hideOneDay').is(':checked');
        if (isChecked) {
          setCookie("headerNoticeYN", "N", 1);
        }
        $headerNotice.remove();
      });
    }
  }

  /**
   * 공지 모달 열기
   */
  $('#imageNoticeModal').modal('show');

  /**
   * Popover 사용하기
   */
  $('[data-toggle="popover"]').popover({
    html: true,
  });

  const $html = $('html');
  const $header = $('#siteHeader');
  const $siteMobileNavBtn = $('#siteMobileNavBtn');

  /**
   * 이벤트: 모바일 네비게이션 레이어를 열고 닫는다.
   */
  $siteMobileNavBtn.click(function() {
    const isOpen =  $header.hasClass('open');
    if (isOpen) {
      $html.removeClass('nav-open');
      $header.removeClass('open');
      $header.find('.has-sub-nav.active').removeClass('active');
    } else {
      $html.addClass('nav-open');
      $header.addClass('open');
    }
  });

  /**
   * 이벤트: 모바일 서브 메뉴를 열고 닫는다.
   */
  $('.has-sub-nav', $header).click(function() {
    $(this).closest('.nav-item').siblings().find('.has-sub-nav.active').removeClass('active');
    $(this).toggleClass('active');
    return false;
  });

  /**
   * 이벤트: 데스크탑 서브 메뉴를 열고 닫는다.
   */
  $header.mouseenter(function() {
    if ($siteMobileNavBtn.is(':hidden')) {
      $(this).addClass('open');
    }
  });
  $header.mouseleave(function() {
    if ($siteMobileNavBtn.is(':hidden')) {
      $(this).removeClass('open');
      $html.removeClass('nav-open');
    }
  });

  /**
   * swiper (only mobile)
   */
  const breakpoint = window.matchMedia( '(min-width:1200px)' );

  const breakpointChecker = function() {
    // if larger viewport
    if ( breakpoint.matches === true ) {
      if ( document.querySelectorAll('.swiper-only-mobile').length ) {
        [].forEach.call(document.querySelectorAll('.swiper-only-mobile'), function(s) {
          if (s.swiper) {
            s.swiper.destroy( true, true );
          }
        });
      }
    // else if a small viewport
    } else if ( breakpoint.matches === false ) {
      enableSwiper();
    }
  };

  const enableSwiper = function() {
    if (document.getElementById('mainPaymentLogoSwiper')) {
      new Swiper ('#mainPaymentLogoSwiper', {
        loop: false,
        centerInsufficientSlides: true,
        spaceBetween: 35,
        freeMode: true,
        freeModeMomentumRatio: 0.4,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    if (document.getElementById('logoSwiper')) {
      new Swiper ('#logoSwiper', {
        loop: false,
        centerInsufficientSlides: true,
        spaceBetween: 40,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        freeMode: true,
        freeModeMomentumRatio: 0.4,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerGroup: 2,
        breakpoints: {
          // when window width is >= 320px
          700: {
            slidesPerGroup: 1,
          },
        }
      });
    }

    if (document.getElementById('mainServiceSwiper')) {
      new Swiper ('#mainServiceSwiper', {
        loop: false,
        centerInsufficientSlides: true,
        centeredSlides: true,
        spaceBetween: 15,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    if (document.getElementById('featureSwiper')) {
      new Swiper ('#featureSwiper', {
        loop: false,
        centerInsufficientSlides: true,
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    if (document.querySelectorAll('.methodCardSwiper').length) {
      new Swiper ('.methodCardSwiper', {
        loop: false,
        centerInsufficientSlides: true,
        spaceBetween: 30,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

  };

  if (breakpoint && breakpoint.addEventListener) {
    breakpoint.addEventListener('change', breakpointChecker);
    breakpointChecker();
  } else if (breakpoint && breakpoint.addListener) {
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  } else {
    console.error('error: no breakpointChecker');
  }

  const breakpointTablet = window.matchMedia( '(min-width:768px)' );
  const breakpointTabletChecker = function() {
    // if larger viewport
    if ( breakpointTablet.matches === true ) {
      if ( document.querySelectorAll('.swiper-only-mobile-sm').length ) {
        [].forEach.call(document.querySelectorAll('.swiper-only-mobile-sm'), function(s) {
          if (s.swiper) {
            s.swiper.destroy( true, true );
          }
        });
      }
      // else if a small viewport
    } else if ( breakpointTablet.matches === false ) {
      enableSwiperSmall();
    }
  };
  const enableSwiperSmall = function() {
    if (document.getElementById('offlineHardwareSwiper')) {
      new Swiper ('#offlineHardwareSwiper', {
        loop: false,
        centerInsufficientSlides: true,
        centeredSlides: true,
        spaceBetween: 10,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  };
  if (breakpointTablet && breakpointTablet.addEventListener) {
    breakpointTablet.addEventListener('change', breakpointTabletChecker);
    breakpointTabletChecker();
  } else if (breakpointTablet && breakpointTablet.addListener) {
    breakpoint.addListener(breakpointTabletChecker);
    breakpointTabletChecker();
  } else {
    console.error('error: no breakpointChecker');
  }

  /**
   * collapse 열때 다른 것 모두 닫기
   */
  $('.collapse').on('show.bs.collapse', function () {
    $('.collapse.show').collapse('hide');
  });

  /**
   * Section Nav 스크롤에 따라 활성화 표시하기
   */
  const $sectionNavLinks = $('#sectionNav .nav a');
  if ($sectionNavLinks.length) {
    function activeNav() {
      const fromTop = $(window).scrollTop() + 50;

      $sectionNavLinks.each(function(index) {
        const $link = $(this);
        const section = document.querySelector(this.hash);

        if (
          (index === 0 || section.offsetTop <= fromTop)
          && (index === $sectionNavLinks.length - 1 || section.offsetTop + section.offsetHeight > fromTop)
        ) {
          $link.addClass("active");
          $sectionNavLinks.not($link).removeClass("active");
          return false;
        }
      });
    }
    $(window).on("scroll", activeNav);
    activeNav();

    $sectionNavLinks.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top
      }, 400);
    });
  }


});
