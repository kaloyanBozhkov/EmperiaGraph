import React, { useState } from 'react'
import styles from './styles.module.scss'
import Input from '../UI/Input/Input'

const FriendList = ({ selectedFriend, friends = [], modifier = '', onSelect = f => f }) => {
  const [search, setSearch] = useState('')

  return (
    <div className={[styles.friendList, styles[modifier]].join(' ').trim()}>
      <div className={styles.searchBarWrapper}>
        <Input
          label="Search friend:"
          id="search"
          name="search"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </div>
      <div className={styles.content}>
        {friends.map(({ firstName, lastName, id }) => {
          const theSearch = search.toLowerCase()
          const isSelected = (selectedFriend?.constructor.prototype === Array.prototype && selectedFriend?.includes(id)) || id === selectedFriend?.id
          return (
            <div
              key={id}
              className={[styles.card, styles[isSelected ? 'selected' : undefined]].join(' ').trim()}
              hidden={
                (!!search.length &&
                  !~firstName.toLowerCase().indexOf(theSearch) &&
                  !~lastName.toLowerCase().indexOf(theSearch)) ||
                undefined
              }
              onClick={() => onSelect({ friendId: id, selected: isSelected })}
            >
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
          )
        })}
        {!!search.length && <button className={styles.clearSearch} onClick={() => setSearch('')}>Clear search</button>}
      </div>
    </div>
  )
}

export default FriendList
