import React from 'react'
import { render, screen } from '@testing-library/react'
import VehiclesPage from './index'
import { VehiclesProvider } from '../../contexts/VehiclesContext'
import api from '../../lib/api'

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
