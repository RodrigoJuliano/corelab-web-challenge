import { ReactNode } from 'react'

interface IConditional {
  children: ReactNode
  fallback: ReactNode
  condition: boolean
}

// Render children if condition is true, otherwise render fallback
const Conditional = ({ children, fallback, condition }: IConditional): any => {
  if (condition) {
    return children
  }
  return fallback
}

export default Conditional
