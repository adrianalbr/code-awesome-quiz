console.log("this works somehow");
// array of objects for the questions and answers
var quizBank = [
  {
    question: "Commonly used types DO NOT include",
    choices: ["strings", "booleans", "alerts", "intgers"],
    answer: "alerts",
  },

  {
    question: "The condition in an if/else statement is enclosed within ___",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
  },

  {
    question: "Arrays in JavaScript can be used to store",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },

  {
    question:
      "String values must be enclosed within ____ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "curly brackets",
  },

  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "consol.log"],
    answer: "consol.log",
  },
];
//declare variables
var welcomeContainer = document.getElementById("welcome");
var startButton = document.getElementById("start-quiz");
var questionAnswer = document.getElementById("question-answer");
var correctAnswer = document.getElementById("correct-answer");
var timerDisplay = document.getElementById("timer-display");
var timerDisplayP = document.getElementById("timerWrap");
timerDisplayP.style.display = "none";
var form = document.getElementById("formDiv");
form.style.display = "none";

var scores = JSON.parse(localStorage.getItem("highscores")) || [];
var score = 0;

var timeLeft = 75;
var interval;
var penalty = 10;
var questionIndex = 0;

// window.onload = function () {
//   timerDisplay.textContent = "Time: 0" + timeLeft;
// };
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("clicked");
  var initials = document.getElementById("inputRes").value;
  console.log(initials, timeLeft);
  var obj = {
    user: initials,
    score: timeLeft,
  };
  scores.push(obj);

  localStorage.setItem("highscores", JSON.stringify(scores));
});

startButton.addEventListener("click", function () {
  welcomeContainer.style.display = "none";
  timerDisplayP.style.display = "block";

  startTimer();
  //render questions call function
  renderQuizBank();
  //render choices call function
  // renderChoices();
});

function countDown() {
  timeLeft--;

  timerDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(interval);
    //call function to handle end game
    endGame();

    console.log("GAME OVER TIME RAN OUT");
  }
}

function startTimer() {
  interval = setInterval(countDown, 1000);
}

function endGame() {
  console.log("ok");
  questionAnswer.style.display = "none";
  form.style.display = "block";
  console.log("score", timeLeft);
  document.getElementById("score").textContent = timeLeft;
  //localStorage.setItem("score", timeLeft);
}

function checkResponse() {
  // console.log("ok");
  //capture the users response
  console.log(this.value);
  var res = this.value;
  //compare response to correct anser
  if (res !== quizBank[questionIndex].answer) {
    timeLeft = timeLeft - penalty;
    alert("Incorrect");
  } else {
    alert("Correct");
  }
  //if wrong
  //- deduct 3 from timerLeft
  // - dislay incorrect
  //else correct
  //- display correct
  questionIndex++;

  //condtional to check to see if we have any more questions to ask
  if (questionIndex === quizBank.length) {
    clearInterval(interval);
    endGame();
  } else {
    renderQuizBank();
  }
  // if no more questions
  //-call fucntion to endGame
  //else
  //- renderQuizBank
}

function renderQuizBank() {
  questionAnswer.innerText = "";
  var questions = document.createElement("h2");
  questions.setAttribute("data-value", quizBank[questionIndex].question);
  questions.textContent = quizBank[questionIndex].question;
  questionAnswer.append(questions);
  renderChoices();
}

function renderChoices() {
  for (var i = 0; i < quizBank[questionIndex].choices.length; i++) {
    var choiceButton = document.createElement("button");
    // choiceButtons.setAttribute("style", "background-color:....
    choiceButton.setAttribute("value", quizBank[questionIndex].choices[i]);
    choiceButton.onclick = checkResponse;
    choiceButton.textContent = quizBank[questionIndex].choices[i];
    questionAnswer.append(choiceButton);
  }
}

questionAnswer.addEventListener("click", function (event) {});
