console.log("this works somehow");

var welcomeContainer = document.getElementById("welcome");
var startButton = document.getElementById("start-quiz");
var questionAnswer = document.getElementById("question-answer");


startButton.addEventListener("click", function () {
    welcomeContainer.style.display = "none";
    // renderCrustOptions();
    // renderOptions(availableCrusts);
  });

    // array of objects for the questions and answers
    // function renderquestionAnswer(){
    var questions = 
    [
      {
        question: "Commonly used types DO NOT include",
        choices: ["1.strings", "2.booleans", "3.alerts", "4.numbers"],
        answer: 4
      },
      
      {
        question: "The condition in an if/else statement is enclosed within ___",
        choices: ["1.quotes", "2.curly brackets", "3.parenthesis", "4.square brackets"],
        answer: 2
      },

      {
        question: "Arrays in JavaScript can be used to store",
        choices: ["1.numbers and strings", "2.other arrays", "3.booleans", "4.all of the above"],
        answer: 4
      },

      {
        question: "String values must be enclosed within ____ when being assigned to variables",
        choices: ["1.commas", "2.curly brackets", "3.quotes", "4.parenthesis"],
        answer: 2
      },

      {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1.JavaScript", "2.terminal/bash", "3.for loops", "4.console.log"],
        answer: 4
      }
    ];

   