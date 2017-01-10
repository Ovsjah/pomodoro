var snd = new Audio("images/Air%20Horn-SoundBible.com-1561808001.wav?dl=1");
var breakTime = 300;
var workTime = 1500,
  currentTime = workTime,
  testPom = currentTime;
var onDeck = "Break";
var id = true;

// Convert Break and Session time from minutes to seconds
function minToSec(min) {
  return min * 60;
}

// Convert seconds to 00:00:00 format.
function secToTimeString(second) {
  var hour = 0, minute = 0;
    
  hour = Math.floor(second / 3600);
  second = second - (3600 * hour);
  minute = Math.floor(second / 60);
  second = second - (60 * minute);
  
  return (hour > 0) ? n(hour) + ":" + n(minute) + ":" + n(second) : n(minute) + ":" + n(second); // if hour greater than zero we call n func on hour else we call n func on minutes to add zeros before digit
}
  
//function to add leading 0
function n(n) {
  return n > 9 ? "" + n : "0" + n;
}

// Start pomodoro
function countdown() {
  if (id === true) {
    testPom = currentTime;
    id = setInterval(decrement, 1000); // setInterval(function, milliseconds)
  }
  
  // Timing function
  function decrement() {
    // Toggle between Session and Break
    if (testPom == 0) {
      snd.play();
      $("#activity").text(onDeck);
      switch (onDeck) {
        case "Break":
          testPom = breakTime;
          onDeck = "Session";
          $("#activity").css("color", "green");
          break;
        case "Session":
          testPom = workTime;
          onDeck = "Break";
          $("#activity").css("color", "blue");
          break;
      }
      $("#clock").text(secToTimeString(testPom));
    }
    else {
      // Reduce time left by 1 second and display result in 00:00:00 format
      testPom--;
      $("#clock").text(secToTimeString(testPom));
    }
    
    // Change color of clock based on percent of time left
    var percentLeft = Math.floor((testPom / workTime) * 100);
    if (percentLeft <= 10) {
      $("#clock").css("color", "blue");
    }
    else if (percentLeft <= 25) {
      $("#clock").css("color", "yellow");
    }
    else {
      $("#clock").css("color", "green");
    }
  }
}
// stop action
function stopCountdown() {
  clearInterval(id);
  id = true;
  currentTime = testPom;
}
// reset action
function resetCountdown() {
  clearInterval(id);
  id = true;
  testPom = currentTime = workTime = minToSec(25)
  breakTime = minToSec(5);
  
  $("#session_min").text(25);
  $("#break_min").text(n(5));
  $("#clock").text(secToTimeString(testPom));
  $("#clock").css("color", "white");
  $("#activity").text("Session");
  onDeck = "Break";
};

$(document).ready(function() {
  // Click handlers to adjust Session and Break times
  // Increase Session time
  $('#session_plus').click(function() {
    if (testPom == workTime) {
      var a = $('#session_min').text();
      a++;
      $('#session_min').text(n(a));
      testPom =
        currentTime = 
        workTime = eval(minToSec($("#session_min").text()));
      $("#clock").text(secToTimeString(workTime));
    };
  });
  // Reduce Session time
  $('#session_minus').click(function() {
    // Cannot reduce below 1
    if (testPom == workTime && $("#session_min").text() > 1) {
      var b = $('#session_min').text();
      b--;
      $('#session_min').text(n(b));
      testPom =
        currentTime =
        workTime = eval(minToSec($("#session_min").text()));
      $("#clock").text(secToTimeString(workTime));
    };
  });
  // Increase Break time
  $('#break_plus').click(function() {
    if (testPom == workTime) {
      var a = $('#break_min').text();
      a++;
      $('#break_min').text(n(a));
      breakTime = eval(minToSec($("#break_min").text()));
    };
  });
  // Reduce Break time
  $('#break_minus').click(function() {
    if (testPom == workTime && $('#break_min').text() > 1) {
      var b = $('#break_min').text();
      b--;
      $('#break_min').text(n(b));
      breakTime = eval(minToSec($("#break_min").text()));
    };
  });
  
  // Set session start time
  $('#clock').text(secToTimeString(workTime));
  
  // Click handlers for controlling flow of session
  $("#start").click(countdown);
  $("#stop").click(stopCountdown);
  $("#reset").click(resetCountdown);
});
