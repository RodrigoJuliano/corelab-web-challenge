import { ISearch } from '../types/Search'
import { IVehicle, IVehiclePayload } from '../types/Vehicle'
import { IVehicleFilters } from '../types/VehicleFilters'

class API {
  API_base = process.env.REACT_APP_API_URL

  getVehicles = async (searchParams: ISearch): Promise<Response> => {
    const params = new URLSearchParams()

    Object.keys(searchParams).forEach((key) => {
      if (key !== 'filters')
        params.append(key, String(searchParams[key as keyof ISearch]))
    })

    // Convert the filters object to filters_x parameters
    if (searchParams.filters) {
      const filters = searchParams.filters ?? {}
      Object.keys(searchParams.filters).forEach((key) => {
        if (filters[key as keyof IVehicleFilters])
          params.append(
            `filters_${key}`,
            String(filters[key as keyof IVehicleFilters])
          )
      })
    }

    return this.get(`/vehicles?${params.toString()}`)
  }

  addVehicle = async (vehicle: IVehiclePayload): Promise<Response> =>
    this.post('/vehicles', vehicle)

  updateVehicle = async (vehicle: IVehicle): Promise<Response> =>
    this.patch(`/vehicles/${vehicle.id}`, vehicle)

  deleteVehicle = async (id: number): Promise<Response> =>
    this.del(`/vehicles/${id}`)

  getById = async (id: number): Promise<Response> => this.get(`/vehicles/${id}`)

  // Auxiliary methods
  get = async (path: string): Promise<Response> => this.fetcher(path, 'GET')

  post = async (path: string, body: object): Promise<Response> =>
    this.fetcher(path, 'POST', body)

  patch = async (path: string, body: object): Promise<Response> =>
    this.fetcher(path, 'PATCH', body)

  del = async (path: string): Promise<Response> => this.fetcher(path, 'DELETE')

  endpoint = (path: string): string => this.API_base + path

  fetcher = (path: string, method: string, body?: object): Promise<Response> =>
    fetch(this.endpoint(path), {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

export default new API()
