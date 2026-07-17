import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Solo se importa en dev (ver src/main.js). flushSync monta el DOM de forma
// síncrona para que client.js encuentre los nodos al inicializar.
export function renderApp() {
  flushSync(() => {
    createRoot(document.getElementById('root')).render(<App />)
  })
}
