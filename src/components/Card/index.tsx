import React, { ReactNode } from 'react'
import styles from './Card.module.scss'

interface ICard {
  title: string
  children: ReactNode
  color: string
}

const Card = (props: ICard) => {
  const { title, color, children } = props

  return (
    <div className={styles.Card} style={{ backgroundColor: color }}>
      <h2>{title}</h2>

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Card
