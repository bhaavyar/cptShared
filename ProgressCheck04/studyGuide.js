//Questions from: https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/
let questions = [
  "What should you do when reaching an intersection where a person operating a motorized wheelchair has entered the crosswalk?",
  "What is one of the most common causes of traffic collisions?",
  "Any driver who willfully flees or attempts to evade law enforcement, during which a person is seriously injured, is subject to:",
  "What should a driver do who is stopped at an intersection and wants to make a left turn?",
  "In addition to setting your parking brake, what should you do when parking on a hill?"
];
//answer array in same order as questions
let answers = [
  "Remain stopped behind the crosswalk line until the motorized wheelchair has safely finished crossing.",
  "Driver distractions.",
  "Imprisonment in a state prison for up to seven years.",
  "Give the right-of-way to any approaching vehicle that is close enough to be dangerous.",
  "Make sure your vehicle is in the “park” position or in gear."
];

let currentCard = 0;
let isFlipped = false; //checks if card has been clicked/flipped

let flashcard = document.getElementById("flashcard");
let front = document.getElementById("card-front");
let back = document.getElementById("card-back");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");

// Show current card
function showCard() 
{
  front.textContent = questions[currentCard]; //puts text for question on card
  back.textContent  = answers[currentCard]; //puts text for answer on card
  flashcard.classList.remove("flipped");
  isFlipped = false;
}

function handleCardClick() {
  isFlipped = !isFlipped; //flips card
  flashcard.classList.toggle("flipped");
}

function handleNextClick() { 
  currentCard++; //increments card number
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
