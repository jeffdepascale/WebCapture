
a5.Package('com.jeffdepascale.webCapture.player')

	.Extends('a5.cl.CLBase')
	.Class('Stage', function(cls, im){
		
		var iframe,
			iframeDoc,
			data,
			playerArea;
		
		cls.Stage = function(_playerArea){
			cls.Super();
			playerArea = _playerArea;
			createFrame();
		}
		
		cls.play = function(_data){
			data = _data;
			drawNextFrame();
		}
		
		var drawNextFrame = function(){
			var d = data.shift();
			iframeDoc.open();
			iframeDoc.write(decodeURIComponent(d.data));
			iframeDoc.close();
			if(data.length)
				setTimeout(drawNextFrame, data[0].time);
		}
		
		var createFrame = function(){
			iframe = document.createElement('iframe');
			iframe.style.position = 'relative';
			iframe.style.left = '0px';
			iframe.style.top = '0px';
			iframe.style.width = '100%';
			iframe.style.height = '100%';
			iframe.frameBorder = "0";
			iframe.style.zIndex = 0;
			iframe.height = '100%';
			iframe.width = '100%';
			playerArea.appendChild(iframe);
			if(iframe.contentDocument)
		    	iframeDoc = iframe.contentDocument;
			else if(iframe.contentWindow)
				iframeDoc = iframe.contentWindow.document;
			else if(iframe.document)
				iframeDoc = iframe.document;
		}
});