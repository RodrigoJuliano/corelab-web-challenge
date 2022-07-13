import { useContext, useEffect, useMemo, useState } from 'react'
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
import { IVehicle, IVehiclePayload } from '../../types/Vehicle'

const VehiclesPage = (): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const { vehicles, loadVehicles, loading, error, addVehicle, updateVehicle } =
    useContext(VehiclesContext) as IVehiclesContext

  useEffect(() => {
    loadVehicles({ quantityPerPage: 50, page: 1 })
  }, [])

  const onSubmitAddVehicle = (v: IVehiclePayload): void => {
    addVehicle(v)
    // TODO: wait confirmation befere closing the form
    setShowAddForm(false)
  }

  const onClickFavorite = (v: IVehicle): void => {
    const cp = v
    cp.is_favorite = !cp.is_favorite
    updateVehicle(cp)
  }

  // Filter the favorite vehicles in a separated array
  // and memoize it to avoid unnecessary rendering
  const { favorites, nonFavorites } = useMemo(() => {
    const fav: IVehicle[] = []
    const nonFav: IVehicle[] = []
    vehicles.forEach((v) => {
      if (v.is_favorite) {
        fav.push(v)
      } else {
        nonFav.push(v)
      }
    })
    return { favorites: fav, nonFavorites: nonFav }
  }, [vehicles])

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

        <span>Favoritos</span>

        <div className={styles.cardsContainer}>
          <Conditional condition={!loading} fallback={<div>Loading...</div>}>
            <Conditional
              condition={error === null}
              fallback={<div>{error}</div>}
            >
              {favorites?.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  title={vehicle.name}
                  color={vehicle.color}
                  onClickEdit={() => {
                    console.debug('nao implementado')
                  }}
                  onClickDelete={() => {
                    console.debug('nao implementado')
                  }}
                  onClickFavorite={() => {
                    onClickFavorite(vehicle)
                  }}
                >
                  <p>Price: {vehicle.price}</p>
                  <p>Description: {vehicle.description}</p>
                  <p>Year: {vehicle.year}</p>
                  <p>Color: {translateColor(vehicle.color)}</p>
                  <p>Plate: {vehicle.plate}</p>
                </Card>
              ))}
            </Conditional>
          </Conditional>
        </div>

        <span>Anúncios</span>

        <div className={styles.cardsContainer}>
          <Conditional condition={!loading} fallback={<div>Loading...</div>}>
            <Conditional
              condition={error === null}
              fallback={<div>{error}</div>}
            >
              {nonFavorites?.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  title={vehicle.name}
                  color={vehicle.color}
                  onClickEdit={() => {
                    console.debug('nao implementado')
                  }}
                  onClickDelete={() => {
                    console.debug('nao implementado')
                  }}
                  onClickFavorite={() => {
                    onClickFavorite(vehicle)
                  }}
                >
                  <p>Price: {vehicle.price}</p>
                  <p>Description: {vehicle.description}</p>
                  <p>Year: {vehicle.year}</p>
                  <p>Color: {translateColor(vehicle.color)}</p>
                  <p>Plate: {vehicle.plate}</p>
                </Card>
              ))}
            </Conditional>
          </Conditional>
        </div>
      </main>
      <Modal isOpen={showAddForm} onClickClose={() => setShowAddForm(false)}>
        <VehicleForm onSubmit={onSubmitAddVehicle} />
      </Modal>
    </div>
  )
}

export default VehiclesPage
