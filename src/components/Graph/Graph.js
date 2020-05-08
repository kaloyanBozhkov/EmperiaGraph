import React, { useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'

import Canvas from './Canvas/Canvas'
import Vertex from './Vertex/Vertex'
import Edge from './Edge/Edge'

import styles from './styles.module.scss'

const defaultConfig = {
  width: 1000,
  height: 1000,
}

const dragger = (simulation) => {
  const dragstarted = (d) => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  const dragged = (d) => {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  const dragended = (d) => {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
}

const updateEdges = (edgesGroup, edgesDatum, selectedVertex) => {
  d3.select(edgesGroup)
    .selectAll('line')
    .data(edgesDatum)
    .attr('stroke-width', (d) => {
      // if edge starting from selected vertex, set its weight
      if (d.source.id === selectedVertex) {
        return d.weight
      }

      return 1
    })
    .style('opacity', (d) => {
      if (!selectedVertex) {
        return null
      } else if (d.source.id === selectedVertex) {
        return 1
      }

      return 0.45
    })
    .attr('selected', (d) => (d.source.id === selectedVertex ? true : undefined))
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y)
}

const updateVertices = (verticesGroup, verticesDatum, selectedVertex, connections) => {
  const verticesG = d3.select(verticesGroup)

  verticesG
    .selectAll('circle')
    .data(verticesDatum)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .style('opacity', (d) => {
      if (
        d.id === selectedVertex ||
        (connections[selectedVertex] && ~connections[selectedVertex].indexOf(+d.id))
      ) {
        return 1
      } else if (!selectedVertex) {
        return null
      }
      return 0.45
    })

  verticesG
    .selectAll('text')
    .data(verticesDatum)
    .attr('selected', (d) => (d.id === selectedVertex ? true : undefined))
    .attr('x', function (d) {
      return d.x - this.getBBox().width / 2
    })
    .attr('y', (d) => {
      if (d.id === selectedVertex) {
        return d.y - 20
      }

      return d.y + 20
    })
    .style('opacity', (d) => {
      if (!selectedVertex) {
        return null
      } else if (
        d.id === selectedVertex ||
        (connections[selectedVertex] && ~connections[selectedVertex].indexOf(+d.id))
      ) {
        return 1
      }
      return 0.45
    })
}

const Graph = ({
  vertices = [],
  edges = [],
  connections,
  canvasConfig = defaultConfig,
  selectedVertex,
  setSelectedVertex,
  clearSelectedVertex,
}) => {
  const edgesRef = useRef()
  const verticesRef = useRef()
  const simulation = d3
    .forceSimulation(vertices)
    .force(
      'link',
      d3
        .forceLink(edges)
        .distance(canvasConfig.width / 5)
        .id((d) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(canvasConfig.width / 2, canvasConfig.height / 2))

  // on mount set drag handler to vertices and the callback for simulation's tick to update positions of vertices and edges
  useEffect(() => {
    if (edgesRef.current && verticesRef.current) {
      d3.select(verticesRef.current).selectAll('circle').call(dragger(simulation))

      simulation.on('tick', () => {
        updateEdges(edgesRef.current, edges, selectedVertex)
        updateVertices(verticesRef.current, vertices, selectedVertex, connections)
      })

      return () => simulation.stop()
    }
  }, [simulation, edges, vertices, selectedVertex, connections])

  const vertexSelectHandler = (id) => {
    if (selectedVertex !== id) {
      setSelectedVertex(id)
    } else {
      clearSelectedVertex()
    }
  }

  const edgeHoverZindexFix = useCallback(
    (edge) => {
      console.log('edge.source.id', edge.source.id)
      console.log('edge.target.id', edge.target.id)
      console.log('edge.label', edge.label)
      console.log('selectedVertex', selectedVertex)
      // if edge hovered is from or to the selected vertex, then take it into consideration for z-index fix
      if (edge.source.id == selectedVertex || +edge.target.id == selectedVertex) {
        console.log(edge)
        const lines = d3.select(edgesRef.current).selectAll('line')
        lines.sort((a, b) => (a.id === edge.id ? 1 : -1))
      }
    },
    [selectedVertex]
  )

  // .on(
  //   'mouseover',
  //   (d) => lines.sort((a, b) => (selectedVertex === d.source.id && a.id === d.id ? 1 : -1)) // make the hovered line appear on top of all other lines
  // )
  // .on('click', (d) => console.log(d))
  return (
    <div className={styles.graph}>
      <Canvas canvasConfig={canvasConfig}>
        <g ref={edgesRef} stroke="#999" strokeOpacity="0.6">
          {edges.map((edge) => (
            <Edge
              key={edge.id}
              onMouseOver={() => edgeHoverZindexFix(edge)}
              onClick={() => console.log(edge)}
            />
          ))}
        </g>

        <g ref={verticesRef} stroke="#fff" strokeWidth="1.5">
          {simulation.nodes().map((vertex) => (
            <Vertex
              key={vertex.id}
              text={vertex.label}
              sex={vertex.sex}
              selected={selectedVertex === vertex.id}
              onClick={() => vertexSelectHandler(vertex.id)}
            />
          ))}
        </g>
      </Canvas>
    </div>
  )
}

export default Graph
