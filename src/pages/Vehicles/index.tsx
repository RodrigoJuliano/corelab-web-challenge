import { useEffect, useState } from 'react'
import { getVehicles } from '../../lib/api'
import { Button, Card, Search } from '../../components'
import styles from './Vehicles.module.scss'
import { IVehicle } from '../../types/Vehicle'

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles()
      setVehicles(payload)
    }

    fetchVehicles()
  }, [])

  console.debug({ vehicles })

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

        <Card title="Sandero Stepway">
          <p>Price: 22000</p>
          <p>Description: Carro usado por 2 anos...</p>
          <p>Year: 2018</p>
        </Card>
      </main>
    </div>
  )
}

export default VehiclesPage
