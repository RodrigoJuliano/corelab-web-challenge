import styles from './Button.module.scss'

interface IButton {
  onClick?: () => void
  text: string
  typeSubmit?: boolean
}

const Button = (props: IButton) => {
  const { text, onClick = null, typeSubmit } = props

  return (
    <button
      className={styles.button}
      type={typeSubmit ? 'submit' : 'button'}
      onClick={onClick ?? undefined}
    >
      {text}
    </button>
  )
}

Button.defaultProps = { onClick: null, typeSubmit: false }

export default Button
