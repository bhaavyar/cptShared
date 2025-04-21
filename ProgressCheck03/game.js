
document.addEventListener('DOMContentLoaded', () => {
    // === Memory Game Variables ===
    // Array of image file names (2 of each to make pairs)
    let symbols = [
        'stop.jpg', 'stop.jpg',
        'uturn.jpg', 'uturn.jpg',
        'pedcrossing.jpg', 'pedcrossing.jpg',
        'addedlane.jpg', 'addedlane.jpg',
        'noparking.jpg', 'noparking.jpg',
        'yield.jpg', 'yield.jpg',
        'railcross.jpg', 'railcross.jpg',
        'freeway.jpg', 'freeway.jpg'
    ];

    // Shuffle the array randomly
    let shuffledSymbols = symbols.sort(() => 0.5 - Math.random());

    // Grab the game board element from the DOM
    let gameBoard = document.getElementById('gameBoard');

    // Variables to track the first and second flipped cards
    let firstCard = null;
    let secondCard = null;

    // Score tracker for correct matches
    let memoryScore = 0;

    // Boolean to pause game while quiz is active
    let gamePaused = false;

    // === Quiz Variables ===
    // List of quiz questions
    let questions = [
        "What should you do at a red light?",
        "What's the speed limit in residential areas?",
        "What does the sign with a U and a cross mean?",
        "What is the color of the stop sign?",
        "What should you do at a green light?",
        "When you are driving, it is most difficult to control the space to your",
        "Approximately what percent of crashes are caused by driver error",
        "A teen's driver's chance of crashing is higher when driving:"
    ];

    // Multiple choice options for each question
    let options = [
        ["go", "stop", "slow down", "dance party"],
        ["80mph", "25mph", "60mph", "190mph"],
        ["I don't like U", "No U turn", "no left turn", "no right turn"],
        ["red", "orange", "yellow", "green"],
        ["go", "stop", "slow down", "dance party"],
        ["rear", "front", "right", "left"],
        ["33%", "50%", "67%", "90%"],
        ["Between 9pm and 6am", "A shared family vehicle", "Monday through Thursday", "To and from school"]
    ];

    // Index of correct answer for each question
    let correctAnswers = [1, 1, 1, 0, 0, 0, 3, 1];

    // Track current quiz question
    let currentQuestion = 0;
    let quizScore = 0;

    // Get quiz-related DOM elements
    let questionElement = document.getElementById("question");
    let answersElement = document.getElementById("answers");
    let nextButton = document.getElementById("next-btn");
    let resultElement = document.getElementById("result");

    // === Create game cards dynamically ===
    function createCards(symbolArray) {
        for (let i = 0; i < symbolArray.length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbolArray[i]; // store image filename as data attribute
            card.dataset.index = i;
            card.addEventListener('click', flipCard); // attach click handler
            gameBoard.appendChild(card);
        }
    }

    // === Flip card logic ===
    function flipCard() {
        // If already flipped or game is paused, do nothing
        if (this.classList.contains('flipped') || secondCard || gamePaused) return;

        // Create image element inside the card
        let img = document.createElement('img');
        img.src = this.dataset.symbol;
        img.alt = 'Card image';
        img.classList.add('card-img');

        this.appendChild(img);
        this.classList.add('flipped');

        // Track first and second flipped cards
        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            setTimeout(checkMatch, 800); // delay to show both cards
        }
    }

    // === Check if the two flipped cards match ===
    function checkMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            // Match found
            memoryScore++;
            document.getElementById('score').innerText = memoryScore;

            // Disable click for matched cards
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            // Pause game and show quiz question
            gamePaused = true;
            showQuestion();
        } else {
            // No match — reset cards
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }

        // Reset card trackers
        firstCard = null;
        secondCard = null;
    }

    // === Display quiz question and options ===
    function showQuestion() {
        // All questions answered
        if (currentQuestion >= questions.length) {
            showResult();
            return;
        }

        questionElement.textContent = questions[currentQuestion];
        answersElement.innerHTML = ""; // Clear previous options

        // Generate answer buttons
        let currentOptions = options[currentQuestion];
        for (let i = 0; i < currentOptions.length; i++) {
            let button = document.createElement("button");
            button.textContent = currentOptions[i];
            button.className = "answer-btn";
            button.addEventListener("click", function () {
                selectAnswer(i);
            });
            answersElement.appendChild(button);
        }

        // Hide "Next" button until an answer is picked
        nextButton.style.display = "none";
        resultElement.textContent = "";
    }

    // === Handle answer selection ===
    function selectAnswer(index, questions, options) {
  var isCorrect = index === correctAnswers[currentQuestion]; // checks is index equals correct answers is true
  if (isCorrect) {
    score++; // increments score
  }

  var buttons = answersElement.children;
  for (var i = 0; i < buttons.length; i++) { // if answer unclicked leave buttons disabled/no color
    buttons[i].disabled = true;
    if (i === correctAnswers[currentQuestion]) {
      buttons[i].style.backgroundColor = "#90ee90"; // if answer correct, color green
    } else {
      buttons[i].style.backgroundColor = "#f08080"; // if answer wrong, color red
    }
  }

  nextButton.style.display = "inline-block";

  return isCorrect;
}

nextButton.addEventListener("click", handleNextClick);

function handleNextClick() {
  currentQuestion++; // moves to next question
  if (currentQuestion < questions.length) {
    showQuestion(questions, options, currentQuestion); //if under range of questions, keep showing questions
  } else {
    showResult();
  }
}
    // === Go to next quiz question ===
    nextButton.addEventListener("click", function () {
        currentQuestion++;
        gamePaused = false; // Resume memory game

        // If questions remain, prompt user to make another match
        if (currentQuestion < questions.length) {
            questionElement.textContent = "Match cards to get another question!";
            answersElement.innerHTML = "";
            nextButton.style.display = "none";
            resultElement.textContent = "";
        } else {
            // Quiz over
            showResult();
        }
    });

    // === Show final quiz score ===
    function showResult() {
        questionElement.textContent = "Quiz Completed!";
        answersElement.innerHTML = "";
        nextButton.style.display = "none";
        resultElement.textContent = `You scored ${quizScore} out of ${questions.length}!`;
    }

    // === Initial setup on page load ===
    createCards(shuffledSymbols); // Set up cards
    questionElement.textContent = "Match cards to get a quiz question!"; // Initial message
});
