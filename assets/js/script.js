
// Assigns DOM location page elements as variables. 
var timer = document.querySelector("#timer");
var timerInterval; // stores minutes left
var submitButton = document.querySelector("#submit");
var quizContainer = document.querySelector(".quiz");
var scoreDisplay = document.querySelector("#score")
var saveScore = document.querySelector("#saveScore");
var highScores = document.querySelector("#highScores");
var goBack = document.querySelector("#goBack");
var clearHighScore = document.querySelector("#clearHighScore");
var viewHighScores = document.querySelector("#viewHighScores");
var quizPanel = document.querySelector(".quizPanel"); 
var highScoresPanel = document.querySelector(".highScoresPanel")

// Declaring quiz variables
var secondsLeft = 30;
var score = 0;

// Add event listeners to invoke functions when clicked.
submitButton.addEventListener("click", initQuiz);
quizContainer.addEventListener("click", checkAnswer);



// Declare an Object Array of Quiz Questions
const quizQuestions = [
  {
    question: "Which of the following type of variable is visible only within a function where it is defined?",
    answers: {
      1: "global variable",
      2: "local variable",
      3: "None of the above.", 
    },
    correctAnswer: "2"
  },
  {
    question: "Which of the following is a valid type of function javascript supports?",
    answers: {
      1: "named function",
      2: "anonymous function",
      3: "Both of the above.", 
    },
    correctAnswer: "3"
  },
  {
    question: "Which built-in method returns the calling string value converted to upper case?",
    answers: {
      1: "toUpperCase()",
      2: "toUpper()",
      3: "None of the above.", 
    },
    correctAnswer: "1"
  }
];

// Initializes quiz and displays first question
function initQuiz () {
  // declare array to store output
  const questionOutput = [];
  // callback function to build an array of questions and answers for UI display
  quizQuestions.forEach (
    (currentQuestion, questionID) => {
      const answers = [];

      // for loop to enumerate through currentQuestion's answers and push html elements as a string to the `answers` var 
      for(Number in currentQuestion.answers){

        // build answer html for UI and push to `answers` array
        answers.push(
          `<li class="choice" data-questionID="${questionID}" data-choiceID="${Number}" data-state="active">
          ${Number}. 
          ${currentQuestion.answers[Number]}
          </li>`
        );
      }

      // console.log(answers);
      // add this question and answers to the output var
      questionOutput.push(
        `<div class="questionContainer" data-questionID="${questionID}" data-state="inactive">
        <h2>${currentQuestion.question}</h2>
        <!-- display array of answers from question object -->
        <ul class="answerContainer">${answers.join('')}</ul>
        </div>`
      )
    }
  );
  // combine output list into one string of HTML
  quizContainer.innerHTML = questionOutput.join('');
  
  startTimer();
  showQuestion(0);
}

// Renders Question Cards
function showQuestion (n) {
  // stores an array of all questions cards in a variable
  var allQuestions = document.querySelectorAll(".questionContainer");
  // checks to see if the question (from the passed argument) is inactive before displaying 
  
  // loop through all nodes in the array and hide questions cards that don't match argument passed to function
  for (var i = 0; i < allQuestions.length; i++) {
    // add condition when the n argument exceeds question count
    if (n >= allQuestions.length){
      timeUp();
      break;
    } 
      // Hide all question cards where the n argument doesn't match
      else if (allQuestions[i] !== allQuestions[n]) {
        allQuestions[i].setAttribute("data-state", "inactive");
        allQuestions[i].setAttribute("style", "display: none;");
      } 
      else if (allQuestions[n].dataset.state = "inactive") {
        allQuestions[n].setAttribute("data-state", "active");
        allQuestions[n].setAttribute("style", "display: block;");
      }
  }
  submitButton.disabled = true;
}


// Checks user's choice against correct answer  
  function checkAnswer (event) {

  var usersChoice = event.target; // store the data attributes from the choice element clicked by user
  
  if (usersChoice.matches('.choice')) {
    var state = usersChoice.getAttribute("data-state");
    var choiceID = usersChoice.getAttribute("data-choiceID");
    var questionID = usersChoice.getAttribute("data-questionID");
    
    // console.log(`${state} and ${choiceID} box clicked on question ${questionID}`);

      // call back function to retrieve correct answer for current question
      if (choiceID === quizQuestions[questionID].correctAnswer) {
        
        // update score count by one
        score++;
        
        // display score and correct answer message
        scoreDisplay.textContent = `Score: ${score}`;
        messageContent.textContent = `Correct`;
        
        // change to next question by calling showQuestion fuction and passing current question + 1 argument
        const nextQuestion = ++questionID;
        showQuestion(nextQuestion);

      } else if (secondsLeft >= 5) {
        messageContent.textContent = `Incorrect. Lose 5 seconds`;
        // decrement countdown
        secondsLeft = secondsLeft-5;
      } else {
        // Immediately end Quiz if there's no time left to decrement
        clearInterval(timerInterval);
        timeUp();
      }
  }
}

// Starts timer:
function startTimer() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

     // Tests if time has run out
    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to 
      
    }
  
    // Tests if time has run out
    if (secondsLeft === 0) {
      // Clears interval
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

// Clears time when all questions are answered
function timeUp() {
  if (secondsLeft > 5) {
    // Displays High Score UI when all questions are answered and time is left
    clearInterval(timerInterval);
    timer.textContent = "You answered all questions 🏆 ";
    submitButton.disabled = false;
    renderHighScores()
  } else if (secondsLeft <= 5) {
    // Displays High Score UI when time is expired
    clearInterval(timerInterval);
    timer.textContent = "Time is up 🏆 ";
    submitButton.disabled = false;
    renderHighScores()
  }
  
}

// Displays High Score Screen & Hides Questions
function renderHighScores() {
  // hide all choice cards
  quizPanel.setAttribute("style", "display: none;");
  // display highScoresContainer
  highScoresPanel.setAttribute("style", "display: block;");
  // display final score
  finalScore.textContent = `Your Score: ${score}`;


// render Previous High Scores from localStorage
  var initialsLocal = localStorage.getItem("Initials")
  var highScoreLocal = localStorage.getItem("High Score")
  if (initialsLocal !== null || highScoreLocal !== null) {
  highScores.textContent = `${initialsLocal}: ${highScoreLocal}`;
    } else {
      highScores.textContent = "No High Scores saved"
    }
}

// Saves score to localStorage
saveScore.addEventListener("click", function(event){
  console.log("saveScore Called")
  event.preventDefault();

  // store initials in var from form input field
  var initials = document.querySelector("#initials").value.trim();

  // Set storage
  localStorage.setItem("Initials", initials);
  localStorage.setItem("High Score", score);
  renderHighScores();
})

// Clears score from localStorage
clearHighScore.addEventListener("click", function(event){
  // clear storage
  localStorage.removeItem("Initials", initials);
  localStorage.removeItem("High Score", score);
  renderHighScores()
})

// Reloads page to start quiz over from "Go Back" click
goBack.addEventListener("click", function(event){
location.reload();
})

// Renders High Score Page from "View High Score Link" click
viewHighScores.addEventListener("click", function(event){
  renderHighScores()
  SaveHighScore.setAttribute("style", "display: none;");

})
  
  







// To Do:
  // Write Clear Scores Function
  // Handle View High Scores

// Error Handling
  // End Quiz when there's no more questions by calling saveScore
  