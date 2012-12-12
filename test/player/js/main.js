
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
				'../../src/player/Cursor.js'
				
			])
		}	
		
		cls.Override.applicationLaunched = function(){
			player = new im.Player();
			player.play('{"movement":[{"data":{"m":{"x":406,"y":102}},"time":201},{"data":{"m":{"x":421,"y":55}},"time":401},{"data":{"m":{"x":619,"y":103}},"time":602},{"data":{"m":{"x":454,"y":158}},"time":802},{"data":{"m":{"x":377,"y":116}},"time":1003},{"data":{"m":{"x":534,"y":112}},"time":1203},{"data":{"s":{"l":0,"t":68}},"time":1404}],"screen":[{"data":"%3Chtml%3E%3Chead%3E%3Clink%20rel%3D%22stylesheet%22%20type%3D%22text%2Fcss%22%20href%3D%22css%2Fstyles.css%22%20media%3D%22screen%22%3E%20%3Cmeta%20charset%3D%22UTF-8%22%3E%20%3Cstyle%3E%20head%7B%7D%20%3C%2Fstyle%3E%3C%2Fhead%3E%20%3Cbody%3E%20%3Cimg%20src%3D%22https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo3w.png%22%3E%20%3Cdiv%20style%3D%22hei…00px%3B%22%3E%20Hello%20World!%20%3C%2Fdiv%3E%20%3C%2Fbody%3E%3C%2Fhtml%3E","time":1}],"playerInfo":{"moveRate":5}} ');
		}
})

a5.cl.CreateApplication();
