
export function turnWheel() {
  var guesValues= [10, 20, 30, 40, 50]
  return guesValues[Math.floor(Math.random() * guesValues.length)];
}

export function showLetterBoard(word, guesses) {
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

export function isWinner(word, guesses) {
  var splitWord = word.split('');

  let notGuessed = splitWord.filter(letter => guesses.indexOf(letter) === -1);
  if (notGuessed.length > 0) return false
  else return true
}

export function next(word, guesses) {
  if (isWinner(word, guesses)) {
    return ('You have won!');
  }
  else {
    return ('Choose a letter please...')
  }
}

export function rightGuessCount(word, letter) {
    var splitWord = word.split('');
    var amountOfRightLetters = 0

    let guessedLetters = splitWord.filter(function(letterinword){
      return letterinword === letter
    })
    amountOfRightLetters = guessedLetters.length
    return amountOfRightLetters
}
