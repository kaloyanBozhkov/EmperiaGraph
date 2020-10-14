import React, { useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'

import Button from 'UI/Button/Button'
import Icon from '~/components/UI/Icon/Icon'

import styles from './styles.module.scss'
import { svg } from 'd3'

const onZoomed = function handleSvgZoom(transform) {
  for (let child of this.children) {
    child.setAttribute(
      'style',
      `transform: translateX(${transform.x}px) translateY(${transform.y}px) scale(${transform.k})`
    )
  }
}

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

const svgConfigs = {
  sex(selection) {
    return selection.attr('sex', (vertex) => vertex.sex)
  },
  radius(selection, selectedVertex, activeVertexRadius = 10, inactiveVertexRadius = 5, customCheck = false, withLower = true, withRaise = true) {
    return selection.attr('r', function (vertex) {

      const elSel = d3.select(this)

      // have a custom check to run?
      const isActive = customCheck !== false ? customCheck(vertex) : (vertex.id === selectedVertex?.id || selectedVertex?.connections.from.find(({ target: targetId }) => targetId === vertex.id))

      // if vertex is the selected one or connected to selected one
      if (isActive) {
        if (withRaise) elSel.raise()

        return activeVertexRadius
      }

      if (withLower) elSel.lower()

      return inactiveVertexRadius === 'past' ? elSel.attr('r') : inactiveVertexRadius
    })
  },
  friend(selection, selectedVertex) {
    selection.attr('friend', (vertex) => {
      // no selected vertex, all are default style
      if (!selectedVertex) {
        return 'default'
      } else if (vertex.id === selectedVertex?.id) {
        return 'selected'
      } else if (selectedVertex?.connections.from.find(({ target: targetId }) => targetId === vertex.id)) {
        return 'connected'
      }

      // vertex is selected but this one is not it or connected to it (unknown!)
      return 'unknown'
    })
  },
  mouseEnterCircle(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    const configsThis = this

    selection.on('mouseenter', function (vertex) {
      // if vertex is connected to selected vertex (and that is obv set first hah)
      if (selectedVertex && vertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertex?.id)) {

        simulation.stop()

        configsThis.radius(
          selection,
          selectedVertex,
          '15',
          'past',
          (selectionVertex) => (selectionVertex.id === vertex.id || selectionVertex.id === selectedVertex.id)
        )

        // trigger another function for this selected vertex (for text & lines)
        triggerFn(vertex)
      }
    })
  },
  mouseLeaveCircle(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    const configsThis = this

    selection.on('mouseleave', (vertex) => {
      // if vertex is connected to selected vertex
      if (selectedVertex && vertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertex.id)) {
        simulation.restart()

        configsThis.radius(selection, selectedVertex)

        // fn to run for other changes to happen on mouseleave (texts and lines)
        triggerFn(vertex)
      }
    })
  },
  raiseVertex(selection, comparisonIds = [], lowerRest = false) {
    selection.each(function (vertex) {
      const selected = d3.select(this)
      if (comparisonIds.includes(vertex.id)) selected.raise()
      if (lowerRest) selected.lower()
    })
  },
  lowerVertex(selection, comparisonIds = [], raiseRest = false) {
    selection.each(function (vertex) {
      const selected = d3.select(this)
      if (comparisonIds.includes(vertex.id)) selected.lower()
      if (raiseRest) selected.raise()
    })
  },

  // @TODO needed raise?
  raiseLine(selection, comparisonIds = [], lowerRest = false) {
    selection.each(function (edge) {
      const selected = d3.select(this)
      if (comparisonIds.includes(edge.source.id) ||
        comparisonIds.includes(edge.target.id)) selected.raise()
      if (lowerRest) selected.lower()
    })
  },

  // @TODO needed lower?
  lowerLine(selection, comparisonIds = [], raiseRest = false) {
    selection.each(function (edge) {
      const selected = d3.select(this)
      if (comparisonIds.includes(edge.source.id) ||
        comparisonIds.includes(edge.target.id)) selected.lower()
      if (raiseRest) selected.raise()
    })
  },
  activeLine(selection, hoveredVertex) {
    selection.attr('active', (edge) => (edge.source.id === hoveredVertex?.id || edge.target.id === hoveredVertex?.id) || null)
  },
  activeText(selection, hoverVertexOrEdge, selectedVertex) {
    // checking vertices
    selection.attr('active', (vertexOrEdge) => {
      debugger
      if (hoverVertexOrEdge?.sex && hoverVertexOrEdge.connections.to.find(({ source: sourceId }) => sourceId === selectedVertex?.id)) {
        return 'true'
      } else if (vertexOrEdge?.source?.id === selectedVertex?.id) {
        return 'true'
      }

      return null
    })
  },
  selectedLine(selection, selectedVertex) {
    selection.attr('selected', (edge) => (edge.source.id === selectedVertex?.id || null))
  },
  lineWidth(selection, selectedVertex) {
    selection.attr('stroke-width', (edge) => edge.source.id === selectedVertex?.id ? edge.weight : 1)
  },
  mouseEnterLine(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    selection.on('mouseenter', function (edge) {
      if (selectedVertex?.id === edge.source.id || selectedVertex?.id === edge.target.id) {

        simulation.stop()

        // configsThis.radius(
        //   selection,
        //   selectedVertex,
        //   '15',
        //   'past',
        //   (selectionVertex) => (selectionVertex.id === edge.source.id || selectionVertex.id === edge.target.id),
        //   false // withLower
        // )

        // trigger another function for this selected vertex (for text & lines)
        triggerFn(edge)
      }
    })
  },
  mouseLeaveLine(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    selection.on('mouseleave', function (edge) {
      if (selectedVertex?.id === edge.source.id || edge.target.id === selectedVertex?.id) {

        simulation.restart()

        // configsThis.radius(
        //   selection,
        //   selectedVertex,
        // )

        // trigger another function for this selected vertex (for text & lines)
        triggerFn(edge)
      }
    })
  }
}


// const configureEdges = (lines, circles, texts, selectedVertexId, simulation) => {
//   lines
//     .on('mouseenter', (d) => {

//     })
//     .on('mouseover', function (hoveredEdge) {
//       // if edge hovered is for selected vertex
//       if (selectedVertexId === hoveredEdge.source.id || hoveredEdge.target.id === selectedVertexId) {
//         d3.select(this).raise()
//       }
//     })
//     .on('mouseleave', (d) => {
//       if (selectedVertexId === d.source.id || d.target.id === selectedVertexId) {
//         simulation.restart()

//         circles.attr('r', (circleD) => {
//           if (circleD.id === selectedVertexId) {
//             return 10
//           }

//           return 5
//         })

//         texts.attr('connected-active', null)
//       }
//     })
// }

// const configureVertices = (lines, circles, texts, selectedvertexId, simulation) => {

//   circles
//     .on('mouseenter', (circleVertex) => {
//       if (circleVertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertexId)) {

//         simulation.stop()

//         texts
//           .attr('connected-active', function (textD) {
//             if (textD.id === circleVertex.id) {

//               // put text on top for text belonging to vertices connexted to selected vertex
//               d3.select(this).raise()

//               return 'true'
//             }

//             return null
//           })

//         lines
//           .attr('active', (d) => {
//             if (d.source.id === circleVertex.id || d.target.id === circleVertex.id) {
//               return 'true'
//             }

//             return null
//           })
//       }
//     })
//     .on('mouseleave', (circleVertex) => {
//       if (circleVertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertexId)) {
//         simulation.restart()

//         circles.attr('r', function (circleD) {
//           if (circleD.id === circleVertex.id) {
//             return 10
//           }

//           return 5
//         })

//         texts.attr('connected-active', null)

//         lines.attr('active', null)
//       }
//     })
// }

const updateEdges = (lines) => {
  lines
    .attr('x1', (edge) => edge.source.x)
    .attr('y1', (edge) => edge.source.y)
    .attr('x2', (edge) => edge.target.x)
    .attr('y2', (edge) => edge.target.y)
}

const updateVertices = (circles, vertexSelectHandler) => {
  circles
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .on('click', (d) => vertexSelectHandler(d.id))
}

const updateTexts = (texts) => {
  texts
    .text((d) => d.firstName)
    .attr('x', function (d) { return d.x - (this.getBBox().width / 2) })
    .attr('y', function (d) { return d.y - this.getBBox().height })
}

const Graph = ({
  canvasConfig = defaultConfig,

  vertices = [],
  edges = [],

  selectedVertex,

  setSelectedVertex,

  connectionStrength = -5,
  connectionDistance = 5,
  withoutZoom = false,
}) => {
  const edgesRef = useRef()
  const verticesRef = useRef()

  const canvas = useRef()
  const zoom = useRef(null)

  const simulation = useMemo(() => {
    if (!edges || !vertices) return null

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
  }, [canvasConfig, edges, vertices, connectionStrength, connectionDistance])

  const verticesNodes = useMemo(() => {

    // if simulation still not set due to no edges and\or vertices
    if (!simulation) return null

    return simulation.nodes().map((vertex) => (
      <React.Fragment key={vertex.id}>
        <circle />
        <text />
      </React.Fragment>
    ))
  }, [simulation])


  const edgesNodes = useMemo(() => edges.map((edge) => (<line key={edge.id} />)), [edges, selectedVertex])

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

      // declare outside of tick fn so to save some memory
      const actionHandlers = {
        onCircleMouseEnter(vertex) {
          svgConfigs.activeLine(lines, vertex)
          // on mouseenter on a vertex connected to selected vertex 
          svgConfigs.activeText(circles, vertex, selectedVertex)
        },
        onLineMouseEnter(edge) {
          // on mouseenter on an edge between a vertex and the selected vertex
          svgConfigs.activeText(lines, edge, selectedVertex)
        },
        onCircleMouseLeave() {
          svgConfigs.activeLine(lines, null)
        },
        onLineMouseLeave(edge) {
          // on mouseenter on an edge between a vertex and the selected vertex
          svgConfigs.activeText(lines, edge, selectedVertex)
        }
      }

      // when simulation progressses (each tick) re-renderthe edges and vertices with updated position
      simulation.on('tick', () => {

        // update positions
        updateEdges(lines)
        updateTexts(texts)
        updateVertices(circles, setSelectedVertex)

        // handle circes attributes
        svgConfigs.sex(circles)
        svgConfigs.radius(circles, selectedVertex, 10, 5, false, false, false)
        svgConfigs.friend(circles, selectedVertex)

        // handle texts attributes
        svgConfigs.friend(texts, selectedVertex)

        // handle lines attributes
        svgConfigs.selectedLine(lines, selectedVertex)
        svgConfigs.lineWidth(lines, selectedVertex)

        // handle circle events
        svgConfigs.mouseEnterCircle(circles, selectedVertex, simulation, actionHandlers.onCircleMouseEnter)
        svgConfigs.mouseLeaveCircle(circles, selectedVertex, simulation, actionHandlers.onCircleMouseLeave)

        // // handle line events
        // svgConfigs.mouse(circles, selectedVertex, simulation, actionHandlers.onCircleMouseEnter)
        // svgConfigs.mouseLeaveCircle(circles, selectedVertex, simulation, actionHandlers.onCircleMouseLeave)


      })

      return () => simulation.stop()
    }
  }, [simulation, edges, vertices, selectedVertex, setSelectedVertex])


  useEffect(() => {
    if (canvas.current && !withoutZoom) {
      zoom.current = d3.zoom().scaleExtent([-10, 10]).on('zoom', () => onZoomed.call(canvas.current, d3.event.transform))

      d3.select(canvas.current).call(zoom.current).on("dblclick.zoom", null)
    }
  }, [withoutZoom])

  return (
    <div className={styles.graph}>
      <svg
        ref={canvas}
        width={canvasConfig.width}
        height={canvasConfig.height}
        viewBox={`0 0 ${canvasConfig.width} ${canvasConfig.height}`}
      >
        <g ref={edgesRef}>
          {edgesNodes}
        </g>
        <g ref={verticesRef}>
          {verticesNodes}
        </g>
      </svg>
      {!withoutZoom && (
        <div className={styles.zoomController}>
          <Button label={<Icon icon="plus" />} onClick={() => zoom.current.scaleBy(d3.select(canvas.current).transition().duration(750), 1.2)} />
          <Button label={<Icon icon="minus" />} onClick={() => zoom.current.scaleBy(d3.select(canvas.current).transition().duration(750), 0.8)} />
        </div>
      )}
    </div>
  )
}

export default Graph

// import React, { useEffect, useRef, useMemo, useState } from 'react'
// import * as d3 from 'd3'
// import Button from 'UI/Button/Button'
// import Icon from '~/components/UI/Icon/Icon'
// import styles from './styles.module.scss'

// const onZoomed = function handleSvgZoom(transform) {
//   for (let child of this.children) {
//     child.setAttribute(
//       'style',
//       `transform: translateX(${transform.x}px) translateY(${transform.y}px) scale(${transform.k})`
//     )
//   }
// }

// const defaultConfig = {
//   width: 1000,
//   height: 1000,
// }

// const dragger = (simulation) => {
//   const dragstarted = (d) => {
//     if (!d3.event.active) simulation.alphaTarget(0.3).restart()
//     d.fx = d.x
//     d.fy = d.y
//   }

//   const dragged = (d) => {
//     d.fx = d3.event.x
//     d.fy = d3.event.y
//   }

//   const dragended = (d) => {
//     if (!d3.event.active) simulation.alphaTarget(0)
//     d.fx = null
//     d.fy = null
//   }

//   return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
// }

// const updateEdges = (lines) => {
//   lines
//     .attr('x1', (d) => d.source.x)
//     .attr('y1', (d) => d.source.y)
//     .attr('x2', (d) => d.target.x)
//     .attr('y2', (d) => d.target.y)
// }

// const updateVertices = (circles, texts) => {
//   circles
//     .attr('cx', (d) => d.x)
//     .attr('cy', (d) => d.y)

//   texts
//     .attr('x', function (d) { return d.x - (this.getBBox().width / 2) })
//     .attr('y', function (d) { return d.y - this.getBBox().height })
// }

// const getSimulation = (vertices, edges, canvasConfig, connectionDistance, connectionStrength) => d3
//   .forceSimulation(vertices)
//   .force(
//     'link',
//     d3
//       .forceLink(edges)
//       .distance(canvasConfig.width / connectionDistance)
//       .id((d) => d.id)
//   )
//   .force('charge', d3.forceManyBody().strength(connectionStrength))
//   .force('center', d3.forceCenter(canvasConfig.width / 2, canvasConfig.height / 2))
//   .force(
//     'collision',
//     d3.forceCollide().radius((d) => d.radius)
//   )

// const Graph = ({
//   canvasConfig = defaultConfig,

//   vertices = [],
//   edges = [],

//   selectedVertex,

//   setSelectedVertex,

//   connectionStrength = -5,
//   connectionDistance = 5,

//   withoutZoom = false,
// }) => {
//   const svg = useRef()

//   const [simulation, setSimulation] = useState(getSimulation(vertices, edges, canvasConfig, connectionDistance, connectionStrength))

//   // handle initial creation of lines, circles and texts
//   useEffect(() => {
//     svg.current = d3.select('#svg')

//     // setup dragging behavior for vertices & their texts
//     const circles = svg.current
//       .selectAll('circle')
//       .data(vertices, (d) => d.id)
//       .enter()
//       .append()
//       .call(dragger(simulation))
//       .on('click', (d) => setSelectedVertex(d.id))

//     const texts = svg.current
//       .selectAll('text')
//       .data(vertices, (d) => d.id)
//       .enter()
//       .append()
//       .call(dragger(simulation))

//     const lines = svg.current
//       .selectAll('line')
//       .data(edges, (d) => d.id)
//       .enter()
//       .append()

//   }, [])




//   // on mount set drag handler to vertices and the callback for simulation's tick to update positions of vertices and edges
//   useEffect(() => {

//     // when simulation progressses (each tick) re-renderthe edges and vertices with updated position
//     simulation.on('tick', () => {

//       // updateEdges(svg.current.selectAll('line'))
//       // updateVertices(svg.current.selectAll('circle'),svg.current.selectAll('text'))
//     })

//     return () => simulation.stop()
//   }, [simulation])

//   // keep track of zoom without re-rendering
//   const zoom = useRef(null)

//   useEffect(() => {
//     if (!withoutZoom) {
//       zoom.current = d3.zoom().scaleExtent([-10, 10]).on('zoom', () => onZoomed.call(svg.current, d3.event.transform))

//       svg.current.call(zoom.current).on("dblclick.zoom", null)
//     }
//   }, [withoutZoom])


//   return (
//     <div className={styles.graph}>
//       <svg
//         ref={svg}
//         width={canvasConfig.width}
//         height={canvasConfig.height}
//         viewBox={`0 0 ${canvasConfig.width} ${canvasConfig.height}`}
//       />
//       {!withoutZoom && (
//         <div className={styles.zoomController}>
//           <Button label={<Icon icon="plus" />} onClick={() => zoom.current.scaleBy(d3.select('svg').transition().duration(750), 1.2)} />
//           <Button label={<Icon icon="minus" />} onClick={() => zoom.current.scaleBy(d3.select('svg').transition().duration(750), 0.8)} />
//         </div>
//       )}
//     </div>
//   )
// }

// export default Graph