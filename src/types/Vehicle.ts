export interface IVehicle {
  id: number
  name: string
  description: string
  brand: string
  plate: string
  is_favorite: boolean
  year: number
  color: string
  price: number
  created_at: Date
  modified_at: Date
}

export type IVehiclePayload = Omit<
  IVehicle,
  'id' | 'is_favorite' | 'created_at' | 'modified_at'
>

export const payloadFrom = (vehicle: IVehicle): IVehiclePayload => ({
  ...vehicle,
})

export const merge = (
  vehicle: IVehicle,
  payload: IVehiclePayload
): IVehicle => ({
  ...vehicle,
  ...payload,
})
