import { createSelector } from 'reselect'

const getUnformattedFriends = (state) => state.friendReducer.friends

export const getSelectedFriend = (state) => state.friendReducer.selectedFriend

export const getFriends = createSelector([getUnformattedFriends], (friends) =>
  friends.map((friend) => ({
    ...friend,
    label: `${friend.firstName} ${friend.lastName}`,
  }))
)

export const getSelectedFriendData = createSelector([getSelectedFriend, getFriends], (selectedId, friends) => {
  return (friends && friends.filter(({id}) => id === selectedId)[0]) || null
})