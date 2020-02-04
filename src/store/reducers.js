import { combineReducers } from 'redux'

import headerTitle from '../components/header/store'
import userReducer from '../pages/login/store'
const reducer = combineReducers({
  userReducer,
  headerTitle
})
export default reducer;