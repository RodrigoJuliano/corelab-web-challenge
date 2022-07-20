import { Card } from '../../components'
import CardItem from '../../components/CardItem'
import Conditional from '../../components/Conditional'
import { IVehicle } from '../../types/Vehicle'
import translateColor from '../../utils/translateColor'
import IconButton from '../../components/IconButton'
import editIcon from '../../assets/edit.png'
import heartIcon from '../../assets/Heart.svg'
import deleteIcon from '../../assets/delete.svg'
import styles from './Vehicles.module.scss'

interface IVehicleList {
  title: string
  vehicles: IVehicle[]
  onClickEdit: (v: IVehicle) => void
  onClickDelete: (v: IVehicle) => void
  onClickFavorite: (v: IVehicle) => void
}

const VehicleList = (props: IVehicleList): JSX.Element => {
  const { title, vehicles, onClickEdit, onClickDelete, onClickFavorite } = props

  return (
    <>
      <span>{title}</span>
      <div className={styles.cardsContainer}>
        {vehicles?.map((vehicle) => (
          <Card
            key={vehicle.id}
            title={vehicle.name}
            color={vehicle.color}
            actions={[
              <IconButton
                key="editbutton"
                icon={editIcon}
                size={35}
                onClick={() => onClickEdit(vehicle)}
              />,
              <IconButton
                key="deletebutton"
                icon={deleteIcon}
                size={19}
                onClick={() => onClickDelete(vehicle)}
              />,
              <IconButton
                key="favoritebutton"
                icon={heartIcon}
                size={30}
                onClick={() => onClickFavorite(vehicle)}
              />,
            ]}
          >
            <CardItem label="Preço">{vehicle.price}</CardItem>
            <Conditional condition={vehicle.description !== null}>
              <CardItem label="Descrição">{vehicle.description}</CardItem>
            </Conditional>
            <CardItem label="Marca">{vehicle.brand}</CardItem>
            <CardItem label="Ano">{vehicle.year}</CardItem>
            <CardItem label="Cor">{translateColor(vehicle.color)}</CardItem>
          </Card>
        ))}
      </div>
    </>
  )
}

export default VehicleList
