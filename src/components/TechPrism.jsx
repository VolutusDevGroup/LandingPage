import { useEffect, useRef } from 'react'
import './TechPrism.css'

// Prisma heptagonal 3D inspirado en el cubo de codewiki.google:
// caras de vidrio con aristas luminosas girando en un carrusel CSS puro
// (perspective + preserve-3d), sin librerías 3D.
//
// Armado ligado al scroll: --fold interpola cada cara entre la barra
// horizontal plana (0) y su posición en el cilindro (1) según qué tan
// arriba está el prisma en el viewport, con suavizado exponencial para
// que los pasos de la rueda no se sientan bruscos. Mientras está plano,
// la barra deriva tipo marquee (--drift, amplitud que muere al armarse);
// con el armado completo arranca el giro continuo (ángulo acumulado en
// JS) que se rebobina junto al fold al desarmarse. Sin JS o con
// prefers-reduced-motion queda el prisma armado y estático — es el
// estado base del CSS y también el del HTML prerenderizado.
//
// Geometría: 7 caras de ancho W separadas 360/7 = 51.4286°. Cada cara se
// empuja hacia afuera el apotema del heptágono: (W/2) / tan(PI/7) ≈ W * 1.038.
// Las tapas (caps) son heptágonos con clip-path cuyo circunradio es
// apotema / cos(PI/7) ≈ W * 1.152 (contenedor de lado W * 2.305).

// Heptágono con un vértice arriba y una arista plana centrada abajo: al
// rotarlo 90° en X, esa arista queda alineada con la cara frontal (k = 0).
const HEPTAGON = `polygon(
  50% 0%, 89.09% 18.83%, 98.75% 61.13%, 71.69% 95.05%,
  28.31% 95.05%, 1.25% 61.13%, 10.91% 18.83%
)`

export default function TechPrism({ faces }) {
  const rootRef = useRef(null)
  const wheelRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.current
    const wheel = wheelRef.current
    let raf = 0
    let last = 0
    let fold = -1 // aún sin pintar: el primer paint salta directo al target
    let angle = 0
    let target = 0

    // El objetivo del pliegue solo cambia con el scroll o el layout, así que
    // se calcula en los listeners y no dentro del bucle: leer
    // getBoundingClientRect en cada frame forzaba un layout por frame.
    const computeTarget = () => {
      const vh = window.innerHeight
      const top = root.getBoundingClientRect().top
      // 0 = el prisma asoma por el borde inferior; 1 = subió a media pantalla.
      // Scrollear de vuelta hacia arriba lo desarma por el mismo camino.
      target = Math.min(Math.max((vh - top) / (vh * 0.55), 0), 1)
    }

    const paint = (now, dt) => {
      fold = fold < 0 ? target : fold + (target - fold) * (1 - Math.exp(-9 * dt))

      if (fold > 0.999) angle -= dt * 6 // giro continuo: 360° / 60 s
      // Rango corto (-180, 180]: al desarmarse, angle * fold rebobina por
      // el lado corto en vez de deshacer vueltas completas
      if (angle <= -180) angle += 360

      const drift = Math.sin(now / 2600) * 1.4 * (1 - fold)

      root.style.setProperty('--fold', fold.toFixed(4))
      root.style.setProperty('--drift', drift.toFixed(4))
      wheel.style.transform = `rotateX(${(-9 * fold).toFixed(2)}deg) rotateY(${(angle * fold).toFixed(2)}deg)`
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60
      last = now
      paint(now, dt)
    }

    // Estado inicial correcto antes del primer frame (evita el flash del
    // estado base armado si el prisma entra por abajo)
    computeTarget()
    paint(performance.now(), 1 / 60)

    // Con el bucle pausado no hace falta seguir el scroll: al volver a
    // pantalla el observer recalcula el objetivo antes de relanzarlo
    const onScroll = () => {
      if (raf) computeTarget()
    }
    const onResize = () => computeTarget()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // El bucle rAF solo corre con el prisma en pantalla
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) {
          computeTarget()
          last = 0
          raf = requestAnimationFrame(frame)
        }
      } else {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    observer.observe(root)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="prism" ref={rootRef}>
      <div className="prism__scene" aria-hidden="false">
        <div className="prism__drift">
          <div className="prism__wheel" ref={wheelRef}>
            {faces.map((face, k) => (
              <article
                key={face.title}
                className="prism__face"
                // --kc: índice con signo (-3..3) para que la fila quede centrada
                // y el pliegue sea simétrico; rotateY(-3·51.43°) ≡ rotateY(4·51.43°)
                style={{ '--kc': k <= 3 ? k : k - 7 }}
              >
                <span className="prism__icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {face.icon}
                  </svg>
                </span>
                <h3 className="prism__label">{face.title}</h3>
                {face.items ? (
                  <ul className="prism__list">
                    {face.items.map((item) => (
                      <li key={item} className="prism__item">
                        <span className="prism__node" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="prism__text">{face.text}</p>
                )}
              </article>
            ))}
            <span
              className="prism__cap prism__cap--top"
              style={{ clipPath: HEPTAGON }}
              aria-hidden="true"
            />
            <span
              className="prism__cap prism__cap--bottom"
              style={{ clipPath: HEPTAGON }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
