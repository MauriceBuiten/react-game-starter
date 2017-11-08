export const ADD_GUESS = 'ADD_GUESS'

export default(letter) => {
  return {
    type: ADD_GUESS,
    payload: letter
  }
}
