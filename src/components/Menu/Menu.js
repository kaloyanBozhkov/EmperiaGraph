import React from 'react'
import styles from './styles.module.scss'
import FriendList from '~/containers/FriendList.container'
import FriendsController from '~/containers/FriendsController.container'

const Menu = ({ isMobile = false}) => {

  return (
    <div className={styles.menu}>
      <FriendsController />
      <FriendList isMobileMenu={isMobile} />
    </div>
  )
}

export default Menu
