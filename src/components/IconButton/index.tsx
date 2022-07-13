import styles from './IconButton.module.scss'

interface IIconButton {
  onClick: () => void
  icon: string
  size?: number
  alt?: string
}

const IconButton = ({ icon, size, onClick, alt }: IIconButton): JSX.Element => (
  <button type="button" className={styles.button} onClick={onClick}>
    <img src={icon} width={size} height={size} alt={alt} />
  </button>
)

IconButton.defaultProps = { size: 30, alt: '' }

export default IconButton
