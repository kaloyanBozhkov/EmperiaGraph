import { combineReducers } from 'redux'
import friendReducer from './friend/friend.reducer'
import modalReducer from './modal/modal.reducer'
import requestReducer from './request/request.reducer'
import graphReducer from './graph/graph.reducer'
import menuReducer from './menu/menu.reducer'

// Redux stores
const rootReducer = combineReducers({ requestReducer, friendReducer, modalReducer, graphReducer, menuReducer })

export default rootReducer
