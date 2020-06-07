import React from 'react'
import styles from './styles.module.scss'

const BaseLayout = ({ Header, Menu, children }) => {
  return (
    <div className={styles.baseLayout}>
      <header>{Header}</header>
      <nav>{Menu}</nav>
      <main>{children}</main>
    </div>
  )
}

export default BaseLayout
