import React from 'react'
import styles from './styles.module.scss'
import FriendList from '../FriendList/FriendList'

const Menu = ({ selectedFriend, friends, onSelectFriend }) => {
  return (
    <div className={styles.menu}>
      <FriendList 
        friends={friends}
        onSelect={onSelectFriend}
        selectedFriend={selectedFriend}
      />
    </div>
  )
}

export default Menu
