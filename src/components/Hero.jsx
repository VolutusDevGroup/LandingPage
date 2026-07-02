import { Fragment, useEffect, useRef } from 'react'
import useDecode from '../hooks/useDecode.js'
import './Hero.css'

const TITLE_WORDS = ['Software', 'que', 'se', 'siente']
const DECODED_LINE = 'vivo y en producción'

// Número que cuenta desde 0 hasta su valor al montar (el hero siempre
// entra visible). El JSX ya trae el valor final: sin mismatch de hidratación
// y con el dato correcto en el HTML prerenderizado.
function StatValue({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const duration = 1100
    const start = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      el.textContent = `${prefix}${Math.round(eased * value)}${suffix}`
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, prefix, suffix])

  return <dd ref={ref}>{`${prefix}${value}${suffix}`}</dd>
}

export default function Hero() {
  const { ref: decodeRef, play: replayDecode } = useDecode(DECODED_LINE)

  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content container">
        <p className="hero__kicker">
          <span className="hero__status" aria-hidden="true" />
          Estudio de ingeniería de software
        </p>
        <h1 id="hero-titulo" className="hero__title" onMouseEnter={replayDecode}>
          {TITLE_WORDS.map((word, i) => (
            <Fragment key={word}>
              <span className="hero__word" style={{ '--w': i }}>
                {word}
              </span>{' '}
            </Fragment>
          ))}
          <br />
          <span
            ref={decodeRef}
            className="electric-text hero__decode"
            aria-hidden="true"
          >
            {DECODED_LINE}
          </span>
          <span className="sr-only">{DECODED_LINE}</span>
        </h1>
        <p className="hero__subtitle">
          Diseñamos y construimos productos digitales de nivel empresarial:
          web, mobile, cloud e inteligencia artificial. Ingeniería sólida,
          entregas medibles y una obsesión por el rendimiento.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contacto">
            Contactar al equipo
          </a>
          <a className="btn btn--ghost" href="#proyectos">
            Ver proyectos
          </a>
        </div>
        <dl className="hero__stats">
          <div className="hero__stat">
            <dt>Proyectos en producción</dt>
            <StatValue value={6} suffix="+" />
          </div>
          <div className="hero__stat">
            <dt>Lighthouse objetivo</dt>
            <StatValue value={95} prefix="≥ " />
          </div>
          <div className="hero__stat">
            <dt>Accesibilidad</dt>
            <dd>WCAG AA</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
