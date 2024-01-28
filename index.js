// Week 9: JS6 - JavaScript Unit Final Coding Project
/*
- For the final project you will be creating an automated version of the classic card game WAR!
  There are many versions of the game WAR. In this version there are only 2 players.
    - You do not need to do anything special when there is a tie in a round.
- Think about how you would build this project and write your plan down. Consider classes such as:
  Card, Deck, Player, as well as what properties and methods they may include.
    - You do not need to accept any user input, when you run your code, the entire game should play out
      instantly without any user input inside of your browser's console.

The completed project should, when executed, do the following:
- Deal 26 Cards to each Player from a Deck of 52 cards.
- Iterate through the turns where each Player plays a Card.
- The Player who played the higher card is awarded a point.
    - Ties result in zero points for both Players.
- After all cards have been played, display the score and declare the winner.
*/

/*
deck 2-10,j,q,k,a * 4(heart, diamond, spade, clubs) - set value; use value to determine strength [deck > card(rank,suit)]
simulate a shuffle somehow [shuffle(arr)]
"player" master array, "hand" sub-array
add a point system
array.shift() - removes first item
create game menu
*/

class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
      this.value = this.getValue(rank); // setting value to each card
    } 
  
    getValue(rank) {
      if (rank === 'J') return 11;
      if (rank === 'Q') return 12;
      if (rank === 'K') return 13;
      if (rank === 'A') return 14;
      return parseInt(rank);
    } // creating value for non-numeric cards and returning as integers
  
    /* - for debugging -
    describe() {
      return `${this.rank} of ${this.suit}, value of ${this.value}`;
    }
    */
  
  }
  
  class Deck {
    constructor() {
      this.cards = this.generateDeck();
    }
  
    generateDeck() { // create cards based on suit and rank then placing them in a deck
      const suits = ['♥', '♦', '♣', '♠'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      this.deck = []; // preparing deck
  
      for (let s = 0; s < suits.length; s++) {
        for (let r = 0; r < ranks.length; r++) {
          this.deck.push(new Card(ranks[r], suits[s])); // creates new cards based on rank, suit
        }
      }
  
      return this.deck;
    }
  
  }
  
  class Player {
    constructor(name) {
      this.name = name; // player name
      this.hand = []; // empty hand array
      this.score = 0; // 0 default score
    }
  
    /* - for debugging -
    describe() {
      return `${this.name} has ${this.hand} hand.`;
    }
    */
  
  }
  
  class Game {
    constructor() {
      this.players = []; // empty players array
    }
  
    start() { // start menu
      let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
          switch(selection) {
            case '1' :
              this.newGame();
              break;
            default:
              selection = 0;
          }
          selection = this.showMainMenuOptions();
        }
          alert('Goodbye!');
      }
  
  
    showMainMenuOptions() { // main warGame prompts
      return prompt(`
  0) Exit
  1) Start a new game?
      `);
    }
  
    showGameMenu() { // player warGame prompts
      return prompt(`
  1) Shuffle deck and play game`);
    }
  
  
    newGame() { //start a new game
      this.players.splice(0,2); // remove any current players
  
      while (this.players.length != 2) { // create players
        let name = prompt('Enter name: ');
        this.players.push(new Player(name));
        this.players.push(new Player('Player 2'));
        this.warDeck = new Deck();
      }
  
      while (this.players[0].score > 0 || this.players[1].score > 0) {
        this.players[0].score = 0;
        this.players[1].score = 0;
      } // reset score to 0 if they wish to play a new game
  
      let selection = this.showGameMenu();
      switch (selection) {
        case '1' :
          this.playGame();
      }
  
    } // creates a new player
  
    playGame() {
      this.warDeck.cards.sort(() => Math.random() - .5); // shuffle cards
  
      // deal hands
      let halfWay = this.warDeck.cards.length / 2;
      this.players[0].hand = this.warDeck.cards.slice(0, halfWay);
      this.players[1].hand = this.warDeck.cards.slice(halfWay);
  
      /* - for debugging -
      for (let i = 0; i < this.players[0].hand.length; i++) {
        console.log(this.players[0].hand[i].describe());
      }
      console.log(` `);
      for (let i = 0; i < this.players[1].hand.length; i++) {
        console.log(this.players[1].hand[i].describe());
      }
      */
  
  
      let winnerString = ''; // creating a string to announce winner
  
      while (this.players[0].hand.length > 0) {
        if (this.players[0].hand[0].value > this.players[1].hand[0].value) { // Player 1 wins round
          this.players[0].score++; // add score point
          // for debugging >
          // console.log(`${this.players[0].score} v ${this.players[1].score} - P1, ${this.players[0].hand.length} left`);
          this.players[0].hand.splice(0,1); // remove first card from hand
          this.players[1].hand.splice(0,1); // remove first card from hand
  
        } else if (this.players[1].hand[0].value > this.players[0].hand[0].value) { // Player 2 wins round
          this.players[1].score++; // add score point
          // for debugging >
          // console.log(`${this.players[0].score} v ${this.players[1].score} - P2, ${this.players[0].hand.length} left`);
          this.players[0].hand.splice(0,1); // remove first card from hand
          this.players[1].hand.splice(0,1); // remove first card from hand
  
        } else { // tie round
          // for debugging >
          // console.log(`${this.players[0].score} v ${this.players[1].score} - tie, ${this.players[0].hand.length} left`);
          this.players[0].hand.splice(0,1); // remove first card from hand
          this.players[1].hand.splice(0,1); // remove first card from hand
        }
      }
  
      if (this.players[0].hand.length == 0) { // generating the winner string
        if (this.players[0].score > this.players[1].score) { // P1 wins
          winnerString = this.players[0].name + ' Wins!';
        } else if (this.players[1].score > this.players[0].score) { // P2 wins
          winnerString = this.players[1].name + ' Wins!';
        } else { // Draw
          winnerString = "IT'S A DRAW!!!";
        }
        
      }
  
      let scoreString = 'Score:\n' + this.players[0].name + ' = ' + this.players[0].score
        + '\n' + this.players[1].name + ' = ' + this.players[1].score; // score string
  
      // console.log(winnerString + '\n' + scoreString); // for debugging
  
      alert(winnerString + '\n' + scoreString); // winner and score alert
  
    }
  
  }
  
  const warGame = new Game(); // create game
  warGame.start(); // launch warGame.start()