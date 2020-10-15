import React from 'react'
import Button from '../UI/Button/Button'

import styles from './styles.module.scss'

const Header = ({ activeMenu = true, toggleMenu }) => {

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h1>EmperiaGraph</h1>
        <h3>(v0.0.1)</h3>
      </div>
      <div className={styles.btnWrapper}>
        <Button icon={activeMenu ? 'close' : 'bars'} modifier="blank" onClick={() => toggleMenu(!activeMenu)} />
      </div>
    </div>
  )
}

export default Header
