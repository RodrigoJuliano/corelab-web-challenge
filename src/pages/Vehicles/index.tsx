import { useContext, useEffect, useState } from 'react'
import { Button, Card, Search } from '../../components'
import styles from './Vehicles.module.scss'
import {
  VehiclesContext,
  IVehiclesContext,
} from '../../contexts/VehiclesContext'
import translateColor from '../../utils/translateColor'
import Conditional from '../../components/Conditional'

const VehiclesPage = () => {
  const [search, setSearch] = useState<string>('')
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
          placeholder="Search"
          value={search}
          onChange={() => {
            console.debug('Search changed')
          }}
        />

        <Button
          text="Add new vehicle"
          onClick={() => {
            console.debug('Add vehicle clicked')
          }}
        />

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
    </div>
  )
}

export default VehiclesPage
