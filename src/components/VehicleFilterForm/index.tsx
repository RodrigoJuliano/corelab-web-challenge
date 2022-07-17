import { useState } from 'react'
import { IVehicleFilters } from '../../types/VehicleFilters'
import Button from '../Button'
import Select from '../Inputs/Select'
import Input from '../Inputs/Input'
import styles from './VehicleFilterForm.module.scss'

interface IVehicleFilterForm {
  onSubmit: (f: IVehicleFilters) => void
  filters: IVehicleFilters
}

const VehicleFilterForm = (props: IVehicleFilterForm): JSX.Element => {
  const { onSubmit, filters = {} } = props

  const [brand, setBrand] = useState<string>(filters.brand ?? '')
  const [color, setColor] = useState<string>(filters.color ?? '')
  const [priceMin, setPriceMin] = useState<string>(
    String(filters.priceMin ?? '')
  )
  const [priceMax, setPriceMax] = useState<string>(
    String(filters.priceMax ?? '')
  )
  const [year, setYear] = useState<string>(String(filters.year ?? ''))

  const submitHandler = (ev: React.FormEvent): void => {
    ev.preventDefault()

    const payload: IVehicleFilters = {
      // Only include the properties if not empty and not NaN
      brand: brand || undefined,
      color: color || undefined,
      priceMin: parseInt(priceMin, 10) || undefined,
      priceMax: parseInt(priceMax, 10) || undefined,
      year: parseInt(year, 10) || undefined,
    }
    onSubmit(payload)
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Marca"
        type="text"
        name="brand"
        maxLength={128}
        id="brand"
        value={brand}
        onChange={(v) => setBrand(v.target.value)}
      />

      <Select
        label="Cor"
        name="color"
        id="color"
        value={color}
        onChange={(v) => setColor(v.target.value)}
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <option value="" />
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
        label="Preço Mínimo"
        type="number"
        name="price"
        min="10000"
        max="1000000"
        step="1"
        id="price"
        value={priceMin}
        onChange={(v) => setPriceMin(v.target.value)}
      />

      <Input
        label="Preço Máximo"
        type="number"
        name="price"
        min="10000"
        max="1000000"
        step="1"
        id="priceMax"
        value={priceMax}
        onChange={(v) => setPriceMax(v.target.value)}
      />

      <Input
        label="Ano"
        type="number"
        name="year"
        step="1"
        id="year"
        value={year}
        onChange={(v) => setYear(v.target.value)}
      />

      <Button text="Salvar" typeSubmit />
    </form>
  )
}

export default VehicleFilterForm
