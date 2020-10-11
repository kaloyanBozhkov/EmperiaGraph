import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

import styles from './styles.module.scss'

import Button from 'UI/Button/Button'
import Icon from '~/components/UI/Icon/Icon'

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
  const zoom = useRef(null)

  useEffect(() => {
    if (canvas.current && !withoutZoom) {
      zoom.current = d3.zoom().scaleExtent([-10, 10]).on('zoom', () => onZoomed.call(canvas.current, d3.event.transform))

      d3.select(canvas.current).call(zoom.current).on("dblclick.zoom", null)
    }
  }, [withoutZoom])

  return (
    <>
      <svg
        ref={canvas}
        width={canvasConfig.width}
        height={canvasConfig.height}
        viewBox={`0 0 ${canvasConfig.width} ${canvasConfig.height}`}
      >
        {children}
      </svg>
      {!withoutZoom && (
        <div className={styles.zoomController}>
          <Button label={<Icon icon="plus" />} onClick={() => zoom.current.scaleBy(d3.select(canvas.current).transition().duration(750), 1.2)} />
          <Button label={<Icon icon="minus" />} onClick={() => zoom.current.scaleBy(d3.select(canvas.current).transition().duration(750), 0.8)} />
        </div>
      )}
    </>
  )
}

export default Canvas
