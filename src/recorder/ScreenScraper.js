
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
			url = absPath(url);
			cls.cl().initializer().resourceCache().load(url, function(data){
				if(data)
					storedCSS += '\n' + data;
			}, function(){}, null, true);
		}
		
		var absPath = function(url){
			if (url.indexOf('://') == -1) {
				if(url.substr(0, 1) == '/')
					url = location.protocol +'//' + location.hostname + url;
				else
					url = location.href.match(/^.*\//) + url;
			}
			return url;
		}
		
		var processHTML = function(html){
			var match = html.match(/<img.*?[\s\S]*?src=/g),
				lastIndex = 0;
			while(match.length){
				var ind = html.indexOf(match[0], lastIndex) + match[0].length+1,
					end = html.substring(ind).search(/'|"/) + ind,
					closeTag = html.substring(ind).search(/>/) + ind,
					repl = '';
				if (closeTag > end) {
					var val = html.substring(ind, end);
					repl = absPath(val);
					html = html.replace(val, repl);
				}			
				lastIndex = ind + repl.length;
				match.shift();
			}
			
			return encodeURIComponent(html.replace(/<script.*?>[\s\S]*?<\/.*?script>/g, "")
			.replace(/<link.*?[\s\S]*?>/g, "")
			.replace(/<style.*?>[\s\S]*?<\/.*?style>/g, "")
			.replace('</head>', '<style>' + storedCSS + '</style></head>')
			.replace(/\s{1,}/g,' ').replace('> <', '><'));
		}
		
});