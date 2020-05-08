import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

function onZoomed(transform) {
  for (let child of this.children) {
    child.setAttribute(
      'style',
      `transform: translateX(${transform.x}px) translateY(${transform.y}px) scale(${transform.k})`
    )
  }
}

const Canvas = ({ canvasConfig, withoutZoom = false, children }) => {
  const canvas = useRef()

  useEffect(() => {
    if (canvas.current && !withoutZoom) {
      d3.select(canvas.current).call(
        d3
          .zoom()
          .scaleExtent([1, 8])
          .on('zoom', () => onZoomed.call(canvas.current, d3.event.transform))
      )
    }
  }, [withoutZoom])

  return (
    <svg
      ref={canvas}
      width={canvasConfig.width}
      height={canvasConfig.height}
      viewBox={`0 0 ${canvasConfig.width} ${canvasConfig.height}`}
    >
      {children}
    </svg>
  )
}

export default Canvas
