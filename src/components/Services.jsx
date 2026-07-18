import { SERVICIOS } from '../data/services.js'

function ServiceIcon({ paths }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

function ServiceCard({ s, decorative = false }) {
  const Titulo = decorative ? 'p' : 'h3'
  return (
    <div className="services__card" aria-hidden={decorative || undefined}>
      <span className="services__icon">
        <ServiceIcon paths={s.paths} />
      </span>
      <Titulo className="services__card-titulo">{s.label}</Titulo>
      <p className="services__card-texto">{s.items}</p>
    </div>
  )
}

export default function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="services section-divider"
    >
      <div className="container services__intro">
        <p className="eyebrow">Servicios</p>
        <h2 id="servicios-titulo" className="services__titulo">
          De la idea a la operación
        </h2>
        <p className="services__lead">
          Cubrimos toda la capa: frontend, backend, infraestructura y
          automatización con IA.
        </p>
      </div>
      <div className="services__marquee">
        {/* Tres copias: la primera es la real; las otras dos son decorativas
            y cubren el ancho durante el desplazamiento (loop sin huecos). */}
        <div className="services__track">
          {SERVICIOS.map((s) => (
            <ServiceCard key={s.label} s={s} />
          ))}
          {SERVICIOS.map((s) => (
            <ServiceCard key={`${s.label}-2`} s={s} decorative />
          ))}
          {SERVICIOS.map((s) => (
            <ServiceCard key={`${s.label}-3`} s={s} decorative />
          ))}
        </div>
      </div>
    </section>
  )
}
