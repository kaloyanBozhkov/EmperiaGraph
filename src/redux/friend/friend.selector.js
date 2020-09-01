import { createSelector } from 'reselect'

const getFriends = (state) => state.friendReducer.friends

export const getSelectedFriendId = (state) => state.friendReducer.selectedFriend?.id || null

// get all .from of each friends[].connections, skipping repeating links
export const selectPurifiedConnections = createSelector(
  [getFriends],
  (friends) => {
    const connections = friends.reduce((acc, friend) => [
      ...acc,
      ...friend.connections.from
    ], [])
    
    const connectionsPurified = connections.reduce((acc, conn) => {
      const {
          source: sourceId,
          target: targetId
      } = conn
    
      // connection exists both ways, so keep only 1 of them
      if (acc.find((conn) => conn.source.id === sourceId && conn.target.id === targetId)) {
          return acc
      }
    
      // conn is unique/one way so keep as is
      return [ ...acc, conn ]
    }, [])

    return connectionsPurified
  }
)
