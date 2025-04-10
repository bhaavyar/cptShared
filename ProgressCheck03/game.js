document.addEventListener('DOMContentLoaded', () => {
    let symbols = ['stop.jpg', 'stop.jpg', 'uturn.jpg', 'uturn.jpg', 'pedcrossing.jpg', 'pedcrossing.jpg', 'addedlane.jpg', 'addedlane.jpg', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let shuffledSymbols = symbols.sort(() => 0.5 - Math.random());
    let gameBoard = document.getElementById('gameBoard');
    let firstCard = null;
    let secondCard = null;
    let score = 0;

    function createCards(symbolArray) {
        for (let i = 0; i < symbolArray.length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbolArray[i];
            card.dataset.index = i;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    }

    function flipCard() {
        if (this.classList.contains('flipped') || secondCard) return;

        let img = document.createElement('img');
    img.src = this.dataset.symbol;
    img.alt = 'Card image';
    img.classList.add('card-img');

    this.appendChild(img);
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        setTimeout(checkMatch, 800);
    }
}


    function checkMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            score++;
            document.getElementById('score').innerText = score;
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            firstCard.innerHTML = '';
secondCard.innerHTML = '';

            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }
        firstCard = null;
        secondCard = null;
    }


    createCards(shuffledSymbols);
});