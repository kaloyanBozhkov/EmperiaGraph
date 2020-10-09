
import {
  REQUEST_FRIEND_SUCCESS,
  REQUEST_FRIEND_FAIL,
} from './friends/requestFriend.constants'

import {
  REQUEST_CONNECTIONS_SUCCESS,
  REQUEST_CONNECTIONS_FAIL,
} from './connections/requestConnections.constants'

import { REQUEST_FORMATTED_DATA_FAIL, REQUEST_FORMATTED_DATA_START, REQUEST_FORMATTED_DATA_SUCCESS } from './request.constants'

const initialState = {
  isPending: false,
  error: null,
  friends: [],
  connections: []
}

const setFormattedData = (state, formattedData) => ({
  ...state,
  ...formattedData,
  isPending: false
})

const setData = (state, { operation, payload }) => {
  switch (operation) {
    case 'DELETE_FRIEND':
      // if delete, update local state to exclude the deleted firend
      return {
        ...state,
        friends: state.friends.filter(({ id }) => id !== payload.friendId),
        connections: state.connections.filter(({ source, target }) => source.id !== payload.friendId && target.id !== payload.friendId),
        isPending: false,
      }
    case 'CREATE_FRIEND':
      //if create, update local state to include the newly created firend
      return {
        ...state,
        friends: [ ...state.friends, payload.friendData ],
        isPending: false,
      }
    default:
      return state
  }
}

const setPending = (state, method) => ({
  ...state,
  isPending: method,
  error: null,
})

const setFailed = (state, error) => ({
  ...state,
  isPending: false,
  error,
})

const dashboardReportsReducer = (state = initialState, { type, payload } = {}) => {

  switch (type) {
    case type.includes('GET') || REQUEST_FORMATTED_DATA_START:
      return setPending(state, 'get')
    case type.includes('DELETE'):
      return setPending(state, 'delete')
    case type.includes('PUT'):
      return setPending(state, 'update')
    case type.includes('POST'):
      return setPending(state, 'create')
    case REQUEST_FRIEND_FAIL || REQUEST_CONNECTIONS_FAIL || REQUEST_FORMATTED_DATA_FAIL:
      return setFailed(state, payload)
    case REQUEST_FRIEND_SUCCESS:
      if (payload.operation) {
        return setData(state, payload)
      }

      return setFormattedData(state, { friends: payload })
    case REQUEST_CONNECTIONS_SUCCESS:
      if (payload.operation) {
        return setData(state, payload)
      }

      return setFormattedData(state, { connections: payload })
    case REQUEST_FORMATTED_DATA_SUCCESS:
      return setFormattedData(state, payload)
    default:
      return state
  }
}

export default dashboardReportsReducer