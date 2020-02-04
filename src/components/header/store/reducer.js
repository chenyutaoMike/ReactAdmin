import { SET_HEAD_TITLE } from './actionTypes';
const initHeaderTitle = '首页'

export default (state = initHeaderTitle, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      console.log('触发')
      return action.data
  
    default:
      return state
  }
}