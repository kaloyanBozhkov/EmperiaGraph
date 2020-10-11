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
    .on('mouseenter', (d) => {
      if (selectedVertexId === d.source.id || d.target.id === selectedVertexId) {
        simulation.stop()

        circles.attr('r', function (circleD) {
          if (circleD.id === d.source.id || circleD.id === d.target.id) {

            // put circle on top of rest
            d3.select(this).raise()

            return 15
          }

          return 5
        })

        texts
          .attr('connected-active', function (textD) {
            if (textD.id === d.target.id) {

              // put text on top for text belonging to vertices connexted to selected vertex
              d3.select(this).raise()

              return 'true'
            }

            return null
          })
      }
    })
    .on('mouseover', function (hoveredEdge) {
      // if edge hovered is for selected vertex
      if (selectedVertexId === hoveredEdge.source.id || hoveredEdge.target.id === selectedVertexId) {
        d3.select(this).raise()
      }
    })
    .on('mouseleave', (d) => {
      if (selectedVertexId === d.source.id || d.target.id === selectedVertexId) {
        simulation.restart()

        circles.attr('r', (circleD) => {
          if (circleD.id === selectedVertexId) {
            return 10
          }

          return 5
        })

        texts.attr('connected-active', null)
      }
    })



  circles
    .on('mouseenter', (circleVertex) => {
      if (circleVertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertexId)) {

        simulation.stop()

        circles.attr('r', function (circleD) {
          if (circleD.id === circleVertex.id || circleD.id === selectedVertexId) {


            return 15
          }

          // put circle on top of rest
          d3.select(this).raise()
          
          return d3.select(this).attr('r')
        })

        texts
          .attr('connected-active', function (textD) {
            if (textD.id === circleVertex.id) {

              // put text on top for text belonging to vertices connexted to selected vertex
              d3.select(this).raise()

              return 'true'
            }

            return null
          })

        lines
          .attr('active', (d) => {
            if (d.source.id === circleVertex.id || d.target.id === circleVertex.id) {
              return 'true'
            }

            return null
          })
      }
    })
    .on('mouseleave', (circleVertex) => {
      if (circleVertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertexId)) {
        simulation.restart()

        circles.attr('r', function (circleD) {
          if (circleD.id === circleVertex.id) {
            return 10
          }

          return 5
        })

        texts.attr('connected-active', null)

        lines.attr('active', null)
      }
    })

}

const updateVertices = (circles, texts, selectedVertexId, selectedVertex) => {

  circles
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => d.id === selectedVertexId ? 10 : 5)
    .style('opacity', (d) => {
      if (
        d.id === selectedVertexId || selectedVertex?.connections.from.find(({ target }) => target === +d.id)
      ) {
        return 1
      } else if (!selectedVertexId) {
        return null
      }
      return 0.45
    })


  texts
    .attr('selected', (d) => d.id === selectedVertexId ? true : undefined)
    .attr('connected', (d) => selectedVertex?.connections.from.find(({ target }) => target === +d.id) ? true : undefined)
    .attr('x', function (d) { return d.x - (this.getBBox().width / 2) })
    .attr('y', function (d) { return d.y - this.getBBox().height })
}

const Graph = ({
  canvasConfig = defaultConfig,

  vertices = [],
  edges = [],

  selectedVertex,

  setSelectedVertex,
  clearSelectedVertex,

  connectionStrength = -5,
  connectionDistance = 5
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
              .distance(canvasConfig.width / connectionDistance)
              .id((d) => d.id)
          )
          .force('charge', d3.forceManyBody().strength(connectionStrength))
          .force('center', d3.forceCenter(canvasConfig.width / 2, canvasConfig.height / 2))
          .force(
            'collision',
            d3.forceCollide().radius((d) => d.radius)
          )
      )
    }

    return null
  }, [canvasConfig, edges, vertices, connectionStrength, connectionDistance])


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

      const opacity = (vertex.id === selectedVertexId || selectedVertex?.connections.from.find(({ target: { id } }) => id === vertex.id)) ? 1 : .45

      return (
        <Vertex
          key={vertex.id}
          text={vertex.label}
          sex={vertex.sex}
          circleStyle={{
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

    const opacity = (selectedVertexId === edge.source.id || selectedVertexId === edge.target.id) ? 1 : .45

    return (
      <Edge
        key={edge.id}
        style={{
          strokeWidth,
          opacity
        }}
      />
    )
  }), [edges, selectedVertexId])

  // on mount set drag handler to vertices and the callback for simulation's tick to update positions of vertices and edges
  useEffect(() => {
    if (edgesRef.current && verticesRef.current && simulation) {

      const verticesG = d3.select(verticesRef.current)
      // setup dragging behavior for vertices & their texts
      verticesG
        .selectAll('circle').call(dragger(simulation))

      verticesG
        .selectAll('text').call(dragger(simulation))

      const circles = verticesG.selectAll('circle').data(vertices)
      const texts = verticesG.selectAll('text').data(vertices)
      const lines = d3.select(edgesRef.current).selectAll('line').data(edges)

      // when simulation progressses (each tick) re-renderthe edges and vertices with updated position
      simulation.on('tick', () => {
        updateVertices(circles, texts, selectedVertexId, selectedVertex)
        updateEdges(lines, circles, texts, selectedVertexId, simulation)
      })

      return () => simulation.stop()
    }
  }, [simulation, edges, vertices, selectedVertexId, selectedVertex])

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


// const zoomFitter = (config,paddingPercent, transitionDuration) => {
// 	var bounds = root.node().getBBox();
// 	var parent = root.node().parentElement;
// 	var fullWidth = parent.clientWidth,
// 	    fullHeight = parent.clientHeight;
// 	var width = bounds.width,
// 	    height = bounds.height;
// 	var midX = bounds.x + width / 2,
// 	    midY = bounds.y + height / 2;
// 	if (width == 0 || height == 0) return; // nothing to fit
// 	var scale = (paddingPercent || 0.75) / Math.max(width / fullWidth, height / fullHeight);
// 	var translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

// 	console.trace("zoomFit", translate, scale);
// 	root
// 		.transition()
// 		.duration(transitionDuration || 0) // milliseconds
// 		.call(zoom.translate(translate).scale(scale).event);
// }
