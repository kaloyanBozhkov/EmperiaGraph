import React, { useState } from 'react'
import styles from './styles.module.scss'

const FriendList = ({ selectedFriend, friends = [], onSelect = f=>f}) => {
  const [search, setSearch] = useState('')
  return (
    <div className={styles.friendList}>
      <div className={styles.search}>
        <p>Search</p>
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </div>
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
