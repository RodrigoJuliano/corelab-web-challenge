import React from 'react'
import ReactDOM from 'react-dom/client'
import { VehiclesProvider } from './contexts/VehiclesContext'
import api from './lib/api'
import VehiclesPage from './pages/Vehicles'
import reportWebVitals from './reportWebVitals'
import './index.module.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <VehiclesProvider api={api}>
      <VehiclesPage />
    </VehiclesProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
