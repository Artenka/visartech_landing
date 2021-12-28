$(function(){
  // page scrolling
  if ($(window).width() > 720) {
    $('#home').fullpage({
      anchors: ['intro', 'company', 'branches', 'services', 'about', 'about', 'about', 'technologies', 'contacts'],
      scrollOverflow: true,
      navigation: true,
      onLeave: function (origin, destination, direction) {
        $('.section--faded').removeClass('section--faded');
        $('.section.active').addClass('section--faded');

        if(destination == 1) {
          updateFixedBg('.fixed-bg__item--1');
          sectionInit('.home-intro');
        } else if(destination == 2) {
          updateFixedBg('.fixed-bg__item--2');
          sectionInit('.home-company');
        } else if(destination == 3) {
          updateFixedBg('.fixed-bg__item--3');
          sectionInit('.home-branches');
        } else if(destination == 4) {
          updateFixedBg('.fixed-bg__item--4');
          sectionInit('.home-services');
        } else if(destination == 5) {
          updateFixedBg('.fixed-bg__item--5');
          sectionInit('.home-about');
        } else if(destination == 6) {
          updateFixedBg('.fixed-bg__item--5');
          sectionInit('.home-numbers');
          aboutCirclesProgress('.home-numbers-item:nth-child(1) .home-numbers-item__circle', 0.75, 500);
          aboutCirclesProgress('.home-numbers-item:nth-child(2) .home-numbers-item__circle', 0.90, 700);
          aboutCirclesProgress('.home-numbers-item:nth-child(3) .home-numbers-item__circle', 0.15, 900);
          aboutCirclesProgress('.home-numbers-item:nth-child(4) .home-numbers-item__circle', 0.10, 1100);
        } else if(destination == 7) {
          updateFixedBg('.fixed-bg__item--5');
          sectionInit('.home-refund');
        } else if(destination == 8) {
          updateFixedBg('.fixed-bg__item--6');
          sectionInit('.home-technologies');
        } else if(destination == 9) {
          updateFixedBg('.fixed-bg__item--7');
          sectionInit('.home-contacts');
        }
      },
      afterLoad: function (origin, destination, direction) {
        updateNavNumber();
      },
      afterRender: function(){

        initPage();
      },
      afterResize: function () {
        $.fn.fullpage.reBuild();
      }
    });

    customNavInit();
  }
});

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function customNavInit() {
  var prevNav = '';
  var currentNav = '';
  $('#fp-nav ul li a').each(function(){
    currentNav = $(this).attr('href');
    if(currentNav == prevNav) {
      $(this).closest('li').hide();
    }
    prevNav = currentNav;
  }).promise().done(function(){
    $('#fp-nav').prepend('<p class="sections-pagination__number sections-pagination__number--current">01</p>');
    $('#fp-nav').append('<p class="sections-pagination__number sections-pagination__number--total">'+ pad($('#fp-nav ul li').length - 2, 2) +'</p>');
  });
}

function updateNavNumber() {
  var $navList = $('#fp-nav ul');
  var activeNumber = '';
  for (var i = 0; i < $navList.find('li').length; i++) {
    if ($navList.find('li:eq('+ i +') a').hasClass('active')) {
      activeNumber = i;
      if(activeNumber > 4) {
        $('#fp-nav').find('.sections-pagination__number--current').text(pad(activeNumber-1, 2));
      } else {
        $('#fp-nav').find('.sections-pagination__number--current').text(pad(activeNumber+1, 2));
      }
    }
  }

  if(activeNumber > 0) {
    if(activeNumber > 4) {
      var $activeHeaderNav = $('.main-header-list__item:eq('+ parseInt(activeNumber-3) +')');
    } else {
      var $activeHeaderNav = $('.main-header-list__item:eq('+ parseInt(activeNumber-1) +')');
    }
    $('.main-header-list-line').width($activeHeaderNav.width()).css({left: $activeHeaderNav.offset().left - $('.main-header-list').offset().left});
  } else {
    $('.main-header-list-line').width(0).css({left: 0});
  }
}

function updateFixedBg(activeClass) {
  $('.fixed-bg__item--active').removeClass('fixed-bg__item--active');
  $(activeClass).addClass('fixed-bg__item--active');
}

function initFixedBg(activeNumber) {
  if(activeNumber == '0') {
    $('.fixed-bg__item--1').addClass('fixed-bg__item--active');
  } else if(activeNumber == '1') {
    $('.fixed-bg__item--2').addClass('fixed-bg__item--active');
  } else if(activeNumber == '2') {
    $('.fixed-bg__item--3').addClass('fixed-bg__item--active');
  } else if(activeNumber == '3') {
    $('.fixed-bg__item--4').addClass('fixed-bg__item--active');
  } else if(activeNumber == '4' || activeNumber == '5' || activeNumber == '6') {
    $('.fixed-bg__item--5').addClass('fixed-bg__item--active');
  } else if(activeNumber == '7') {
    $('.fixed-bg__item--6').addClass('fixed-bg__item--active');
  } else if(activeNumber == '8') {
    $('.fixed-bg__item--7').addClass('fixed-bg__item--active');
  }
}

function initPage() {
  var activeNumber = $('.section.active').index()+1;
  setTimeout(function(){
    $('.preloader').fadeOut(600);
  }, 100);
  setTimeout(function(){
    $('.main').addClass('active');
  }, 300);
  setTimeout(function(){
    if(activeNumber == 1){
      $('.home-intro').removeClass('faded');
    }
    $('.main-header').addClass('active');
    $('#fp-nav.right').addClass('active');
  }, 1300);
}

function sectionInit(className) {
  $(className).removeClass('faded');
  setTimeout(function(){
    $(className).addClass('active');
  }, 1000);
}

function sectionFade(className) {
  $(className).removeClass('active');
  $(className).addClass('faded');
}

function aboutCirclesProgress(element, value, delay) {
  setTimeout(function(){
    $(element).circleProgress({
      startAngle: -Math.PI/2,
      value: value,
      thickness: 4,
      size: 160,
      fill: "#ffaf00",
      emptyFill: 'rgba(255, 255, 255, 0.3)'
    });
  }, delay);
}
