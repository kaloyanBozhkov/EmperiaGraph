import React, { useState } from 'react'
import styles from './styles.module.scss'
import Icon from '../UI/Icon/Icon'

const InfoWindow = ({ selectedFriend, clearSelectedFriend }) => {

    const [editMode, setEditMode] = useState(false)

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
            </div>
            {!editMode && <button className={styles.editModeButton} onClick={() => setEditMode(true)}>Edit Relationships</button>}
            {editMode && (
                <div className={styles.relationships}>
                    {emperiaFriends.map(({ target: { firstName, lastName, id } }) => <p key={id}>{firstName} {lastName} </p>)}
                </div>
            )}
       
        </>
    )
}

export default InfoWindow