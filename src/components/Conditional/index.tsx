import { ReactNode } from 'react'

interface IConditional {
  children: ReactNode
  fallback: ReactNode
  condition: boolean
}

// Render children if condition is true, otherwise render fallback
const Conditional = (props: IConditional): any => {
  const { children, fallback, condition } = props

  if (condition) {
    return children
  }
  return fallback
}

export default Conditional
