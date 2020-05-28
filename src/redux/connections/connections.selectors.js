import { createSelector } from 'reselect'

const connections = (state) => state.connectionsReducer

export const getConnections = createSelector(
  [connections],
  (connectionsReducer) => connectionsReducer.connecitons
)
