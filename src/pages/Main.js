import React, { useRef } from 'react'

import styles from './styles.module.scss'

import Graph from '~/components/Graph/Graph'

import formatEdges from '~/helpers/formatEdges'
import useWindowWidth from '~/hooks/useWindowWidth'
import useWindowHeight from '~/hooks/useWindowHeight'

const Main = ({
  edgesData,
  verticesData,
  selectedVertex,
  setSelectedVertex,
  clearSelectedVertex,
  connections,
}) => {
  const graphWrapper = useRef()
  const vertices = verticesData
  const edges = formatEdges(edgesData, vertices)
  
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

export default Main