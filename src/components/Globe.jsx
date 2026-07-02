import { useEffect, useRef, useState } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import * as topojson from 'topojson-client'
// Importamos directamente el mapa de baja resolución (110m) para mejor rendimiento
import topology from 'world-atlas/countries-110m.json' 
import './Globe.css'
import './Globe.css'

const R = 270
const MERIDIANS = 12 // separados 15°
const LATITUDES = [-60, -30, 0, 30, 60]
const TILT = -16 // inclinación del eje, como la Tierra

const CITIES = [
  { lat: -33, lon: -71 }, // Santiago
  { lat: 40, lon: -74 }, // Nueva York
  { lat: 51, lon: 0 }, // Londres
  { lat: 35, lon: 140 }, // Tokio
  { lat: -34, lon: 151 }, // Sídney
  { lat: 48, lon: 2 }, // París
]

const rad = (deg) => (deg * Math.PI) / 180

// --- NUEVA FÍSICA ---
const BASE_OMEGA = 0.0002 // Velocidad de rotación constante (auto-rotación)
const IMPULSE = 0.000006 // Reducido: el scroll inyecta menos velocidad inicial
const OMEGA_MAX = 0.003 // Tope máximo de velocidad
const FRICTION = 0.992 // Fricción ajustada para que vuelva más rápido a la velocidad normal

export default function Globe() {
  const meridiansRef = useRef(null)
  const citiesRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const meridians = meridiansRef.current.querySelectorAll('ellipse')
    const cities = citiesRef.current.querySelectorAll('circle')

    let phi = window.scrollY * 0.0022
    let omega = BASE_OMEGA // Arranca con la velocidad base, no en 0
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

      // La fricción ahora actúa sobre el "exceso" o "déficit" de velocidad.
      // Si haces scroll rápido, omega sube. Esta fórmula lo reduce suavemente
      // hasta que vuelva a ser exactamente igual a BASE_OMEGA.
      const excess = omega - BASE_OMEGA
      omega = BASE_OMEGA + excess * (FRICTION ** dt)

      render()
      raf = requestAnimationFrame(tick) // El bucle ya no se detiene nunca
    }

    const onScroll = () => {
      const delta = window.scrollY - lastY
      lastY = window.scrollY
      // Inyectamos el impulso sumándolo a la velocidad actual
      omega = Math.max(-OMEGA_MAX, Math.min(OMEGA_MAX, omega + delta * IMPULSE))
    }

    // Iniciamos el renderizado infinito
    raf = requestAnimationFrame(tick)
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
                fill="none"
                stroke="rgba(255,255,255,0.2)"
              />
            ))}
          </g>

          <g className="globe__meridians" ref={meridiansRef}>
            {Array.from({ length: MERIDIANS }, (_, i) => (
              <ellipse
                key={i}
                rx={Math.max(Math.abs(Math.sin((i * Math.PI) / MERIDIANS)) * R, 0.5)}
                ry={R}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
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
                fill="#fff"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  )
}