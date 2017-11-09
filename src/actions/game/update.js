import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const updateGame = (game, letter) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
//stuur wat je mee wilt nemen als update als {} in de patch

      api.patch(`/games/${game._id}`, {letter})

      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

//
// import API from '../../api/client'
// import {
//   APP_LOADING,
//   APP_DONE_LOADING,
//   LOAD_ERROR,
//   LOAD_SUCCESS
// } from '../loading'
//
// const api = new API()
//
// export default (game, index, type) => {
//   return (dispatch) => {
//     dispatch({ type: APP_LOADING })
//
//     api.patch(`/games/${game._id}`, { index, type})
//       .then(() => {
//         console.log(...game, index, type)
//         dispatch({ type: APP_DONE_LOADING })
//         dispatch({ type: LOAD_SUCCESS })
//       })
//       .catch((error) => {
//         dispatch({ type: APP_DONE_LOADING })
//         dispatch({
//           type: LOAD_ERROR,
//           payload: error.message
//         })
//       })
//   }
// }
