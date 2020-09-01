import { CLEAR_FRIEND, SELECT_FRIEND, SET_FRIENDS } from './friend.constants'

export const setFriends = (friends) => ({
  type: SET_FRIENDS,
  payload: friends,
})

export const selectFriend = (selectedFriend) => ({
  type: SELECT_FRIEND,
  payload: selectedFriend,
})

export const clearFriend = () => ({
  type: CLEAR_FRIEND,
})
