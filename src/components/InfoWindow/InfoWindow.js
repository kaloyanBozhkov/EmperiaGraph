import React from 'react'
import styles from './styles.module.scss'
import Icon from '../UI/Icon/Icon'

const InfoWindow = ({ selectedFriend, clearSelectedFriend }) => {

    // if friend not selected, do not show info window
    if (!selectedFriend) {
        return null
    }

    // if friend selcted, get the data we need to show
    const { firstName, lastName, sex, totalFriends, connections: { from: emperiaFriends } } = selectedFriend 
    
    return (
        <div className={styles.infoWindow}>
            <div className={styles.heading}>
                <p>{firstName} {lastName}</p>
                <div className={styles.closeIcon}>
                    <Icon icon="close" onClick={clearSelectedFriend} />
                </div>
            </div>
            <p>Sex: {sex}</p>
            <p>Facebook friends: {totalFriends}</p>
            <p>Emperia friends: {emperiaFriends.length || '-'}</p>
        </div>
    )
}

export default InfoWindow