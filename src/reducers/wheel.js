import {ADD_GUESS} from '../actions/addguess'

function getWord(){
  var words = ["refrigerator", "telephone", "pillowcase", "doormat", "houseplant", "gaming", "curtains"]
  return words[Math.floor(Math.random() * words.length)];
}

function wrongGuessCount(word, guesses) {
  var wrongs = guesses.filter(guess => word.indexOf(guess) === -1);
  return wrongs.length;

}

function wheel() {
  var guesValues= [10, 20, 30, 40, 50]
  return guesValues[Math.floor(Math.random() * guesValues.length)];
}

function showGuess(word, guesses) {
  var splitWord = word.split('');
  var result = [];

  result = splitWord.map(letter => {
    if (guesses.indexOf(letter) === -1) {
      return '_';
    } else return letter;
  });

  let joined = result.join(' ');
  return joined;
}

function isWinner(word, guesses) {
  var splitWord = word.split('');

  let notGuessed = splitWord.filter(letter => guesses.indexOf(letter) === -1);
  if (notGuessed.length > 0) return false
  else return true
}

// function next(word, guesses) {
//   if (isWinner(word, guesses)) {
//     return ('You have won!');
//   }
//   if (wrongGuessCount(word, guesses) === 6) {
//     return ('You have lost!');
//   } else {
//     return ('Choose a letter please...')
//   }
// }

var word = getWord();
let guesses = []

const initialState = {
  letterBoard: showGuess(word, guesses),
  word: word,
  guesses: guesses,
  completed: false,
  wheelValue: wheel(),

}

export default (state = initialState, { type, payload } = {}) => {

  switch(type){
    case ADD_GUESS:
            return{


            }

    default:
    return state
  }
}


// export default (state = initialState, { type, payload } = {}) => {
//   switch(type) {
//     case ADD_GUESS:
//         state.guesses.push(payload)
//         return {
//           word: state.word,
//           guesses: state.guesses,
//           wrongguesscount: wrongGuessCount(state.word, state.guesses),
//           iswinner: isWinner(state.word, state.guesses),
//           showguess: showGuessTekst(state.word, state.guesses),
//         }
//     default:
//       return state
//
//     }
//   }
