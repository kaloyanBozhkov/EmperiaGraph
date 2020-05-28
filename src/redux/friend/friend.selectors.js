import { createSelector } from 'reselect'

const getUnformattedFriends = (state) => state.friendReducer.friends
export const getSelectedFriend = (state) => state.friendReducer.selectedFriend

export const getFriends = createSelector([getUnformattedFriends], (friends) =>
  friends.map((friend) => ({
    ...friend,
    label: friend.firstName + ' ' + friend.lastName,
  }))
)

// export const getSelectedFriend = createSelector(
//   [getFriends, getSelectedFriendId],
//   (friends, selectedFriend) =>
//     (selectedFriend && friends.filter(({ id }) => +selectedFriend === +id)[0].id) || null
// )
