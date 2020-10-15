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
  radius(selection, selectedVertex, activeVertexRadius = 8, inactiveVertexRadius = 5, customCheck = false, withLower = true, withRaise = true, withBiggerSelectedVertex = true) {
    return selection.attr('r', function (vertex) {

      const elSel = d3.select(this)

      // have a custom check to run?
      const isActive = customCheck !== false ? customCheck(vertex) : (vertex.id === selectedVertex?.id || selectedVertex?.connections.from.find(({ target: targetId }) => targetId === vertex.id))

      // if vertex is the selected one or connected to selected one
      if (isActive) {
        if (withRaise) elSel.raise()

        if (withBiggerSelectedVertex && vertex.id === selectedVertex?.id) return +activeVertexRadius + 2
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
    selection.on('mouseenter', function (vertex) {
      // if vertex is connected to selected vertex (and that is obv set first hah)
      if (selectedVertex && vertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertex?.id)) {

        simulation.stop()

        // trigger another function for this selected vertex (for text & lines)
        triggerFn(vertex)
      }
    })
  },
  mouseLeaveCircle(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    selection.on('mouseleave', (vertex) => {
      // if vertex is connected to selected vertex
      if (selectedVertex && vertex.connections.to.find(({ source: sourceId }) => sourceId === selectedVertex.id)) {
        simulation.restart()

        // fn to run for other changes to happen on mouseleave (texts and lines)
        triggerFn(vertex)
      }
    })
  },
  activeLine(selection, hoveredVertexOrEdge, withRaise = true, withLower = true) {
    // trigger coming from mouseenter/mouseleave from either an edge or vertex connected to selected vertex
    const isVertex = hoveredVertexOrEdge?.sex

    selection.attr('active', function (edge) {
      const el = d3.select(this)

      // hovered a vertex
      if (isVertex && (edge?.source.id === hoveredVertexOrEdge?.id || edge?.target.id === hoveredVertexOrEdge?.id)) {
        if (withRaise) el.raise()
        return 'true'
      } else if (!isVertex && edge?.id === hoveredVertexOrEdge?.id){ // hovered an edge
        if (withRaise) el.raise()
        return 'true'
      }

      if (withLower) el.lower()
      return null
    })
  },
  activeText(selection, hoverVertexOrEdge) {
    // trigger coming from mouseenter/mouseleave from either an edge or vertex connected to selected vertex
    const isVertex = hoverVertexOrEdge?.sex

    // checking vertices
    selection.attr('active', (vertex) => {
      if (isVertex && vertex?.id === hoverVertexOrEdge?.id) {
        return 'true'
      } else if (!isVertex && (vertex?.id === hoverVertexOrEdge?.target.id)) {
        return 'true'
      }
      
      return null
    })
  },
  selectedLine(selection, selectedVertex) {
    selection.attr('selected', (edge) => edge.source.id === selectedVertex?.id || null)
  },
  lineWidth(selection, selectedVertex) {
    selection.attr('stroke-width', (edge) => edge.source.id === selectedVertex?.id ? edge.weight : 1)
  },
  mouseEnterLine(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    selection.on('mouseenter', function (edge) {
      if (selectedVertex?.id === edge.source.id || selectedVertex?.id === edge.target.id) {

        simulation.stop()

        // trigger another function for this selected vertex (for text & lines)
        triggerFn(edge)
      }
    })
  },
  mouseLeaveLine(selection, selectedVertex, simulation, triggerFn = (f) => f) {
    selection.on('mouseleave', function (edge) {
      if (selectedVertex?.id === edge.source.id || edge.target.id === selectedVertex?.id) {

        simulation.restart()

        // trigger another function for this selected vertex (for text & lines)
        triggerFn(edge)
      }
    })
  },
  raiseAttributeLowerRest(selection, attributes = []) {
    selection.each(function () {
      const el = d3.select(this)
      
      const matches = attributes.some((attr) => !!el.attr(attr))

      if (matches) {
        return el.raise()
      }

      el.lower()
    })
  },
}

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


  const edgesNodes = useMemo(() => edges.map((edge) => (<line key={edge.id} />)), [edges])

  // on mount set drag handler to vertices and the callback for simulation's tick to update positions of vertices and edges
  useEffect(() => {
    if (edgesRef.current && verticesRef.current && simulation) {

      const verticesG = d3.select(verticesRef.current)
      const edgesG = d3.select(edgesRef.current)

      // setup dragging behavior for vertices & their texts
      verticesG
        .selectAll('circle').call(dragger(simulation))

      verticesG
        .selectAll('text').call(dragger(simulation))

      const circles = verticesG.selectAll('circle').data(vertices)
      const texts = verticesG.selectAll('text').data(vertices)
      const lines = edgesG.selectAll('line').data(edges)

      // declare outside of tick fn so to save some memory
      const actionHandlers = {
        onCircleMouseEnter(vertex) {
          
          svgConfigs.activeLine(lines, vertex, false, false)

          svgConfigs.raiseAttributeLowerRest(lines, ['active'])

          // on mouseenter on a vertex connected to selected vertex 
          svgConfigs.activeText(texts, vertex)
          svgConfigs.raiseAttributeLowerRest(texts, ['active'])

          svgConfigs.radius(
            circles,
            selectedVertex,
            '15',
            'past',
            (selectionVertex) => (selectionVertex.id === vertex.id || selectionVertex.id === selectedVertex.id),
            false,
            true,
            false
          )

        },
        onLineMouseEnter(edge) {

          svgConfigs.activeLine(lines, edge, false, false)
          svgConfigs.raiseAttributeLowerRest(lines, ['active'])

          // on mouseenter on an edge between a vertex and the selected vertex
          svgConfigs.activeText(texts, edge)
          svgConfigs.raiseAttributeLowerRest(texts, ['active'])


          // set circle radius for vertex connected to selected vertex by edge make them bigger!
          svgConfigs.radius(
            circles,
            undefined,
            '15',
            'past',
            (selectionVertex) => (selectionVertex.id === edge.source.id || selectionVertex.id === edge.target.id),
            true,
            true,
            false
          )

        },
        onCircleMouseLeave(vertex) {
          svgConfigs.activeLine(lines, null, false, false)

          svgConfigs.activeText(texts, null)
          // svgConfigs.raiseAttributeLowerRest(texts, ['active'])

          svgConfigs.radius(circles, selectedVertex)
        },
        onLineMouseLeave(edge) {
          svgConfigs.activeLine(lines, null, false, false)

          svgConfigs.activeText(texts, null)
          // svgConfigs.raiseAttributeLowerRest(texts, ['active'])

          svgConfigs.radius(circles, selectedVertex)
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
        svgConfigs.radius(circles, selectedVertex, 8, 5, false, false, false)
        svgConfigs.friend(circles, selectedVertex)

        // handle texts attributes
        svgConfigs.friend(texts, selectedVertex)

        // handle lines attributes
        svgConfigs.selectedLine(lines, selectedVertex)
        svgConfigs.lineWidth(lines, selectedVertex)

        // handle circle events
        svgConfigs.mouseEnterCircle(circles, selectedVertex, simulation, actionHandlers.onCircleMouseEnter)
        svgConfigs.mouseLeaveCircle(circles, selectedVertex, simulation, actionHandlers.onCircleMouseLeave)

        // handle line events
        svgConfigs.mouseEnterLine(lines, selectedVertex, simulation, actionHandlers.onLineMouseEnter)
        svgConfigs.mouseLeaveLine(lines, selectedVertex, simulation, actionHandlers.onLineMouseLeave)
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