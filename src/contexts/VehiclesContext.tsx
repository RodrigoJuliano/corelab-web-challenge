import { createContext, useMemo, useState } from 'react'
import { ISearch } from '../types/Search'
import { IVehicle, IVehiclePayload } from '../types/Vehicle'
import { getVehicles } from '../lib/api'

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
    getVehicles()
      .then(async (response) => {
        const data = await response.json()
        console.debug(data)
        if (response.ok) {
          setVehicles(data)
        } else {
          setError(data.message)
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
    console.debug('n implementado')
  }

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
