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

const payloadFrom = (vehicle: IVehicle): IVehiclePayload => ({
  ...vehicle,
})

const merge = (vehicle: IVehicle, payload: IVehiclePayload) => ({
  ...vehicle,
  ...payload,
})
