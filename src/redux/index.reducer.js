import { combineReducers } from 'redux'
import dataReducer from './data/data.reducer'
import friendReducer from './friend/friend.reducer'

// Redux stores
const rootReducer = combineReducers({ dataReducer, friendReducer })

export default rootReducer
