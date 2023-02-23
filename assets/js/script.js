//variables 
var questionIndex = 0;
var time = 60;
var timer

// variables created with document query selector 
let startScreen = document.getElementById("start-page");
var startButton = document.getElementById("start-button");
var quizScreen = document.getElementById("quiz-page");
var key = document.getElementById("key");
var answers = document.getElementById("answers");
var endScreen = document.getElementById("quiz-end-page");
var initialsInput = document.getElementById('initials');
var submitButton = document.getElementById("initials-input-btn");
var scoresScreen = document.getElementById("high-scores-page");
var timerCountDown = document.getElementById("timer");
var viewHighScores = document.getElementById('view-highscores');
var tryAgain = document.getElementById('try-again-btn');

var highScores


//quiz questions
var questions = [
    {
        question: "Commonly used data types DO NOT include",
        answersAll: ["strings", "booleans", "numbers", "alerts"],
        answerCorrect: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with what?",
        answersAll: ["parenthesis", "quotes", "curly brackets", "square brackets"],
        answerCorrect: "parenthesis"
    },
    {
        question: "Arrays in javascript can be used to store what",
        answersAll: ["other arrays", "booleans", "numbers and strings", "all of the above"],
        answerCorrect: "all of the above"
    },
    {
        question: "String Values must be enclosed within _______ when being assigned variables.",
        answersAll: ["curly brackets", "parenthesis", "quotes", "commas"],
        answerCorrect: "quotes"
    },
    {
        question: "What is a very useful tool for users during development and debugging for printing content for the debugger?",
        answersAll: ["terminal/bash", "JavaScript", "console.log()", "for loops"],
        answerCorrect: "console.log()"
    },
];

//function that hides the question page and scores page when the page is first loaded
function openPage() {
    quizScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    scoresScreen.setAttribute("class", "hide");
};




//save scores from the end quiz page 
function saveHighScore() {
    var initials = initialsInput.value
    

    if (initials !== "") {
        var highScores = JSON.parse(window.localStorage.getItem("highScores"))
        var newScore = {
            name: initials,
            score: time,
        };

        highScores.push(newScore);
        
        window.localStorage.setItem('highScores', JSON.stringify(highScores));
    }

    showHighScores();
}

//this function pulls up all the scored that were saved to the 
function showHighScores() {
    var highScores =JSON.parse(window.localStorage.getItem(highScores))
    
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });
    
    highScores.forEach(function(score) {
    var liEl = document.createElement('li');
    liEl.textContent = score.initials + " - " + score.score;

    var olEl = document.getElementById('display-scores');
    olEl.appendChild(liEl);
    });

    
}

// click event to view the highscores 
viewHighScores.onclick = function() {
    quizScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "hide");
    scoresScreen.setAttribute("class", "show");

    showHighScores();
}

//runs start quiz function when the start button is clicked
startButton.onclick = function() {
    startQuiz()
}

//function that will run to stop the quiz either when time runs out or when all the questions have been answered 
function stopQuiz() {
    quizScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "hide");
    scoresScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "show");

}

//function that will be called when the quiz starts that pulls up the questions from the questions variable
function showQuestions() {
    var currentQuestion = questions[questionIndex];
    console.log(currentQuestion)

    var questionEl = document.getElementById('quiz-question');
    questionEl.textContent = currentQuestion.question;


    currentQuestion.answersAll.forEach(function(answer, i) {
        //turned the varriable questions into interactive buttons that the user can click to answer
        var answerBtns = document.createElement("button");
        answerBtns.setAttribute("class", "btn");
        answerBtns.setAttribute("value", answer);
        console.log(answerBtns)
        //adds numbers and the text to the buttons 
        answerBtns.textContent = i +1 + ". " + answer;
        //click event that will lisent to a click event on the buttons 
        answerBtns.onclick = answerSelection;
        answers.appendChild(answerBtns);
    });

    function answerSelection() {
        //takes to seconds off the timer when the wrong button is pressed
        if (this.value !== questions[questionIndex].answerCorrect) {
            time = time - 10
            if (time < 10) {
                time = 0
            };
            timerCountDown.textContent = time;
            key.textContent = "Incorrect.";
        } else if(this.value == questions[questionIndex].answerCorrect) {
            key.textContent = "Correct!";
        };
        
        
    };
    //when a button is clicked it moves on to the next question
    //when all question are answered then it will run the stop quiz function
    //figure out how to get to the next question 
    answerBtns.onclick = currentQuestion ++;

    if (currentQuestion == questions.length) {
        stopQuiz();
    };
    
};

function startQuiz() {
    startScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    scoresScreen.setAttribute("class", "hide");
    quizScreen.setAttribute("class", "show");
    
    //start timer 
   timer = setInterval(function(){
     if (time >= 1) {
        timerCountDown.textContent = time;
        time = time - 1;
    } else if (time === 0) {
        timerCountDown.textContent = "";
        stopQuiz();
    }
    }, 1000)
    // pull up questions 
    
    showQuestions()
}




 
//add functions for the buttons to restart the quiz again
tryAgain.onclick = openPage();

submitButton.onclick = saveHighScore();



openPage();