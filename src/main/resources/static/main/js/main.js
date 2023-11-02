$(function(){
  dark_section();

  var slider05 = $('.main05-list');
  var slickOptions = {
    dots: true,
    arrows: false,
    infinite: false,
  };

  $(window).on('load resize', function() {
    if($(window).width() > 768) {
        slider05.filter('.slick-initialized').slick('unslick');
    }else{
        slider05.not('.slick-initialized').slick(slickOptions);
    }
  });

  $(window).scroll(function() {
    if($(this).scrollTop() > 0) {
        $('#header').removeClass('white');
    } else {
        $('#header').addClass('white');
    }
  });

  $('.main01 .main01-inner .ico-main-scroll').on('click',function() {
    $('html, body').animate({
        scrollTop: $('.main02').offset().top - 50
    }, 200);
  })

  $('.main01-slide-wrap').slick({
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
    dots: true,
    arrows: true,
    prevArrow: $('.main01 .prev'),
    nextArrow: $('.main01 .next'),
    fade: true,
    speed: 900,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
  });

  // �щ씪�대뱶 �ъ깮踰꾪듉
  $('.main01-slide-control button.play').on('click', function() {
    $('.main01-slide-wrap').slick('slickPlay');
    $('.main01-slide-control button.play').hide();
    $('.main01-slide-control button.pause').show();
  });
  // �щ씪�대뱶 �뺤�踰꾪듉
  $('.main01-slide-control button.pause').on('click', function() {
    $('.main01-slide-wrap').slick('slickPause');
    $('.main01-slide-control button.pause').hide();
    $('.main01-slide-control button.play').show();
  });

  $('.main02-slide-wrap').slick({
    swipeToSlide: true,
    draggable: true,
    dots: true,
    arrows: true,
    infinite: true,
    touchThreshold: 100,
    prevArrow: $('.main02 .prev'),
    nextArrow: $('.main02 .next'),
  });

  $('.main04-slide-wrap').slick({
    swipeToSlide: true,
    draggable: true,
    dots: false,
    arrows: true,
    infinite: false,
    touchThreshold: 100,
    centerMode: false,
    variableWidth: true,
    prevArrow: $('.main04 .prev'),
    nextArrow: $('.main04 .next'),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          variableWidth: false,
        }
      }
    ]
  });

  $('.main06-slide-wrap').slick({
    swipeToSlide: true,
    draggable: true,
    dots: false,
    arrows: true,
    infinite: false,
    touchThreshold: 100,
    centerMode: false,
    variableWidth: true,
    prevArrow: $('.main06 .prev'),
    nextArrow: $('.main06 .next'),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          variableWidth: false,
        }
      }
    ]
  });

  introMotion();

});

function introMotion() {
  if ($(window).scrollTop() <= 0) {
    $('.main01-slide-wrap').slick('slickPause');
    if (window.innerWidth > 960) {
      setTimeout(function() {
        $('#main').removeClass('intro notouch');
        $('.main01-slide-wrap').slick('slickPlay');
      }, 4200);
    } else {
      setTimeout(function() {
        $('#main').removeClass('intro notouch');
        $('.main01-slide-wrap').slick('slickPlay');
      }, 2600);
    }
  } else {
    $('#main').removeClass('intro notouch');
    $('.main01-slide-wrap').slick('slickPlay');
  }
}