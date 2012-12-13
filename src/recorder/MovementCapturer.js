
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Class('MovementCapturer', function(cls, im){
		
		var lastRetObj,
			mouseX,
			mouseY,
			clickX,
			clickY,
			scrollTop,
			scrollLeft,
			windowHeight,
			windowWidth,
			keys,
			resizeElem,
			resizeUseInner,
			waitTime;
		
		cls.MovementCapturer = function(){
			cls.Super();
		}
		
		cls.initialize = function(){
			window.onmousemove = handleMouseMoveEvent;
			window.onscroll = handleScrollEvent;
			window.onresize = handleResizeEvent;
			window.onclick = handleClickEvent;
			window.onkeypress = handleKeyEvent;
			if (document.documentElement && document.documentElement.clientHeight) resizeElem = document.documentElement;
			else if (document.body && document.body.clientHeight) resizeElem = document.body;
			resizeUseInner = typeof(window.innerHeight) == 'number';
		}
		
		cls.capture = function(){		
			var retObj = {},
				shouldReturn = false;
			if(clickX || clickY){
				retObj.c = { x:clickX, y:clickY };
				clickX = clickY = null;
				shouldReturn = true;
			} else if(mouseX || mouseY){
				retObj.m ={ x:mouseX, y:mouseY };
				mouseX = mouseY = null;
				shouldReturn = true;
			} 
			if(scrollLeft || scrollTop){
				retObj.s = { l: scrollLeft, t: scrollTop };
				scrollLeft = scrollTop = null;
				shouldReturn = true;
			}
			if(windowHeight || windowWidth){
				retObj.w = { w:windowWidth, h:windowHeight };
				windowWidth = windowHeight = null;
				shouldReturn = true;
			}
			if(keys){
				retObj.k = true;
				keys = null;
				shouldReturn = true;
			}
			
			if (shouldReturn) {
				if (waitTime) {
					retObj.wt = new Date() - waitTime;
					waitTime = null;
				}
				lastRetObj = retObj;
				return retObj;
			} else {
				if(!waitTime)
					waitTime = new Date();			
				return null;
			}
		}
			
		var handleMouseMoveEvent = function(e) {
			if (!e)
				e = window.event;
			var mx, my;
			mx = e.clientX;
			my = e.clientY;
			if (!lastRetObj || (lastRetObj && !lastRetObj.m) || (lastRetObj.m.x != mx || lastRetObj.m.y != my)) {
				mouseX = mx;
				mouseY = my;
			}
		},
		
		handleScrollEvent = function(e){
			var sl, st;
			sl = window.scrollX;
			st = window.scrollY;
			if (!lastRetObj || (lastRetObj && !lastRetObj.s) || (lastRetObj.s.l != sl || lastRetObj.s.t != st)) {
				scrollLeft = sl;
				scrollTop = st;
			}
		},
		
		handleResizeEvent = function(e){
			var wh, ww;
			if(resizeElem){
				wh = resizeElem.clientHeight;
				ww = resizeElem.clientWidth;
			} else if (resizeUseInner) {
		        wh = window.innerHeight;
				ww = window.innerWidth;
		    }
			if (!lastRetObj || (lastRetObj && !lastRetObj.w) || (lastRetObj.w.w != ww || lastRetObj.w.h != wh)) {
				windowHeight = wh;
				windowWidth = ww;
			}
		},
		
		handleClickEvent = function(e){
			if (!e)
				e = window.event;
			var mx, my;
			cx = e.clientX;
			cy = e.clientY;
			if (!lastRetObj || (lastRetObj && !lastRetObj.c) || (lastRetObj.c.x != mx || lastRetObj.c.y != my)) {
				clickX = cx;
				clickY = cy;
			}
		},
		
		handleKeyEvent = function(e){
			if (!e)
				e = window.event;
			var k = String.fromCharCode(e.charCode);
			if(keys == null)
				keys = [k];
			else
				keys.push(k);
		}
		
});