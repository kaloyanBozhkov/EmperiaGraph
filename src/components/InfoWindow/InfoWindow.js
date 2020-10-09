import React, { useState } from 'react'
import styles from './styles.module.scss'
import Icon from '../UI/Icon/Icon'
import Button from '../UI/Button/Button'

const InfoWindow = ({ selectedFriend, clearSelectedFriend = (f) => f, deleteSelectedFriend = (f) => f, editConnections = (f) => f }) => {
    const [showActions, setShowActions] = useState(false)

    // if friend not selected, do not show info window
    if (!selectedFriend) {
        return null
    }

    // if friend selcted, get the data we need to show
    const { firstName, lastName, sex, totalFriends, connections } = selectedFriend

    return (
        <>
            <div className={styles.infoWindow}>
                <div className={styles.heading}>
                    <p>{firstName} {lastName}</p>
                    <div className={styles.closeIcon} onClick={clearSelectedFriend}>
                        <Icon icon="close" />
                    </div>
                </div>
                <h3>- General -</h3>
                <p>Sex: <b>{sex}</b></p>
                <p>Facebook friends: <b>{totalFriends}</b></p>
                <h3>- Emperia -</h3>
                <p>Friends with: {<b>{connections.from.length}</b> || '-'}</p>
                <p>Befriended by: {<b>{connections.to.length}</b> || '-'}</p>
                <div className={styles.actionsArea} data-expanded={showActions ? true : undefined}>
                    {showActions && (<>
                        <Button label="Edit friendships" onClick={() => editConnections(selectedFriend, connections)} />
                        <Button label="Delete friend & connections" onClick={() => deleteSelectedFriend(selectedFriend, `${firstName} ${lastName}`)} />
                        
                    </>)}
                    <button className={styles.showMoreButton} onClick={() => setShowActions(!showActions)}>{showActions ? 'Hide' : 'Show'} actions</button>
                </div>
            </div>
        </>
    )
}

export default InfoWindow