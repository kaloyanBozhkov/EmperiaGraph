import React from 'react'
import styles from './styles.module.scss'

const BaseLayout = ({ Header, Menu, InfoWindow, activeMenu, children }) => {
  return (
    <div className={styles.baseLayout}>
      <header>{Header}</header>
      <nav open={activeMenu ? 'yes' : 'no'}>{Menu}</nav>
      <main>{children}</main>
      {InfoWindow && <section className={styles.infoWindowWrapper}>{InfoWindow}</section>}
    </div>
  )
}

export default BaseLayout
