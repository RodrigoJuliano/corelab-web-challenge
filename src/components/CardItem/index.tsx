import { ReactNode } from 'react'
import styles from './CardItem.module.scss'

interface CardItemProps {
  label: string
  children: ReactNode
}

const CardItem = ({ label, children }: CardItemProps): JSX.Element => (
  <p className={styles.carditem}>
    <strong>{label}: </strong>
    {children}
  </p>
)

export default CardItem
