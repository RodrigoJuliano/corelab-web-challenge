import { ReactNode } from 'react'
import styles from './Inputs.module.scss'

interface IInput extends React.ComponentPropsWithoutRef<'select'> {
  label: string
  children: ReactNode
}

const Input = (props: IInput): JSX.Element => {
  const { label, id, children, ...rest } = props
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <select id={id} {...rest}>
        {children}
      </select>
    </label>
  )
}

export default Input
