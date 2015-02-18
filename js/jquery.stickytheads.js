/*TODO: 
	1. change thead width, while browser resising
	2. make a $ plugin
*/

function stickyTheads(stickies) {
	
	var _obj = this;

    _obj.initialize = function() {

		stickies.each(function(){
		
			var thisThead = $(this);
			thisThead.css('width', thisThead.closest('table').width() + 'px');

			$.data(thisThead[0], 'pos', thisThead.offset().top);
		
		});
		
		$(window).off("scroll.stickies").on("scroll.stickies", function() {
	
			_obj.scroll();
		
		});			  
	}
			
	_obj.scroll = function() {
		
		stickies.each(function(i){				
			
			var thisThead = $(this),
				nextSticky = stickies.eq(i+1),
				prevSticky = stickies.eq(i-1),
				pos = $.data(thisThead[0], 'pos');
		
			if (pos <= $(window).scrollTop()) {
			
				thisThead.addClass("thead_fixed");
				
				if (nextSticky.length > 0 && thisThead.offset().top >= $.data(nextSticky[0], 'pos') - thisThead.outerHeight()) {
				
					thisThead.addClass("absolute").css("top", $.data(nextSticky[0], 'pos') - thisThead.outerHeight());				
				}
			
			} else {
			
				thisThead.removeClass("thead_fixed");
				
				if (prevSticky.length > 0 && $(window).scrollTop() <= $.data(thisThead[0], 'pos')  - prevSticky.outerHeight()) {
				
					prevSticky.removeClass("absolute").css("top",0 + "px");				
				}				
			}
		});			
	}
}