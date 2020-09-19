import React, { useState } from 'react'

import styles from './styles.module.scss'
import Input from 'UI/Input/Input'
import Button from 'UI/Button/Button'

const ConfirmPassword = ({
  onSave,
  additionalText = <p>Please enter your account password below to confirm your action:</p>,
}) => {
  const [password, setPassword] = useState('')

  // @TODO add Loading status? Would start onConfirm and finish with callback running onCloseModal
  const onConfirm = () => onSave(password)

  return (
    <div className={styles.confirmPassword}>
      <div className={styles.contentWrapper}>
        {additionalText}
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          inputtype="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div className={styles.btnArea}>
        <Button
          label="Confirm"
          status={password.length === 0}
          click={onConfirm}
          color="primary"
          size="full"
        />
      </div>
    </div>
  )
}

export default ConfirmPassword
