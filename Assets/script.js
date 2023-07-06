var startButton = document.getElementById("startButton");
var questionContainer = document.getElementById("question");
var timeContainer = document.getElementById("time");
var highScoreContainer = document.getElementById("highScore");

// Event listener for the start button
startButton.addEventListener("click", startQuiz);

// Global variables
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timerInterval;
var highScore = 0;

// Array of quiz questions
var quizQuestions = [
  {
    question: "Who created Javascript?",
    choices: ["Spongebob", "Alan Smith", "Brendan Eich", "Mike Tyson"],
    correctAnswer: "Brendan Eich",
  },
  {
    question: "?",
    choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
  },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
]

// Function to start the quiz
function startQuiz() {
  // Hide the start button
  startButton.style.display = "none";

  // Start the timer
  startTimer();

  // Display the first question
  displayQuestion();
}

// Function to start the timer
function startTimer() {
  // Display the initial time
  timeContainer.textContent = "Time: " + timeLeft;

  // Set up the timer interval
  timerInterval = setInterval(function () {
    timeLeft--;
    timeContainer.textContent = "Time: " + timeLeft;

    // Check if time has run out
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display a question
function displayQuestion() {
  // Clear the question container
  questionContainer.innerHTML = "";

  // Get the current question
  var currentQuestion = quizQuestions[currentQuestionIndex];

  // Create a new question element
  var questionElement = document.createElement("h2");
  questionElement.textContent = currentQuestion.question;

  // Append the question element to the question container
  questionContainer.appendChild(questionElement);

  // Create a new unordered list for the choices
  var choicesList = document.createElement("ul");

  // Loop through the choices and create list items
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];

    // Create a new list item
    var listItem = document.createElement("li");

    // Create a new button for the choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;

    // Set up an event listener for the choice button
    choiceButton.addEventListener("click", function () {
      // Check if the chosen answer is correct
      if (this.textContent === currentQuestion.correctAnswer) {
        // Increment the score for a correct answer
        score++;
      } else {
        // Decrement the time for an incorrect answer
        timeLeft -= 10;
      }

      // Move to the next question
      currentQuestionIndex++;

      // Check if all questions have been answered
      if (currentQuestionIndex >= quizQuestions.length) {
        // End the quiz
        endQuiz();
      } else {
        // Display the next question
        displayQuestion();
      }
    });

    // Append the choice button to the list item
    listItem.appendChild(choiceButton);

    // Append the list item to the choices list
    choicesList.appendChild(listItem);
  }

  // Append the choices list to the question container
  questionContainer.appendChild(choicesList);
}

// Function to end the quiz
function endQuiz() {
  // Clear the question container
  questionContainer.innerHTML = "";

  // Stop the timer
  clearInterval(timerInterval);

  // Update the high score if necessary
  if (score > highScore) {
    highScore = score;
    highScoreContainer.textContent = "Highscore: " + highScore;
  }

  // Display the final score
  var finalScoreElement = document.createElement("h2");
  finalScoreElement.textContent = "Your score: " + score;
  questionContainer.appendChild(finalScoreElement);

  // Show the start button to allow restarting the quiz
  startButton.style.display = "block";

  // Reset the quiz variables
  currentQuestionIndex = 0;
  timeLeft = 60;
  score = 0;
};