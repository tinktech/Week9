class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.getValue(rank);
    } 
  
    getValue(rank) {
      if (rank === 'J') return 11;
      if (rank === 'Q') return 12;
      if (rank === 'K') return 13;
      if (rank === 'A') return 14;
      return parseInt(rank);
    }
  
    describe() {
        return `${this.rank} of ${this.suit}, value of ${this.value}`;
    }
}

class Deck {
    constructor() {
        this.cards = this.generateDeck();
    }

    generateDeck() {
        const suits = ['♥', '♦', '♣', '♠'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        for (let s = 0; s < suits.length; s++) {
            for (let r = 0; r < ranks.length; r++) {
                deck.push(new Card(ranks[r], suits[s]));
            }
            deck.sort(() => Math.random() - .5);
        }
    return deck;
    }

    shuffle(deck) { // shuffle the cards
        deck.sort(() => Math.random() - .5);
    }
}

const warDeck = new Deck();
console.log(warDeck.cards[5].describe());
console.log(warDeck.cards);