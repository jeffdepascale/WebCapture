
a5.Package('com.jeffdepascale.webCapture.player')

	.Extends('a5.cl.CLBase')
	.Class('Player', function(cls, im){
		
		var stage,
			mover,
			resolution,
			moveRate,
			stageData,
			moveData,
			playerArea,
			wrapperElemID,
			assetPath;
		
		cls.Player = function(_wrapperElemID, _assetPath){
			cls.Super();
			wrapperElemID = _wrapperElemID;
			assetPath = _assetPath;
			createArea();
			stage = new im.Stage(playerArea);
			mover = new im.Mover(playerArea, assetPath);
		}
		
		cls.play = function(playbackData){
			var data = JSON.parse(playbackData);
			resolution = data.playerInfo.resolution;
			moveRate = data.playerInfo.moveRate;
			moveData = data.movement;
			stageData = data.screen;
			stage.play(stageData);
			mover.play(moveData, resolution, moveRate);
		}
		
		var createArea = function(){
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
			document.getElementById(wrapperElemID).appendChild(wrapper);
			wrapper.appendChild(playerArea);
		}
});