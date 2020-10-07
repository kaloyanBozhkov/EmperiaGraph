
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

const setData = (state, formattedData) => ({
  ...state,
  ...formattedData,
  isPending: false
})

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
    case type.includes('UPDATE'):
      return setPending(state, 'update')
    case type.includes('CREATE'):
      return setPending(state, 'create')
    case REQUEST_FRIEND_FAIL || REQUEST_CONNECTIONS_FAIL || REQUEST_FORMATTED_DATA_FAIL:
      return setFailed(state, payload)
    case REQUEST_FRIEND_SUCCESS:
      return setData(state, { friends: payload })
    case REQUEST_CONNECTIONS_SUCCESS:
      return setData(state, { connections: payload })
    case REQUEST_FORMATTED_DATA_SUCCESS:
      return setData(state, payload)
    default:
      return state
  }
}

export default dashboardReportsReducer
