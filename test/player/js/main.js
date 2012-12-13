
a5.Package('com.jeffdepascale.webCapture.testApps.player')
	
	.Import('com.jeffdepascale.webCapture.player.*')
	.Extends('a5.cl.CLMain')
	.Class('Main', function(cls, im){
		
		var player,
			params;
		
		cls.Main = function(_params){
			params = _params;
			cls.Super(params);
			cls.dependencies([
				'../../src/player/Player.js',
				'../../src/player/Stage.js',
				'../../src/player/Mover.js',
				'../../src/3rdparty/TweenLite.min.js',
				'../../src/3rdparty/CSSPlugin.min.js',
				'../../src/3rdparty/TimelineLite.min.js',
				'../../src/3rdparty/EasePack.min.js'
				
			])
		}	
		
		cls.Override.applicationLaunched = function(){
			player = new im.Player('playerWrapper', '../../images');
			player.play('{"movement":[{"m":{"x":340,"y":175},"wt":1005},{"m":{"x":220,"y":138}},{"m":{"x":211,"y":120}},{"c":{"x":211,"y":120},"wt":201},{"m":{"x":440,"y":145}},{"c":{"x":440,"y":145},"wt":201},{"k":true,"wt":200},{"k":true},{"m":{"x":171,"y":65},"wt":201},{"m":{"x":89,"y":55}},{"m":{"x":78,"y":52}},{"c":{"x":78,"y":52}}],"screen":[{"data":"%3Chtml%3E%3Chead%3E%3Cmeta%20charset%3D%22UTF-8%22%3E%20%3Cstyle%3E%20head%7B%7D%20%3C%2Fstyle%3E%3C%2Fhead%3E%20%3Cbody%3E%20%3Cimg%20src%3D%22https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo3w.png%22%3E%20%3Cdiv%20id%3D%22moveme%22%20style%3D%22height%3A3000px%3Bwidth%3A3000px%3Bposition%3Arelative%3B%22%3E%20Hello%20World!%20%3C%2Fdiv%3E%20%3C%2Fbody%3E%3C%2Fhtml%3E","time":1},{"data":"%3Chtml%3E%3Chead%3E%3Cmeta%20charset%3D%22UTF-8%22%3E%20%3Cstyle%3E%20head%7B%7D%20body%7B%7D%3C%2Fstyle%3E%3C%2Fhead%3E%20%3Cbody%3E%20%3Cimg%20src%3D%22https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo3w.png%22%3E%20%3Cdiv%20id%3D%22moveme%22%20style%3D%22height%3A%203000px%3B%20width%3A%203000px%3B%20position%3A%20relative%3B%20top%3A%2050px%3B%22%3E%20Hello%20World!%20%3C%2Fdiv%3E%20%3C%2Fbody%3E%3C%2Fhtml%3E","time":2005}],"playerInfo":{"resolution":1000,"moveRate":5}}');
		}
})

a5.cl.CreateApplication();
