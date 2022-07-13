import { useContext, useEffect, useMemo, useState } from 'react'
import { Button, Search } from '../../components'
import styles from './Vehicles.module.scss'
import {
  VehiclesContext,
  IVehiclesContext,
} from '../../contexts/VehiclesContext'
import Conditional from '../../components/Conditional'
import Modal from '../../components/Modal'
import VehicleForm from '../../components/VehicleForm'
import { IVehicle, IVehiclePayload, merge } from '../../types/Vehicle'
import VehicleList from './VehicleList'

const VehiclesPage = (): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | undefined>(
    undefined
  )

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

  const onSubmitEditVehicle = (v: IVehiclePayload): void => {
    if (editingVehicle !== undefined) {
      const merged = merge(editingVehicle as IVehicle, v)
      updateVehicle(merged)
      // TODO: wait confirmation befere closing the form
      setEditingVehicle(undefined)
    }
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

        <Conditional condition={!loading} fallback={<div>Loading...</div>}>
          <Conditional condition={error === null} fallback={<div>{error}</div>}>
            <VehicleList
              title="Favoritos"
              vehicles={favorites}
              onClickEdit={(v: IVehicle) => setEditingVehicle(v)}
              onClickDelete={() => {
                console.debug('nao implementado')
              }}
              onClickFavorite={onClickFavorite}
            />

            <VehicleList
              title="Anúncios"
              vehicles={nonFavorites}
              onClickEdit={(v: IVehicle) => setEditingVehicle(v)}
              onClickDelete={() => {
                console.debug('nao implementado')
              }}
              onClickFavorite={onClickFavorite}
            />
          </Conditional>
        </Conditional>
      </main>
      <Modal isOpen={showAddForm} onClickClose={() => setShowAddForm(false)}>
        <VehicleForm onSubmit={onSubmitAddVehicle} />
      </Modal>
      <Modal
        isOpen={editingVehicle !== undefined}
        onClickClose={() => setEditingVehicle(undefined)}
      >
        <VehicleForm
          vehicleBase={editingVehicle}
          onSubmit={onSubmitEditVehicle}
        />
      </Modal>
    </div>
  )
}

export default VehiclesPage
