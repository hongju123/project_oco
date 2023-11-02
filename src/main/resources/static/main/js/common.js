$(function(){

  if($(window).width() > 960) {
    $('#header .header-right .lang-list').css('display','block');
  } else {
    $('#header .header-right .lang-list').css('display','flex');
  }
  $('#footer .footer-inner .info-area .info-list02 > li .family-wrap').css('display','block');

  $(window).on('resize', function() {
    if($(window).width() > 960) {
      $('#header .header-right .lang-list').css('display','block');
    } else {
      $('#header .header-right .lang-list').css('display','flex');
    }
    $('#footer .footer-inner .info-area .info-list02 > li .family-wrap').css('display','block');
  });

  header_motion();
  footer_motion();

  // �꾨쾭嫄� �ъ씠�몃㏊
  $('#header .ham-btn').on('click', function() {
    $('#header').toggleClass('slide-open');
    if($(window).width() > 960) {
      $('#header .slidemenu').stop().slideToggle();
    } else {
      $('#header .slidemenu').fadeToggle(500);
    }
  });

  // �щ씪�대뱶硫붾돱 留욎떠�� depth1 �쒖꽦��
  $('.slidemenu .slidemenu-wrap').hover(function() {
    var currslidemenu = $(this).index();
    $('#header .depth1 li').eq(currslidemenu).addClass('active');
  }, function() {
    $('#header .depth1 li').removeClass('active');
  });

  // 紐⑤컮�� �щ씪�대뱶 硫붾돱 �좉� �щ씪�대뱶
  $('#header .slidemenu-area .slidemenu-wrap button').on('click',function() {
    $(this).toggleClass('open');
    $(this).parents('.slidemenu-wrap').siblings('.slidemenu-wrap').find('.slidemenu-list').slideUp();
    $(this).parents('.slidemenu-wrap').siblings('.slidemenu-wrap').find('button').removeClass('open');
    $(this).siblings('.slidemenu-list').stop().slideToggle();
  })

  // �ㅻ뜑 �몄뼱 蹂�寃� 踰꾪듉
  $('#header .lang-btn').on('click', function() {
    $(this).toggleClass('lang-open');
    if($(window).width() < 960) {
    }
  });

  // �명꽣 �⑤�由ъ궗�댄듃 踰꾪듉
  $('#footer .info-list02 li button').on('click', function() {
    $(this).parent('li').toggleClass('open');
  });

  // �명꽣 �묐쾭��
  $('.top-btn').on('click', function(){
      $('html, body').animate({scrollTop : 0});
  });

  // depth2 紐⑤컮�� �좉� �ㅽ겕由쏀듃
  $('.depth2-wrap .tab-depth2').on('click',function() {
    $(this).toggleClass('active');
    $(this).siblings('.depth2').stop().slideToggle(400);
  });

  //�좉� 而⑦뀗痢� �ㅽ겕由쏀듃
  $('.toggle-btn').on('click',function() {
    $(this).toggleClass('open');
    $(this).parent('.toggle-wrap').toggleClass('open');
    $(this).siblings('.toggle-content').stop().slideToggle(400);
  });

  // 移댄뀒怨좊━ �좏깮 �쒖꽦��
  $('.category-list li').on('click',function() {
    var currcategory = $(this).html();
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
    $(this).parent('ul').siblings('button').find('span').text(currcategory);
    $(this).parent('ul').slideUp(400);
    $(this).parent('ul').siblings('button').removeClass('open');
  });

});

function header_motion() {

  var headerMoving = function(direction) {
    if (direction === "up") {
      $('header').removeClass('down');
    } else if (direction === "down") {
      $('header').addClass('down');
    }
  };
  var prevScrollTop = 0;

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 0) {
      $('#header').addClass('scroll');
      var nextScrollTop = window.pageYOffset || 0;
      if (nextScrollTop > prevScrollTop) {
        headerMoving("down");
      } else if (nextScrollTop < prevScrollTop) {
        headerMoving("up");
      }
      prevScrollTop = nextScrollTop;
    } else {
      $('#header').removeClass('scroll');
    }

    if($('.depth2-wrap').length > 0 ){
      if($('.depth2-wrap').offset().top > $(window).scrollTop()) {
        $('.depth2-wrap').removeClass('down');
      } else {
        $('.depth2-wrap').addClass('down');
      }
    }
  });
}

function footer_motion() {
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 500) {
      $('.top-btn-wrap').fadeIn();
    } else {
      $('.top-btn-wrap').fadeOut();
    }

    if($('.dark-pos').length > 0 ){
      var top_pos = $('.top-btn-wrap').offset().top;
      var section_pos = $('.dark-pos').offset().top;
      var next_pos = $('.dark-pos').next().offset().top;

      if(top_pos >= section_pos) {
        $('.tob-btn-wrap').addClass('white')
      }
    }

  });
}

// 諛섏쓳�� �대�吏�
function respon_img() {
    var width = window.innerWidth || document.documentElement.clientWidth;
    $(".respon-img img").each(function() {
      var oldsrc = $(this).attr('src');
      if (width > 768) {
        var newsrc = oldsrc.replace('_mo', '_pc');
      } else {
        var newsrc = oldsrc.replace('_pc', '_mo');
      }
      $(this).attr('src', newsrc);
    });

    $(".respon-img.respon960 img").each(function() {
      var oldsrc = $(this).attr('src');
      if (width > 960) {
        var newsrc = oldsrc.replace('_mo', '_pc');
      } else {
        var newsrc = oldsrc.replace('_pc', '_mo');
      }
      $(this).attr('src', newsrc);
    });
}

function dark_section() {

  var $target = $('.dark-section');
  var sections = document.querySelectorAll('.dark-section');
  var textAction = {
    enter: function() {
      Array.prototype.forEach.call(sections, function(i) {
        gsap.to(i, {
          scrollTrigger: {
            trigger: i,
            start: 'top 90%',
            end: 'bottom 90%',
            // scrub: 1,
            toggleClass: { targets: '.top-btn-wrap', className: 'white' },
            // markers: true,
          }
        });
      });
    },
  }
  // if ($target.length) textAction.set();
  textAction.enter();

}

function list_slice() {
  var num = $('.board-list').data('list');

  if($('.board-wrap .board-list li').length > num) {
    $('.board-wrap .board-list li').hide();
    $('.board-wrap .board-list li').slice(0,num).css('display','block');
  } else {
    $('.btn.more').hide();
  }

  $('.btn.more').on('click',function() {
    $('.board-wrap .board-list li').slice(0,num).fadeIn();
    if($('.board-wrap .board-list li:hidden').length == 0) {
      $('.btn.more').hide();
    }
  });
}

$.each(mouseEffect);
function mouseEffect(obj, e) {
    if ($(window).width() >= 1200) {
        let mouseCursor = $(obj).find('.cursor-prev');
        let mouseCursor2 = $(obj).find('.cursor-next');

        var x = e.offsetX;
        var y = e.offsetY;
        mouseCursor.css('left', x);
        mouseCursor.css('top', y);
        mouseCursor2.css('left', x);
        mouseCursor2.css('top', y);
    }
}