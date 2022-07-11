import { useContext, useEffect, useState } from 'react'
import { Button, Card, Search } from '../../components'
import styles from './Vehicles.module.scss'
import {
  VehiclesContext,
  IVehiclesContext,
} from '../../contexts/VehiclesContext'
import translateColor from '../../utils/translateColor'
import Conditional from '../../components/Conditional'
import Modal from '../../components/Modal'
import VehicleForm from '../../components/VehicleForm'

const VehiclesPage = () => {
  const [search, setSearch] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const { vehicles, loadVehicles, loading, error } = useContext(
    VehiclesContext
  ) as IVehiclesContext

  useEffect(() => {
    loadVehicles({ quantityPerPage: 50, page: 1 })
  }, [])

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Search
          placeholder="Buscar"
          value={search}
          onChange={(ev) => {
            setSearch(ev.target.value)
            console.debug('Search changed')
          }}
        />

        <Button text="ADICIONAR" onClick={() => setShowAddForm(true)} />

        <span>Anúncios</span>

        <div className={styles.cardsContainer}>
          <Conditional condition={!loading} fallback={<div>Loading...</div>}>
            <Conditional
              condition={error === null}
              fallback={<div>{error}</div>}
            >
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  title={vehicle.name}
                  color={vehicle.color}
                >
                  <p>Price: {vehicle.price}</p>
                  <p>Description: {vehicle.description}</p>
                  <p>Year: {vehicle.year}</p>
                  <p>Color: {translateColor(vehicle.color)}</p>
                </Card>
              ))}
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  title={vehicle.name}
                  color={vehicle.color}
                >
                  <p>Price: {vehicle.price}</p>
                  <p>Description: {vehicle.description}</p>
                  <p>Year: {vehicle.year}</p>
                  <p>Color: {translateColor(vehicle.color)}</p>
                </Card>
              ))}
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  title={vehicle.name}
                  color={vehicle.color}
                >
                  <p>Price: {vehicle.price}</p>
                  <p>Description: {vehicle.description}</p>
                  <p>Year: {vehicle.year}</p>
                  <p>Color: {translateColor(vehicle.color)}</p>
                </Card>
              ))}
            </Conditional>
          </Conditional>
        </div>
      </main>
      <Modal isOpen={showAddForm} onClickClose={() => setShowAddForm(false)}>
        <VehicleForm />
      </Modal>
    </div>
  )
}

export default VehiclesPage
