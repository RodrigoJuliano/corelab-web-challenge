import { ReactNode } from 'react'
import styles from './Card.module.scss'

interface ICard {
  title: string
  children: ReactNode
  color: string
  actions: ReactNode
}

const Card = (props: ICard): JSX.Element => {
  const { title, color, children, actions } = props

  return (
    <div className={styles.Card} style={{ backgroundColor: color }}>
      <div className={styles.actionsContainer}>{actions}</div>
      <h2>{title}</h2>

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Card
