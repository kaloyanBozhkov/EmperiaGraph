import React, { useState } from 'react'
import styles from './styles.module.scss'
import Icon from '../UI/Icon/Icon'
import Button from '../UI/Button/Button'

const InfoWindow = ({ selectedFriend, clearSelectedFriend, deleteSelectedFriend, addConnections }) => {
    const [showActions, setShowActions] = useState(false)

    // if friend not selected, do not show info window
    if (!selectedFriend) {
        return null
    }

    // if friend selcted, get the data we need to show
    const { firstName, lastName, sex, totalFriends, connections: { from: emperiaFriends } } = selectedFriend

    return (
        <>
            <div className={styles.infoWindow}>
                <div className={styles.heading}>
                    <p>{firstName} {lastName}</p>
                    <div className={styles.closeIcon} onClick={clearSelectedFriend}>
                        <Icon icon="close" />
                    </div>
                </div>
                <p>Sex: {sex}</p>
                <p>Facebook friends: {totalFriends}</p>
                <p>Emperia friends: {emperiaFriends.length || '-'}</p>
                <div className={styles.actionsArea} data-expanded={showActions ? true : undefined}>
                    {showActions && (<>
                        <Button label="Edit friendships" onClick={() => addConnections(selectedFriend)} />
                        <Button label="Delete friend & connections" onClick={() => deleteSelectedFriend(selectedFriend)} />
                        
                    </>)}
                    <button className={styles.showMoreButton} onClick={() => setShowActions(!showActions)}>{showActions ? 'Hide' : 'Show'} actions</button>
                </div>
            </div>
        </>
    )
}

export default InfoWindow