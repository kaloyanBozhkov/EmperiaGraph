
import {
  REQUEST_FRIEND_SUCCESS,
  REQUEST_FRIEND_FAIL,
} from './friends/requestFriend.constants'

import {
  REQUEST_CONNECTIONS_SUCCESS,
  REQUEST_CONNECTIONS_FAIL,
} from './connections/requestConnections.constants'

import { REQUEST_FORMATTED_DATA_FAIL, REQUEST_FORMATTED_DATA_SUCCESS } from './request.constants'

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

const setData = (state, { operation, payload, ...otherProps }) => {
  switch (operation) {
    case 'DELETE_FRIEND': {
      const friendsWithoutRemoveFriend = state.friends.filter(({ id }) => id !== payload.friendId)

      // remove id of removed friend from friends[..].connections.to and .from
      const purifiedFriends = friendsWithoutRemoveFriend.map((friend) => {
        const newTo = friend.connections.to.filter(({ source, target }) => source !== payload.friendId && target !== payload.friendId)
        const newFrom = friend.connections.from.filter(({ source, target }) => source !== payload.friendId && target !== payload.friendId)
        return {
          ...friend,
          connetions: {
            to: newTo,
            from: newFrom
          }
        }
      })

      // if delete, update local state to exclude the deleted firend
      return {
        ...state,
        friends: purifiedFriends,
        connections: state.connections.filter(({ source, target }) => source !== payload.friendId && target !== payload.friendId),
        isPending: false,
      }
    }
    case 'CREATE_FRIEND':
      //if create, update local state to include the newly created firend
      return {
        ...state,
        friends: [...state.friends, payload.friendData],
        isPending: false,
      }
    case 'DELETE_CONNECTIONS':
      return {
        ...state,
        connections: state.connections.filter(({ id }) => !payload.connectionIds.includes(id)),
        // update selected friend (whose connection was just rmeoved) to have expected friend.connections.from arr
        friends: state.friends.map((friend) => friend.id === otherProps.friendId ? ({
          ...friend,
          connections: {
            ...friend.connections,
            from: friend.connections.from.filter(({ id }) => !payload.connectionIds.includes(id))
          }
        }) : friend),
        isPending: false
      }
    case 'UPDATE_FRIEND':
      return {
        ...state,
        // update friends arr, replace firstName, lastName, totlaFriends and sex of updated friend, but keep other properties liek connections.to and connections.from
        friends: state.friends.map((friend) => friend.id === payload.friend.id ? { ...friend, ...payload.friend } : friend),
        isPending: false,
      }
    case 'CREATE_CONNECTIONS':
      return {
        ...state,
        ...payload, // for now { connections, friends } is returned with formatted data (instead of a saga intercepting this and firing REQUEST_FORMATTED_DATA)
        isPending: false
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

  if (type.includes('GET')) {
    return setPending(state, 'get')
  } else if (type.includes('DELETE')) {
    return setPending(state, 'delete')
  } else if (type.includes('PUT')) {
    return setPending(state, 'update')
  } else if (type.includes('POST')) {
    return setPending(state, 'create')
  } else if ([REQUEST_FRIEND_FAIL, REQUEST_CONNECTIONS_FAIL, REQUEST_FORMATTED_DATA_FAIL].includes(type)) {
    return setFailed(state, payload)
  }

  switch (type) {
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
