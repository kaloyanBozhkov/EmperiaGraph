import React from 'react'
import styles from './styles.module.scss'

const BaseLayout = ({ Header, children }) => {
  return (
    <div className={styles.baseLayout}>
      <header>{Header}</header>
      <main>{children}</main>
    </div>
  )
}

export default BaseLayout
