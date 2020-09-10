import React from 'react'

import styles from './styles.module.scss'

const Vertex = ({ text, sex, selected, onClick, circleStyle, textStyle }) => {
  return (
    <>
      <circle
        r={selected ? '10' : '5'}
        fill={sex === 'male' ? '#588BAE' : '#FE7F9D'}
        className={styles.vertex}
        onClick={onClick}
        style={circleStyle}
      />
      <text stroke="black" strokeWidth="0.1" className={styles.text} style={textStyle}>
        {text}
      </text>
    </>
  )
}

export default Vertex
