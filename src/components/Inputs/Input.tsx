import styles from './Inputs.module.scss'

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  label: string
}

const Input = (props: IInput): JSX.Element => {
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
