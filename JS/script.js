/**
 * @author Heather Kusmierz
 */

// Global variable declaration
var user = "X";
var computer = "O";
var zero = ["#zero"];
var one = ["#one"];
var two = ["#two"];
var three = ["#three"];
var four = ["#four"];
var five = ["#five"];
var six = ["#six"];
var seven = ["#seven"];
var eight = ["#eight"];
var computerPickId;

// Function declarations

function getBoard() {
  // Pulls inner HTML off the board and assigns to variables
  zero[1] = document.getElementById("zero").innerHTML;
  one[1] = document.getElementById("one").innerHTML;
  two[1] = document.getElementById("two").innerHTML;
  three[1] = document.getElementById("three").innerHTML;
  four[1] = document.getElementById("four").innerHTML;
  five[1] = document.getElementById("five").innerHTML;
  six[1] = document.getElementById("six").innerHTML;
  seven[1] = document.getElementById("seven").innerHTML;
  eight[1] = document.getElementById("eight").innerHTML;
  //console.log(zero, one, two, three, four, five, six, seven, eight);
}

function resetGame() {
  $(".box").each(function(index, element) {
    $(element).html("");
    $(element).removeClass("disabled").removeClass("X").removeClass("O");
  });
  getBoard();
}

function userWin() {
  alert("Congratulations, you win!");
  resetGame();
}

function computerWin() {
  alert("Sorry, score one for the machines today.");
  resetGame();
}

function draw() {
  alert("No winners today.");
  resetGame();
}

function threeInARow(a, b, c) {
  // Inputs the inner HTML from 3 squares, checks if all match
  console.log("Checking three in a row...");
  if ((a[1] != "" || b[1] != "" || c[1] != "") && (a[1] == b[1] && a[1] == c[1] && b[1] == c[1])) {
    console.log("Three in a row!");
    return true;
  } else {
    return false;
  }
}

function twoInARow(a, b, c) {
  // Inputs the inner HTML from 3 squares and checks that two match
  // and one is blank
  if ((a[1] == "" && b[1] != "" && b[1] == c[1]) || (a[1] == b[1] && a[1] != "" && c[1] == "") || (a[1] == c[1] && a[1] != "" && b[1] == "") ) {
    if (a[1] == "") {
      computerPickId = a[0];
    } else if (b[1] == "") {
      computerPickId = b[0];
    } else {
      computerPickId = c[0];
    }
    return true;
  } else {
    return false;
  }
}

function oneInARow(a, b, c) {
  // Inputs the inner HTML from 3 squares and checks that two match
  // and one is blank
  if ((a[1] == computer && b[1] == "" && c[1] == "") || (a[1] == "" && b[1] == computer && c[1] == "") || (a[1] == "" && b[1] == "" && c[1] == computer) ) {
    if (a[1] == "") {
      computerPickId = a[0];
    } else if (b[1] == "") {
      computerPickId = b[0];
    } else {
      computerPickId = c[0];
    }
    return true;
  } else {
    return false;
  }
}

function checkWin() {
  // Reviews current board and checks for a win or draw
  getBoard();
  
  // Checks if there are three matches in a row/column/diagonal
  // Row 1
  if (threeInARow(zero, one, two)) {
    if (zero[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Row 2
  if (threeInARow(three, four, five)) {
    if (three[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Row 3
  if (threeInARow(six, seven, eight)) {
    if (six[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Column 1
  if (threeInARow(zero, three, six)) {
    if (zero[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Column 2
  if (threeInARow(one, four, seven)) {
    if (one[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Column 3
  if (threeInARow(two, five, eight)) {
    if (two[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Diagonal 1
  if (threeInARow(zero, four, eight)) {
    if (zero[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Diagonal 2
  if (threeInARow(two, four, six)) {
    if (two[1] == user) {
      userWin();
    } else {
      computerWin();
    }
  }
  
  // Check for a draw
  if (zero[1] != "" && one[1] != "" && two[1] != "" && three[1] != "" && four[1] != "" && five[1] != "" && six[1] != "" && seven[1] != "" && eight[1] != "") {
    draw();
  }
}

function generateRandom() {
  // Generates a random whole number from 0 to 8 inclusive
  var random = Math.floor(Math.random()*9);
  return random;
}

function computerChoice() {
  // AI for computer to pick a square
  getBoard();
  var squares = [zero, one, two, three, four, five, six, seven, eight];
  
  // Check for two-in-a-row scenarios, then one-in-a-row, then random choice
  if (twoInARow(zero, one, two) || twoInARow(three, four, five) || twoInARow(six, seven, eight) || twoInARow(zero, three, six) || twoInARow(one, four, seven) || twoInARow(two, five, eight) || twoInARow(zero, four, eight) || twoInARow(two, four, six)) {
    $(computerPickId).html(computer);
    $(computerPickId).addClass("disabled").addClass(computer);
  } else if (oneInARow(zero, one, two) || oneInARow(three, four, five) || oneInARow(six, seven, eight) || oneInARow(zero, three, six) || oneInARow(one, four, seven) || oneInARow(two, five, eight) || oneInARow(zero, four, eight) || oneInARow(two, four, six)) {
    $(computerPickId).html(computer);
    $(computerPickId).addClass("disabled").addClass(computer);
  } else {
    // Randomly choose an empty square
    var index = generateRandom();
    while (squares[index][1] != "") {
      index = generateRandom();
    }
    console.log("Random index is: " + index);
    computerPickId = squares[index][0];
    $(computerPickId).html(computer);
    $(computerPickId).addClass("disabled").addClass(computer);
  }
  
  checkWin();
}


// jQuery page functionality
$(function() {
  // User selects player
  $("#pickX").on("click", function(){
    if (!$("#pickX").hasClass("disabled")) {
      user = "X";
      computer = "O";
      //console.log("User is: " + user);
      $("#pickX, #pickO").addClass("disabled");
      $("a").removeClass("disabled");
      computerChoice();
    } 
  }); // end pickX click
  
  $("#pickO").on("click", function(){
    if (!$("#pickO").hasClass("disabled")) {
      user = "O";
      computer = "X";
      //console.log("User is: " + user);
      $("#pickX, #pickO").addClass("disabled");
      $("a").removeClass("disabled");
      computerChoice();
    }
  }); // end pickO click
  
  $(".box").each(function(index, element) {
    $(element).on("click", function() {
      $(this).addClass(user);
      $(this).html(user);
      $(this).addClass("disabled");
      checkWin();
      computerChoice();
    });
  }); // end each function
}); // end page function