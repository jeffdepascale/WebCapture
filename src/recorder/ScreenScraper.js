
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Class('ScreenScraper', function(cls, im){
		
		var lastScrapedVal,
			storedCSS;
		
		cls.ScreenScraper = function(){
			cls.Super();
			storedCSS = "";
		}
		
		cls.initialize = function(){
			var styles = document.getElementsByTagName('link');
		    for(var i = 0, l = styles.length; i<l; i++){
				var attribs = styles[i].attributes,
					url,
					isCSS;
		      	for(var j = 0, k = attribs.length; j<k; j++){
			  		if(attribs[j].name == 'type' && attribs[j].value == 'text/css')
						isCSS = true;
					else if(attribs[j].name == 'href')
						url = attribs[j].value;
			  	}
				if (isCSS && url) 
						processCSS(url);
		    }
			styles = document.getElementsByTagName('style');
			for(var i = 0, l = styles.length; i<l; i++)
				storedCSS += '\n' + styles[i].innerText;
		}
		
		cls.capture = function(){
			var html = '<html>' + document.getElementsByTagName('html')[0].innerHTML + '</html>';
			if (html !== lastScrapedVal) {
				lastScrapedVal = html;
				return processHTML(html);
			} else {
				return null;
			}
		}
		
		var processCSS = function(url){
			if (url.indexOf('://') == -1) {
				if(url.substr(0, 1) == '/')
					url = location.protocol +'//' + location.hostname + url;
				else
					url = location.href.match(/^.*\//) + url;
			}
			cls.cl().initializer().resourceCache().load(url, function(data){
				if(data)
					storedCSS += '\n' + data;
			}, function(){}, null, true);
		}
		
		var processHTML = function(html){
		    return html.replace(/<script.*?>[\s\S]*?<\/.*?script>/g, "")
			.replace(/<link.*?>[\s\S]*?<\/.*?link>/g, "")
			.replace(/<style.*?>[\s\S]*?<\/.*?style>/g, "")
			.replace('</head>', '<style>' + storedCSS + '</style></head>')
			.replace(/\s{2,}/g,' ').replace('> <', '');
		}
		
});