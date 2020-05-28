import {
  SET_CONNECTIONS,
  CLEAR_CONNECTIONS,
  REMOVE_CONNECITON,
  SET_CONNECTION,
} from './connections.constants'

export const setConnection = (conneciton) => ({
  type: SET_CONNECTION,
  payload: conneciton,
})

export const setConnections = (connecitons) => ({
  type: SET_CONNECTIONS,
  payload: connecitons,
})

export const reoveConnection = (id) => ({
  type: REMOVE_CONNECITON,
  payload: id,
})

export const clearConnection = () => ({
  type: CLEAR_CONNECTIONS,
})
