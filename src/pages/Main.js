import React, { useRef } from 'react'

import Graph from '~/components/Graph/Graph.container'

import styles from './styles.module.scss'

import verticesData from '~/data/vertices.json'
import edgesData from '~/data/edges.json'

import formatEdges from '~/helpers/formatEdges'
import setConnections from '~/helpers/setConnections'

import useWindowWidth from '~/hooks/useWindowWidth'
import useWindowHeight from '~/hooks/useWindowHeight'

const Main = () => {
  const graphWrapper = useRef()
  console.log(
    edgesData.map((edge) => {
      return {
        source: edge.source,
        target: edge.target,
        id: edge.id,
      }
    })
  )
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
      />
    </div>
  )
}

export default Main
