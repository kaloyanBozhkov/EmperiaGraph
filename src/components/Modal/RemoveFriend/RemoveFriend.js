import React, { useState } from 'react'

import styles from './styles.module.scss'
import Button from '~/components/Modal/Confirm/node_modules/UI/Button/Button'
import FriendList from '~/containers/FriendList.container'

const RemoveFriend = ({
  onSave,
  onCancel
}) => {
  const [friend, setFriend] = useState(null)

  return (
    <div className={styles.removeFriend}>
      <div className={styles.contentWrapper}>
        <div className={styles.friendListWrapper}>
          <FriendList onSelect={setFriend} modifier="doubleColumn" />
        </div>
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

export default RemoveFriend
