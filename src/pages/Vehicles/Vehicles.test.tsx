import { render, screen } from '@testing-library/react'
import { VehiclesProvider } from '../../contexts/VehiclesContext'
import api from '../../lib/api'
import VehiclesPage from './index'

test('renders learn react link', () => {
  render(
    <VehiclesProvider api={api}>
      <VehiclesPage />
    </VehiclesProvider>
  )
  const searchElement = screen.getByPlaceholderText(/Buscar/i)
  const buttonElement = screen.getByText(/ADICIONAR/i)
  expect(searchElement).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})
