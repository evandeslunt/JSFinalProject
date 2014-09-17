/*****************************************************************************************
							        MAIN PAGE SLIDESHOW
*****************************************************************************************/
$(document).ready(function(e){
	'use strict';
	initializeSlideshow();
	
});

/** 
 * Initializes the slideshow. After seeing other students' code during class, I found the
 * plugin they were using -- much simpler to set up than the one I had found!
 **/
function initializeSlideshow(){
      $('#slides').slidesjs({
        width: 940,
        height: 528
      });
}