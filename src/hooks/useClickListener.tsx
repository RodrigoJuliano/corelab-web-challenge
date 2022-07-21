import { useEffect } from 'react'

const useClickListener = (
  ref: React.RefObject<HTMLElement>,
  handler: (e: Event) => void,
  captureOnChilds: boolean
): void => {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const clickHandler = (e: Event): void => {
      if (captureOnChilds) {
        handler(e)
      } else if (e.target === el) {
        handler(e)
      }
    }

    el.addEventListener('mouseup', clickHandler, {
      passive: true,
    })
    el.addEventListener('touchstart', clickHandler, {
      passive: true,
    })

    return () => {
      el.removeEventListener('mouseup', clickHandler)
      el.removeEventListener('touchstart', clickHandler)
    }
  }, [handler, captureOnChilds])
}

export default useClickListener
