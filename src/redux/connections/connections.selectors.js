import { createSelector } from 'reselect'
import setConnections from '~/helpers/setConnections'

const connections = (state) => state.connectionsReducer

export const getConnections = createSelector(
  [connections],
  (connectionsReducer) => connectionsReducer.connecitons
)

export const getFormattedConnections = createSelector(
  [connections], 
  (connectionsReducer) => setConnections(connectionsReducer.connecitons)
)