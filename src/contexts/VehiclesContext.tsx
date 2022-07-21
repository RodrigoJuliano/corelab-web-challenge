import { createContext, useCallback, useMemo, useState } from 'react'
import { ISearch } from '../types/Search'
import { IVehicle, IVehiclePayload } from '../types/Vehicle'
import { Api } from '../lib/api'

export interface IVehiclesContext {
  vehicles: IVehicle[]
  loading: boolean
  error: string | null
  loadVehicles: (searchParam: ISearch) => Promise<boolean>
  addVehicle: (vehicle: IVehiclePayload) => Promise<boolean>
  updateVehicle: (vehicle: IVehicle) => Promise<boolean>
  deleteVehicle: (vehicle: IVehicle) => Promise<boolean>
}

interface IVehiclesProvider {
  api: Api
  children: React.ReactNode
}

export const VehiclesContext = createContext<IVehiclesContext | null>(null)

export const VehiclesProvider = (props: IVehiclesProvider): JSX.Element => {
  const { api, children } = props

  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadVehicles = useCallback(
    async (searchParams: ISearch): Promise<boolean> => {
      setLoading(true)
      setError(null)
      // Fetch the vehicles data
      return api
        .getVehicles(searchParams)
        .then(async (response) => {
          // Get json data from boby
          const data = await response.json()
          console.debug(data)

          if (data) {
            if (response.ok) {
              setVehicles(data)
              return true
            }
            setError(data.message)
            return false
          }
          setError('Não foi possível carregar os dados')
          return false
        })
        .catch((_error) => {
          console.debug(_error)
          setError(_error.message)
          return false
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [api]
  )

  const addVehicle = useCallback(
    async (vehicle: IVehiclePayload): Promise<boolean> => {
      setError(null)
      return api
        .addVehicle(vehicle)
        .then(async (response) => {
          // Get json data from boby
          const data = await response.json()
          console.debug(data)

          if (data) {
            if (response.ok) {
              // Adds to the vehicles list
              setVehicles((oldVehicles) => [data as IVehicle, ...oldVehicles])
              return true
            }
            setError(data.message)
            return false
          }
          setError('Não foi possível criar o veículo')
          return false
        })
        .catch((_error) => {
          console.debug(_error)
          setError(_error.message)
          return false
        })
    },
    [api]
  )

  const updateVehicle = useCallback(
    async (vehicle: IVehicle): Promise<boolean> => {
      setError(null)
      return api
        .updateVehicle(vehicle)
        .then(async (response) => {
          // Get json data from boby
          const data = await response.json()
          console.debug(data)

          if (data) {
            if (response.ok) {
              // Adds to the vehicles list, removing the old version
              setVehicles((oldVehicles) => {
                const index = oldVehicles.findIndex((v) => v.id === data.id)
                if (index > -1) {
                  oldVehicles.splice(index, 1)
                  return [data as IVehicle, ...oldVehicles]
                }
                return oldVehicles
              })
              return true
            }
            setError(data.message)
            return false
          }
          setError('Não foi possível atualizar o veículo')
          return false
        })
        .catch((_error) => {
          console.debug(_error)
          setError(_error.message)
          return false
        })
    },
    [api]
  )

  const deleteVehicle = useCallback(
    async (vehicle: IVehicle): Promise<boolean> => {
      setError(null)
      return api
        .deleteVehicle(vehicle.id)
        .then(async (response) => {
          // Get json data from boby
          if (response.ok) {
            setVehicles((oldVehicles) => {
              const index = oldVehicles.findIndex((v) => v.id === vehicle.id)
              if (index > -1) {
                oldVehicles.splice(index, 1)
                return [...oldVehicles]
              }
              return oldVehicles
            })
            return true
          }
          const data = await response.json()
          console.debug(data)
          setError(data.message)
          return false
        })
        .catch((_error) => {
          console.debug(_error)
          setError(_error.message)
          return false
        })
    },
    [api]
  )

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
    [
      vehicles,
      loading,
      error,
      loadVehicles,
      addVehicle,
      updateVehicle,
      deleteVehicle,
    ]
  )

  return (
    <VehiclesContext.Provider value={ctxValue}>
      {children}
    </VehiclesContext.Provider>
  )
}
