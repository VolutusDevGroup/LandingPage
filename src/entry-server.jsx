import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Punto de entrada del prerender en build (scripts/prerender.mjs)
export function render() {
  return renderToString(<App />)
}
