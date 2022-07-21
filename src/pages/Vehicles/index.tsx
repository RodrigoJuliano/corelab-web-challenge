import { useContext, useEffect, useMemo, useState } from 'react'
import FiltersIcon from '../../assets/filters.png'
import Button from '../../components/Button'
import Conditional from '../../components/Conditional'
import IconButton from '../../components/IconButton'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import Search from '../../components/Search'
import VehicleFilterForm from '../../components/VehicleFilterForm'
import VehicleForm from '../../components/VehicleForm'
import {
  IVehiclesContext,
  VehiclesContext,
} from '../../contexts/VehiclesContext'
import { IVehicle, IVehiclePayload, merge } from '../../types/Vehicle'
import { IVehicleFilters } from '../../types/VehicleFilters'
import VehicleList from './VehicleList'
import styles from './Vehicles.module.scss'

const VehiclesPage = (): JSX.Element => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | undefined>(
    undefined
  )
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false)
  const [filters, setFilters] = useState<IVehicleFilters>({})
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

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
    if (error) {
      setShowErrorModal(true)
    }
  }, [error])

  useEffect(() => {
    loadVehicles({ quantityPerPage: 50, page: 1 })
  }, [loadVehicles])

  const onSubmitAddVehicle = async (v: IVehiclePayload): Promise<void> => {
    const result = await addVehicle(v)
    if (result) {
      setShowAddForm(false)
    }
  }

  const onSubmitEditVehicle = async (v: IVehiclePayload): Promise<void> => {
    if (editingVehicle !== undefined) {
      const merged = merge(editingVehicle as IVehicle, v)
      const result = await updateVehicle(merged)
      if (result) {
        setEditingVehicle(undefined)
      }
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
    <main className={styles.Vehicles}>
      <header className={styles.header}>
        <Search placeholder="Buscar" onSubmit={onSubmitSearch} />
        <IconButton
          icon={FiltersIcon}
          onClick={() => setShowFilterForm(true)}
        />
      </header>

      <Button text="ADICIONAR" onClick={() => setShowAddForm(true)} />

      <Conditional
        condition={!loading}
        fallback={
          <div className={styles.fallback}>
            <Loading size="70px" color="#65dcc7" />
          </div>
        }
      >
        <Conditional
          condition={error === null}
          fallback={<div className={styles.fallback}>{error}</div>}
        >
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
      <Modal
        isOpen={showFilterForm}
        onClickClose={() => setShowFilterForm(false)}
      >
        <VehicleFilterForm filters={filters} onSubmit={onSubmitFilters} />
      </Modal>
      <Modal
        isOpen={showErrorModal}
        onClickClose={() => setShowErrorModal(false)}
      >
        <div className={styles.errorContainer}>{error}</div>
      </Modal>
    </main>
  )
}

export default VehiclesPage
