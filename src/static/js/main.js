$(document).ready(function () { 
  //scrolling
  $('.js-scroll').click(function(e){
    e.preventDefault();
    let anchor = $(this).attr("href"),
        scroll_el = $(anchor);
    if ($(scroll_el).length != 0) { 
        $('html, body').animate({ scrollTop: ($(scroll_el).offset().top)}, 250); 
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
});


    
	



