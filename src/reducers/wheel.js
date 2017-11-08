const initialState = {
  draw: false,
  started: false,
  letterBoard: "---",
  word: "quinoa",
  guesses: [],
  completed: false,
  wheelValue: 10,

}

export default (state = initialState, { type, payload } = {}) => {

      return {
        draw,
        started,
        letterBoard,
        word,
        guesses,
        completed,
        wheelValue,

      }
}
