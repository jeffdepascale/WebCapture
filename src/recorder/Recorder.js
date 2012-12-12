
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Static(function(Recorder){
		
		Recorder.COMPLETE = 'webCaptureRecorderComplete';
		
	})
	.Class('Recorder', function(cls, im, Recorder){
		
		var recordDelayTime,
			maxRecordTime,
			movementCapturer,
			dataLogger,
			resolution,
			screenScraper,
			moveTimer,
			scrapeTimer,
			endTimer,
			startTime;
		
		cls.Recorder = function(_recordDelayTime, _maxRecordTime, _resolution){
			cls.Super();
			if(resolution<100)
				resolution = 100;
			resolution = _resolution || 1000;
			recordDelayTime = _recordDelayTime || 0;
			maxRecordTime  =  _maxRecordTime || 1.5;
			dataLogger = new im.DataLogger();
			screenScraper = new im.ScreenScraper();
			movementCapturer = new im.MovementCapturer();
			setTimeout(startRecording, recordDelayTime*1000);
		}
		
		var startRecording = function(){
			movementCapturer.initialize();
			screenScraper.initialize();
			startTime = new Date();
			moveTimer = setInterval(moveTick, resolution/5);
			scrapeTimer = setInterval(scrapeTick, resolution);
			if(maxRecordTime)
				endTimer = setTimeout(endRecord, maxRecordTime*1000);
		},
		
		moveTick = function(){
			var log = movementCapturer.capture();
			if(log)
				dataLogger.logMovement(log, new Date() - startTime);
		},
		
		scrapeTick = function(){
			var log = screenScraper.capture();
			if(log)
				dataLogger.logScreen(log, new Date() - startTime);
		},
		
		endRecord = function(){
			clearInterval(moveTimer);
			clearInterval(scrapeTimer);
			cls.dispatchEvent(Recorder.COMPLETE, dataLogger.getData());
		}
	
});