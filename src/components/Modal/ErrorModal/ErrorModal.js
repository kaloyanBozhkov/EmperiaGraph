import React from 'react'

import styles from './styles.module.scss'
import Button from 'UI/Button/Button'

const ErrorModal = ({ label, error, errorPreText, onRetry, onCancel = (f) => f}) => {
  return (
    <div className={styles.errorModal}>
      <div className={styles.contentWrapper}>
        <p>{label}</p>
        <br />
        <p>{errorPreText}: <b>{error}</b>.</p>
      </div>
      <div className={styles.btnArea}>
        <Button
          label="Close"
          onClick={onCancel}
          modifier="secondary"
        />
        {onRetry && (
          <Button
            label="Retry"
            onClick={onRetry}
          />
        )}
      </div>
    </div>
  )
}

export default ErrorModal
