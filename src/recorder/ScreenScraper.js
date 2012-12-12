
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Class('ScreenScraper', function(cls, im){
		
		cls.ScreenScraper = function(){
			cls.Super();
		}
		
		cls.initialize = function(){
			
		}
		
		cls.capture = function(){
			var html = '<html>' + document.getElementsByTagName('html')[0].innerHTML + '</html>';
			return processHTML(html);
		}
		
		var processHTML = function(html){
		    html = html.replace(/<script.*?>[\s\S]*?<\/.*?script>/g, "");
			var split = html.split('<link ');
			if(split.length > 1){
				//	var url = styles[i].url;
				//if(url.indexOf('://') == -1)
					//styles[i].url = location.href.match(/^.*\//) + url;	
			}
			return html;
		}
		
});