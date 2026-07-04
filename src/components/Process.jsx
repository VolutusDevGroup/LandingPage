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
    const nodes = steps.map((step) => step.querySelector('.process__node'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.setProperty('--progress', '1')
      steps.forEach((step) => step.classList.add('is-passed'))
      return
    }

    // Umbral real de cada checkpoint: se mide la posición de layout de cada
    // nodo (offsetTop, ajena a los transform de la animación de "reveal")
    // para que el checkpoint se encienda exactamente cuando la bola lo
    // cruza, sin desfases por el translate de entrada ni por el largo del
    // texto de cada paso.
    const docOffsetTop = (el) => {
      let top = 0
      let node = el
      while (node) {
        top += node.offsetTop
        node = node.offsetParent
      }
      return top
    }

    let thresholds = []
    let railTopPx = 0
    let railHeightPx = 0

    const measure = () => {
      railTopPx = 0.6 * 16
      railHeightPx = track.offsetHeight - 1.2 * 16
      track.style.setProperty('--rail-h', `${railHeightPx}px`)

      const trackTop = docOffsetTop(track)
      thresholds = nodes.map((node) => {
        const centerLocal = docOffsetTop(node) - trackTop + node.offsetHeight / 2
        return Math.min(1, Math.max(0, (centerLocal - railTopPx) / railHeightPx))
      })
    }

    let targetProgress = 0
    let shownProgress = 0
    let rafId = 0
    // Estado aplicado de cada checkpoint: el DOM solo se toca cuando el
    // checkpoint realmente cruza el umbral, no en cada frame
    const passedState = steps.map(() => null)

    const computeTarget = () => {
      const rect = track.getBoundingClientRect()
      const anchor = window.innerHeight * 0.72
      targetProgress = Math.min(
        1,
        Math.max(0, (anchor - rect.top) / rect.height),
      )
    }

    const applyPassed = () => {
      steps.forEach((step, i) => {
        const passed = shownProgress >= thresholds[i]
        if (passed !== passedState[i]) {
          passedState[i] = passed
          step.classList.toggle('is-passed', passed)
        }
      })
    }

    const loop = () => {
      const diff = targetProgress - shownProgress
      shownProgress += diff * 0.18
      if (Math.abs(diff) < 0.0005) shownProgress = targetProgress

      track.style.setProperty('--progress', shownProgress.toFixed(4))
      applyPassed()

      // Con la bola asentada en su objetivo no hay nada que animar: el
      // bucle se corta y wake() lo relanza cuando el scroll lo mueva
      if (shownProgress === targetProgress) {
        rafId = 0
        return
      }
      rafId = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (!rafId) rafId = requestAnimationFrame(loop)
    }

    const onScroll = () => {
      computeTarget()
      wake()
    }
    const onResize = () => {
      measure()
      computeTarget()
      wake()
    }

    measure()
    computeTarget()
    shownProgress = targetProgress
    rafId = requestAnimationFrame(loop)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
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
