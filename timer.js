function Timer (pomodoroTime, breakTime){
	this.elTimer = document.querySelector("#timer");
	this.pomodoroTime = pomodoroTime;
	this.breakTime = breakTime;
	this.interval;
 }

Timer.prototype.initializeTimer = function (minute) {
	this.elTimer.innerText = ((String(minute).length == 1) ? "0" + minute : minute) + ":" + "00";
}

/* minute만큼 countdown.
 * countdown이 끝나면 resetMinute으로 elTimer 내용 reset.
*/
Timer.prototype.countdown = function(minute, resetMinute) {
	var start = new Date();
	var elapsedSeconds = 60;
	this.interval = setInterval(tick.bind(this), 1000);

	console.log(this);
	function tick(timestamp) {
		if(elapsedSeconds >= minute * 60 + 59) {
			this.initializeTimer(resetMinute);
			clearInterval(this.interval);
			dispatchEvent(timerEnd);
			return;
		}
		elapsedSeconds = elapsedSeconds + 5; //elapsedSeconds++ 임. 5배속으로 빠르게 테스트 하기 위해 바꿔놓음.
		console.log(elapsedSeconds);
		var elapsedMinutes = Math.floor(elapsedSeconds/60);
	 	var modularElapsedSeconds = elapsedSeconds % 60;
		var mm =  minute - elapsedMinutes;
		var ss = 60 - modularElapsedSeconds;
		mm = (String(mm).length == 1) ? "0" + mm : mm;
		ss = (String(ss).length == 1) ? "0" + ss : ss;	
		this.elTimer.innerText = mm + ":" + ss;
	}
}

Timer.prototype.getPomodoroTime = function(){
	return this.pomodoroTime;
}

Timer.prototype.getBreakTime = function() {
	return this.breakTime;
}

Timer.prototype.clearInterval = function() {
	clearInterval(this.interval);
}

