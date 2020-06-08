import { SET_FRIEND, CLEAR_FRIEND, SELECT_FRIEND, SET_FRIENDS, SET_FORMATTED_CONNECTIONS } from './friend.constants'

export const setFriends = (friends) => ({
  type: SET_FRIENDS,
  payload: friends,
})

export const setFriend = (friend) => ({
  type: SET_FRIEND,
  payload: friend,
})

export const selectFriend = (selectedFriend) => ({
  type: SELECT_FRIEND,
  payload: selectedFriend,
})

export const clearFriend = () => ({
  type: CLEAR_FRIEND,
})

export const setFormattedConnections = (connections) => ({
  type: SET_FORMATTED_CONNECTIONS,
  payload: connections
})