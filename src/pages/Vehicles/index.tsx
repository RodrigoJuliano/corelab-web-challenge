import { useContext, useEffect, useMemo, useState } from 'react'
import { Button, Search } from '../../components'
import styles from './Vehicles.module.scss'
import {
  VehiclesContext,
  IVehiclesContext,
} from '../../contexts/VehiclesContext'
import Conditional from '../../components/Conditional'
import Modal from '../../components/Modal'
import AddVehicleForm from '../../components/AddVehicleForm'
import { IVehicle, IVehiclePayload, merge } from '../../types/Vehicle'
import { IVehicleFilters } from '../../types/VehicleFilters'
import VehicleList from './VehicleList'
import VehicleFilterForm from '../../components/VehicleFilterForm'
import IconButton from '../../components/IconButton'
import FiltersIcon from '../../assets/filters.png'

const VehiclesPage = (): JSX.Element => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | undefined>(
    undefined
  )
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false)
  const [filters, setFilters] = useState<IVehicleFilters>({})

  const {
    vehicles,
    loadVehicles,
    loading,
    error,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  } = useContext(VehiclesContext) as IVehiclesContext

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

  const onSubmitFilters = (f: IVehicleFilters): void => {
    setFilters(f)
    setShowFilterForm(false)
    loadVehicles({ quantityPerPage: 50, page: 1, filters: f })
  }

  const onSubmitSearch = (str: string): void => {
    loadVehicles({ searchString: str, quantityPerPage: 50, page: 1, filters })
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
        <header className={styles.header}>
          <Search placeholder="Buscar" onSubmit={onSubmitSearch} />
          <IconButton
            icon={FiltersIcon}
            onClick={() => setShowFilterForm(true)}
          />
        </header>

        <Button text="ADICIONAR" onClick={() => setShowAddForm(true)} />

        <Conditional condition={!loading} fallback={<div>Loading...</div>}>
          <Conditional condition={error === null} fallback={<div>{error}</div>}>
            <VehicleList
              title="Favoritos"
              vehicles={favorites}
              onClickEdit={(v: IVehicle) => setEditingVehicle(v)}
              onClickDelete={deleteVehicle}
              onClickFavorite={onClickFavorite}
            />

            <VehicleList
              title="Anúncios"
              vehicles={nonFavorites}
              onClickEdit={(v: IVehicle) => setEditingVehicle(v)}
              onClickDelete={deleteVehicle}
              onClickFavorite={onClickFavorite}
            />
          </Conditional>
        </Conditional>
      </main>
      <Modal isOpen={showAddForm} onClickClose={() => setShowAddForm(false)}>
        <AddVehicleForm onSubmit={onSubmitAddVehicle} />
      </Modal>
      <Modal
        isOpen={editingVehicle !== undefined}
        onClickClose={() => setEditingVehicle(undefined)}
      >
        <AddVehicleForm
          vehicleBase={editingVehicle}
          onSubmit={onSubmitEditVehicle}
        />
      </Modal>
      <Modal
        isOpen={showFilterForm}
        onClickClose={() => setShowFilterForm(false)}
      >
        <VehicleFilterForm filters={filters} onSubmit={onSubmitFilters} />
      </Modal>
    </div>
  )
}

export default VehiclesPage
