
// Assigns DOM location page elements as variables. 
var timer = document.querySelector("#timer");
var submitButton = document.querySelector("#submit");
var quizContainer = document.querySelector(".quiz");
// Declaring gobal variables
var secondsLeft = 10;
var correctAnswers = 0;
var incorrectAnswers = 0;






// Add event listener to the start button that invokes 'startTimer' function when clicked.
submitButton.addEventListener("click", initQuiz);
quizContainer.addEventListener("click", checkAnswer)


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
}


// function that saves users answer selection from a click event. 
  // TODO: pass question id and response id to `checkAnswer` function to determine if  
  
  function checkAnswer (event) {

  var usersChoice = event.target; // store the data attributes from the choice element clicked by user
  
  if (usersChoice.matches('.choice')) {
    var state = usersChoice.getAttribute("data-state");
    var choiceID = usersChoice.getAttribute("data-choiceID");
    var questionID = usersChoice.getAttribute("data-questionID");
    
    // console.log(`${state} and ${choiceID} box clicked on question ${questionID}`);

      // call back function to retrieve correct answer for current question
      if (choiceID === quizQuestions[questionID].correctAnswer) {
        console.log("Correct Answer")
      } else {
        console.log("Incorrect Answer")
      }
  }
}




//   quizContainer.addEventListener("click", function(event) {
//   var usersChoice = event.target; // store the data attributes from the choice element clicked by user
//   console.log(usersChoice);

//   if (usersChoice.matches('.choice')) {
//     var state = usersChoice.getAttribute("data-state");
//     var choiceID = usersChoice.getAttribute("data-choiceID");
//     var questionID = usersChoice.getAttribute("data-questionID");
    
//     console.log(`${state} and ${choiceID} box clicked on question ${questionID}`);

//     if (state === "hidden") {
//       // change state
//       usersChoice.dataset.state = "display";
//       // usersChoice.textContent = number; // using a variable to set value
//       usersChoice.textContent = `You selected ${choiceID} answer` // usersChoice.dataset.numberID; // using dot notation to get data attribute. This is equal to "data-number" in html

//     } else {
//       // return state
//       usersChoice.dataset.state = "hidden"
//       usersChoice.textContent = "";
//     }

//   }

// });



//Timer:
function startTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

     // Tests if time has run out
    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      timeUp();
    }
  }, 1000);
}

// function for actions when time expires
function timeUp () {
  console.log("time is up");
}



// Updates correct questions count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
  // if (userChoice === computerChoice) {
  //   ties++;
}

// Updates incorrect questions count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}





// To Do:
// Init Function
  // hide start button  
// Write question validation function - DONE
   // Store user's score in LocalStorage
   // Display next question / hide existing question
   // Reduce time if incorrect
  