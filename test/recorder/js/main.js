
a5.Package('com.jeffdepascale.webCapture')
	
	.Import('com.jeffdepascale.webCapture.recorder.*')
	.Extends('a5.cl.CLMain')
	.Class('Main', function(cls, im){
		
		var recorder,
			params;
		
		cls.Main = function(_params){
			params = _params;
			cls.Super(params);
			cls.dependencies([
				'../src/recorder/Recorder.js',
				'../src/recorder/DataLogger.js',
				'../src/recorder/MovementCapturer.js',
				'../src/recorder/ScreenScraper.js'
			])
		}	
		
		cls.Override.applicationLaunched = function(){
			recorder = new im.Recorder(params.recordDelayTime, params.maxRecordTime);
			recorder.addEventListener(im.Recorder.COMPLETE, eRecordCompleteHandler);
		}
		
		var eRecordCompleteHandler = function(e){
			console.log(e.data());
		}
})

a5.cl.CreateApplication();
