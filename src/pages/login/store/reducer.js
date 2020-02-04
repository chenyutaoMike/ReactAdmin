
import { RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './actionTypes'
import storageUtils from '../../../utils/storageUtils'

/**
 * 用来管理用户的reducer函数
 */
const initUser = storageUtils.getUser() || {}

export default (state = initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      // const newState = JSON.parse(JSON.stringify(state))
      // newState.user = action.user
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      return { ...state, errorMsg }
    case RESET_USER:
      return {}
    case 'upDateUser':
      // 持久化user
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}