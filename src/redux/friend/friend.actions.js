import { SET_FRIEND, CLEAR_FRIEND } from './friend.constants'

export const setFriend = (friend) => ({
  type: SET_FRIEND,
  payload: friend,
})
export const clearFriend = () => ({
  type: CLEAR_FRIEND,
})
