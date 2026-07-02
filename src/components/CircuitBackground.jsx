import { useEffect } from 'react'
import './CircuitBackground.css'

// Traza los caminos del "circuito": líneas ortogonales con nodos en los quiebres.
// Cada path se dibuja dos veces: la pista tenue y, encima, el pulso de corriente
// animado con stroke-dashoffset (solo CSS, sin layout).
const TRACES = [
  { d: 'M -20 120 H 260 V 300 H 540 V 210 H 900', dur: 9, delay: 0 },
  { d: 'M 1460 80 H 1180 V 260 H 980 V 420 H 700', dur: 11, delay: 2 },
  { d: 'M -20 520 H 180 V 680 H 520 V 560 H 820 V 760 H 1100', dur: 13, delay: 4 },
  { d: 'M 1460 640 H 1260 V 480 H 1040 V 620 H 880', dur: 10, delay: 1 },
  { d: 'M 380 920 V 780 H 640 V 880 H 940 V 720 H 1220 V 920', dur: 12, delay: 6 },
  { d: 'M 60 -20 V 200 H 340 V 60 H 620 V -20', dur: 10, delay: 3 },
  { d: 'M 760 -20 V 140 H 1080 V 320 H 1320 V 180 H 1460', dur: 12, delay: 5 },
  { d: 'M -20 820 H 240 V 900 M 240 900 V 940', dur: 8, delay: 7 },
]

// Nodos en intersecciones/quiebres relevantes (se "encienden" por turnos)
const NODES = [
  [260, 120], [260, 300], [540, 300], [540, 210], [1180, 80], [1180, 260],
  [980, 260], [980, 420], [180, 520], [180, 680], [520, 680], [520, 560],
  [820, 560], [820, 760], [1260, 640], [1260, 480], [1040, 480], [1040, 620],
  [640, 780], [640, 880], [940, 880], [940, 720], [340, 200], [340, 60],
  [1080, 140], [1080, 320], [1320, 320], [1320, 180], [240, 820],
]

export default function CircuitBackground() {
  // El scroll inyecta "energía" al circuito: sube --energy según la velocidad
  // y decae sola (transición en CSS). Solo escribe una variable, sin re-render.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    let lastY = window.scrollY
    let lastT = performance.now()
    let decayTimer

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(now - lastT, 1)
      const velocity = Math.abs(window.scrollY - lastY) / dt // px/ms
      lastY = window.scrollY
      lastT = now

      const energy = Math.min(1, velocity / 2.5)
      document.documentElement.style.setProperty('--energy', energy.toFixed(2))

      clearTimeout(decayTimer)
      decayTimer = setTimeout(() => {
        document.documentElement.style.setProperty('--energy', '0')
      }, 180)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(decayTimer)
    }
  }, [])

  return (
    <div className="circuit" aria-hidden="true">
      <svg
        className="circuit__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pulse-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-2)" />
          </linearGradient>
          <radialGradient id="node-grad">
            <stop offset="0" stopColor="var(--accent-2)" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Pistas base, casi invisibles */}
        <g className="circuit__traces">
          {TRACES.map((t) => (
            <path key={t.d} d={t.d} />
          ))}
        </g>

        {/* Corrientes que recorren las pistas */}
        <g className="circuit__pulses">
          {TRACES.map((t) => (
            <path
              key={t.d}
              d={t.d}
              style={{
                animationDuration: `${t.dur}s`,
                animationDelay: `${t.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Nodos: puntos fijos + destello que se activa por turnos */}
        <g className="circuit__nodes">
          {NODES.map(([x, y], i) => (
            <g key={`${x}-${y}`}>
              <circle className="circuit__node" cx={x} cy={y} r="2.5" />
              <circle
                className="circuit__spark"
                cx={x}
                cy={y}
                r="7"
                style={{ animationDelay: `${(i * 1.7) % 24}s` }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
