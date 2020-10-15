import { createSelector } from 'reselect'

const getFriends = (state) => state.requestReducer.friends
const getSelectedFriend = (state) => state.friendReducer.selectedFriend
const getConnections = (state) => state.requestReducer.connections

export const getSelectedFriendData = createSelector(
    [getFriends, getSelectedFriend],
    (friends, selectedFriendId) => {
        if (friends && selectedFriendId) {
            return friends.find(({ id }) => id === selectedFriendId) || null
        }

        return null
    }
)

export const getPurifiedConnections = createSelector(
    [getConnections, getSelectedFriendData],
    (connections, selectedFriend) => {

        // if friend is selected, remove connections connecting to selected friend from other friends that the selected friend is already connected to
        if (selectedFriend) {
            
            // get list of IDs of friends that have befriended the selected friend
            const befriendedBy = selectedFriend.connections.to
                .filter(({ target, source }) => target === selectedFriend.id && source !== selectedFriend.id)
                .map(({ source }) => source)

            // return one way connections for selected friend
            return connections.filter(({ source }) => !befriendedBy.includes(source))
        }

        return connections
    }
)