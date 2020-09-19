import React, { useEffect, useRef, useMemo } from 'react'
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

const updateEdges = (lines, circles, texts, selectedVertexId, simulation) => {
  lines
    .attr('selected', (d) => (d.source.id === selectedVertexId ? true : undefined))
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y)

  
}

const updateVertices = (circles, texts, selectedVertexId) => {
  circles
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)

  texts
    .attr('selected', (d) => d.id === selectedVertexId ? true : undefined)
    .attr('x', function (d) {
      return d.x - this.getBBox().width / 2
    })
    .attr('y', (d) => d.id === selectedVertexId ? d.y - 20 : d.y + 20)
}

const Graph = ({
  canvasConfig = defaultConfig,

  vertices = [],
  edges = [],

  selectedVertex,

  setSelectedVertex,
  clearSelectedVertex,
}) => {
  const edgesRef = useRef()
  const verticesRef = useRef()
  const selectedVertexId = selectedVertex?.id || null

  const simulation = useMemo(() => {
    if (edges && vertices) {
      return (
        d3
          .forceSimulation(vertices)
          .force(
            'link',
            d3
              .forceLink(edges)
              .distance(canvasConfig.width / 5)
              .id((d) => d.id)
          )
          .force('charge', d3.forceManyBody().strength(-5))
          .force('center', d3.forceCenter(canvasConfig.width / 2, canvasConfig.height / 2))
          .force(
            'collision',
            d3.forceCollide().radius((d) => d.radius)
          )
      )
    }

    return null
  }, [canvasConfig, edges, vertices])


  const verticesNodes = useMemo(() => {

    // if simulation still not set due to no edges and\or vertices
    if (!simulation) { return null }

    const vertexSelectHandler = (id) => {
      if (selectedVertexId !== id) {
        setSelectedVertex(id)
      } else {
        clearSelectedVertex()
      }
    }

    return simulation.nodes().map((vertex) => {

      const opacity = !selectedVertexId ? null : (
        vertex.id === selectedVertexId || selectedVertex?.connections?.from?.find(({ target: { id } }) => id === vertex.id) ?
          1 : .45
      )

      return (
        <Vertex
          key={vertex.id}
          text={vertex.label}
          sex={vertex.sex}
          selected={selectedVertexId === vertex.id}
          circleStyle={{
            opacity
          }}
          textStyle={{
            opacity
          }}
          onClick={() => vertexSelectHandler(vertex.id)}
        />
      )
    })
  }, [selectedVertex, selectedVertexId, setSelectedVertex, clearSelectedVertex, simulation])


  const edgesNodes = useMemo(() => edges.map((edge) => {

    // if edge starting from selected vertex, set its weight
    const strokeWidth = edge.source.id === selectedVertexId ? edge.weight : 1

    const opacity = !selectedVertexId ? null : (
      (selectedVertex?.connections?.from?.find(({ id }) => id === edge.id)) ? 1 : .45
    )

    return (
      <Edge
        key={edge.id}
        style={{
          strokeWidth,
          opacity
        }}
      />
    )
  }), [edges, selectedVertex, selectedVertexId])

  // on mount set drag handler to vertices and the callback for simulation's tick to update positions of vertices and edges
  useEffect(() => {
    if (edgesRef.current && verticesRef.current && simulation) {
      
      // setup dragging behavior for vertices
      d3.select(verticesRef.current).selectAll('circle').call(dragger(simulation))
     
      const verticesG = d3.select(verticesRef.current)
      const circles = verticesG.selectAll('circle').data(vertices)
      const texts = verticesG.selectAll('text').data(vertices)
      const lines = d3.select(edgesRef.current).selectAll('line').data(edges)

      // when simulation progressses (each tick) re-renderthe edges and vertices with updated position
      simulation.on('tick', () => {
        updateEdges(lines, circles, texts, selectedVertexId, simulation, verticesRef.current)
        updateVertices(circles, texts, selectedVertexId)
      })

      return () => simulation.stop()
    }
  }, [simulation, edges, vertices, selectedVertexId])

  return (
    <div className={styles.graph}>
      <Canvas canvasConfig={canvasConfig}>
        <g ref={edgesRef} stroke="#999" strokeOpacity="0.6">
          {edgesNodes}
        </g>
        <g ref={verticesRef} stroke="#fff" strokeWidth="1.5">
          {verticesNodes}
        </g>
      </Canvas>
    </div>
  )
}

export default Graph
