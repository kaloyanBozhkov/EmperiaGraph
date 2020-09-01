import React from 'react'
import styles from './styles.module.scss'

const BaseLayout = ({ Header, Menu, InfoWindow, children }) => {
  return (
    <div className={styles.baseLayout}>
      <header>{Header}</header>
      <nav>{Menu}</nav>
      <main>{children}</main>
      {InfoWindow && <section className={styles.infoWindowWrapper}>{InfoWindow}</section>}
    </div>
  )
}

export default BaseLayout
