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
}

const newGame = () => {
    deck = [];
    initDeck();

    let hands = document.getElementsByClassName('cards-container');
    for (hand of hands)
        hand.innerHTML = '';

    disableBtn('ask-btn', false);
    disableBtn('stop-btn', false);

    playerHand = [];
    computerHand = [];
}

const askCard = async () => {
    playerHand.push(deck.pop());

    let hand = document.getElementsByClassName('cards-container')[0];
    hand.innerHTML += `<img src="assets/img/${playerHand[playerHand.length - 1]}.png" width="100vw">`;

    if (calculateTotal(playerHand) > 21) {
        disableBtn('ask-btn', true);
        disableBtn('stop-btn', true);
        pcTurn();
        setTimeout(() => alert('Game Over'), 100);
        return;
    }
}

const stopGame = () => {
    let totalComputer = 0;
    let totalPlayer = calculateTotal(playerHand);
    do {
        pcTurn();
        totalComputer = calculateTotal(computerHand);
    } while (totalComputer < totalPlayer);

    checkWinner(totalPlayer, totalComputer);

    disableBtn('ask-btn', true);
    disableBtn('stop-btn', true);
}

const calculateTotal = (hand) => {
    let total = 0;
    for (card of hand) {
        let letter = card.charAt(0)
        total += (letter === 'A') ? 1 : (letter === 'J') ? 11 : (letter === 'Q') ? 12 : (letter === 'K') ? 13 : (card.slice(0, 2) === '10') ? 10 : parseInt(letter);
    }

    return total;
}

const pcTurn = () => {
    computerHand.push(deck.pop());

    let hand = document.getElementsByClassName('cards-container')[1];
    hand.innerHTML += `<img src="assets/img/${computerHand[computerHand.length - 1]}.png" width="100vw">`;
}

const checkWinner = (totalPlayer, totalComputer) => {
    if (totalComputer > totalPlayer && totalComputer <= 21)
        setTimeout(() => alert('Computer wins!!!'), 100)
    else if (totalComputer === totalPlayer)
        setTimeout(() => alert('Draw!!!'), 100);
    else
        setTimeout(() => alert('Player wins!!!'), 100);
}

const disableBtn = (btnId, disable) => {
    let btn = document.getElementById(btnId);
    btn.disabled = disable;
    if (disable)
        btn.classList.add('disabled');
    else
        btn.classList.remove('disabled');
}

initDeck();