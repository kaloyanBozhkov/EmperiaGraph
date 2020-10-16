import { CLEAR_FRIEND, SELECT_FRIEND } from './friend.constants'

export const selectFriend = (selectedFriend) => ({
  type: SELECT_FRIEND,
  payload: selectedFriend,
})

export const clearFriend = () => ({
  type: CLEAR_FRIEND,
})