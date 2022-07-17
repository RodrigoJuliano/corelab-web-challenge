import styles from './IconButton.module.scss'

interface IIconButton {
  onClick?: () => void
  icon: string
  size?: number
  alt?: string
}

const IconButton = (props: IIconButton): JSX.Element => {
  const { icon, size = 30, onClick, alt = '' } = props

  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <img src={icon} width={size} height={size} alt={alt} />
    </button>
  )
}

export default IconButton
