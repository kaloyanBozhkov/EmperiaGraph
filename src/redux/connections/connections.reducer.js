import {
  SET_CONNECTIONS,
  CLEAR_CONNECTIONS,
  REMOVE_CONNECITON,
  SET_CONNECTION,
} from './connections.constants'

const initialState = {
  connecitons: [],
}

const setConnections = (state, connecitons) => ({ ...state, connecitons })

const setConnection = (state, conneciton) => ({
  ...state,
  connecitons: [...state.connecitons, conneciton],
})

const removeConnection = (state, id) => ({
  ...state,
  connecitons: state.connecitons.filter((conn) => conn.id !== id),
})

const clearConnections = (state) => ({ ...state, connecitons: [] })

const connecitonsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONNECTION:
      return setConnection(state, action.payload)
    case SET_CONNECTIONS:
      return setConnections(state, action.payload)
    case CLEAR_CONNECTIONS:
      return clearConnections(state)
    case REMOVE_CONNECITON:
      return removeConnection(state, action.payload)
    default:
      return state
  }
}

export default connecitonsReducer
