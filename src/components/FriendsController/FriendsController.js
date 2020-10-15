import React from 'react'

import Button from '../UI/Button/Button'

import styles from './styles.module.scss'

const FriendsController = ({ onAddFriend = (f) => f, onRemoveFriend = (f) => f }) => {
    return (
        <div className={styles.controller}>
             <Button label="Add a friend" icon="user" onClick={onAddFriend} modifier={['primary', 'hoverMove']} />
        </div>
    )
}

export default FriendsController