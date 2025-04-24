//stackoverflow.com, 2D array - W3Schools
let questions = [
  "What do you do on a red light?",
  "what does a railroad sign look like?",
  "What does this sign mean?",
  "what does this sign mean'?"
];

let answers = [
  "stop",
  "insert image",
  "yeild",
  "railroad crossinge"
];

let currentCard = 0;
let isFlipped = false;

let flashcard = document.getElementById("flashcard");
let front = document.getElementById("card-front");
let back = document.getElementById("card-back");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");

// Show current card
function showCard() {
  front.textContent = questions[currentCard];
  back.textContent  = answers[currentCard];
  flashcard.classList.remove("flipped");
  isFlipped = false;
}

function handleCardClick() {
  isFlipped = !isFlipped;
  flashcard.classList.toggle("flipped");
}

function handleNextClick() {
  currentCard++;
  if (currentCard >= questions.length) currentCard = 0;      // loop to start
  showCard();
}

function handlePrevClick() {
  currentCard--;
  if (currentCard < 0) currentCard = questions.length - 1;   // loop to end
  showCard();
}

flashcard.addEventListener("click", handleCardClick);
nextBtn.addEventListener("click", handleNextClick);
prevBtn.addEventListener("click", handlePrevClick);

// Initialize first card
showCard();
