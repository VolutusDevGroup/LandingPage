import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './About.css'

const PILARES = [
  {
    numero: '01',
    titulo: 'Misión',
    texto:
      'Construir software confiable que resuelva problemas reales de negocio, con la calidad de un equipo grande y la cercanía de uno pequeño.',
  },
  {
    numero: '02',
    titulo: 'Visión',
    texto:
      'Ser el equipo al que se recurre cuando el software tiene que funcionar bien desde el primer día — y seguir en el aire sin sorpresas.',
  },
  {
    numero: '03',
    titulo: 'Filosofía',
    texto:
      'Dependencias mínimas, rendimiento medible y seguridad por diseño. Como la volutus: nada sobra, y por eso vuela.',
  },
]

export default function About() {
  const [activo, setActivo] = useState(0)
  const ref = useReveal()

  return (
    <section
      id="quienes-somos"
      aria-labelledby="about-titulo"
      className="about section-divider"
    >
      <div className="container">
        <p className="eyebrow">Quiénes Somos</p>
        <h2 id="about-titulo" className="about__titulo">
          Ingeniería antes que espectáculo
        </h2>
        <p className="about__lead">
          Tratamos cada proyecto como un sistema en producción: arquitectura
          clara, código auditable y resultados que se miden con Lighthouse,
          no con promesas.
        </p>
        <div className="about__cards reveal" ref={ref}>
          {PILARES.map((p, i) => (
            <article
              key={p.numero}
              className={`about__card${i === activo ? ' is-activa' : ''}`}
            >
              <h3 className="about__card-titulo">
                <button
                  type="button"
                  className="about__card-boton"
                  aria-expanded={i === activo}
                  onClick={() => setActivo(i)}
                >
                  <span className="about__numero">{p.numero}</span>
                  {p.titulo}
                </button>
              </h3>
              <div className="about__card-panel">
                <p className="about__card-texto">{p.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
