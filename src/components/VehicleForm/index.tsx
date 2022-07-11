import { useContext, useState } from 'react'
import Button from '../Button'
import styles from './VehicleForm.module.scss'
import {
  VehiclesContext,
  IVehiclesContext,
} from '../../contexts/VehiclesContext'
import { IVehiclePayload } from '../../types/Vehicle'

const VehicleForm = () => {
  const [name, setName] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [price, setPrice] = useState<number>(10000)
  const [year, setYear] = useState<number>(2022)
  const [plate, setPlate] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const { addVehicle } = useContext(VehiclesContext) as IVehiclesContext

  const onSubmit = (ev: React.FormEvent) => {
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

    addVehicle(vehicle)
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
          maxLength={8}
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

export default VehicleForm
