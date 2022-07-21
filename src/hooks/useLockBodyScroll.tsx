import { useLayoutEffect } from 'react'

const useLockBodyScroll = (lock: boolean): void => {
  useLayoutEffect(() => {
    if (lock) {
      // Calc the scroll bar width before hiding it
      const scrollbarWidth = window.innerWidth - document.body.clientWidth
      // 'hidded' prevents page scrolling
      // 'unset' restores the scroll
      document.body.style.overflow = 'hidden'
      // Add a padding to compensate the scrollbar and avoid a layout shift
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }

    return () => {
      // Restore the scroll on unmount
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }
  }, [lock])
}

export default useLockBodyScroll
