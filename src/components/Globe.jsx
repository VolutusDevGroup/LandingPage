import { useEffect, useRef } from 'react'
import './Globe.css'

// Globo terráqueo wireframe en proyección ortográfica, sin librerías 3D:
// los meridianos son elipses cuyo radio horizontal es R·|sin(longitud)|,
// así que basta reescribir `rx` según el scroll para simular la rotación.
const R = 270
const MERIDIANS = 12 // separados 15°
const LATITUDES = [-60, -30, 0, 30, 60]
const TILT = -16 // inclinación del eje, como la Tierra

// "Ciudades": nodos que orbitan con la rotación y se ocultan al pasar atrás
const CITIES = [
  { lat: -33, lon: -71 }, // Santiago
  { lat: 40, lon: -74 }, // Nueva York
  { lat: 51, lon: 0 }, // Londres
  { lat: 35, lon: 140 }, // Tokio
  { lat: -34, lon: 151 }, // Sídney
  { lat: 48, lon: 2 }, // París
]

const rad = (deg) => (deg * Math.PI) / 180

// Física de la rotación: el scroll no fija el ángulo, inyecta impulso angular.
// Un flick rápido deja al globo girando varios segundos hasta que la fricción
// exponencial lo frena; en reposo el bucle rAF se apaga solo (cero CPU).
const IMPULSE = 0.000012 // rad/ms de velocidad angular por px de scroll
const OMEGA_MAX = 0.004 // rad/ms (~0.23 rad/frame a 60fps como tope)
const FRICTION = 0.9986 // factor por ms → un flick fuerte gira ~4-6 s
const OMEGA_MIN = 0.000004 // bajo esto se considera detenido

export default function Globe() {
  const meridiansRef = useRef(null)
  const citiesRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const meridians = meridiansRef.current.querySelectorAll('ellipse')
    const cities = citiesRef.current.querySelectorAll('circle')

    let phi = window.scrollY * 0.0022 // arranca donde habría quedado antes
    let omega = 0
    let lastY = window.scrollY
    let lastT = 0
    let raf = null

    const render = () => {
      meridians.forEach((el, i) => {
        const a = (i * Math.PI) / MERIDIANS + phi
        el.setAttribute('rx', Math.max(Math.abs(Math.sin(a)) * R, 0.5).toFixed(1))
      })

      cities.forEach((el, i) => {
        const { lat, lon } = CITIES[i]
        const a = rad(lon) + phi
        const front = Math.cos(rad(lat)) * Math.cos(a) > 0
        el.setAttribute('cx', (R * Math.cos(rad(lat)) * Math.sin(a)).toFixed(1))
        el.setAttribute('cy', (-R * Math.sin(rad(lat))).toFixed(1))
        el.style.opacity = front ? '1' : '0'
      })
    }

    const tick = (now) => {
      const dt = lastT ? Math.min(now - lastT, 64) : 16
      lastT = now

      phi += omega * dt
      omega *= FRICTION ** dt

      render()

      if (Math.abs(omega) > OMEGA_MIN) {
        raf = requestAnimationFrame(tick)
      } else {
        omega = 0
        raf = null
        lastT = 0
      }
    }

    const onScroll = () => {
      const delta = window.scrollY - lastY
      lastY = window.scrollY
      omega = Math.max(-OMEGA_MAX, Math.min(OMEGA_MAX, omega + delta * IMPULSE))
      if (!raf) raf = requestAnimationFrame(tick)
    }

    render()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="globe" aria-hidden="true">
      <svg className="globe__svg" viewBox="-300 -300 600 600">
        <defs>
          <radialGradient id="globe-shade" cx="0.38" cy="0.34" r="0.75">
            <stop offset="0" stopColor="rgba(61, 139, 255, 0.10)" />
            <stop offset="0.7" stopColor="rgba(61, 139, 255, 0.03)" />
            <stop offset="1" stopColor="rgba(5, 7, 11, 0)" />
          </radialGradient>
        </defs>

        <g transform={`rotate(${TILT})`}>
          <circle className="globe__sphere" r={R} fill="url(#globe-shade)" />

          <g className="globe__lats">
            {LATITUDES.map((lat) => (
              <ellipse
                key={lat}
                cy={-R * Math.sin(rad(lat))}
                rx={R * Math.cos(rad(lat))}
                ry={R * Math.cos(rad(lat)) * 0.16}
              />
            ))}
          </g>

          <g className="globe__meridians" ref={meridiansRef}>
            {Array.from({ length: MERIDIANS }, (_, i) => (
              <ellipse
                key={i}
                rx={Math.max(Math.abs(Math.sin((i * Math.PI) / MERIDIANS)) * R, 0.5)}
                ry={R}
              />
            ))}
          </g>

          <g className="globe__cities" ref={citiesRef}>
            {CITIES.map(({ lat, lon }) => (
              <circle
                key={`${lat}-${lon}`}
                r="4"
                cx={R * Math.cos(rad(lat)) * Math.sin(rad(lon))}
                cy={-R * Math.sin(rad(lat))}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  )
}
