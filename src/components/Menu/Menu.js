import React, { useState } from 'react'
import styles from './styles.module.scss'
import FriendList from '../FriendList/FriendList'
import Icon from '../UI/Icon/Icon'
import Button from '../UI/Button/Button'

const Menu = ({ selectedFriend, friends, connections, onSelectFriend }) => {

  const [deleting, setDeleting] = useState(false)

  return (
    <div className={styles.menu}>
      <div className={styles.controller}>
        <p>Friends controller:</p>  
        <div>
          <Button label="Add Friend" />
        </div>
        <div>
          <Button label="Remove Friend" />
        </div>
      </div>
      <FriendList
        friends={friends}
        onSelect={onSelectFriend}
        selectedFriend={selectedFriend}
        connecitons={connections}
      />
    </div>
  )
}

export default Menu
