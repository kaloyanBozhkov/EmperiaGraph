import { combineReducers } from 'redux'
import friendReducer from './friend/friend.reducer'

// Redux stores
const rootReducer = combineReducers({ friendReducer })

export default rootReducer
