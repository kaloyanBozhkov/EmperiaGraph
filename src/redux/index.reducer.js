import { combineReducers } from 'redux'
import dataReducer from './data/data.reducer'
import friendReducer from './friend/friend.reducer'
import connectionsReducer from './connections/connections.reducer'

// Redux stores
const rootReducer = combineReducers({ dataReducer, friendReducer, connectionsReducer })

export default rootReducer
