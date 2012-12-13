
a5.Package('com.jeffdepascale.webCapture.player')

	.Extends('a5.cl.CLBase')
	.Class('Mover', function(cls, im){
		
		var layer,
			cursor,
			click,
			type,
			playerArea,
			assetPath;
		
		
		cls.Mover = function(_playerArea, _assetPath){
			cls.Super();
			playerArea = _playerArea;
			assetPath = _assetPath;
			createLayer();
			createImages();
		}
		
		cls.play = function(timeline, _resolution, _moveRate){
			var tl = new TimelineLite(),
				time = time = _resolution/_moveRate/1000,
				wasTyping = false;
			for(var i = 0, l = timeline.length; i<l; i++){
				var data = timeline[i],
					wait = data.wt ? data.wt/1000:0;
				if (i == 0) {
					cursor.style.left = data.m.x + 'px';
					cursor.style.top = data.m.y + 'px';
				} else {
					if (data.c) {
						var x = data.c.x,
							y = data.c.y;
						tl.to(cursor, time, {
							css: { left: x + 'px', top:y + 'px'},
							delay:wait,
							ease: Power0.easeIn,
							onComplete:function(){
								click.style.left = cursor.style.left;
								click.style.top = cursor.style.top;
								var tl = new TimelineLite();
								tl.to(click, .2, {css:{opacity:1}}).to(click, .5, {css:{opacity:0}}).play(); 
							}
						});
						
					} else if (data.m) {
						tl.to(cursor, time, {
							css: { left: data.m.x + 'px', top: data.m.y + 'px' },
							delay:wait,
							ease: Power0.easeIn
						});
					} else {
						tl.to(cursor, 0, { delay:time });
					}
					if(data.k == true){
						if(!wasTyping){
							wasTyping = true;
							tl.to(type, .5, {css:{opacity:1}, delay:wait})
						}
					} else{
						if(wasTyping){
							wasTyping = false;
							tl.to(type, .5, {css:{opacity:0}})
						}
					}
				}
			}
			tl.to(type, .5, {css:{opacity:0}})
			tl.play();
		}
		
		var createLayer = function(){
			layer = document.createElement('div');
			layer.style.position = 'absolute';
			layer.style.left = layer.style.top = '0px';
			layer.style.width = layer.style.height = '100%';
			layer.style.zIndex = 1;
			playerArea.appendChild(layer);
		}
		
		var createImages = function(){
			cursor = document.createElement('div');
			cursor.style.position = 'absolute';
			img = new Image();
			img.src = assetPath + '/cursor.png';
			cursor.appendChild(img);
			layer.appendChild(cursor);
			
			click = document.createElement('div');
			click.style.position = 'absolute';
			click.style.opacity = 0;
			img2 = new Image();
			img2.src = assetPath + '/circle.png';
			img2.style.position = 'relative';
			img2.style.left = img2.style.top = '-10px';
			click.appendChild(img2);
			layer.appendChild(click);
			
			type = document.createElement('div');
			type.style.fontFamily = 'Arial';
			type.style.fontSize = '14px';
			type.style.width = '200px;';
			type.style.textAlign = 'center';
			type.style.position = 'relative';
			type.style.height = '50px';
			type.style.margin = '0px auto';
			type.innerHTML = 'Typing...';
			type.style.opacity = 0;
			layer.appendChild(type);
		}
});