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

const updateEdges = (lines, circles, texts, selectedVertex, simulation, verticesGroup) => {
  lines
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
    .on('mouseenter', (d) => {
      if (selectedVertex === d.source.id || d.target.id === selectedVertex) {
        simulation.stop()

        circles.attr('r', (circleD) => {
          if (circleD.id === d.source.id || circleD.id === d.target.id) {
            return '15'
          }

          return '5'
        })

        texts.attr('edge-hovered', (textD) => {
          if (textD.id === d.source.id || textD.id === d.target.id) {
            return 'true'
          }

          return null
        })
      }
    })
    .on('mouseover', (d) => {
      if (selectedVertex === d.source.id || d.target.id === selectedVertex) {
        lines.sort((a, b) => (selectedVertex === d.source.id && a.id === d.id ? 1 : -1)) // make the hovered line appear on top of all other lines
      }
    })
    .on('mouseleave', (d) => {
      if (selectedVertex === d.source.id || d.target.id === selectedVertex) {
        simulation.restart()

        circles.attr('r', (circleD) => {
          if (circleD.id === selectedVertex) {
            return '10'
          }

          return '5'
        })

        texts.attr('edge-hovered', null)
      }
    })
    .on('click', (d) => console.log(d))
}

const updateVertices = (circles, texts, selectedVertex, connections) => {
  circles
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

  texts
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
    .force(
      'collision',
      d3.forceCollide().radius(function (d) {
        return d.radius
      })
    )

  // on mount set drag handler to vertices and the callback for simulation's tick to update positions of vertices and edges
  useEffect(() => {
    if (edgesRef.current && verticesRef.current) {
      d3.select(verticesRef.current).selectAll('circle').call(dragger(simulation))

      simulation.on('tick', () => {
        const verticesG = d3.select(verticesRef.current)
        const circles = verticesG.selectAll('circle').data(vertices)
        const texts = verticesG.selectAll('text').data(vertices)
        const lines = d3.select(edgesRef.current).selectAll('line').data(edges)

        updateEdges(lines, circles, texts, selectedVertex, simulation, verticesRef.current)
        updateVertices(circles, texts, selectedVertex, connections)
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

  return (
    <div className={styles.graph}>
      <Canvas canvasConfig={canvasConfig}>
        <g ref={edgesRef} stroke="#999" strokeOpacity="0.6">
          {edges.map((edge) => (
            <Edge key={edge.id} />
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
