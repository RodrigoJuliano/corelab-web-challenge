import { useState } from 'react'
import Button from '../Button'
import styles from './VehicleForm.module.scss'
import { IVehiclePayload } from '../../types/Vehicle'

interface IVehicleForm {
  onSubmit: (v: IVehiclePayload) => void
  vehicleBase?: IVehiclePayload
}

const VehicleForm = ({ onSubmit, vehicleBase }: IVehicleForm) => {
  // Use vehicleBase to initiate the form (for edit vehicle)
  const [name, setName] = useState<string>(vehicleBase?.name ?? '')
  const [brand, setBrand] = useState<string>(vehicleBase?.brand ?? '')
  const [color, setColor] = useState<string>(vehicleBase?.color ?? '#f28b82')
  const [price, setPrice] = useState<number>(vehicleBase?.price ?? 10000)
  const [year, setYear] = useState<number>(vehicleBase?.year ?? 2022)
  const [plate, setPlate] = useState<string>(vehicleBase?.plate ?? '')
  const [description, setDescription] = useState<string>(
    vehicleBase?.description ?? ''
  )

  const submitHandler = (ev: React.FormEvent) => {
    ev.preventDefault()

    const vehicle: IVehiclePayload = {
      name,
      brand,
      color,
      price,
      year,
      plate,
      description,
    }

    onSubmit(vehicle)
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          className="form-control"
          name="name"
          maxLength={128}
          id="name"
          required
          value={name}
          onChange={(v) => setName(v.target.value)}
        />
      </label>

      <label htmlFor="brand">
        Marca
        <input
          type="text"
          className="form-control"
          name="brand"
          maxLength={128}
          id="brand"
          required
          value={brand}
          onChange={(v) => setBrand(v.target.value)}
        />
      </label>

      <label htmlFor="color">
        Cor
        <select
          name="color"
          id="color"
          required
          value={color}
          onChange={(v) => setColor(v.target.value)}
        >
          <option value="#f28b82" id="color-0">
            Vermelho
          </option>
          <option value="#fbbc04" id="color-1">
            Laranja
          </option>
          <option value="#fff475" id="color-2">
            Amarelo
          </option>
          <option value="#ccff90" id="color-3">
            Verde
          </option>
          <option value="#a7ffeb" id="color-4">
            Azul
          </option>
          <option value="#d7aefb" id="color-4">
            Roxo
          </option>
          <option value="#fdcfe8" id="color-4">
            Rosa
          </option>
          <option value="#ffffff" id="color-4">
            Branco
          </option>
        </select>
      </label>

      <label htmlFor="price">
        Preço
        <input
          type="number"
          className="form-control"
          name="price"
          min="10000"
          max="1000000"
          step="1"
          id="price"
          required
          value={price}
          onChange={(v) => setPrice(v.target.valueAsNumber)}
        />
      </label>

      <label htmlFor="year">
        Ano
        <input
          type="number"
          className="form-control"
          name="year"
          // value="2022"
          step="1"
          id="year"
          required
          value={year}
          onChange={(v) => setYear(v.target.valueAsNumber)}
        />
      </label>

      <label htmlFor="plate">
        Placa
        <input
          type="text"
          className="form-control"
          name="plate"
          maxLength={7}
          minLength={7}
          id="plate"
          required
          value={plate}
          onChange={(v) => setPlate(v.target.value)}
        />
      </label>

      <label htmlFor="description">
        Descrição
        <input
          type="text"
          className="form-control"
          name="description"
          maxLength={256}
          id="description"
          value={description}
          onChange={(v) => setDescription(v.target.value)}
        />
      </label>
      <Button text="Salvar" typeSubmit />
    </form>
  )
}

VehicleForm.defaultProps = {
  vehicleBase: {
    brand: '',
    color: '#f28b82',
    description: '',
    name: '',
    plate: '',
    price: 10000,
    year: 2022,
  },
}

export default VehicleForm
