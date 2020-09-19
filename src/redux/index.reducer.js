import { combineReducers } from 'redux'
import dataReducer from './data/data.reducer'
import friendReducer from './friend/friend.reducer'
import modalReducer from './modal/modal.reducer'

// Redux stores
const rootReducer = combineReducers({ dataReducer, friendReducer, modalReducer })

export default rootReducer
