import { IVehicleFilters } from './VehicleFilters'

export interface ISearch {
  searchString?: string
  quantityPerPage?: number
  page?: number
  filters?: IVehicleFilters
}
