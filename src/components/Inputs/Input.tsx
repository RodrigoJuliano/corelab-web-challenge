import styles from './Inputs.module.scss'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string
}

const Input = (props: InputProps): JSX.Element => {
  const { label, id, ...rest } = props
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input id={id} {...rest} />
    </label>
  )
}

export default Input
