import React, { useRef } from 'react'

import Graph from '~/components/Graph/Graph'

import styles from './styles.module.scss'

// import verticesData from '~/data/vertices.json'
// import edgesData from '~/data/edges.json'

import { getSelectedFriend, getFriends } from '~/redux/friend/friend.selectors'
import { getConnections } from '~/redux/connections/connections.selectors'

import formatEdges from '~/helpers/formatEdges'
import setConnections from '~/helpers/setConnections'

import useWindowWidth from '~/hooks/useWindowWidth'
import useWindowHeight from '~/hooks/useWindowHeight'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectFriend, clearFriend } from '~/redux/friend/friend.actions'

const Main = ({
  edgesData,
  verticesData,
  selectedVertex,
  setSelectedVertex,
  clearSelectedVertex,
}) => {
  const graphWrapper = useRef()
  const vertices = verticesData
  const edges = formatEdges(edgesData, vertices)
  const connections = setConnections(vertices, edges)

  const canvasSize = {
    height: useWindowHeight() - 68,
    width: useWindowWidth(),
  }

  return (
    <div className={styles.main} ref={graphWrapper}>
      <Graph
        vertices={vertices}
        edges={edges}
        connections={connections}
        canvasConfig={canvasSize}
        selectedVertex={selectedVertex}
        setSelectedVertex={setSelectedVertex}
        clearSelectedVertex={clearSelectedVertex}
      />
    </div>
  )
}

const mapStateToPropsSelector = createStructuredSelector({
  selectedVertex: getSelectedFriend,
  verticesData: getFriends,
  edgesData: getConnections,
})

const mapDispatchToProps = (dispatch) => ({
  setSelectedVertex: (friend) => dispatch(selectFriend(friend)),
  clearSelectedVertex: () => dispatch(clearFriend()),
})

export default compose(connect(mapStateToPropsSelector, mapDispatchToProps)(Main))
