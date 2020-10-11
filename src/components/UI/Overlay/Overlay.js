import React from 'react'

// Load styles
import styles from './styles.module.scss'

import Icon from '../Icon/Icon'

const Overlay = ({ children, loadingMsg, withoutSpinner = false }) => {
  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.overlay}>{children}</div>
      <div className={styles.loading}>
        {!withoutSpinner && <Icon icon="cog" />}
        <p>{loadingMsg}</p>
      </div>
    </div>
  )
}

export default Overlay
