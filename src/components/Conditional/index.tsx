import { ReactNode } from 'react'

interface ConditionalProps {
  children: ReactNode
  fallback?: ReactNode
  condition: boolean
}

// Render children if condition is true, otherwise render fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Conditional = (props: ConditionalProps): any => {
  const { children, fallback = null, condition } = props

  return condition ? children : fallback
}

export default Conditional
