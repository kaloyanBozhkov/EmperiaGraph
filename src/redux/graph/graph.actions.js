import { SET_CONNECTION_DISTANCE, SET_CONNECTION_STRENGTH } from './graph.constants'

export const setConnectionStrength = (strength) => ({
  type: SET_CONNECTION_STRENGTH,
  payload: strength,
})
export const setConnectionDistance = (distance) => ({
  type: SET_CONNECTION_DISTANCE,
  payload: distance,
})
