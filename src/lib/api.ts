const API = 'http://localhost:3333'

const endpoint = (path: string): string => API + path

const get = async (path: string): Promise<any> => fetch(endpoint(path))

export const getVehicles = async () => get('/vehicles')
