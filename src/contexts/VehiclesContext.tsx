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
}

interface IVehiclesProvider {
  children: React.ReactNode
}

export const VehiclesContext = createContext<IVehiclesContext | null>(null)

export const VehiclesProvider = ({ children }: IVehiclesProvider) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadVehicles = (searchParam: ISearch) => {
    setLoading(true)
    setError(null)
    // Fetch the vehicles data
    api
      .getVehicles()
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

  const addVehicle = (vehicle: IVehiclePayload) => {
    setError(null)
    // Fetch the vehicles data
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

  // Cache the values to avoid unnecessary rendering
  const ctxValue = useMemo(
    () => ({
      vehicles,
      loading,
      error,
      loadVehicles,
      addVehicle,
    }),
    [vehicles, loading, error]
  )

  return (
    <VehiclesContext.Provider value={ctxValue}>
      {children}
    </VehiclesContext.Provider>
  )
}
