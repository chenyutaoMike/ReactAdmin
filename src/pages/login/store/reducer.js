
import { SET_USER } from './actionTypes'

const defaultVale = {
  user: {}
}
export default (state = defaultVale, action) => {
  switch (action.type) {
    case SET_USER:
      const newState = JSON.parse(JSON.stringify(state))
      newState.user = action.user
      return newState
    case 'upDateUser':
        // 持久化user
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}