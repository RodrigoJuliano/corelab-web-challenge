import { useEffect, ReactNode, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import useClickListener from '../../hooks/useClickListener'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import Conditional from '../Conditional'
import styles from './Modal.module.scss'

interface IModal {
  children: ReactNode
  isOpen: boolean
  onClickClose: () => void
}

const Modal = (props: IModal): JSX.Element => {
  const { children, isOpen, onClickClose } = props

  // Container element for the modal
  const externalContainerRef = useRef(document.createElement('div'))

  // Add the container to root element on mount
  useEffect(() => {
    const extContainer = externalContainerRef.current
    const modalRoot = document.getElementById('modal-root')
    modalRoot?.appendChild(extContainer)
    // Add container styles
    extContainer.classList.add(styles.externalContainer)

    return () => {
      // remove the container on unmount
      modalRoot?.removeChild(extContainer)
    }
  }, [])

  const closeHandler = useCallback(() => {
    onClickClose()
  }, [onClickClose])

  // Register eventlistener to close the modal on clicking outside
  useClickListener(externalContainerRef, closeHandler, false)

  // Prevent page scrolling
  useLockBodyScroll(isOpen)

  // Create the portal to container element
  return (
    <Conditional condition={isOpen} fallback={null}>
      {ReactDOM.createPortal(
        <div className={styles.internalContainer}>
          <button
            className={styles.close_btn}
            type="button"
            onClick={onClickClose}
          >
            &times;
          </button>
          {children}
        </div>,
        externalContainerRef.current
      )}
    </Conditional>
  )
}

export default Modal
