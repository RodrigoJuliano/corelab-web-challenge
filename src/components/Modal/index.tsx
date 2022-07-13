import { useEffect, ReactNode, useRef } from 'react'
import ReactDOM from 'react-dom'
import Conditional from '../Conditional'
import styles from './Modal.module.scss'

interface IModal {
  children: ReactNode
  isOpen: boolean
  onClickClose: () => void
}

const Modal = ({ children, isOpen, onClickClose }: IModal): JSX.Element => {
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

  // Register eventlistener to close the modal on clicking outside
  useEffect(() => {
    const extContainer = externalContainerRef.current

    const clickHandler = (e: MouseEvent): void => {
      if (e.target === extContainer) {
        onClickClose()
      }
    }
    extContainer.addEventListener('click', clickHandler, {
      passive: true,
    })

    return () => {
      extContainer.removeEventListener('click', onClickClose)
    }
  }, [onClickClose])

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
