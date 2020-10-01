// Declared variables
var highScore = document.querySelector("#Score");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Retrieves local storage 
var allScores = localStorage.getItem("highScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].user + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

// Event listener to move to index page
goBack.addEventListener("click", function () {
    window.location.replace("index.html");
});
