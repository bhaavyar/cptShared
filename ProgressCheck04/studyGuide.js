//stackoverflow.com, 2D array - W3Schools
let questions = [
  "What should you do at a red light?",
  "What's the speed limit in residential areas?",
  "What does the sign with a U and a cross mean?"
]; // array of strings

let options = [
  ["go", "stop", "slow down", "dance party"],
  ["80mph", "25mph", "60mph", "190mph"],
  ["I don't like U", "No U turn", "no left turn", "no right turn"] //2D array(array of arrays w/ answers)
];

let correctAnswers = [2, 1, 1]; // Indexes of correct answers

let currentQuestion = 0;
let score = 0;

let questionElement = document.getElementById("question");
let answersElement = document.getElementById("answers");
let nextButton = document.getElementById("next-btn");
let resultElement = document.getElementById("result");

function showQuestion()
{
questionElement.textContent = questions[currentQuestion]; // Clear any old answer buttons from the previous question
answersElement.innerHTML = "";

// Loop through the answer choices for the current question
let currentOptions = options[currentQuestion];
for (let i = 0; i < currentOptions.length; i++) { // Create a new button element
let button = document.createElement("button"); // Set the button's text to the current answer choice
button.textContent = currentOptions[i];  // Add a class to the button for styling
button.className = "answer-btn"; // Add a click event to the button to check the selected answer
button.addEventListener("click", function() {
selectAnswer(i);
});
  // Add the button to the page
answersElement.appendChild(button);
}

nextButton.style.display = "none"; // Hide the "Next" button until an answer is selected
resultElement.textContent = ""; // Clear any previous result message
}
// function with array passed in, if else, and a return
function selectAnswer(questions, index) 
{
	if (index === correctAnswers[currentQuestion])
	{
		score++; //Checks if the clicked answer was correct, and increases the score
	}

	let buttons = answersElement.children;
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].disabled = true;

		if (i === correctAnswers[currentQuestion])
		{
			buttons[i].style.backgroundColor = "#90ee90"; // green for correct
		}
		else
		{
			buttons[i].style.backgroundColor = "#f08080"; // red for incorrect
		}
	}
	nextButton.style.display = "inline-block"; //Shows the "Next" button after an answer is selected.
	return currentQuestion;
}

nextButton.addEventListener("click", function() //https://stackoverflow.com/questions/73348500/javascript-event-listener-structure
{
currentQuestion = currentQuestion + 1;

if (currentQuestion < questions.length)
{
showQuestion();
}
else //Adds a click listener to the "Next" button. Moves to the next question or shows the final result if there are no more questions.
{
showResult();
}
}
);

function showResult()
{
questionElement.textContent = "Quiz Completed!";
answersElement.innerHTML = "";
nextButton.style.display = "none";
resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

showQuestion();