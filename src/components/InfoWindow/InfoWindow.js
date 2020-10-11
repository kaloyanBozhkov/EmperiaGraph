import React, { useState } from 'react'
import styles from './styles.module.scss'
import Icon from 'UI/Icon/Icon'
import Button from 'UI/Button/Button'
import Overlay from 'UI/Overlay/Overlay'

const getUnknownFriends = (allFriends, currentFriends, excludeId) => allFriends.filter(({ id }) => !currentFriends.includes(id) && excludeId !== id)
const getCurrentFriendIds = (currentFriends) => currentFriends.map(({ target: id }) => id)

const InfoWindow = ({
    selectedFriend,
    friends,
    isLoading,
    clearSelectedFriend = (f) => f,
    deleteSelectedFriend = (f) => f,
    addConnection = (f) => f,
    removeConnection = (f) => f,
    editFriend = (f) => f
}) => {
    const [showActions, setShowActions] = useState(false)

    // if friend not selected, do not show info window
    if (!selectedFriend) {
        return null
    }

    // if friend selcted, get the data we need to show
    const { firstName, lastName, sex, totalFriends, connections } = selectedFriend

    const Actions = (
        <div className={styles.actionsArea} data-expanded={showActions ? true : undefined}>
            {showActions && (<>
                <Button label="Edit info" onClick={() => editFriend(selectedFriend)} />
                <Button label="Add connections" onClick={() => addConnection(selectedFriend, getUnknownFriends(friends, getCurrentFriendIds(connections.from), selectedFriend.id))} />
                <Button label="Remove connections" onClick={() => removeConnection(selectedFriend, connections.from)} />
                <Button label="Delete friend & connections" onClick={() => deleteSelectedFriend(selectedFriend)} />
            </>)}
            <button className={styles.showMoreButton} onClick={() => setShowActions(!showActions)}>{showActions ? 'Hide' : 'Show'} actions</button>
        </div>
    )

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
                {isLoading ? (
                    <Overlay loadingMsg="Please wait...">
                        {Actions}
                    </Overlay>
                ) : Actions}
            </div>
        </>
    )
}

export default InfoWindow