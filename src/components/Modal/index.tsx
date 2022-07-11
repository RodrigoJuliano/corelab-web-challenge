import { useEffect, ReactNode, useRef } from 'react'
import ReactDOM from 'react-dom'
import Conditional from '../Conditional'
import styles from './Modal.module.scss'

interface IModal {
  children: ReactNode
  isOpen: boolean
  onClickClose: () => void
}

const Modal = ({ children, isOpen, onClickClose }: IModal) => {
  // Container element for the modal
  const externalContainerRef = useRef(document.createElement('div'))

  // Add the container to root element on mount
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    modalRoot?.appendChild(externalContainerRef.current)
    // Add container styles
    externalContainerRef.current.classList.add(styles.externalContainer)
    return () => {
      // remove the container on unmount
      modalRoot?.removeChild(externalContainerRef.current)
    }
  }, [])

  // Register eventlistener to close the modal on clicking outside
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (e.target === externalContainerRef.current) {
        onClickClose()
      }
    }
    externalContainerRef.current.addEventListener('click', clickHandler, {
      passive: true,
    })

    return () => {
      externalContainerRef.current.removeEventListener('click', onClickClose)
    }
  }, [])

  // Hide / show the modal
  useEffect(() => {
    if (isOpen) {
      // Prevent page scrolling
      document.body.style.overflow = 'hidden'

      externalContainerRef.current.style.visibility = 'visible'
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset'

      externalContainerRef.current.style.visibility = 'hidden'
    }
  }, [isOpen])

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
