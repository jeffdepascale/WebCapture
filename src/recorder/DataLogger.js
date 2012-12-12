
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Class('DataLogger', function(cls, im){
		
		var movementLog,
			screenCapLog;
		
		cls.DataLogger = function(){
			cls.Super();
			movementLog = [];
			screenCapLog = [];
			
		}
		
		cls.logMovement = function(log, time){
			movementLog.push({data:log, time:time});
		}
		
		cls.logScreen = function(log, time){
			screenCapLog.push({data:log, time:time});
		}
		
		cls.getData = function(){
			return JSON.stringify({
				movement:movementLog,
				screen:screenCapLog
			});
		}
		
});