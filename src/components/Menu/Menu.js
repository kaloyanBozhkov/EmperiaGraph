import React from 'react'
import styles from './styles.module.scss'
import FriendList from '../FriendList/FriendList'

import FriendsController from '~/containers/FriendsController.container'

const Menu = ({ selectedFriend, friends, connections, onSelectFriend }) => {
  return (
    <div className={styles.menu}>
      <FriendsController />
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
