/*DB에서 넘어온  데이터라고 가정*/
//현재는 쓰고 있지 않다. 
var data = [
    {
        startTime: "20150915-17:00",
        endTime: "20150915-17:25",
        detailNotes: "issue 9 start",
        todo : "html5 project"
    },
    {
      startTime: "20150915-17:30",
      endTime: "20150915-17:55",
      detailNotes: "issue 9 completed",
      todo : "html5 project"
    },
    {
        startTime: "20150915-18:00",
        endTime: "20150915-18:25",
        detailNotes: "",
        todo : "DB study"
    }
];

$(document).ready(function () {
   // 1. get a reference to myCanvas element.
  var canvas = document.getElementById("myChart");

  var X = canvas.width/2;
  var Y = canvas.height/2;
  var outterRadius = X - 2;
  var innerRadius = X/2;

  // 2. get canvas context
  var context = canvas.getContext("2d");

  // 3. draw donut chart
  //drawDonut(0, Math.PI * 2, "#eee");
  drawBackground();
  drawInnerDonut(calculateTimeToRadian("07:00"), calculateTimeToRadian("07:25"), "rgba(247,70,74, 1)");
  drawInnerDonut(calculateTimeToRadian("11:20"), calculateTimeToRadian("11:50"), "rgba(247,70,74, 1)");

  drawOutterDonut(calculateTimeToRadian("17:00"), calculateTimeToRadian("17:25"), "rgba(247,70,74, 1)");
  drawOutterDonut(calculateTimeToRadian("17:30"), calculateTimeToRadian("17:55"), "rgba(70, 191, 189, 1)");
  drawOutterDonut(calculateTimeToRadian("18:00"), calculateTimeToRadian("18:25"), "rgba(253, 189, 92, 1)");

  //*******************************************************//\        
  // drawDonut() function drawes 2 full or partial circles inside each other one clockwise and the other is counter-clockwise
  function drawOutterDonut(sRadian, eRadian, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(X, Y, outterRadius, sRadian, eRadian, false); // Outer: CW
    context.arc(X, Y, innerRadius, eRadian, sRadian, true); // Inner: CCW
    context.closePath();
    context.fill();
    //context.lineWidth = X/50;
    context.strokeStyle = "rgba(255,255,255, 1)";
    context.stroke();
    drawLine(outterRadius, sRadian, eRadian);
  }

  function drawInnerDonut(sRadian, eRadian, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(X, Y, innerRadius, sRadian, eRadian, false); // Outer: CW
    context.arc(X, Y, 0, eRadian, sRadian, true); // Inner: CCW
    context.closePath();
    context.fill();
    //context.lineWidth = X/50;
    context.strokeStyle = "rgba(255,255,255, 1)";
    context.stroke();
  }

  function drawLine(radius, sRadian, eRadian) {
    context.strokeStyle = "#eee";
    context.beginPath();
    context.moveTo(X,Y);
    context.lineTo(X + radius * Math.cos(sRadian),Y + radius * Math.sin(sRadian));
    context.moveTo(X,Y);
    context.lineTo(X + radius * Math.cos(eRadian),Y + radius * Math.sin(eRadian));
    context.closePath();
    context.stroke();
  }

  function drawBackground() {
    context.strokeStyle = "#eee";
    context.beginPath();
    context.arc(X, Y, outterRadius+1, Math.PI * 1.5, Math.PI * (1.5 + 2), false);
    context.arc(X, Y, innerRadius-1, Math.PI * 1.5, Math.PI * (1.5 + 2), false);
    context.moveTo(X,Y);
    context.lineTo(X+outterRadius,Y);
    context.moveTo(X,Y);
    context.lineTo(X,Y+outterRadius);
    context.moveTo(X,Y);
    context.lineTo(X-outterRadius,Y);
    context.moveTo(X,Y);
    context.lineTo(X,Y-outterRadius);
    context.closePath();
    context.stroke();
  }

  function calculateTimeToRadian(time) {
    //17:25 format으로 들어온다고 가정
    var splitted = time.split(":");
    // 잘못된 입력에 대해 에러코드 넣고 싶은데 어떻게 넣어야할지 모르겠다. StringToNumException 같은 거...
    splitted[0] *= 1; //type change
    splitted[1] *= 1; //type change
    var offset = (splitted[0] >= 12)? 12 : 0;
    splitted[0] -= offset;
    var result = 2 * (splitted[0] * 60 + splitted[1])/(12 * 60) - 0.5;
    console.log(Math.PI *result);
    return Math.PI * result;
  }
});