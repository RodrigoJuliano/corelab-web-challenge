import { createContext, useMemo, useState } from 'react'
import { ISearch } from '../types/Search'
import { IVehicle, IVehiclePayload } from '../types/Vehicle'
import api from '../lib/api'

export interface IVehiclesContext {
  vehicles: IVehicle[]
  loading: boolean
  error: string | null
  loadVehicles: (searchParam: ISearch) => void
  addVehicle: (vehicle: IVehiclePayload) => void
  updateVehicle: (vehicle: IVehicle) => void
  deleteVehicle: (vehicle: IVehicle) => void
}

interface IVehiclesProvider {
  children: React.ReactNode
}

export const VehiclesContext = createContext<IVehiclesContext | null>(null)

export const VehiclesProvider = (props: IVehiclesProvider): JSX.Element => {
  const { children } = props

  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadVehicles = (searchParams: ISearch): void => {
    setLoading(true)
    setError(null)
    // Fetch the vehicles data
    api
      .getVehicles(searchParams)
      .then(async (response) => {
        // Get json data from boby
        const data = await response.json()
        console.debug(data)

        if (data) {
          if (response.ok) {
            setVehicles(data)
          } else {
            setError(data.message)
          }
        } else {
          setError('Não foi possível carregar os dados')
        }
      })
      .catch((_error) => {
        console.debug(_error)
        setError(_error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addVehicle = (vehicle: IVehiclePayload): void => {
    setError(null)
    api
      .addVehicle(vehicle)
      .then(async (response) => {
        // Get json data from boby
        const data = await response.json()
        console.debug(data)

        if (data) {
          if (response.ok) {
            // Adds to the vehicles list
            setVehicles([data as IVehicle, ...vehicles])
          } else {
            setError(data.message)
          }
        } else {
          setError('Não foi possível criar o veículo')
        }
      })
      .catch((_error) => {
        console.debug(_error)
        setError(_error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateVehicle = (vehicle: IVehicle): void => {
    setError(null)
    api
      .updateVehicle(vehicle)
      .then(async (response) => {
        // Get json data from boby
        const data = await response.json()
        console.debug(data)

        if (data) {
          if (response.ok) {
            const index = vehicles.findIndex((v) => v.id === data.id)
            if (index > -1) {
              vehicles.splice(index, 1)
              // Adds to the vehicles list, removing the old version
              setVehicles([data as IVehicle, ...vehicles])
            }
          } else {
            setError(data.message)
          }
        } else {
          setError('Não foi possível atualizar o veículo')
        }
      })
      .catch((_error) => {
        console.debug(_error)
        setError(_error.message)
      })
  }

  const deleteVehicle = (vehicle: IVehicle): void => {
    setError(null)
    api
      .deleteVehicle(vehicle.id)
      .then(async (response) => {
        // Get json data from boby
        if (response.ok) {
          const index = vehicles.findIndex((v) => v.id === vehicle.id)
          if (index > -1) {
            vehicles.splice(index, 1)
            setVehicles([...vehicles])
          }
        } else {
          const data = await response.json()
          console.debug(data)
          setError(data.message)
        }
      })
      .catch((_error) => {
        console.debug(_error)
        setError(_error.message)
      })
  }

  // Cache the values to avoid unnecessary rendering
  const ctxValue = useMemo(
    () => ({
      vehicles,
      loading,
      error,
      loadVehicles,
      addVehicle,
      updateVehicle,
      deleteVehicle,
    }),
    [vehicles, loading, error]
  )

  return (
    <VehiclesContext.Provider value={ctxValue}>
      {children}
    </VehiclesContext.Provider>
  )
}
