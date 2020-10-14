import React from 'react'

import styles from './styles.module.scss'

const Vertex = () => {
  return (
    <>
      <circle className={styles.vertex} />
      <text
        className={styles.vertexHeader}
      />
    </>
  )
}

export default Vertex