import React, { useState } from 'react'
import styles from './styles.module.scss'
import Input from '../UI/Input/Input'

const FriendList = ({ selectedFriend, friends = [], onSelect = f=>f }) => {
  const [search, setSearch] = useState('')
  return ( 
    <div className={styles.friendList}>
      <Input 
        label="Search friend:"
        id="search"
        name="search"
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <div className={styles.content}>
        {friends.map(({ firstName, lastName, id }) => {
          const theSearch = search.toLowerCase()

          return (
            <div
              className={[styles.card, styles[id === selectedFriend ? 'selected' : undefined]].join(' ').trim()}
              hidden={
                (!!search.length &&
                  !~firstName.toLowerCase().indexOf(theSearch) &&
                  !~lastName.toLowerCase().indexOf(theSearch)) ||
                undefined
              }
              onClick={() => onSelect(id === selectedFriend ? null : id)}
              key={id}
            >
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FriendList
