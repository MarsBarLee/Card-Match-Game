let numOfUnmatchedCards = 6;

var firstSelectedCard; // holds record of what cards player clicks on
var secondSelectedCard;
let indexOfFirstSelectedCard;  //holds record of previously clicked card's index
let indexOfSecondSelectedCard;
hasFirstCardBeenSelected = false; // used in if, else statement later
hasSecondCardBeenSelected = false;

let cardBackImg = "cardBack2.png";
let heartCardImg = "heartCard.png";
let starCardImg = "starCard.png";
let diamondCardImg = "diamondCard.png";

let cardArray = [heartCardImg, heartCardImg, starCardImg, starCardImg, diamondCardImg, diamondCardImg ]

let cards = document.querySelectorAll('.card')
cards.forEach(card => {
    card.onclick = (e) => { 
      if (!hasFirstCardBeenSelected) { // selects first card
        console.log('running selection of first card')
        //#region Click here for full explanation of this if statement
        /*
        AIM: 
        Change what player sees from the card back to the card's design when they click
        The card's design is already assigned before the player clicks on anything
        WHY DID I WRITE THIS:
        so that my code is dry. I don't write an if, else statement for all 6 cards

        e.currentTarget;    returns clicked card's html attributes and values
          returns <img id="0" class="card" src="cardBack2.png">

        e.currentTarget.attributes[2];    returns clicked card's third listed attribute. attributes are accessed through their index
          returns src="cardBack2.png"

        e.currentTarget.attributes[2].value;    clicked card's third listed attribute's value
          returns "cardBack2.png""

        e.currentTarget.getAttribute("id"));    the clicked card's id. In this case, the ids are 0, 1, 2, 3...
          returns 0

        cardArray[e.currentTarget.getAttribute("id")]);   each clicked card is assigned by cardArray[],
          returns cardArray[0]
            the first element in cardArray is heartCardImg
        
        e.currentTarget.attributes[2].value = cardArray[e.currentTarget.getAttribute("id")];    change what player sees from cardBackImg to heartCardImg
          returns src = cardArray[0]
          returns src = heartCardImg

        firstSelectedCard = cardArray[e.currentTarget.getAttribute("id")];    keep a record of what design has been clicked, to later compare in areCardsMatched function
          returns firstSelectedCard = heartCardImg

        hasFirstCardBeenSelected = true;    used in this if, else statement, to check if playing is clicking on their first or second card

        indexOfFirstSelectedCard = e.currentTarget.getAttribute("id")     keep a record of index of design that has been clicked, to later change to cardBackImg 
          returns indexOfFirstSelectedCard = 0
        */
        //#endregion
        e.currentTarget.attributes[2].value = cardArray[e.currentTarget.getAttribute("id")] 
        firstSelectedCard = cardArray[e.currentTarget.getAttribute("id")]
        hasFirstCardBeenSelected = true
        indexOfFirstSelectedCard = e.currentTarget.getAttribute("id")
      } else { // selects second card, if hasFirstCardBeenSelected = true
        console.log('running selection of second card')
        e.currentTarget.attributes[2].value = cardArray[e.currentTarget.getAttribute("id")]
        secondSelectedCard = cardArray[e.currentTarget.getAttribute("id")]
        indexOfSecondSelectedCard = e.currentTarget.getAttribute("id")
        //#region click here for full explanation of this else statement
        /* 
        repeat most of above

        in this explnation, player has selected their first and second cards. both designs are heart.

        firstSelectedCard, secondSelectedCard
          returns heartBackImg, heartBackImg

        areCardsMatched(firstSelectedCard, secondSelectedCard)
          returns true

        cardFate(areCardsMatched(firstSelectedCard, secondSelectedCard)
          returns true, reduces numOfUnmatchedCards from 6 to 4, resets hasFirstCardBeenSelected = false

        alertPlayer(cardFate(areCardsMatched(firstSelectedCard, secondSelectedCard)))
          returns alert("Cards matched!")

        setTimeOut(function() {...}, 600)
          wait 0.6 seconds to allow player to see clicked cards

        checkIfWinGame(numOfUnmatchedCards)
          if numOfUnmatchedCards = 0, then checkIfWinGame runs
          return alert("You win! Refresh page to play again.")
        
        setTimeOut(function() {...}, 900)
          waits 0.9 seconds to allow player to see clicked cards before win alert pops up
          thus first popup: 'Cards matched' second popup: 'You win!'

          without waiting, then sequence of popups is wrong
          first popup: 'You win!' second popup: 'Cards matched'

        WHY THE FUNCTIONS ARE IN ONE LONG LINE? WHY NOT SEPERATE?
          Then the code runs 3 times instead of 1 time. By matching only two cards, suddenly numOfCards = 0 and I win the game.

          areCardsMatched(firstSelectedCard, secondSelectedCard)
          cardFate(areCardsMatched(firstSelectedCard, secondSelectedCard))
          alertPlayer(cardFate(areCardsMatched(firstSelectedCard, secondSelectedCard)))
        
        NEED TO CALL FUNCTION WITH ARGUMENTS. CANNOT BE EMPTY
          cardFate() doesn't work
          cardFate(areCardsMatched) doesn't work
          cardFate(areCardsMatched()) doesn't work
          cardFate(areCardsMatched(firstSelectedCard, secondSelectedCard) does work
        */
        //#endregion
        setTimeout(function() { alertPlayer(cardFate(areCardsMatched(firstSelectedCard, secondSelectedCard))); }, 600); // wait allows for player to see both cards before alert shows
        setTimeout(function() { checkIfWinGame(numOfUnmatchedCards); }, 900); // waits allows this alert to be shown last if win game
      }
    }
})

let areCardsMatched = (firstSelectedCard, secondSeletedCard) => {
  console.log('running areCardsMatched')
  if (firstSelectedCard === heartCardImg && secondSeletedCard === heartCardImg) {
      return true;
  } else if (firstSelectedCard === starCardImg && secondSeletedCard === starCardImg) {
      return true;
  } else if (firstSelectedCard === diamondCardImg && secondSeletedCard === diamondCardImg) {
      return true;
  } else { // if designs don't match
      return false;
  }
}

const cardFate = (areCardsMatched) => {
  console.log('running cardFate function where areCardsMatched is', areCardsMatched)
  if (areCardsMatched) { // if areCardsMatched is true
      numOfUnmatchedCards -= 2
      hasFirstCardBeenSelected = false;
      hasSecondCardBeenSelected = false;
      return true;
  } else { // if areCardsMatched is false
      document.getElementById(indexOfFirstSelectedCard).attributes[2].value = cardBackImg;
      document.getElementById(indexOfSecondSelectedCard).attributes[2].value = cardBackImg;
      hasFirstCardBeenSelected = false; 
      hasSecondCardBeenSelected = false;
      return false;
  }
}

alertPlayer = (cardFate) => {
  console.log('running alertPlayer')
  if (cardFate) { // if cardsFate is true
    alert("Cards matched!");
  } else { // if cardsFate is false
    alert("Cards not matched!");
  }
}

checkIfWinGame = (numOfUnmatchedCards) => {
  console.log('the number of unmatched cards is',numOfUnmatchedCards);
  if (numOfUnmatchedCards === 0) {
    alert("You win! Refresh page to play again.")
  } // else, continue game
}

function shuffleCards(array) {
  var roundsLeftToShuffle = array.length;
  var placeholder;
  var i;
  // While there remain elements to shuffle…
  while (roundsLeftToShuffle) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * roundsLeftToShuffle--);

    // And swap it with the current element.
    placeholder = array[roundsLeftToShuffle];
    array[roundsLeftToShuffle] = array[i];
    array[i] = placeholder;
  }
  return array;
}

shuffleCards(cardArray)

/* KNOWN PROBLEMS
PROBLEM: if player clicks on an already clicked card, game reads this as clicking on new card, and then matches card to itself
SOLUTION: check with isClicked function, with reference to Chore Door Game

PROBLEM: using timing instead of waiting for alertPlayer function to happen is hardcoding
ATTEMPT: already tried implementing async functions- can't get it to work now. will use in future projects.
*/

/* FEATURES TO IMPLEMENT
Shuffle card function
*/