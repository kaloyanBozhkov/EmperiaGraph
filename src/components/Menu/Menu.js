import React from 'react'
import styles from './styles.module.scss'
import FriendList from '../FriendList/FriendList'
import Icon from '../UI/Icon/Icon'

const Menu = ({ selectedFriend, friends, connections, onSelectFriend }) => {
  return (
    <div className={styles.menu}>
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
