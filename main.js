/*custom event define*/
timerEnd = new CustomEvent("timerEnd");

/*Modal*/
var Modal = {
	display: function (e) {
		var arrowhead = document.querySelector("header .arrow-head");
		var modal = document.querySelector("header .modal");
		if(modal.style.display === "block") {
			arrowhead.style.display = "none";
			modal.style.display = "none";
		} else {
			arrowhead.style.display = "block";
			modal.style.display = "block";		}
	}
}

/*Pomodoro*/
function Pomodoro(startTime, focusingWork) {
	this.startTime = startTime;
	this.endTime;
	this.detailNotes;
	this.todo = focusingWork;
}

Pomodoro.prototype.setEndTime= function(endTime) {
	this.endTime = endTime;
}

Pomodoro.prototype.setDetailNotes = function(detailNotes) {
	this.detailNotes = detailNotes;
}

Pomodoro.prototype.setTodo = function(todo){
	this.todo = todo;
}

Pomodoro.prototype.save = function() {
	// [DB]에 pomodoro 저장;
}

/*Todo*/
var Todo = {
	
}
 
/*Today*/
var Today = {
	date: new Date(),
	sound : new Audio("asset/dingdong/dingdong.mp3"),
	todoList : [],
	timer : null,
	timerEndHandler : null,

	parse: function() {
		this.todoList = $(".todo-today textarea").val().split("\n");
		//[DB]에 Today.date - todoList 순서쌍 저장! - 각각의 id를 반환받는다. 
	},

	setTimer: function(timer) {
		this.timer = timer;
	},

	selectWork: function() {
		var focusingWork = prompt("작업할 것을 골라주세요:" + this.todoList); //prompt가 아닌 checkbox로 해서 무조건 선택되도록 해야 함!	
		$("#work").html(focusingWork);
	}, 

	startPomodoro: function() {
		this.parse();
		console.log(this.todoList);
		if(this.todoList.length === 0 || this.todoList[0] === "") {
			alert("todo today를 입력하세요.");
			return;
		}

		$(".center .finish").show();
		$(".center .start").hide();
		this.work();
	},

	finishPomodoro: function() {
		$(".center .finish").hide();
		$(".center .start").show();
		$(".todo-today textarea").val("");
		this.timer.clearInterval();
		this.timer.initializeTimer(this.timer.pomodoroTime);
	},

	work: function() {
		var focusingWork = this.selectWork();
		var pomodoro = new Pomodoro(new Date(), focusingWork);
		this.timer.countdown(this.timer.pomodoroTime, this.timer.breakTime);
		$(window).off("timerEnd", this.timerEndHandler);
		this.timerEndHandler = this.break.bind(this, pomodoro)
		$(window).on("timerEnd", this.timerEndHandler); 
	},

	break: function(pomodoro) {
		this.sound.onplay = function () { 
			var detailNotes = prompt("You can note a detail about this work or skip it.");
			pomodoro.setEndTime(new Date());
			pomodoro.setDetailNotes(detailNotes);
			pomodoro.save();
		};
		this.sound.play();
		var completed = confirm(pomodoro.todo+"(을)를  완료하셨나요?");
		if(completed) {
			//[DB] update todo as completed = true;
		}

		this.timer.countdown(this.timer.breakTime, this.timer.pomodoroTime);
		

		$(window).off("timerEnd", this.timerEndHandler);
		this.timerEndHandler = this.work.bind(this);
		$(window).on("timerEnd", this.timerEndHandler);
	}
}

/*Main*/
$(document).ready(function () {
	var timer = new Timer(2, 1);
	timer.initializeTimer(2);
	Today.setTimer(timer);

	$("#work-inventory-bar").on("click", Modal.display);
	$(".center .start").on("click", Today.startPomodoro.bind(Today)); //여기서 bind(this)를 하면 #documnet가 나온다.. 이렇게 Today를 직접 binding할 수 밖에 없는 건가?
	$(".center .finish").on("click", Today.finishPomodoro.bind(Today)); 
});

