import React, { useEffect } from 'react'

import styles from './styles.module.scss'
import Icon from 'UI/Icon/Icon'

import RemoveFriend from './RemoveFriend/RemoveFriend'

/**
 * @param  {string} {openedModal -> name of modal to open
 * @param  {obj} data -> data payload, can have anything including onBtnClick
 * @param  {fn} onCloseModal -> fn to call in order to close modal
 */
export const Modal = ({ modal, data = {}, onCloseModal }) => {

  // handle escape for modal close
  useEffect(() => {

    // on mount bind listener
    const listener = document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onCloseModal()
      }
    })

    // on unmount unbind listener
    return () => document.removeEventListener('keydown', listener)
  })

  // if modal is null dont show anything
  if (!modal) {
    return null
  }

  const { modalLabel, modalModifier, ...payload } = data

  let content = null

  switch (modal) {
    case 'removeFriend': {
      const { onSave, ...otherProps } = payload
      const onSaveWithClose = (...args) => {
        // after getting password from input and passing it as arg, close modal
        onCloseModal()
        // run the onSave from the modal button click, passing all arguments
        onSave(...args)
      }

      content = <RemoveFriend onSave={onSaveWithClose} onCancel={onCloseModal} {...otherProps} />
      break
    }
    case 'addFriend': {

      break
    }
    default:
      content = <p>Modal is empty, not configured!</p>
      break
  }

  return (
    <>
      <div className={styles.modalOverlay} />
      <div className={[styles.box, (modalModifier && styles[modalModifier]) || undefined].join(' ').trim()}>
        {modalLabel && <p className={styles.title}>{modalLabel}</p>}
        <div className={styles.close} onClick={onCloseModal}>
          <Icon icon="close" />
        </div>
        {content}
      </div>
    </>
  )
}

export default Modal
