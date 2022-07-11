import React from 'react'
import { render, screen } from '@testing-library/react'
import VehiclesPage from './index'
import { VehiclesProvider } from '../../contexts/VehiclesContext'

test('renders learn react link', () => {
  render(
    <VehiclesProvider>
      <VehiclesPage />
    </VehiclesProvider>
  )
  const searchElement = screen.getByPlaceholderText(/search/i)
  const buttonElement = screen.getByText(/add new vehicle/i)
  expect(searchElement).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})
