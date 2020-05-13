import { createSelector } from 'reselect'

const friend = (state) => state.friendReducer

export const getSelectedFriend = createSelector([friend], (friendReducer) => {
  if (!friendReducer.selectedFriend) {
    return null
  }
  const selectedFriend = friendReducer.friend[friendReducer.selectedFriend]

  return selectedFriend || null
})
