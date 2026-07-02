// Prerender: inyecta el HTML de <App /> dentro de dist/index.html tras el
// build. Corre después de `vite build --ssr src/entry-server.jsx` (ver el
// script "build" en package.json), que deja el bundle SSR en .prerender/.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`

// import() exige URL file:// (una ruta absoluta de Windows no sirve)
const { render } = await import(new URL('../.prerender/entry-server.js', import.meta.url))

const marker = '<div id="root"></div>'
const html = readFileSync(indexPath, 'utf8')
if (!html.includes(marker)) {
  throw new Error(`prerender: no se encontró ${marker} en dist/index.html`)
}

writeFileSync(
  indexPath,
  html.replace(marker, `<div id="root">${render()}</div>`),
)
rmSync(`${root}.prerender`, { recursive: true, force: true })

console.log('prerender: HTML inyectado en dist/index.html')
