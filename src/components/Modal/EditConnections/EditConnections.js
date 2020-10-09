import React, { useMemo, useState } from 'react'

import styles from './styles.module.scss'

import Button from '~/components/UI/Button/Button'
import FriendList from '~/components/FriendList/FriendList'

const EditConnections = ({ initialConnections = { from: [], to: [] }, onCancel = (f) => f, onSave = (f) => f }) => {
    const [connections, setConnections] = useState(initialConnections)
    const friendList = useMemo(() => {
        return connections.from.map(({ targetFirstName: firstName, targetLastName: lastName, id: connectionId, target: targetId }) => {
            return {
                firstName,
                lastName,
                id: targetId
            }
        })
    }, [connections])
    return (
        <div className={styles.editConnections}>
            <div className={styles.formWrapper}>
                <FriendList 
                friends={friendList} />
            </div>
            <div className={styles.btnArea}>
                <Button
                    label="Cancel"
                    onClick={onCancel}
                    modifier="secondary"
                />
                <Button
                    label="Save Friendships"
                    onClick={() => onSave(connections)}
                    disabled={connections !== initialConnections ? undefined : true}
                />
            </div>
        </div>
    )
}

export default EditConnections