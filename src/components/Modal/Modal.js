import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './styles.module.scss'
import Icon from 'UI/Icon/Icon'

import Confirm from './Confirm/Confirm'
import AddEditFriend from './AddEditFriend/AddEditFriend'
import RemoveConnections from './RemoveConnections/RemoveConnections'
import AddConnections from './AddConnections/AddConnections'
import ErrorModal from './ErrorModal/ErrorModal'

/**
 * @param  {string} {openedModal -> name of modal to open
 * @param  {obj} data -> data payload, can have anything including onBtnClick
 * @param  {fn} onCloseModal -> fn to call in order to close modal
 */
export const Modal = ({ modal, data = {}, onCloseModal }) => {

  const dispatcher = useDispatch()

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
    case 'addEditFriend': {
      const { onAddFriend, ...otherProps } = payload
      const onAddFriendWithClose = (...args) => {
        onCloseModal()
        onAddFriend(...args)
      }

      content = <AddEditFriend onCancel={onCloseModal} onSave={onAddFriendWithClose} {...otherProps} />

      break
    }
    case 'removeConnections': {
      const { onRemoveConnections, ...otherProps } = payload

      // confirmation will trigger modal close
      content = <RemoveConnections onCancel={onCloseModal} onSave={onRemoveConnections} {...otherProps} />

      break
    }
    case 'addConnections': {
      const { onAddConnections, ...otherProps } = payload
      const onAddConnectionsWithClose = (...args) => {
        onCloseModal()
        onAddConnections(...args)
      }
      // confirmation will trigger modal close
      content = <AddConnections onCancel={onCloseModal} onSave={onAddConnectionsWithClose} {...otherProps} />

      break
    }
    case 'errorModal': {
      const { onRetry, onCloseTriggerFail, ...otherProps } = payload
      const onRetryWithClose = (...args) => {
        onCloseModal()
        onRetry(...args)
      }

      const onCloseWithTriggerFail = (...args) => {
        onCloseModal()
        onCloseTriggerFail(...args)
      }

      content = <ErrorModal onCancel={() => onCloseWithTriggerFail(dispatcher)} onRetry={() => onRetryWithClose(dispatcher)} {...otherProps} />
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
