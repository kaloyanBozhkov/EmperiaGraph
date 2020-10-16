import React from 'react'

import Button from '../UI/Button/Button'

import styles from './styles.module.scss'

const FriendsController = ({ totalMembers, totalFriendships, missingData, onAddFriend = (f) => f, onRemoveFriend = (f) => f }) => {
    return (
        <>  
            <p className={styles.info}>Don't see yourself or a friend?</p>
            <div className={styles.controller}>
                <Button label="Add a friend" icon="user" onClick={onAddFriend} modifier={['primary', 'hoverMove']} />
            </div>
            <div className={styles.totalsInfo}>
                <h1>- Totals -</h1>
                <p>MEMBERS: <b>{totalMembers}</b></p>
                <p>FRIENDSHIPS: <b>{totalFriendships}</b></p>
                <p>MEMBERS MISSING DATA: <b>{missingData}</b></p>
            </div>
        </>
    )
}

export default FriendsController