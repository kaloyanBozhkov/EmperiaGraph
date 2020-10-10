import { SET_CONNECTION_STRENGTH, SET_CONNECTION_DISTANCE } from './graph.constants'

const initialState = {
  connectionStrength: -5,
  connectionDistance: 5
}

const setConnectionStrength = (state, connectionStrength) => ({ ...state, connectionStrength })

const setConnectionDistance = (state, connectionDistance) => ({ ...state, connectionDistance })


const friendReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONNECTION_STRENGTH:
      return setConnectionStrength(state, action.payload)
    case SET_CONNECTION_DISTANCE:
      return setConnectionDistance(state, action.payload)
    default:
      return state
  }
}

export default friendReducer
