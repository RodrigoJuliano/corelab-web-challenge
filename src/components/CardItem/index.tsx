import { ReactNode } from 'react'
import styles from './CardItem.module.scss'

interface ICardItem {
  label: string
  children: ReactNode
}

const CardItem = ({ label, children }: ICardItem) => (
  <p className={styles.carditem}>
    <strong>{label}: </strong>
    {children}
  </p>
)

export default CardItem
