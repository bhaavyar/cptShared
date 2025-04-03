let symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let shuffledSymbols = symbols.sort(() => 0.5 - Math.random()); // shuffles all cards/symbols
let gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let score = 0;

function createCards(symbolArray) {
    let i = 0;
    while (i < symbolArray.length) {
        let card = document.createElement('div');
        card.classList.add('card'); //classList is a property of HTML elements that allows you to work with their CSS classes. The .add('card') adds the "card" class to the element
        card.dataset.symbol = symbolArray[i]; // stores card's symbol
        card.dataset.index = i; // stores card's position in array
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card); // adds to gameboard
        i++;
    }
}

function flipCard()
{
    if (this.classList.contains('flipped') || secondCard) return; //Checks if the clicked card (this) already has the "flipped" class.
    //If true, the function exits (return) to prevent re-flipping. If secondCard is already assigned, it means the player has flipped two cards.
    this.innerText = this.dataset.symbol; //retrieves the card's stored symbol and makes symbol visible
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this; //If firstCard is not yet assigned, set firstCard = this.
    } else {
        secondCard = this; //Waits 800 milliseconds before running checkMatch(). This delay allows the player to see the second card before checking for a match.
        setTimeout(checkMatch, 800);
    }
}
//The .dataset property in JavaScript allows you to access and manipulate custom data attributes (data-*) on an HTML element.
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) //Compares the data-symbol value of firstCard and secondCard.
    {
        score++; //increment score
        document.getElementById('score').innerText = score; //Updates score's text content to reflect the new score.
        firstCard.removeEventListener('click', flipCard); // removes click event listener
        secondCard.removeEventListener('click', flipCard); //This prevents the player from flipping matched cards again.
    } else {
        firstCard.innerText = ''; //Clears the innerText of both cards, hiding the symbols again.
        secondCard.innerText = '';
        firstCard.classList.remove('flipped'); // allows them to be clicked again
        secondCard.classList.remove('flipped'); // remove flipped listener
    }
    firstCard = null; // resets first and second card
    secondCard = null;
}

createCards(shuffledSymbols); // creates board for next round