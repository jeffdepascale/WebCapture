
a5.Package('com.jeffdepascale.webCapture.player')

	.Extends('a5.cl.CLBase')
	.Class('Cursor', function(cls, im){
		
		var layer,
			cursor,
			playerArea;
		
		
		cls.Cursor = function(_playerArea){
			cls.Super();
			playerArea = _playerArea;
			createLayer();
			createCursor();
		}
		
		var createLayer = function(){
			layer = document.createElement('div');
			layer.style.position = 'absolute';
			layer.style.left = layer.style.top = '0px';
			layer.style.width = layer.style.height = '100%';
			layer.style.zIndex = 1;
			playerArea.appendChild(layer);
		}
		
		var createCursor = function(){
			cursor = new Image();
			cursor.src = '../../images/cursor.png';
			layer.appendChild(cursor);
		}
});