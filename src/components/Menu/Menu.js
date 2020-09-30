import React from 'react'
import styles from './styles.module.scss'
import FriendList from '~/containers/FriendList.container'
import FriendsController from '~/containers/FriendsController.container'

const Menu = () => {
  return (
    <div className={styles.menu}>
      <FriendsController />
      <FriendList />
    </div>
  )
}

export default Menu
