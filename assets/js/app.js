const cardsNumeration = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardsTypes = ['C', 'D', 'H', 'S'];
let deck = [];
let playerHand = [];
let computerHand = [];

const initDeck = () => {
    for (num of cardsNumeration)
        for (type of cardsTypes)
            deck.push(`${num}${type}`)

    deck = _.shuffle(deck);
    console.log(deck)
}

const askCard = () => {
    playerHand.push(deck.pop());
    console.log(playerHand[playerHand.length - 1]);

    let hand = document.getElementsByClassName('cards-container')[0];
    hand.innerHTML += `<img src="assets/img/${playerHand[playerHand.length - 1]}.png" width="100vw">`;

    if (handIs21(playerHand)) {
        let askBtn = document.getElementById('ask-btn');
        askBtn.disabled = true
        askBtn.classList.add('disabled');
        pcTurn();
        return;
    }
}

const handIs21 = (hand) => {
    let total = 0;
    for (card of hand) {
        let letter = card.charAt(0)
        total += (letter === 'A') ? 1 : (letter === 'J') ? 11 : (letter === 'Q') ? 12 : (letter.charAt(0) === 'K') ? 13 : parseInt(letter);
    }

    return total >= 21;
}

const pcTurn = () => {
    while (!handIs21(computerHand)) {
        computerHand.push(deck.pop());
        console.log(computerHand[computerHand.length - 1]);

        let hand = document.getElementsByClassName('cards-container')[1];
        hand.innerHTML += `<img src="assets/img/${computerHand[computerHand.length - 1]}.png" width="100vw">`;
    }
}

const newGame = () => {
    deck = [];
    initDeck();

    let hands = document.getElementsByClassName('cards-container');
    for (hand of hands)
        hand.innerHTML = '';

    let askBtn = document.getElementById('ask-btn');
    askBtn.disabled = false;
    askBtn.classList.remove('disabled');

    playerHand = [];
    computerHand = [];
}

const stopGame = () => {

}

initDeck();