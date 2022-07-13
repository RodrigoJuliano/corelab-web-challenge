import React, { ReactNode } from 'react'
import IconButton from '../IconButton'
import styles from './Card.module.scss'
import editIcon from '../../assets/edit.png'
import heartIcon from '../../assets/Heart.svg'
import deleteIcon from '../../assets/delete.svg'

interface ICard {
  title: string
  children: ReactNode
  color: string
  onClickEdit: () => void
  onClickDelete: () => void
  onClickFavorite: () => void
}

const Card = (props: ICard): JSX.Element => {
  const {
    title,
    color,
    children,
    onClickEdit,
    onClickDelete,
    onClickFavorite,
  } = props

  return (
    <div className={styles.Card} style={{ backgroundColor: color }}>
      <div className={styles.actionsContainer}>
        <IconButton icon={editIcon} size={35} onClick={onClickEdit} />
        <IconButton icon={deleteIcon} size={19} onClick={onClickDelete} />
        <IconButton icon={heartIcon} size={30} onClick={onClickFavorite} />
      </div>
      <h2>{title}</h2>

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Card
