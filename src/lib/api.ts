import { IVehicle, IVehiclePayload } from '../types/Vehicle'

class API {
  API_base = 'http://localhost:3333'

  getVehicles = async () => this.get('/vehicles')

  addVehicle = async (vehicle: IVehiclePayload) =>
    this.post('/vehicles', vehicle)

  updateVehicle = async (vehicle: IVehicle) =>
    this.patch(`/vehicles/${vehicle.id}`, vehicle)

  deleteVehicle = async (id: number) => this.del(`/vehicles/${id}`)

  getById = async (id: number) => this.get(`/vehicles/${id}`)

  // Auxiliary methods
  get = async (path: string): Promise<any> => this.fetcher(path, 'Get')

  post = async (path: string, body: object): Promise<any> =>
    this.fetcher(path, 'POST', body)

  patch = async (path: string, body: object): Promise<any> =>
    this.fetcher(path, 'PATCH', body)

  del = async (path: string): Promise<any> => this.fetcher(path, 'DELETE')

  endpoint = (path: string): string => this.API_base + path

  fetcher = (path: string, method: string, body?: object) =>
    fetch(this.endpoint(path), {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

export default new API()
