import React, { ReactNode } from 'react'
import styles from './Card.module.scss'

interface ICard {
  title: string
  children: ReactNode
}

const Card = (props: ICard) => {
  const { title, children } = props

  return (
    <div className={styles.Card}>
      <h2>{title}</h2>

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Card
