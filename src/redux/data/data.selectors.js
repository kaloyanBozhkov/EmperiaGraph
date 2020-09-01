import { createSelector } from 'reselect'

// unformatted data from server
const data = (state) => state.dataReducer

// the edges
export const getConnections = createSelector(
    [data],
    (dataReducer) => dataReducer.connections
)

export const getFriends = createSelector(
    [data],
    (dataReducer) => dataReducer.friends
)