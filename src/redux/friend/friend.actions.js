import { SET_FRIEND, CLEAR_FRIEND, SELECT_FRIEND } from './friend.constants'

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
