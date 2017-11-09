export function getWord(){
  var words = ["refrigerator", "telephone", "pillowcase", "doormat", "houseplant", "gaming", "curtains"]
  return words[Math.floor(Math.random() * words.length)];
}

export function wheel() {
  var guesValues= [10, 20, 30, 40, 50]
  return guesValues[Math.floor(Math.random() * guesValues.length)];
}

export function wrongGuessCount(word, guesses) {
  var wrongs = guesses.filter(guess => word.indexOf(guess) === -1);
  return wrongs.length;

}

export function showGuess(word, guesses) {
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
  if (wrongGuessCount(word, guesses) === 6) {
    return ('You have lost!');
  } else {
    return ('Choose a letter please...')
  }
}
