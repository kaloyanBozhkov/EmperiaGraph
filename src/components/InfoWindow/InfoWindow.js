import React from 'react'
import styles from './styles.module.scss'


const InfoWindow = ({ firstName, lastName, sex, totalFriends, emperiaFriends }) => {
    return <div className={styles.infoWindow}>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{sex}</p>
        <p>Friends ratio: {emperiaFriends}/{totalFriends}</p>
    </div>
}

export default InfoWindow