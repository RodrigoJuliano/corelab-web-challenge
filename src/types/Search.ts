import { IVehicleFilters } from './VehicleFilters'

export interface ISearch {
  term?: string
  quantityPerPage: number
  page: number
  filters?: IVehicleFilters
}
