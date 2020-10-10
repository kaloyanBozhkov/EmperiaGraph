import React, { useMemo, useReducer } from 'react'

import styles from './styles.module.scss'

import Button from '~/components/UI/Button/Button'
import FriendList from '~/components/FriendList/FriendList'

const RemoveConnections = ({ friend, initialConnections = { from: [], to: [] }, onCancel = (f) => f, onSave = (f) => f }) => {
    const [removedIds, setRemovedIds] = useReducer((acc, { friendId: id, selected }) => selected ? acc.filter((selectedId) => selectedId !== id) : [...acc, id], [])

    const friendList = useMemo(() => {
        return initialConnections.map(({ targetFirstName: firstName, targetLastName: lastName, id }) => {
            return {
                firstName,
                lastName,
                id // this is actually connection id, not taget id. We'll re-use FriendList to render connections to friends instead of just friends
            }
        })
    }, [initialConnections])

    return (
        <div className={styles.removeConnections}>
            <div className={styles.formWrapper}>
                <p>Removing friends for {friend.firstName} {friend.lastName}, select which friends to remove and then confirm.</p>
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
                    onClick={() => onSave(removedIds)}
                    disabled={removedIds.length > 0 ? undefined : true}
                />
            </div>
        </div>
    )
}

export default RemoveConnections