let questions = [
  "What should you do at a red light?",
  "What's the speed limit in residential areas?",
  "What does the sign with a U and a cross mean?"
];

let options = [
  ["go", "stop", "slow down", "dance party"],
  ["80mph", "25mph", "60mph", "190mph"],
  ["I don't like U", "No U turn", "no left turn", "no right turn"]
];

let correctAnswers = [1, 1, 1]; // index of correct answers

let currentQuestion = 0;
let score = 0;

let questionElement = document.getElementById("question");
let answersElement = document.getElementById("answers");
let nextButton = document.getElementById("next-btn");
let resultElement = document.getElementById("result");

function showQuestion() {
  questionElement.textContent = questions[currentQuestion];
  answersElement.innerHTML = "";

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

  nextButton.style.display = "none";
  resultElement.textContent = "";
}

function selectAnswer(index) {
  if (index === correctAnswers[currentQuestion]) {
    score++;
  }

  let buttons = answersElement.children;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    if (i === correctAnswers[currentQuestion]) {
      buttons[i].style.backgroundColor = "#90ee90"; // green
    } else {
      buttons[i].style.backgroundColor = "#f08080"; // red
    }
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", function () {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionElement.textContent = "Quiz Completed!";
  answersElement.innerHTML = "";
  nextButton.style.display = "none";
  resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

showQuestion();