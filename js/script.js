;(function($){
  'use strict';
  // Sticky
  var $is_sticky = $('.is-sticky');
  if ($is_sticky.length > 0 ) {
    var $win = $(window), $navm = $('#mainnav').offset();

    $win.scroll(function(){
      var $scroll = $win.scrollTop();
      if ($win.width() > 991) {
        if($scroll > $navm.top+4 ){
          if(!$is_sticky.hasClass('has-fixed')) $is_sticky.addClass('has-fixed');
        } else {
          if($is_sticky.hasClass('has-fixed')) $is_sticky.removeClass('has-fixed');
        }
      } else {
        if($is_sticky.hasClass('has-fixed')) $is_sticky.removeClass('has-fixed');
      }
    });
  }
  // Slider
  var $slider = $('#slider');
  if ($slider.length > 0 ) {
    $slider.carousel({ interval:6000, pause: 'null' });
  }
  //Carousel
  var $has_carousel = $('.has-carousel');
  if ($has_carousel.length > 0 ) {
    $has_carousel.each(function(){
      var $self = $(this);
      var c_item = ($self.data('items')) ? $self.data('items') : 4;
      var c_item_t = (c_item >= 3) ? 3 : c_item;
      var c_item_m = (c_item_t >= 2) ? 2 : c_item_t;
      var c_delay =($self.data('delay')) ? $self.data('delay') : 6000;
      var c_auto =($self.data('auto')) ? true : false;
      var c_loop =($self.data('loop')) ? true : false;
      var c_dots = ($self.data('dots')) ? true : false;
      var c_navs = ($self.data('navs')) ? true : false;
      $self.owlCarousel({
        navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: 30, 
        autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 700, 
        responsive:{ 0:{ items:1 }, 480:{ items: c_item_m }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
      });
    });
  }
  // LogoCarousel
  var $logo_carousel = $('.logo-carousel');
  if ($logo_carousel.length > 0 ) {
      $logo_carousel.owlCarousel({
        items: 5, loop: true, margin: 30, responsive:{0:{ items:2 }, 379:{ items:3 }, 720:{ items:4 }, 1280:{ items:6 } }
    });
  }
  // Parallax
  var $parallax = $('.has-parallax');
  if ($parallax.length > 0 ) {
    $parallax.each(function() {
      $(this).parallaxie({ speed: 0.3, offset: 0 });
    });
  }
  // Active page menu when click
  var url = window.location.href;
  var $nav_link = $(".nav li a");
  $nav_link.each(function() {
      if (url === (this.href)) {
          $(this).closest("li").addClass("active");
      }
  });
  // Preloader
  var $preload = $('#preloader');
  if ($preload.length > 0) {
    $(window).on('load', function() {
      $preload.children().fadeOut(300);
      $preload.delay(150).fadeOut(500);
      $('body').delay(100).css({'overflow':'visible'});
    });
  }
  // ScrollDown to
  var $scrollBtn = $('.scroll-to');
  if($scrollBtn.length > 0){
    $scrollBtn.on('click', function(){
      $('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top }, 500);
      return false;
    });
  }
  // Google map initialize
  var $mapholder = $('.map-holder');
  if ($mapholder.length > 0) {
    var map = new GMaps({
      div: '#gmap',
      lat: -12.043333,
      lng: -77.028333
    });
    $mapholder.on('click', function () {
      $(this).children().css("pointer-events", "auto");
    });
    $mapholder.on('mouseleave', function() {
      $(this).children().css("pointer-events", "none");
    });
  }
  // ImageBG 
  var $imageBG = $('.imagebg');
  if ($imageBG.length > 0) {
    $imageBG.each(function() {
      var $this = $(this), $this_img = $this.find('img'), img_src = $this_img.attr('src');
      if(img_src!=='' && typeof img_src !=='undefined') {
        $this.addClass('bgloaded').css('background-image', 'url('+ img_src +')');
      }
    });
  }
  // Gallery Filtering
  var $filtered  = $('.gallery-filter ul'),
      $filterLi = $('.filter-menu li');
  if ($filterLi.length > 0) {
    // Active -item
    $filterLi.on('click', function () {
      $filterLi.removeClass('active');
      $(this).addClass('active');
    });
    // Filter -init()
    $(window).on('load', function() {
      $filtered.filterizr({
         delay: 25
      });
    });
  }
  // Gallery Popup
  var $gallery = $('.gallery-lightbox');
  if ($gallery.length > 0) {
      $gallery.magnificPopup({
        delegate: 'a',
        type:'image',
        gallery: { enabled: true },
        image: { titleSrc: function (item) {
            var caption = '', title = item.el.find('img').attr('title'), subtitle = item.el.find('img').attr('alt');
            if (typeof title!=='undefined' && title !=='') { 
              caption = caption + title; 
            }
            if (typeof subtitle!=='undefined' && subtitle !=='') { 
              if (typeof title==='undefined' || title ==='') {
                caption = caption + subtitle; 
              } else {
                caption = caption + '<small>' + subtitle + '</small>'; 
              }
            }
            if (caption==="") { 
              caption = item.el.attr('title'); 
            }
            return caption;
          } 
        },
        zoom: { enabled: true }
      });
  }
    
  // Image Single Popup
  var $image = $('.single-lightbox');
  if ($image.length > 0) {
    $image.magnificPopup({
        gallery: { enabled: true },
        type:'image'
      });
  }
  // FORMS
  var contactForm = $('#contact-us'),
      quoteForm = $('#quote-request');
  if (quoteForm.length > 0 || contactForm.length > 0) {
      if( !$().validate || !$().ajaxSubmit ) {
          console.log('quoteForm: jQuery Form or Form Validate not Defined.');
          return true;
      }
      // Quote Form - home page
      if (quoteForm.length > 0) {
          var selectRec = quoteForm.find('select.required'), 
          qf_results = quoteForm.find('.form-results');
          quoteForm.validate({
            ignore: [],
            errorPlacement: function(error, elm) {
              if (elm.is('select.required')) { error.insertAfter(elm.next('.nice-select')); } else { error.insertAfter(elm); }
            },
            invalidHandler: function () { qf_results.slideUp(400); },
            submitHandler: function(form) {
              qf_results.slideUp(400);
              $(form).ajaxSubmit({
                target: qf_results, dataType: 'json',
                success: function(data) {
                  var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                  qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                  if (data.result !== 'error') { $(form).clearForm(); }
                }
              });
            }
          });
          selectRec.on('change', function() { $(this).valid(); });
      }
      // Contact Form - contact page
      if (contactForm.length > 0) {
        var cf_results = contactForm.find('.form-results');
        contactForm.validate({
          invalidHandler: function () { cf_results.slideUp(400); },
          submitHandler: function(form) {
            cf_results.slideUp(400);
            $(form).ajaxSubmit({
              target: cf_results, dataType: 'json',
              success: function(data) {
                var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                cf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                if (data.result !== 'error') { $(form).clearForm(); }
              }
            });
          }
        });
      }
  }
})(jQuery);