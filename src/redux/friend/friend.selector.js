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
            const justTargetIDs = selectedFriend.connections.from.map(({ target }) => target)

            // 2 way friendships to get rid of during selection
            const twoWayFriendships = selectedFriend.connections.to.filter(({ source }) => justTargetIDs.includes(source))

            const justSourceIDs = twoWayFriendships.map(({ source }) => source)

            return connections.filter(({ source }) => !justSourceIDs.includes(source))


            /* COOL HERE */
            // const justTargetIDs = selectedFriend.connections.from.map(({ target }) => target)

            // // 2 way friendships to get rid of during selection
            // const twoWayFriendships = selectedFriend.connections.to.filter(({ source }) => justTargetIDs.includes(source))

            // const justSourceIDs = twoWayFriendships.map(({ source }) => source)

            // return connections.filter(({ source }) => !justSourceIDs.includes(source))
        }

        return connections
    }
)