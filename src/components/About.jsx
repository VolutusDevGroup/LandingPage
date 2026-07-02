import useReveal from '../hooks/useReveal.js'
import './About.css'

const PILLARS = [
  {
    title: 'Misión',
    text: 'Construir software confiable que resuelva problemas reales de negocio, con la calidad de ingeniería de un equipo grande y la cercanía de un equipo pequeño.',
  },
  {
    title: 'Visión',
    text: 'Ser el equipo al que las empresas recurren cuando el software tiene que funcionar bien desde el primer día y seguir funcionando sin sorpresas.',
  },
  {
    title: 'Filosofía',
    text: 'Dependencias mínimas, rendimiento medible y seguridad por diseño. Cada decisión técnica se evalúa por su costo real: menos superficie de ataque, menos mantenimiento, más velocidad.',
  },
]

export default function About() {
  const ref = useReveal()

  return (
    <section
      id="quienes-somos"
      className="section section--overlap about"
      aria-labelledby="about-titulo"
    >
      <div className="container">
        <div className="panel panel--right reveal reveal--right" ref={ref}>
          <p className="section__kicker">Quiénes Somos</p>
          <h2 id="about-titulo" className="section__title">
            Ingeniería antes que espectáculo
          </h2>
          <p className="section__lead">
            Somos un equipo de desarrolladores que trata cada proyecto como un
            sistema en producción: arquitectura clara, código auditable y
            resultados que se pueden medir con Lighthouse, no con promesas.
          </p>
          <div className="about__grid">
            {PILLARS.map((p, i) => (
              <article key={p.title} className="card reveal__item" style={{ '--i': i }}>
                <h3 className="about__card-title">{p.title}</h3>
                <p className="about__card-text">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
