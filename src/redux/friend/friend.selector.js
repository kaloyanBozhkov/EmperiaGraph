import { createSelector } from 'reselect'

const getFriends = (state) => state.requestReducer.friends
const getSelectedFriend = (state) => state.friendReducer.selectedFriend

export const getSelectedFriendData = createSelector(
    [getFriends, getSelectedFriend],
    (friends, selectedFriendId) => {
        if (friends && selectedFriendId) {
            return friends.find(({ id }) => id === selectedFriendId) || null
        }

        return null
    }
)