$(document).ready(function () { 
  //scrolling
  $('.js-scroll').click(function(e){
    e.preventDefault();
    let anchor = $(this).attr("href"),
        scroll_el = $(anchor);
    if ($(scroll_el).length != 0) { 
        $('html, body').animate({ scrollTop: ($(scroll_el).offset().top)}, 500); 
    }
  });
  
  //mob menu
  $('.js-mob-menu-open').on('click', function(){
    $('#js-header').add('#js-mob-menu-overlay').toggleClass('open');
  });
  
  //video
  $('#js-blind').on('click', function(){
     let iframe = $('#js-video-container iframe'),
         srcAttr = $(this).attr('data-href');
     
     $('#js-video-container').addClass('show');
     iframe.show();
     $(this).remove();
     
     iframe.attr("src", srcAttr + "?autohide=1&amp;autoplay=1");
  });
  
  
  //box
  if($(window).width() > 768){
    let box = $('#js-box img'),
        boxLength = box.length,
        flag = false;

    let showNextPic = () => {
        function next() {
          let showed = $('#js-box img.show');
          if(showed.next().length == 1){
            flag = true;
            showed.removeClass('show').next().addClass('show');
            timerId = setTimeout(next, 31);
          } else{
            flag = false;
          }
        }
        setTimeout( next, 31);
    };
    let showPrevPic = () => {
        function prev() {
          let showed = $('#js-box img.show');
          if(showed.prev().length == 1){
            flag = true;
            showed.removeClass('show').prev().addClass('show');
            timerId = setTimeout(prev, 31);
          } else{
            flag = false;
          }
        } 
        setTimeout( prev, 31);
    };

    $(window).on('load', function(){
      $('#js-preloader').fadeOut(300);
      $('body').addClass('ready');
      function removeBlock(){
        $('body').removeClass('block');
      }
      function scrollTop(){$(window).scrollTop(0);}
      setTimeout( scrollTop, 2);
      setTimeout( removeBlock, 2500);
      showNextPic();
    });
    $(window).on('scroll', function(){
      if(flag == false){
        if($(window).scrollTop() > 200){
          if(!($('body').hasClass('hide'))){
            $('body').removeClass('show').addClass('hide');
            box.eq(0).addClass('show').siblings().removeClass('show');
            showNextPic();
          }
        } else{
          if( ($('body').hasClass('hide')) && (!($('body').hasClass('show'))) ){
            $('body').removeClass('hide').addClass('show');
            showPrevPic();
          }
        }
      }
    });
  } else{
    $(window).on('load', function(){
      $('#js-preloader').fadeOut(300);
      $('body').removeClass('block');
    });
  }
});


    
	



