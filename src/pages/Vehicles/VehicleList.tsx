import { Card } from '../../components'
import { IVehicle } from '../../types/Vehicle'
import translateColor from '../../utils/translateColor'
import styles from './Vehicles.module.scss'

interface IVehicleList {
  title: string
  vehicles: IVehicle[]
  onClickEdit: (v: IVehicle) => void
  onClickDelete: (v: IVehicle) => void
  onClickFavorite: (v: IVehicle) => void
}

const VehicleList = ({
  title,
  vehicles,
  onClickEdit,
  onClickDelete,
  onClickFavorite,
}: IVehicleList): JSX.Element => (
  <>
    <span>{title}</span>
    <div className={styles.cardsContainer}>
      {vehicles?.map((vehicle) => (
        <Card
          key={vehicle.id}
          title={vehicle.name}
          color={vehicle.color}
          onClickEdit={() => onClickEdit(vehicle)}
          onClickDelete={() => onClickDelete(vehicle)}
          onClickFavorite={() => onClickFavorite(vehicle)}
        >
          <p>Price: {vehicle.price}</p>
          <p>Description: {vehicle.description}</p>
          <p>Year: {vehicle.year}</p>
          <p>Color: {translateColor(vehicle.color)}</p>
        </Card>
      ))}
    </div>
  </>
)

export default VehicleList
