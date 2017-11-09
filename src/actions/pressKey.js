export const PRESS_KEY = 'PRESS_KEY'

export default (key) => {
  return {
    type: PRESS_KEY,
    payload: key
  }
}
