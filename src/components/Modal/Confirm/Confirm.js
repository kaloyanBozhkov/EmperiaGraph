import React from 'react'

import styles from './styles.module.scss'
import Button from 'UI/Button/Button'

const Confirm = ({ label, onSave = (f) => f, onCancel = (f) => f }) => {
  return (
    <div className={styles.conrifm}>
      <div className={styles.contentWrapper}>
        <p>{label}</p>
      </div>
      <div className={styles.btnArea}>
        <Button
          label="Cancel"
          onClick={onCancel}
          modifier="secondary"
        />
        <Button
          label="Confirm"
          onClick={onSave}
        />
      </div>
    </div>
  )
}

export default Confirm
