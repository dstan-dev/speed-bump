'use strict';

//-------------------------------------------------------------//
// Card Section                                                //
//-------------------------------------------------------------//
const faceOfCard = document.getElementById('front');
const playedCardArea = document.getElementById('playedCards');

// Setting and rendering a single card object
class Card {
  constructor(number, suit) {
    this.cardNumber = number;
    this.cardSuit = suit;
  }

  // Set border and text/icon color based on suit of card
  render() {
    if (this.cardSuit === heart || this.cardSuit === gem) {
      faceOfCard.style.color = '#f00a47'; // red
      faceOfCard.style.border = '5px solid #f00a47';
    } else {
      faceOfCard.style.color = '#05ccf0'; // blue
      faceOfCard.style.border = '5px solid #05ccf0';
    }

    faceOfCard.innerHTML = `
      <h1>${this.cardNumber}</h1>
      <i class="${this.cardSuit}"></i>
    `;
  }
}

// Set card suit names to HTML class for icons
const fire = 'fas fa-fire';
const heart = 'fas fa-heart';
const ankh = 'fas fa-ankh';
const gem = 'fas fa-gem';

// Create a full deck of cards
const deck = [
  { cardNumber: '2', cardSuit: fire, ind: 0 },
  { cardNumber: '3', cardSuit: fire, ind: 1 },
  { cardNumber: '4', cardSuit: fire, ind: 2 },
  { cardNumber: '5', cardSuit: fire, ind: 3 },
  { cardNumber: '6', cardSuit: fire, ind: 4 },
  { cardNumber: '7', cardSuit: fire, ind: 5 },
  { cardNumber: '8', cardSuit: fire, ind: 6 },
  { cardNumber: '9', cardSuit: fire, ind: 7 },
  { cardNumber: '10', cardSuit: fire, ind: 8 },
  { cardNumber: 'J', cardSuit: fire, ind: 9 },
  { cardNumber: 'Q', cardSuit: fire, ind: 10 },
  { cardNumber: 'K', cardSuit: fire, ind: 11 },
  { cardNumber: 'A', cardSuit: fire, ind: 12 },
  { cardNumber: '2', cardSuit: heart, ind: 13 },
  { cardNumber: '3', cardSuit: heart, ind: 14 },
  { cardNumber: '4', cardSuit: heart, ind: 15 },
  { cardNumber: '5', cardSuit: heart, ind: 16 },
  { cardNumber: '6', cardSuit: heart, ind: 17 },
  { cardNumber: '7', cardSuit: heart, ind: 18 },
  { cardNumber: '8', cardSuit: heart, ind: 19 },
  { cardNumber: '9', cardSuit: heart, ind: 20 },
  { cardNumber: '10', cardSuit: heart, ind: 21 },
  { cardNumber: 'J', cardSuit: heart, ind: 22 },
  { cardNumber: 'Q', cardSuit: heart, ind: 23 },
  { cardNumber: 'K', cardSuit: heart, ind: 24 },
  { cardNumber: 'A', cardSuit: heart, ind: 25 },
  { cardNumber: '2', cardSuit: ankh, ind: 26 },
  { cardNumber: '3', cardSuit: ankh, ind: 27 },
  { cardNumber: '4', cardSuit: ankh, ind: 28 },
  { cardNumber: '5', cardSuit: ankh, ind: 29 },
  { cardNumber: '6', cardSuit: ankh, ind: 30 },
  { cardNumber: '7', cardSuit: ankh, ind: 31 },
  { cardNumber: '8', cardSuit: ankh, ind: 32 },
  { cardNumber: '9', cardSuit: ankh, ind: 33 },
  { cardNumber: '10', cardSuit: ankh, ind: 34 },
  { cardNumber: 'J', cardSuit: ankh, ind: 35 },
  { cardNumber: 'Q', cardSuit: ankh, ind: 36 },
  { cardNumber: 'K', cardSuit: ankh, ind: 37 },
  { cardNumber: 'A', cardSuit: ankh, ind: 38 },
  { cardNumber: '2', cardSuit: gem, ind: 39 },
  { cardNumber: '3', cardSuit: gem, ind: 40 },
  { cardNumber: '4', cardSuit: gem, ind: 41 },
  { cardNumber: '5', cardSuit: gem, ind: 42 },
  { cardNumber: '6', cardSuit: gem, ind: 43 },
  { cardNumber: '7', cardSuit: gem, ind: 44 },
  { cardNumber: '8', cardSuit: gem, ind: 45 },
  { cardNumber: '9', cardSuit: gem, ind: 46 },
  { cardNumber: '10', cardSuit: gem, ind: 47 },
  { cardNumber: 'J', cardSuit: gem, ind: 48 },
  { cardNumber: 'Q', cardSuit: gem, ind: 49 },
  { cardNumber: 'K', cardSuit: gem, ind: 50 },
  { cardNumber: 'A', cardSuit: gem, ind: 51 },
];

// Create an array of numbers, representing indexes of the deck, to be shuffled
const numbersToShuffle = [];

for (let i = 0; i < 52; i++) {
  numbersToShuffle.push(i);
}

// Fisher - Yates shuffle function
function shuffle(array) {
  let i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

// Randomizes numbersToShuffle array to get a randomly ordered deck without any repeating numbers
let shuffledDeck = shuffle(numbersToShuffle);
let shuffledDeckIndex = 0;
console.log(shuffledDeck);

// Get next card from the deck using the number in the shuffledDeck array as the index, and create a new Card object using the cardSuit and cardNumber from that index of the deck
function getNewCard() {
  // Set index of next card from deck
  let nextCardIndex = shuffledDeck[shuffledDeckIndex];

  // Get next card number and suit from deck
  const nextCardNumber = deck[nextCardIndex].cardNumber;
  const nextCardSuit = deck[nextCardIndex].cardSuit;

  // Create new card object with next card number and suit
  const nextCard = new Card(nextCardNumber, nextCardSuit);

  // Render next card on the 'front' of the next card
  nextCard.render();

  shuffledDeckIndex++;

  // Re-shuffle cards when all cards from deck have been used
  if (shuffledDeckIndex > 51) {
    shuffledDeckIndex = 0;
    shuffledDeck = shuffle(numbersToShuffle);

    // Remove all played cards from Played Cards area
    while (playedCardArea.lastElementChild) {
      playedCardArea.removeChild(playedCardArea.lastElementChild);
    }
    console.log(shuffledDeck);
  }
  showLastPlayed();
}

// Adds a red or blue square to the Played Cards area after a card is revealed
function showLastPlayed() {
  // Get suit of card that was last revealed
  const lastSuitPlayed = faceOfCard.querySelector('i').className;
  const lastCardPlayed = document.createElement('div');

  // Make played card red or blue based on suit drawn
  if (lastSuitPlayed === heart || lastSuitPlayed === gem) {
    lastCardPlayed.className = 'played-red';
  } else {
    lastCardPlayed.className = 'played-blue';
  }

  setTimeout(() => {
    playedCardArea.append(lastCardPlayed);
  }, 1000);
}

//-----------------------------------------------------//
// Game Progress Section                               //
//-----------------------------------------------------//

const winModal = document.getElementById('winModal');
const modalBackground = document.getElementById('modalBkgd');

// Shows the number of guesses the user made during the game in win modal
const showUserGuesses = (guesses) => {
  const winMessage = winModal.querySelector('h3');
  winMessage.textContent = `It took you ${guesses} guesses to win the game!`;
};

// Activates win modal and background when called in game's win condition
const showWinModal = () => {
  winModal.style.display = 'flex';
  modalBackground.style.display = 'block';
};

// Deactivates win modal and background, and reloads page to restart game after win
const hideWinModal = () => {
  winModal.style.display = 'none';
  modalBackground.style.display = 'none';
  location.reload();
};

// Removes win modal and background when user clicks 'OK' button or background after win, reloads page restarting game
const closeWinModalButton = winModal.querySelector('button');
closeWinModalButton.addEventListener('click', hideWinModal);
modalBackground.addEventListener('click', hideWinModal);

let currentProgress = 0;

// Move game progress forward if user guesses correctly, backwards if incorrectly
const gameProgressTracker = (suit1, suit2) => {
  const progressBar = document.getElementById('gameProgress');

  // Set child elements of progressBar as an array of child elements
  const progressLights = progressBar.children;

  // Get currently drawn suit from the front of the card, stored in the class name
  let currentCardSuit = faceOfCard.querySelector('i').className;

  // Checks if the guess of red or blue matches the suits that are red or blue
  if (
    (currentCardSuit === suit1 || currentCardSuit === suit2) &&
    currentProgress < 4
  ) {
    // For 1st 4 lights, increment progress by one, 'turn on' progressLight with index of currentProgress
    progressLights[currentProgress].classList.toggle('lights-on');
    currentProgress++;
  } else if (
    (currentCardSuit === suit1 || currentCardSuit === suit2) &&
    currentProgress >= 4 &&
    currentProgress < 6
  ) {
    // 'currentProgress + 1' skips adding lights-on class to speedbump
    progressLights[currentProgress + 1].classList.toggle('lights-on');
    currentProgress++;
  } else if (
    (currentCardSuit === suit1 || currentCardSuit === suit2) &&
    currentProgress >= 6
  ) {
    // Game is won when currentProgress === 7, show win modal to signify user has won the game
    progressLights[currentProgress + 1].classList.toggle('lights-on');
    showUserGuesses(guessCount);
    saveScore();
    setTimeout(() => {
      showWinModal();
    }, 1000);
  } else if (
    currentCardSuit !== suit1 &&
    currentCardSuit !== suit2 &&
    currentProgress === 5
  ) {
    // Turns off light after speed bump
    progressLights[currentProgress].classList.toggle('lights-on');
    currentProgress--;
  } else if (
    currentCardSuit !== suit1 &&
    currentCardSuit !== suit2 &&
    currentProgress === 6
  ) {
    // Takes the game progress and lights back to before speed bump on incorrect guess
    progressLights[currentProgress].classList.toggle('lights-on');
    progressLights[currentProgress - 1].classList.toggle('lights-on');
    currentProgress -= 2;
  } else if (
    currentCardSuit !== suit1 &&
    currentCardSuit !== suit2 &&
    currentProgress <= 4 &&
    currentProgress > 0
  ) {
    // Turns previously lit light on incorrect guess
    progressLights[currentProgress - 1].classList.toggle('lights-on');
    currentProgress--;
  }
};

//---------------------------------------------------------------------//
// Saving and Showing Recent Scores                                    //
//---------------------------------------------------------------------//

// Sets localStorage keys to a value of guessCount, where scoreOne is most recent and scoreFive is least recent
const saveScore = () => {
  if (localStorage) {
    if (!localStorage.scoreOne) {
      localStorage.scoreOne = guessCount;
    } else if (!localStorage.scoreTwo) {
      localStorage.scoreTwo = guessCount;
    } else if (!localStorage.scoreThree) {
      localStorage.scoreThree = guessCount;
    } else if (!localStorage.scoreFour) {
      localStorage.scoreFour = guessCount;
    } else if (!localStorage.scoreFive) {
      localStorage.scoreFive = guessCount;
    } else {
      localStorage.scoreFive = localStorage.scoreFour;
      localStorage.scoreFour = localStorage.scoreThree;
      localStorage.scoreThree = localStorage.scoreTwo;
      localStorage.scoreTwo = localStorage.scoreOne;
      localStorage.scoreOne = guessCount;
    }
  }
};

// Add scores to the 'Your Scores' page
const addScore = () => {
  const scoreOne = document.getElementById('score1');
  const scoreTwo = document.getElementById('score2');
  const scoreThree = document.getElementById('score3');
  const scoreFour = document.getElementById('score4');
  const scoreFive = document.getElementById('score5');

  if (localStorage.scoreOne) {
    scoreOne.textContent = `${localStorage.scoreOne} guesses`;
  }
  if (localStorage.scoreTwo) {
    scoreTwo.textContent = `${localStorage.scoreTwo} guesses`;
  }
  if (localStorage.scoreThree) {
    scoreThree.textContent = `${localStorage.scoreThree} guesses`;
  }
  if (localStorage.scoreFour) {
    scoreFour.textContent = `${localStorage.scoreFour} guesses`;
  }
  if (localStorage.scoreFive) {
    scoreFive.textContent = `${localStorage.scoreFive} guesses`;
  }
};

window.addEventListener('load', addScore);

//---------------------------------------------------------------------//
// Info Pages and tooltips                                             //
//---------------------------------------------------------------------//

const instructionPage = document.getElementById('instrPage');
const yourScoresPage = document.getElementById('scoresPage');

// Turn slide down animation on, set position to end of animation
const showInstructionPage = () => {
  instructionPage.style.animationName = 'showInfoPage';
  setTimeout(() => {
    instructionPage.style.top = '0';
  }, 990);
};

// Turn slide up animation on, set position to end of animation, turn animation off
const hideInstructionPage = () => {
  instructionPage.style.animationName = 'hideInfoPage';
  setTimeout(() => {
    instructionPage.style.top = '-100%';
    instructionPage.style.animationName = 'none';
  }, 990);
};

const showScoresPage = () => {
  yourScoresPage.style.animationName = 'showInfoPage';
  setTimeout(() => {
    yourScoresPage.style.top = '0';
  }, 990);
};

const hideScoresPage = () => {
  yourScoresPage.style.animationName = 'hideInfoPage';
  setTimeout(() => {
    yourScoresPage.style.top = '-100%';
    yourScoresPage.style.animationName = 'none';
  }, 990);
};

const instructionButton = document.getElementById('instrBtn');
const yourScoresButton = document.getElementById('scoresBtn');

instructionButton.addEventListener('click', showInstructionPage);
yourScoresButton.addEventListener('click', showScoresPage);

const closeInstructionPageButton = document.getElementById('hideInstrPage');
const closeScoresPageButton = document.getElementById('hideScoresPage');

closeInstructionPageButton.addEventListener('click', hideInstructionPage);
closeScoresPageButton.addEventListener('click', hideScoresPage);

// Tooltips
const mobileTooltip = document.getElementById('mobileTip');
const githubTooltip = document.getElementById('githubTip');
const codepenTooltip = document.getElementById('codepenTip');

// Icons that display the tooltips
const mobileIcon = document.getElementById('mobileTipIcon');
const githubIcon = document.getElementById('githubLink');
const codepenIcon = document.getElementById('codepenLink');

// Get position of tooltip icon, set tooltip position based on coordinates then show mobile tooltip
const showTooltips = (tooltip, leftOffset, bottomOffset) => {
  const boundBox = event.target.getBoundingClientRect();
  const leftCoord = boundBox.left;
  const bottomCoord = boundBox.bottom;

  tooltip.style.left = (leftCoord - leftOffset).toString() + 'px';
  tooltip.style.top = (bottomCoord + bottomOffset).toString() + 'px';

  tooltip.style.display = 'inline';
};

const hideTooltips = (tooltip) => {
  tooltip.style.display = 'none';
};

// On mobile touchscreens show tooltip while icon is touched, hide when released
mobileIcon.addEventListener('touchstart', () => {
  showTooltips(mobileTooltip, 35, 10);
});
mobileIcon.addEventListener('touchend', () => {
  hideTooltips(mobileTooltip);
});

githubIcon.addEventListener('mouseover', () => {
  showTooltips(githubTooltip, 30, 15);
});
githubIcon.addEventListener('mouseout', () => {
  hideTooltips(githubTooltip);
});

codepenIcon.addEventListener('mouseover', () => {
  showTooltips(codepenTooltip, 25, 15);
});
codepenIcon.addEventListener('mouseout', () => {
  hideTooltips(codepenTooltip);
});
//---------------------------------------------------------------------//
// Card Animations                                                     //
//---------------------------------------------------------------------//

const card = document.getElementById('card');

// Animation to flip card over and reveal next card
const flipCard = () => {
  card.classList.toggle('is-flipped');
};

// Disable buttons to prevent user clicking before animations end, and next card is rendered
const disableButtons = () => {
  guessRed.style.pointerEvents = 'none';
  guessBlue.style.pointerEvents = 'none';
};

// After a card is revealed and user guesses next card, previously revealed card slides away and fades out
const cardSlideOut = () => {
  disableButtons();
  faceOfCard.style.transform = 'none';
  card.style.transform = 'none';
  card.style.animationName = 'slideOut';
  flipCard();
};

// Removes sliding animation and hides card after slide animation while new card face is rendered
const setNextCard = () => {
  setTimeout(() => {
    card.style.opacity = '0';
    card.style.animationName = 'none';
    getNewCard();
  }, 800);
};

// Flip card back to show back of card, show card back on pile after rendering
const resetCardPile = () => {
  setTimeout(() => {
    faceOfCard.style.transform = 'rotateX(180deg)';
    card.style.transform = 'rotateX(180deg)';
    card.style.opacity = '1';
  }, 1000);
};

// Re-enable buttons after all animations end and next card is ready to be flipped
const enableButtons = () => {
  setTimeout(() => {
    guessRed.style.pointerEvents = 'all';
    guessBlue.style.pointerEvents = 'all';
  }, 2000);
};

// Skip slide animation for first card of game, as no cards have been revealed and need to be discarded yet
const firstGuess = () => {
  disableButtons();
  getNewCard();
  flipCard();
  isFirstClick = false;

  return getNewCard;
};

// True until first guess is made
let isFirstClick = true;

// Tracks number of guesses with each click of red or blue guess button
let guessCount = 0;

// Execute game functions when user guesses red (clicks red button)
const runGameRed = () => {
  guessCount++;

  if (isFirstClick) {
    firstGuess();
    enableButtons();
    setTimeout(() => {
      gameProgressTracker(heart, gem);
    }, 1200);
  } else {
    cardSlideOut();
    setNextCard();
    resetCardPile();
    enableButtons();
    setTimeout(() => {
      gameProgressTracker(heart, gem);
    }, 1200);
  }
};

// Execute game functions when user guesses blue (clicks blue button)
const runGameBlue = () => {
  guessCount++;

  if (isFirstClick) {
    firstGuess();
    enableButtons();
    setTimeout(() => {
      gameProgressTracker(fire, ankh);
    }, 1200);
  } else {
    cardSlideOut();
    setNextCard();
    resetCardPile();
    enableButtons();
    setTimeout(() => {
      gameProgressTracker(fire, ankh);
    }, 1200);
  }
};

const guessRed = document.getElementById('redBtn');
guessRed.addEventListener('click', runGameRed);

const guessBlue = document.getElementById('blueBtn');
guessBlue.addEventListener('click', runGameBlue);
