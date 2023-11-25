import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './styles/index.css'
import Dashboard from './pages/dashboard/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)
