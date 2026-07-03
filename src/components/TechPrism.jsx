import { useEffect, useRef, useState } from 'react'
import './TechPrism.css'

// Prisma heptagonal 3D inspirado en el cubo de codewiki.google:
// caras de vidrio con aristas luminosas girando en un carrusel CSS puro
// (perspective + preserve-3d), sin librerías 3D.
//
// Entrada en dos estados: primero las caras forman una barra horizontal
// plana que deriva tipo marquee (prism--flat); al entrar al viewport se
// pliegan sobre el prisma (prism--folded) y arranca el giro continuo.
// prefers-reduced-motion salta directo al prisma congelado.
//
// Geometría: 7 caras de ancho W separadas 360/7 = 51.4286°. Cada cara se
// empuja hacia afuera el apotema del heptágono: (W/2) / tan(PI/7) ≈ W * 1.038.
// El ángulo de cada cara vive en CSS (--kc * 51.4286deg) para poder
// transicionar entre la fila plana y el cilindro.
// Las tapas (caps) son heptágonos con clip-path cuyo circunradio es
// apotema / cos(PI/7) ≈ W * 1.152 (contenedor de lado W * 2.305).

// Heptágono con un vértice arriba y una arista plana centrada abajo: al
// rotarlo 90° en X, esa arista queda alineada con la cara frontal (k = 0).
const HEPTAGON = `polygon(
  50% 0%, 89.09% 18.83%, 98.75% 61.13%, 71.69% 95.05%,
  28.31% 95.05%, 1.25% 61.13%, 10.91% 18.83%
)`

export default function TechPrism({ faces }) {
  // SSR-safe: el prerender sale en estado plano y el efecto decide en cliente
  const [folded, setFolded] = useState(false)
  const rootRef = useRef(null)
  const driftRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFolded(true)
      return
    }

    // Congela la deriva del marquee en su posición actual y la transiciona
    // a 0 durante el mismo plegado: al quitar la animación infinita, CSS
    // descartaría su valor y la barra saltaría al origen.
    const fold = () => {
      const drift = driftRef.current
      const t = getComputedStyle(drift).transform
      const x = t === 'none' ? 0 : new DOMMatrixReadOnly(t).m41
      drift.style.transform = `translateX(${x}px)`
      setFolded(true)
      void drift.offsetWidth
      drift.style.transform = 'translateX(0px)'
    }

    let timer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        // ~1s viendo la barra en movimiento antes de plegarse
        timer = setTimeout(fold, 1000)
      },
      { threshold: 0.45 }
    )
    observer.observe(rootRef.current)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`prism ${folded ? 'prism--folded' : 'prism--flat'}`} ref={rootRef}>
      <div className="prism__scene" aria-hidden="false">
        <span className="prism__beam" aria-hidden="true" />
        <div className="prism__drift" ref={driftRef}>
          <div className="prism__wheel">
            {faces.map((face, k) => (
              <article
                key={face.title}
                className="prism__face"
                // --kc: índice con signo (-3..3) para que la fila quede centrada
                // y el pliegue sea simétrico; rotateY(-3·51.43°) ≡ rotateY(4·51.43°)
                style={{ '--k': k, '--kc': k <= 3 ? k : k - 7 }}
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
                <p className="prism__text">{face.text}</p>
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
