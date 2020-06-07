import React from 'react'
import styles from './styles.module.scss'
import FriendList from '../FriendList/FriendList'

const Menu = ({ selectedFriend, friends }) => {
  return (
    <div className={styles.menu}>
      <FriendList friends={friends} />
    </div>
  )
}

export default Menu
