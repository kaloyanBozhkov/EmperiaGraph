import React, { useState } from 'react'
import styles from './styles.module.scss'

const FriendList = ({ friends = [] }) => {
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
        {friends.map(({ firstName, lastName }) => {
          const theSearch = search.toLowerCase()

          return (
            <div
              className={styles.card}
              hidden={
                (!!search.length &&
                  !~firstName.toLowerCase().indexOf(theSearch) &&
                  !~lastName.toLowerCase().indexOf(theSearch)) ||
                undefined
              }
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
