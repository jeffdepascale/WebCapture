
a5.Package('com.jeffdepascale.webCapture.player')

	.Extends('a5.cl.CLBase')
	.Class('Player', function(cls, im){
		
		var stage,
			cursor,
			resolution,
			moveRate,
			stageData,
			moveData,
			playerArea;
		
		cls.Player = function(){
			cls.Super();
			createArea();
			stage = new im.Stage(playerArea);
			cursor = new im.Cursor(playerArea);
		}
		
		cls.play = function(playbackData){
			var data = JSON.parse(playbackData);
			resolution = data.playerInfo.resolution;
			moveRate = data.playerInfo.moveRate;
			moveData = data.movement;
			stageData = data.screen;
			moveTimer = setInterval(moveTick, resolution/moveRate);
			//stageTimer = setInterval(stageTick, resolution);
			moveTick();
			stageTick();
		}
		
		var moveTick = function(){
		
		}, 
		
		stageTick = function(){
			stage.updateHtml(decodeURIComponent(stageData[0].data));
		}, 
		
		createArea = function(){
			var wrapper = document.createElement('div');
			wrapper.style.width = wrapper.style.height = '100%';
			wrapper.style.display = 'block';
			playerArea = document.createElement('div');
			playerArea.style.position = 'relative';
			playerArea.style.border = '3px solid';
			playerArea.style.height = '300px';
			playerArea.style.width = '90%';
			playerArea.style.margin = '0px auto';
			playerArea.style.overflow = 'hidden';
			document.body.appendChild(wrapper);
			wrapper.appendChild(playerArea);
		}
});