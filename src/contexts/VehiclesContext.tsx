import { createContext, useMemo, useState } from 'react'
import { ISearch } from '../types/Search'
import { IVehicle, IVehiclePayload } from '../types/Vehicle'
import { getVehicles } from '../lib/api'

export interface IVehiclesContext {
  vehicles: IVehicle[]
  loading: boolean
  loadVehicles: (searchParam: ISearch) => void
}

interface IVehiclesProvider {
  children: React.ReactNode
}

export const VehiclesContext = createContext<IVehiclesContext | null>(null)

export const VehiclesProvider = ({ children }: IVehiclesProvider) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadVehicles = (searchParam: ISearch) => {
    setLoading(true)
    getVehicles()
      .then((data) => {
        console.debug(data)
        setVehicles(data)
        setLoading(false)
      })
      .catch((err) => {
        console.debug(err)
      })
  }

  const ctxValue = useMemo(
    () => ({
      vehicles,
      loading,
      loadVehicles,
    }),
    [vehicles, loading]
  )

  return (
    <VehiclesContext.Provider value={ctxValue}>
      {children}
    </VehiclesContext.Provider>
  )
}
