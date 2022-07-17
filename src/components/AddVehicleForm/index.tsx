import { useState } from 'react'
import Button from '../Button'
import Select from '../Inputs/Select'
import Input from '../Inputs/Input'
import { IVehiclePayload } from '../../types/Vehicle'
import styles from './AddVehicleForm.module.scss'

interface IAddVehicleForm {
  onSubmit: (v: IVehiclePayload) => void
  vehicleBase?: IVehiclePayload
}

const AddVehicleForm = (props: IAddVehicleForm): JSX.Element => {
  const {
    onSubmit,
    vehicleBase = {
      brand: '',
      color: '#f28b82',
      description: '',
      name: '',
      plate: '',
      price: 10000,
      year: 2022,
    },
  } = props

  // Use vehicleBase to initiate the form (for edit vehicle)
  const [name, setName] = useState<string>(vehicleBase.name)
  const [brand, setBrand] = useState<string>(vehicleBase.brand)
  const [color, setColor] = useState<string>(vehicleBase.color)
  const [price, setPrice] = useState<number>(vehicleBase.price)
  const [year, setYear] = useState<number>(vehicleBase.year)
  const [plate, setPlate] = useState<string>(vehicleBase.plate)
  const [description, setDescription] = useState<string>(
    vehicleBase.description
  )

  const submitHandler = (ev: React.FormEvent): void => {
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
      <Input
        label="Nome"
        type="text"
        name="name"
        maxLength={128}
        id="name"
        required
        value={name}
        onChange={(v) => setName(v.target.value)}
      />

      <Input
        label="Marca"
        type="text"
        name="brand"
        maxLength={128}
        id="brand"
        required
        value={brand}
        onChange={(v) => setBrand(v.target.value)}
      />

      <Select
        label="Cor"
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
      </Select>

      <Input
        label="Preço"
        type="number"
        name="price"
        min="10000"
        max="1000000"
        step="1"
        id="price"
        required
        value={price}
        onChange={(v) => setPrice(v.target.valueAsNumber)}
      />

      <Input
        label="Ano"
        type="number"
        name="year"
        step="1"
        id="year"
        required
        value={year}
        onChange={(v) => setYear(v.target.valueAsNumber)}
      />

      <Input
        label="Placa"
        type="text"
        name="plate"
        maxLength={7}
        minLength={7}
        id="plate"
        required
        value={plate}
        onChange={(v) => setPlate(v.target.value)}
      />

      <Input
        label="Descrição"
        type="text"
        name="description"
        maxLength={256}
        id="description"
        value={description}
        onChange={(v) => setDescription(v.target.value)}
      />

      <Button text="Salvar" typeSubmit />
    </form>
  )
}

export default AddVehicleForm
