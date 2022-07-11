import { useContext, useEffect, useState } from 'react'
import { Button, Card, Search } from '../../components'
import styles from './Vehicles.module.scss'
import {
  VehiclesContext,
  IVehiclesContext,
} from '../../contexts/VehiclesContext'

const VehiclesPage = () => {
  const [search, setSearch] = useState<string>('')
  const { vehicles, loadVehicles, loading } = useContext(
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

        {loading ? (
          <div>Loading...</div>
        ) : (
          vehicles.map((vehicle) => (
            <Card key={vehicle.id} title={vehicle.name}>
              <p>Price: {vehicle.price}</p>
              <p>Description: {vehicle.description}</p>
              <p>Year: {vehicle.year}</p>
              <p>Color: {vehicle.color}</p>
            </Card>
          ))
        )}
      </main>
    </div>
  )
}

export default VehiclesPage
