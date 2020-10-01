
// array of objects for the questions and answers
var quizBank = [
  {
    question: "Commonly used types DO NOT include",
    choices: ["strings", "booleans", "alerts", "integers"],
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
var rightWrong = document.getElementById("right-wrong");

var scores = JSON.parse(localStorage.getItem("highscores")) || [];
var score = 0;

var timeLeft = 75;
var interval;
var penalty = 10;
var questionIndex = 0;

// submit button when quiz ends
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  var initials = document.getElementById("inputRes").value;
        console.log(initials, timeLeft);
  var obj = {
    user: initials,
    score: timeLeft,
  };
  scores.push(obj);

  localStorage.setItem("highScores", JSON.stringify(scores));
    window.location.replace("scores.html");
});

// Start button for the quiz to begin
startButton.addEventListener("click", function () {
  welcomeContainer.style.display = "none";
  timerDisplayP.style.display = "block";

//  Call start timer and render quiz bank
  startTimer();
  renderQuizBank();
 
});

// functions and statement for the timer
function countDown() {
  timeLeft--;

  timerDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(interval);
    //call function to handle end game
    endGame();

    alert ("GAME OVER TIME RAN OUT");
  }
}
//start timer
function startTimer() {
  interval = setInterval(countDown, 1000);
}
//end game
function endGame() {
  console.log("ok");
  questionAnswer.style.display = "none";
  form.style.display = "block";
  console.log("score", timeLeft);
  document.getElementById("score").textContent = timeLeft;
  localStorage.setItem("score", timeLeft);
}

// check responses
function checkResponse() {
  //capture the users response
  var res = this.value;
  //compare response to correct answer
  if (res !== quizBank[questionIndex].answer) {
    //if incorrect deduct 10 from time left
    timeLeft = timeLeft - penalty;
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        createDiv.textContent = "Incorrect!"
        rightWrong.appendChild(createDiv);
    
  } else {
    var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        createDiv.textContent = "Correct!"
        rightWrong.appendChild(createDiv);
    
  }
  
  questionIndex++;
  setTimeout(function(){
      createDiv.textContent = ""
//condition to check to see if we have any more questions to ask
if (questionIndex === quizBank.length) {
    clearInterval(interval);
    //if we ran out of questions then end the game
    endGame();
  } else {
    // if there are more question continue  
    renderQuizBank();
  }
  },1000)
}

//render quiz questions
function renderQuizBank() {
  questionAnswer.innerText = "";
  var questions = document.createElement("h2");
  questions.setAttribute("data-value", quizBank[questionIndex].question);
  questions.textContent = quizBank[questionIndex].question;
  questionAnswer.append(questions);
  renderChoices();
}

// render possible answers
function renderChoices() {
  for (var i = 0; i <quizBank[questionIndex].choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.className = "btn btn-primary btn-lg";
    choiceButton.id = "answerButton"
    choiceButton.setAttribute("value", quizBank[questionIndex].choices[i]);
    choiceButton.onclick = checkResponse;
    choiceButton.textContent = quizBank[questionIndex].choices[i];
    questionAnswer.append(choiceButton);
  }
}



