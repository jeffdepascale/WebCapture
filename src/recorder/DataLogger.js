
a5.Package('com.jeffdepascale.webCapture.recorder')

	.Extends('a5.cl.CLBase')
	.Class('DataLogger', function(cls, im){
		
		var movementLog,
			screenCapLog,
			resolution,
			moveRate;
		
		cls.DataLogger = function(_resolution, _moveRate){
			cls.Super();
			movementLog = [];
			screenCapLog = [];
			resolution = resolution;
			moveRate = _moveRate;		
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
				screen:screenCapLog,
				playerInfo:{
					resolution:resolution,
					moveRate:moveRate
				}
			});
		}
		
});