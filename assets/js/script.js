
// Assigns DOM location page elements as variables. 
var timer = document.querySelector("#timer");
var submitButton = document.querySelector("#submit");
var quizContainer = document.querySelector(".quiz");
var scoreDisplay = document.querySelector("#score")
var saveScore = document.querySelector("#saveScore");
var highScores = document.querySelector("#highScores");
var goBack = document.querySelector("#goBack");
var clearHighScore = document.querySelector("#clearHighScore");

// used to hide quiz questions and display high score at end of quiz
var quizPanel = document.querySelector(".quizPanel"); 
var highScoresPanel = document.querySelector(".highScoresPanel")

// Declaring quiz variables
var secondsLeft = 10;
var score = 0;
var incorrectAnswers = 0;


// Add event listeners to invoke functions when clicked.
submitButton.addEventListener("click", initQuiz);
quizContainer.addEventListener("click", checkAnswer);



// Declare an Object Array of Quiz Questions
const quizQuestions = [
  {
    question: "This is question #1",
    answers: {
      1: "Answer 1",
      2: "Answer 2",
      3: "Answer 3", 
    },
    correctAnswer: "1"
  },
  {
    question: "This is question #2",
    answers: {
      1: "Answer 1",
      2: "Answer 2",
      3: "Answer 3", 
    },
    correctAnswer: "2"
  },
  {
    question: "This is question #3",
    answers: {
      1: "Answer 1",
      2: "Answer 2",
      3: "Answer 3", 
    },
    correctAnswer: "3"
  }
];

// This function initializes the quiz by displaying questions
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

// this function shows the Question Card from the passed argument and hides remaining questions
function showQuestion (n) {
  // stores an array of all questions cards in a variable
  var allQuestions = document.querySelectorAll(".questionContainer");

  // checks to see if the question (from the passed argument) is inactive before displaying 
  if (allQuestions[n].dataset.state = "inactive") {
    allQuestions[n].setAttribute("data-state", "active");
    allQuestions[n].setAttribute("style", "display: block;");
  }
  
  // loop through all nodes in the array and hide questions cards that don't match argument passed to function
  for (var i = 0; i < allQuestions.length; i++) {
    if (allQuestions[i] !== allQuestions[n]) {
      allQuestions[i].setAttribute("data-state", "inactive");
      allQuestions[i].setAttribute("style", "display: none;");
    } 
  }
  submitButton.disabled = true;
}


// function that saves users answer selection from a click event. 
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

      } else {
        console.log("Incorrect Answer")
        messageContent.textContent = `Incorrect. Lose 5 seconds`;
        // decrement countdown
        //TODO: add if statement to check if secondsleft < 5
        secondsLeft = secondsLeft-5;
      }
  }
}

//Timer:
function startTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

     // Tests if time has run out
    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to 
      timeUp();
    }
  }, 1000);
}

// function for actions when time expires
function timeUp() {
  timer.textContent = "Time is up 🏆 ";
  messageContent.textContent = "Time is up 🏆 ";
  submitButton.disabled = false;
  renderHighScores()
}

// function displays Final Score Screen & Hides Questions
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
  console.log(initialsLocal, highScoreLocal);
  highScores.textContent = `${initialsLocal}: ${highScoreLocal}`;
}

// save current score to localStorage on saveScore btn click
saveScore.addEventListener("click", function(event){
  event.preventDefault();

  // store initials in var from form input field
  var initials = document.querySelector("#initials").value.trim();

  // Set storage
  localStorage.setItem("Initials", initials);
  localStorage.setItem("High Score", score);
  renderHighScores()
})
  
goBack.addEventListener("click", function(event){
console.log("Go Back function called")
location.reload();
})
  
  







// To Do:
  // Write Clear Scores Function
  // Handle View High Scores

// Error Handling
  // End Quiz when there's no more questions by calling saveScore
  