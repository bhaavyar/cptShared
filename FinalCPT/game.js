/* https://marina-ferreira.github.io/tutorials/js/memory-game/ */
// https://www.geeksforgeeks.org/css-grid-layout-module/
// https://www.youtube.com/watch?v=mohIQB_70Xk&t=60s
document.addEventListener('DOMContentLoaded', () => 
{
	// === Memory Game Variables ===
	// Array of image file names (2 of each to make pairs)
	let symbols = [
	'stop.jpg', 'stop.jpg',// https://www.photos-public-domain.com/wp-content/uploads/2010/10/stop_sign.jpg
	'uturn.jpg', 'uturn.jpg',// https://static.vecteezy.com/system/resources/previews/002/306/707/original/u-turn-left-traffic-road-sign-free-vector.jpg
	'pedcrossing.jpg', 'pedcrossing.jpg',// https://static.grainger.com/rp/s/is/image/Grainger/3ZTJ6_AL01
	'addedlane.jpg', 'addedlane.jpg',// https://roadinstructor.com/wp-content/uploads/2023/01/added-lane-sign.png
	'noparking.jpg', 'noparking.jpg', //https://www.istockphoto.com/photos/no-parking-sign
    'yield.jpg', 'yield.jpg', //https://ledlighting-solutions.com/solar-powered-flashing-led-yield-sign.html
    'railcross.jpg', 'railcross.jpg', //https://driving-tests.org/road-signs/railroad-crossing-sign/
    'freeway.jpg', 'freeway.jpg' //https://dmv-permit-test.com/road-signs/cross-road-sign
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
        "If a student driver commits a traffic offense, the responsibility lies with:",
        "What's the speed limit in residential areas?",
        "What does the sign with a U and a cross mean?",
        "When we drive in the city we use the:",
        "As a car enters a curve it tends to go: ",
        "When you are driving, it is most difficult to control the space to your",
        "Approximately what percent of crashes are caused by driver error",
        "A teen's driver's chance of crashing is higher when driving:"
    ];

    // Multiple choice options for each question
    let options = [
        ["the student", "the instructor", "the parent", "B and C"],
        ["40mph", "25mph", "20mph", "30mph"],
        ["I don't like U", "No U turn", "no left turn", "no right turn"],
        ["10 second rule", "2 second rule", "15 second rule", "12 second rule"],
        ["to the right", "to the left", "straight", "too fast"],
        ["rear", "front", "right", "left"],
        ["33%", "50%", "67%", "90%"],
        ["Between 9pm and 6am", "A shared family vehicle", "Monday through Thursday", "To and from school"]
    ];

    // Index of correct answer for each question
    let correctAnswers = [3, 1, 1, 3, 2, 0, 3, 1];

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
        if (currentQuestion >= questions.length) 
        {
            showResult();
            return;
        }

        questionElement.textContent = questions[currentQuestion];
        answersElement.innerHTML = ""; // Clear previous options

        // Generate answer buttons
        let currentOptions = options[currentQuestion];
        for (let i = 0; i < currentOptions.length; i++) 
        {
            let button = document.createElement("button");
            button.textContent = currentOptions[i];
            button.className = "answer-btn";
            button.addEventListener("click", function () 
            {
                selectAnswer(i);
            });
            answersElement.appendChild(button);
        }

        // Hide "Next" button until an answer is picked
        nextButton.style.display = "none";
        resultElement.textContent = "";
    }

    
	function updateAnswerButtons(buttonsArray, correctIndex) 
	{
    for (var i = 0; i < buttonsArray.length; i++) {
        buttonsArray[i].disabled = true;

        if (i === correctIndex) {
            buttonsArray[i].style.backgroundColor = "#90ee90"; // green for correct
        } else {
            buttonsArray[i].style.backgroundColor = "#f08080"; // red for wrong
        }
    }

    return buttonsArray; // returning updated buttons (optional, but good practice)
}

    //MAIN FUNCTION FOR COLLEGE BOARD CPT
	function selectAnswer(index, questions) 
	{
		var isCorrect = index === correctAnswers[currentQuestion]; // Check if the selected answer index matches the correct answer 
		if (isCorrect) 
		{
			quizScore++; // If the answer is correct, increase the quiz score
		}
		var buttons = answersElement.children; // Get all the answer buttons from the answers container
		updateAnswerButtons(buttons, correctAnswers[currentQuestion]); // Call a separate function to update the button styles (green/red)
		nextButton.style.display = "inline-block"; // Always show the "Next" button after an answer is selected

		for (var i = 0; i < questions.length; i++) // Loop through all the questions to decide the next action
		{
			if (currentQuestion === i && i === questions.length - 1) // If we are on the last question
			{
				nextButton.onclick = showResult; // Clicking next will show the final results
				break; // Exit the loop since result has been shown
			} 
			else if (currentQuestion === i)  // If we are on any other question
			{
				nextButton.onclick = function() // Clicking next will go to the next question
				{
					handleNextClick(questions, options);
				};
				break; // Exit the loop since its still going
			}
		}
		return quizScore; // Return the updated quiz score
	}

/* ---------- Advance to next question handler ---------- */
	function handleNextClick() 
	{
	  currentQuestion++;
	  showCard(questions, answers);    // Draw the next card
	  nextButton.style.display = "none"; // Hide until the next answer is chosen
	}

	/* ---------- Initial setup ---------- */
	nextButton.style.display = "none";     // Hidden at the very start


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
    function showResult() 
	{
        questionElement.textContent = "Quiz Completed!";
        answersElement.innerHTML = "";
        nextButton.style.display = "none";
        resultElement.textContent = `You scored ${quizScore} out of ${questions.length}!`;
    }

    // === Initial setup on page load ===
    createCards(shuffledSymbols); // Set up cards
    questionElement.textContent = "Match cards to get a quiz question!"; // Initial message
});
