import { createSelector } from 'reselect'
import setConnections from '~/helpers/setConnections'

// import vertices
import { getFriends,  } from '../friend/friend.selectors'

const connections = (state) => state.connectionsReducer

// the edges
export const getConnections = createSelector(
  [connections],
  (connectionsReducer) => connectionsReducer.connecitons
)

export const getFormattedConnections = createSelector(
  [getConnections, getFriends], 
  (edges, vertices) => setConnections(vertices, edges)
)