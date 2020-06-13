const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

let lockBoard = false;
let isCardFlipped = false;
let firstCard, secondCard;
let counter = 0;

function flipCard() {

    if(lockBoard) return;

    this.classList.add('flip');

    if(!isCardFlipped) {
        // First click
        isCardFlipped = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatched = firstCard.dataset.framework === secondCard.dataset.framework;

    if(isMatched) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    counter = counter + 2;

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [isCardFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    if(counter === 12) {
        setTimeout(() => {
            alert('Congratulations!!! You Won.');
        }, 1000);
    }
}

function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
}

shuffle();