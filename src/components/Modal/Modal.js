import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './styles.module.scss'
import Icon from 'UI/Icon/Icon'

import ConfirmPassword from './ConfirmPassword/ConfirmPassword'

import { closeModal } from '~/redux/modal/modal.actions'

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
    case 'confirmPassword': {
      const { onSave, ...otherProps } = payload
      const onSaveWithClose = (...args) => {
        // after getting password from input and passing it as arg, close modal
        onCloseModal()
        // run the onSave from the modal button click, passing all arguments
        onSave(...args)
      }

      content = <ConfirmPassword onSave={onSaveWithClose} {...otherProps} />
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
        {modalLabel && <p>{modalLabel}</p>}
        <div className={styles.close} onClick={onCloseModal}>
          <Icon icon="times" />
        </div>
        {content}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modalReducer.modal,
  data: state.modalReducer.data,
  error: state.modalReducer.error,
})

const mapDispatchToProps = (dispatch) => ({
  onCloseModal: () => dispatch(closeModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
