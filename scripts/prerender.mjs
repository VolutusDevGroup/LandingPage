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
let html = readFileSync(indexPath, 'utf8')
if (!html.includes(marker)) {
  throw new Error(`prerender: no se encontró ${marker} en dist/index.html`)
}

html = html.replace(marker, `<div id="root">${render()}</div>`)

// Inline del CSS: el <link rel="stylesheet"> bloquea el primer paint por una
// request extra (~3 KB gzip). Inlinearlo la elimina del critical path.
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/)
if (!cssLink) {
  throw new Error('prerender: no se encontró el <link rel="stylesheet"> en dist/index.html')
}
const css = readFileSync(`${root}dist/${cssLink[1]}`, 'utf8').trim()
html = html.replace(cssLink[0], `<style>${css}</style>`)
rmSync(`${root}dist/${cssLink[1]}`)

writeFileSync(indexPath, html)
rmSync(`${root}.prerender`, { recursive: true, force: true })

console.log('prerender: HTML inyectado y CSS inline en dist/index.html')
