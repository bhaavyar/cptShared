// script.js

let questions = [
    {
        prompt: `The central area of the kidney is called the: `,
        options: [
            "Storage of calcium",
            "Production of red blood cells",
            "Protection of internal organs",
            "Formation of joints",
        ],
        answer: "Production of red blood cells",
    },

    {
        prompt: `Which of the following parts is not found in the urinary system?`,
        options: [
            "Ureters",
            "Urethra",
            "Bladder",
            "Rectum",
        ],
        answer: "Rectum",
    },

    {
        prompt: `Urine is stored here until you’re ready to pee:`,
        options: [
            "Kidneys",
            "Bladder",
            "The garage",
            "Urethra",
        ],
        answer: "bladder",
    },

    {
        prompt: `The main function of the urinary system is to:`,
        options: [
            "Get rid of waste and extra fluid",
            "Keep waste in the body",
            "Get rid of nutrients",
            "Make you poop",
        ],
        answer: "Get rid of waste and extra fluid",
    },

    {
        prompt: `Urine is carried from the kidneys to the bladder by two thin tubes called:`,
        options: [
            "Ureters",
            "Tubulars",
            "Capillaries",
            "Urinary Tracts",
        ],
        answer: "Ureters",
    },
];

// Get Elements
//Cited: GeeksForGeeks.org
let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

//amount of time per question is 10, multiplied by number of questions
let currentQuestionIndex = 0;
let time = questions.length * 10;
let timerId;

// Function to randomize the questions array 
function randomizeQuestions(questionsArray) 
{
	if(questionsArray.length < 1)
	{
		return "no questions for this topic";
	}
	else
	{
		for (let i = questionsArray.length - 1; i > 0; i--) 
		{
			// Generate a random index from 0 to i
			let randomIndex = Math.floor(Math.random() * (i + 1));
			
			// Swap the current element with the random element
			let temp = questionsArray[i];
			questionsArray[i] = questionsArray[randomIndex];
			questionsArray[randomIndex] = temp;
		}
	}
}

// Start quiz and hide frontpage
function quizStart() {
    // Randomize the questions before starting the quiz
    randomizeQuestions(questions);

    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function (choice, i) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions, Stop timer and show final score
function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage along with users' name
function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        alert("Your Score has been Submitted");
    }
}

// Save users' score after pressing enter
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Your Score has been Submitted");
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit
submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz
startBtn.onclick = quizStart;


// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;
