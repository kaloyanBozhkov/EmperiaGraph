import React, { useMemo, useReducer } from 'react'

import styles from './styles.module.scss'

import Button from '~/components/UI/Button/Button'
import FriendList from '~/components/FriendList/FriendList'

const RemoveConnections = ({ friendId, friendName, initialConnections = { from: [], to: [] }, onCancel = (f) => f, onSave = (f) => f }) => {
    const [removedIds, setRemovedIds] = useReducer((acc, { friendId: id, selected }) => selected ? acc.filter((selectedId) => selectedId !== id) : [...acc, id], [])
    
    const friendList = useMemo(() => {
        return initialConnections.map(({ targetFirstName: firstName, targetLastName: lastName, id: connectionId, target: targetId }) => {
            return {
                firstName,
                lastName,
                id: targetId,
                connectionId
            }
        })
    }, [initialConnections])

    return (
        <div className={styles.removeConnections}>
            <div className={styles.formWrapper}>
                <p>Removing friends for {friendName}, select which friends to remove and then confirm.</p>
                <FriendList
                    modifier="doubleColumn"
                    friends={friendList}
                    selectedFriend={removedIds}
                    onSelect={setRemovedIds}
                />
            </div>
            <div className={styles.btnArea}>
                <Button
                    label="Cancel"
                    onClick={onCancel}
                    modifier="secondary"
                />
                <Button
                    label="Commit Changes"
                    onClick={() => onSave(removedIds.map((target) => ({ source: 1, target })))}
                    disabled={removedIds.length > 0 ? undefined : true}
                />
            </div>
        </div>
    )
}

export default RemoveConnections