import { useEffect, useRef } from 'react'
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
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const list = track.querySelector('.process__timeline')
    const steps = Array.from(list.children)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.setProperty('--progress', '1')
      steps.forEach((step) => step.classList.add('is-passed'))
      return
    }

    let ticking = false

    const update = () => {
      ticking = false
      const rect = track.getBoundingClientRect()
      // Línea de referencia fija en el viewport (no depende de cuánto
      // contenido haya arriba del track): la bola arranca en 0 justo
      // cuando el inicio del riel cruza esta línea y llega a 1 cuando
      // el final del riel la cruza, así el recorrido completo coincide
      // con el alto real del proceso y no se adelanta al llegar.
      const anchor = window.innerHeight * 0.72
      const progress = Math.min(
        1,
        Math.max(0, (anchor - rect.top) / rect.height),
      )
      track.style.setProperty('--progress', progress.toFixed(4))

      steps.forEach((step, i) => {
        const threshold = i / Math.max(steps.length - 1, 1)
        step.classList.toggle('is-passed', progress >= threshold)
      })
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

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
        <div className="process__track" ref={trackRef}>
          <ol className="process__timeline">
            {STEPS.map((s, i) => (
              <li key={s.n} className="process__step reveal__item" style={{ '--i': i }}>
                <span className="process__node" aria-hidden="true">
                  {s.n}
                </span>
                <span className="process__connector" aria-hidden="true" />
                <div className="process__card">
                  <h3 className="process__title">{s.title}</h3>
                  <p className="process__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <span className="process__ball" aria-hidden="true" />
        </div>
        </div>
      </div>
    </section>
  )
}
