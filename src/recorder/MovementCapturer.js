
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Class('MovementCapturer', function(cls, im){
		
		var mouseX,
			mouseY,
			scrollTop,
			scrollLeft;
		
		cls.MovementCapturer = function(){
			cls.Super();
		}
		
		cls.initialize = function(){
			document.onmousemove = handleMoveEvent;
		}
		
		cls.capture = function(){
			if (mouseX !== undefined) {
				return {
					mouseX: mouseX,
					mouseY: mouseY,
					scrollLeft:scrollLeft,
					scrollTop:scrollTop
				}
			} else {
				return null;
			}
		}
			
		var handleMoveEvent = function(e) {
			if (!e)
				e = window.event;
			mouseX = e.clientX;
			mouseY = e.clientY;
			scrollLeft = window.scrollX;
			scrollTop = window.scrollY;
		}
		
});