import React, { useReducer } from 'react'

import styles from './styles.module.scss'

import Button from '~/components/UI/Button/Button'
import FriendList from '~/components/FriendList/FriendList'

const AddConnections = ({ friendId, friendName, friends, onCancel = (f) => f, onSave = (f) => f }) => {
    
    // stores target ids
    const [connections, setConnections] = useReducer((acc, { friendId: id, selected }) => selected ? acc.filter((selectedId) => selectedId !== id) : [...acc, id], [])

    return (
        <div className={styles.addConnections}>
            <div className={styles.formWrapper}>
                <p>Adding friends for {friendName}, select which friends to add as connections.</p>
                <FriendList
                    modifier="doubleColumn"
                    friends={friends}
                    selectedFriend={connections}
                    onSelect={setConnections}
                />
            </div>
            <div className={styles.btnArea}>
                <Button
                    label="Cancel"
                    onClick={onCancel}
                    modifier="secondary"
                />
                <Button
                    label="Save"
                    onClick={() => onSave(connections.map((targetId) => ({ sourceId: friendId, targetId })))}
                    disabled={connections.length > 0 ? undefined : true}
                />
            </div>
        </div>
    )
}

export default AddConnections