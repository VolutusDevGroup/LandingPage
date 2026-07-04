import useReveal from '../hooks/useReveal.js'
import usePauseWhenHidden from '../hooks/usePauseWhenHidden.js'
import TechPrism from './TechPrism.jsx'
import { GROUPS } from '../data/stack.js'
import './Services.css'

// Iconos inline minimalistas (trazo 1.5, estilo Lucide) — sin dependencias
const ICONS = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="2.6" />
      <path d="M4 5v14c0 1.44 3.58 2.6 8 2.6s8-1.16 8-2.6V5" />
      <path d="M4 12c0 1.44 3.58 2.6 8 2.6s8-1.16 8-2.6" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 1 1 .8-8.93A6 6 0 0 1 19.5 12 3.5 3.5 0 0 1 18 18.7Z" />
    </>
  ),
  ia: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2m0-12-2 2M8 16l-2 2" />
    </>
  ),
  devops: (
    <>
      <path d="M12 3v6m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 12v-3" />
      <path d="M5 8l4 2.5M19 8l-4 2.5M5 16l4-2.5M19 16l-4-2.5" />
    </>
  ),
}

// 7 grupos del stack = 7 caras del prisma heptagonal, con sus bulletpoints
const FACES = GROUPS.map((g) => ({
  icon: ICONS[g.icon],
  title: g.label,
  items: g.items,
}))

export default function Services() {
  const ref = useReveal()
  const pauseRef = usePauseWhenHidden()

  return (
    <section
      id="servicios"
      className="section services"
      aria-labelledby="servicios-titulo"
      ref={pauseRef}
    >
      {/* Iluminación azul de estudio: telón full-bleed tras el prisma,
          se intensifica con la velocidad del scroll (--energy) */}
      <div className="services__studio" aria-hidden="true" />
      <div className="container services__header reveal" ref={ref}>
        <p className="section__kicker">Servicios</p>
        <h2 id="servicios-titulo" className="section__title">
          Nosotros lo ajustamos para ti
        </h2>
        <p className="section__lead">
          Desde la idea hasta la operación: cubrimos frontend, backend,
          infraestructura y automatización con IA.
        </p>
      </div>
      <TechPrism faces={FACES} />
    </section>
  )
}
