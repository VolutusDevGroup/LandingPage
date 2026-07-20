import { SERVICIOS } from '../data/services.js'
import Icon from './Icon.jsx'

export default function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="services section-divider"
    >
      <div className="container">
        <p className="eyebrow">Servicios</p>
        <div className="services__grid">
          <div className="services__intro">
            <h2 id="servicios-titulo" className="services__titulo">
              De la idea a la operación
            </h2>
            <p className="services__lead">
              Cubrimos toda la capa: frontend, backend, infraestructura y
              automatización con IA.
            </p>
          </div>
          {SERVICIOS.map((s) => (
            <div key={s.label} className="services__card">
              <span className="services__icon">
                <Icon paths={s.paths} />
              </span>
              <h3 className="services__card-titulo">{s.label}</h3>
              <p className="services__card-texto">{s.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
