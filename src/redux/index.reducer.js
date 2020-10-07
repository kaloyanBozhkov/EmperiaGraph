import { combineReducers } from 'redux'
import friendReducer from './friend/friend.reducer'
import modalReducer from './modal/modal.reducer'
import requestReducer from './request/request.reducer'

// Redux stores
const rootReducer = combineReducers({ requestReducer, friendReducer, modalReducer })

export default rootReducer
