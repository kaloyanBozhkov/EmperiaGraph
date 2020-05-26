import { createSelector } from 'reselect'

const friend = (state) => state.friendReducer

export const getSelectedFriend = createSelector([friend], (friendReducer) => {
  if (!friendReducer.selectedFreind) {
    return null
  }

  return friendReducer.friends[friendReducer.selectedFriend] || null
})
