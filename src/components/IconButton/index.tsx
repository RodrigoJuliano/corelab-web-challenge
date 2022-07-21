import styles from './IconButton.module.scss'

interface IconButtonProps {
  onClick?: () => void
  icon: string
  size?: number
  alt?: string
}

const IconButton = (props: IconButtonProps): JSX.Element => {
  const { icon, size = 30, onClick, alt = '' } = props

  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <img src={icon} width={size} height={size} alt={alt} />
    </button>
  )
}

export default IconButton
