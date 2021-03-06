import React, { useState } from 'react'
import styles from './styles.module.scss'

import Icon from 'UI/Icon/Icon'
import Button from 'UI/Button/Button'
import Overlay from 'UI/Overlay/Overlay'

import useWindowHeight from '~/hooks/useWindowHeight'

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
    const windowHeight = useWindowHeight()
    const isMobileLandscape = windowHeight < 500

    // if friend not selected, do not show info window
    if (!selectedFriend) {
        return null
    }

    // if friend selcted, get the data we need to show
    const { firstName, lastName, sex, totalFriends, connections } = selectedFriend

    const Actions = (
        <div className={styles.actionsArea} data-expanded={showActions ? true : undefined}>
            {showActions && (<>
                <Button label="Edit info" icon="edit" onClick={() => editFriend(selectedFriend)} />
                <Button label="Add connections" icon="plus" onClick={() => addConnection(selectedFriend, getUnknownFriends(friends, getCurrentFriendIds(connections.from), selectedFriend.id))} />
                <Button label="Remove connections" icon="minus" onClick={() => removeConnection(selectedFriend, connections.from)} />
                <Button label="Delete friend & connections" icon="delete" onClick={() => deleteSelectedFriend(selectedFriend)} />
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
               {((isMobileLandscape && !showActions) || !isMobileLandscape)&& <div className={styles.friendInfo}>
                    <h3>- General -</h3>
                    <p>Sex: <b>{sex}</b></p>
                    <p>Facebook friends: <b>{totalFriends}</b></p>
                    <h3>- Emperia -</h3>
                    <p>Friends with: {<b>{connections.from.length}</b> || '-'}</p>
                    <p>Befriended by: {<b>{connections.to.length}</b> || '-'}</p>
                </div>}

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