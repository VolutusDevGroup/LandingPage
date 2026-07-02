import useReveal from '../hooks/useReveal.js'
import './Process.css'

const STEPS = [
  {
    n: '01',
    title: 'Análisis',
    text: 'Entendemos el problema, el negocio y las restricciones reales antes de escribir una línea de código.',
  },
  {
    n: '02',
    title: 'Diseño y arquitectura',
    text: 'Definimos la arquitectura, el stack y la interfaz. Cada decisión técnica se justifica por costo y mantenimiento.',
  },
  {
    n: '03',
    title: 'Desarrollo',
    text: 'Iteraciones cortas con entregas visibles. Código modular, revisado y con convenciones claras desde el primer commit.',
  },
  {
    n: '04',
    title: 'Calidad',
    text: 'Tests, auditorías de performance y accesibilidad, y revisión de seguridad antes de cada release.',
  },
  {
    n: '05',
    title: 'Despliegue',
    text: 'CI/CD automatizado, infraestructura reproducible y monitoreo desde el día uno.',
  },
  {
    n: '06',
    title: 'Mantenimiento',
    text: 'Soporte continuo, actualizaciones de seguridad y evolución del producto según datos reales de uso.',
  },
]

export default function Process() {
  const ref = useReveal()

  return (
    <section
      id="proceso"
      className="section section--overlap process"
      aria-labelledby="proceso-titulo"
    >
      <div className="container">
        <div className="panel panel--right reveal reveal--right" ref={ref}>
        <p className="section__kicker">Proceso de Trabajo</p>
        <h2 id="proceso-titulo" className="section__title">
          Del análisis al mantenimiento, sin cajas negras
        </h2>
        <p className="section__lead">
          Un proceso transparente donde siempre sabes en qué etapa está tu
          proyecto y qué viene después.
        </p>
        <ol className="process__timeline">
          {STEPS.map((s, i) => (
            <li key={s.n} className="process__step reveal__item" style={{ '--i': i }}>
              <span className="process__node" aria-hidden="true" />
              <span className="process__num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
