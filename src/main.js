import './styles/main.css'
import init from './client.js'

if (import.meta.env.DEV) {
  // En dev el root llega vacío: React renderiza la App en el navegador.
  // En producción el HTML ya viene prerenderizado y Vite elimina este
  // bloque del bundle, así que React nunca se envía al cliente.
  const { renderApp } = await import('./dev.jsx')
  renderApp()
}

init()
