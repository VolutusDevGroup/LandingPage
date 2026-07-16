import { useLayoutEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './About.css'

const PILARES = [
  {
    numero: '01',
    titulo: 'Misión',
    texto:
      'Construir software confiable que resuelva problemas reales de negocio, con la calidad de un equipo grande y la cercanía de uno pequeño.',
    imagen: {
      src: '/image/volutus.webp',
      alt: 'Nube volutus vista desde el ala de una avioneta, cruzando el cielo en una sola onda continua',
      width: 640,
      height: 430,
    },
  },
  {
    numero: '02',
    titulo: 'Visión',
    texto:
      'Ser el equipo al que se recurre cuando el software tiene que funcionar bien desde el primer día — y seguir en el aire sin sorpresas.',
    imagen: {
      src: '/image/John-Riedl-700x525.jpg',
      alt: 'Vista aérea rasante de la nube volutus avanzando hacia el horizonte al amanecer',
      width: 700,
      height: 525,
    },
  },
  {
    numero: '03',
    titulo: 'Filosofía',
    texto:
      'Dependencias mínimas, rendimiento medible y seguridad por diseño. Como la volutus: nada sobra, y por eso vuela.',
    imagen: {
      src: '/image/volutus2.jpg',
      alt: 'Varias nubes volutus paralelas sobrevolando la costa, cada una una sola forma sin nada de más',
      width: 678,
      height: 452,
    },
  },
]

export default function About() {
  const [activo, setActivo] = useState(0)
  const ref = useReveal()
  const tabRefs = useRef([])
  const [indicador, setIndicador] = useState({ transform: 'translateX(0px)', width: '0px' })

  useLayoutEffect(() => {
    function medir() {
      const el = tabRefs.current[activo]
      if (!el) return
      setIndicador({
        transform: `translateX(${el.offsetLeft}px)`,
        width: `${el.offsetWidth}px`,
      })
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [activo])

  function moverFoco(indice) {
    setActivo(indice)
    tabRefs.current[indice]?.focus()
  }

  function alPresionarTecla(evento) {
    const total = PILARES.length
    if (evento.key === 'ArrowRight') moverFoco((activo + 1) % total)
    else if (evento.key === 'ArrowLeft') moverFoco((activo - 1 + total) % total)
    else if (evento.key === 'Home') moverFoco(0)
    else if (evento.key === 'End') moverFoco(total - 1)
    else return
    evento.preventDefault()
  }

  const pilar = PILARES[activo]

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

        <div className="about__tabs reveal" ref={ref}>
          <div className="about__tablist" role="tablist" aria-label="Pilares de Volutus">
            <span className="about__tab-indicador" style={indicador} aria-hidden="true" />
            {PILARES.map((p, i) => (
              <button
                key={p.numero}
                type="button"
                role="tab"
                id={`tab-${p.numero}`}
                aria-selected={i === activo}
                aria-controls={`panel-${p.numero}`}
                tabIndex={i === activo ? 0 : -1}
                ref={(el) => (tabRefs.current[i] = el)}
                className={`about__tab${i === activo ? ' is-activa' : ''}`}
                onClick={() => setActivo(i)}
                onKeyDown={alPresionarTecla}
              >
                <span className="about__numero">{p.numero}</span>
                {p.titulo}
              </button>
            ))}
          </div>

          <div
            key={pilar.numero}
            id={`panel-${pilar.numero}`}
            role="tabpanel"
            aria-labelledby={`tab-${pilar.numero}`}
            tabIndex={0}
            className="about__panel"
          >
            <img
              className="about__panel-img"
              src={pilar.imagen.src}
              alt={pilar.imagen.alt}
              width={pilar.imagen.width}
              height={pilar.imagen.height}
              loading="lazy"
              decoding="async"
            />
            <div className="about__panel-body">
              <h3 className="about__panel-titulo">{pilar.titulo}</h3>
              <p className="about__panel-texto">{pilar.texto}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
