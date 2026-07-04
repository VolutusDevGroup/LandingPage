// Genera src/data/land-110m.json a partir de world-atlas/countries-110m.json
// conservando solo el objeto `land` y los arcos que este referencia. El path
// SVG resultante es byte a byte idéntico al original (misma resolución 110m,
// mismos arcos), pero el JSON pesa ~50 KB menos porque descarta los polígonos
// de países que el globo nunca dibuja.
//
// Uso: node scripts/extract-land.mjs
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'node_modules/world-atlas/countries-110m.json')
const target = join(root, 'src/data/land-110m.json')

const topology = JSON.parse(readFileSync(source, 'utf8'))
const land = topology.objects.land

// Recolecta los índices de arco usados por land (los negativos son el mismo
// arco recorrido al revés: ~a)
const used = new Set()
const walkGeom = (geom) => {
  if (geom.type === 'GeometryCollection') return geom.geometries.forEach(walkGeom)
  const walkArcs = (arcs) => {
    for (const a of arcs) {
      if (Array.isArray(a)) walkArcs(a)
      else used.add(a < 0 ? ~a : a)
    }
  }
  if (geom.arcs) walkArcs(geom.arcs)
}
walkGeom(land)

// Compacta el arreglo de arcos y reindexa las referencias
const sorted = [...used].sort((a, b) => a - b)
const remap = new Map(sorted.map((old, i) => [old, i]))
const remapArcs = (arcs) =>
  arcs.map((a) => (Array.isArray(a) ? remapArcs(a) : a < 0 ? ~remap.get(~a) : remap.get(a)))
const remapGeom = (geom) =>
  geom.type === 'GeometryCollection'
    ? { type: geom.type, geometries: geom.geometries.map(remapGeom) }
    : { type: geom.type, arcs: remapArcs(geom.arcs) }

const pruned = {
  type: 'Topology',
  transform: topology.transform,
  objects: { land: remapGeom(land) },
  arcs: sorted.map((i) => topology.arcs[i]),
}

writeFileSync(target, JSON.stringify(pruned))
console.log(`arcos: ${sorted.length}/${topology.arcs.length}`)
console.log(`${statSync(source).size} bytes → ${statSync(target).size} bytes`)
