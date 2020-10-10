import React from 'react'

import styles from './styles.module.scss'

const Controller = ({ connectionDistance = 5, connectionStrength = -5, changeConnectionStrength = (f) => f, changeConnectionDistance = (f) => f }) => {
    return (
        <div className={styles.controller}>
            <div className={styles.rangeWrapper}>
                <p>Strength</p>
                <input type="range" min="-40" max="15" value={connectionStrength} onChange={({ target: { value } }) => changeConnectionStrength(+value)}/>
            </div>
            <div className={styles.rangeWrapper}>
                <p>Distance</p>
                <input type="range" min="1.5" max="13.5" value={connectionDistance} onChange={({ target: { value } }) => changeConnectionDistance(+value)}/>
            </div>
        </div>
    )
}

export default Controller