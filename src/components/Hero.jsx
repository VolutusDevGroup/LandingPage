import { useEffect, useRef, useState } from 'react'
import './Hero.css'

function StatCount({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(prefix + value + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1100
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - p) ** 3
          setDisplay(prefix + Math.round(eased * value) + suffix)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, prefix, suffix])

  return (
    <dd className="hero__stat-value" ref={ref}>
      {display}
    </dd>
  )
}



TODO("arrgeglar dimensiones para que se vea bien e imponente")

export default function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="hero">
      <div className="container">
        <div className="hero__intro">
          <h1 id="hero-titulo" className="hero__title">
            No buscamos problemas, sino soluciones
          </h1>
          <p className="hero__lead">
            Como la nube volutus — una sola onda, precisa, que cruza el
            cielo sin perder su forma — construimos productos digitales de
            nivel empresarial: web, mobile, cloud e inteligencia artificial.
            Ingeniería ligera, medible y en producción.
          </p>
          <div className="hero__actions">
            <a className="btn btn-primary" href="#contacto">
              Contactar al equipo
            </a>
            <a className="btn btn-secondary" href="#proyectos">
              Ver proyectos
            </a>
          </div>
        </div>

        <figure className="hero__figure">
          <img
            className="hero__image"
            src="image\Michael-Zupanc.jpg"
            alt="Nube volutus: una onda continua cruzando el cielo"
            width="1500"
            height="1500"
            fetchPriority="high"
          />
          <figcaption className="hero__caption">
            A Beechcraft Bonanza (from Savannah Aviation) taking tourists on a scenic flight along a Morning Glory Cloud, near Burketown in North Queensland, Australia.   © Michael Zupanc
          </figcaption>
        </figure>


      </div>
    </section>
  )
}
