import React, { useEffect } from 'react'

import styles from './styles.module.scss'
import Icon from 'UI/Icon/Icon'

import Confirm from './Confirm/Confirm'
import AddFriend from './AddFriend/AddFriend'
import EditConnections from './EditConnections/EditConnections'

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
    case 'confirm': {

      const { onConfirm, ...otherProps } = payload
      const onConfirmWithClose = (...args) => {
        onCloseModal()

        onConfirm(...args)
      }

      content = <Confirm onCancel={onCloseModal} onSave={onConfirmWithClose} {...otherProps} />
      break
    }
    case 'addFriend': {
      const { onAddFriend, ...otherProps } = payload
      const onAddFriendWithClose = (...args) => {
        onCloseModal()

        onAddFriend(...args)
      }

      content = <AddFriend onCancel={onCloseModal} onSave={onAddFriendWithClose} {...otherProps} />

      break
    }
    case 'editConnections': {
      const { onEditConnections, ...otherProps } = payload
      const onEditConnectionsWithClose = (...args) => {
        onCloseModal()

        onEditConnections(...args)
      }

      content = <EditConnections onCancel={onCloseModal} onSave={onEditConnectionsWithClose} {...otherProps} />

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
