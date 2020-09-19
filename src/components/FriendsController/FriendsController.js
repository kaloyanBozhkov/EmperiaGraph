import React from 'react'

import Button from '../UI/Button/Button'

import styles from './styles.module.scss'

const FriendsController = ({ onAddFriend = (f) => f, onRemoveFriend = (f) => f }) => {
    return (
        <div className={styles.controller}>
            <p>Friends controller:</p>  
            <div>
                <Button label="Add Friend" onClick={onAddFriend} />
            </div>
            <div>
                <Button label="Remove Friend" onClick={onRemoveFriend} />
            </div>
         </div>
    )
}

export default FriendsController