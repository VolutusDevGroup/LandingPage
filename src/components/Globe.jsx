import { useEffect, useRef } from 'react'
import { geoOrthographic, geoPath } from 'd3-geo'
import * as topojson from 'topojson-client'
// Importamos directamente el mapa de baja resolución (110m) para mejor rendimiento
import topology from 'world-atlas/countries-110m.json'
import './Globe.css'

const R = 270
const MERIDIANS = 12 // separados 15°
const LATITUDES = [-60, -30, 0, 30, 60]
const TILT = -16 // inclinación del eje, como la Tierra

// Land se calcula una sola vez a nivel de módulo: topojson.merge evita
// dibujar fronteras internas (menos puntos = paths más baratos por frame)
const LAND = topojson.feature(topology, topology.objects.land)
// precision alta (número mayor = menos muestreo adaptativo) porque el mapa
// ya es de baja resolución (110m) y el globo se ve pequeño en pantalla
const projection = geoOrthographic().scale(R).translate([0, 0]).clipAngle(90).precision(1)
const landPath = geoPath(projection)
// d inicial (phi = 0) calculado en build/SSR para que el contorno aparezca
// sin esperar a que corra el useEffect en el cliente
const INITIAL_LAND_D = landPath(LAND)

const CITIES = [
  { lat: -33.45, lon: -70.67 },   // Santiago
  { lat: 40.71, lon: -74.01 },    // Nueva York
  { lat: 51.51, lon: -0.13 },     // Londres
  { lat: 35.68, lon: 139.69 },    // Tokio
  { lat: 48.86, lon: 2.35 },      // París
  { lat: 1.35, lon: 103.82 },     // Singapur
  { lat: 22.32, lon: 114.17 },    // Hong Kong
  { lat: 31.23, lon: 121.47 },    // Shanghái
  { lat: 39.90, lon: 116.41 },    // Pekín
  { lat: 25.20, lon: 55.27 },     // Dubái
  { lat: 34.05, lon: -118.24 },   // Los Ángeles
  { lat: 41.88, lon: -87.63 },    // Chicago
  { lat: 37.57, lon: 126.98 },    // Seúl
  { lat: -33.87, lon: 151.21 },   // Sídney
  { lat: 43.65, lon: -79.38 },    // Toronto
  { lat: 50.11, lon: 8.68 },      // Frankfurt
  { lat: 52.37, lon: 4.90 },      // Ámsterdam
  { lat: 37.77, lon: -122.42 },   // San Francisco
  { lat: 19.08, lon: 72.88 },     // Mumbai
  { lat: -23.55, lon: -46.63 },   // São Paulo
  { lat: 19.43, lon: -99.13 },    // Ciudad de México
];

const rad = (deg) => (deg * Math.PI) / 180

// --- NUEVA FÍSICA ---
const BASE_OMEGA = 0.0002 // Velocidad de rotación constante (auto-rotación)
const IMPULSE = 0.000006 // Reducido: el scroll inyecta menos velocidad inicial
const OMEGA_MAX = 0.003 // Tope máximo de velocidad
const FRICTION = 0.992 // Fricción ajustada para que vuelva más rápido a la velocidad normal
// Al salir de escena (cuando el prisma del stack entra al viewport) el globo
// acelera hacia esta velocidad mientras se desliza fuera por la izquierda.
const EXIT_OMEGA = 0.006

export default function Globe() {
  const rootRef = useRef(null)
  const meridiansRef = useRef(null)
  const citiesRef = useRef(null)
  const landRef = useRef(null)

  useEffect(() => {
    // El globo y el prisma de tecnologías no comparten pantalla: cuando la
    // sección #stack se acerca al viewport, el globo se retira (clase CSS)
    // girando aceleradamente (flag leído por el bucle de física).
    let exiting = false
    const globeEl = rootRef.current
    const stackEl = document.getElementById('stack')
    let observer = null
    if (stackEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          exiting = entry.isIntersecting
          globeEl.classList.toggle('globe--away', exiting)
        },
        { rootMargin: '15% 0px 15% 0px' },
      )
      observer.observe(stackEl)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => observer?.disconnect()
    }

    const meridians = meridiansRef.current.querySelectorAll('ellipse')
    const cities = citiesRef.current.querySelectorAll('circle')
    const landEl = landRef.current

    let phi = window.scrollY * 0.0022
    let omega = BASE_OMEGA // Arranca con la velocidad base, no en 0
    let lastY = window.scrollY
    let lastT = 0
    let raf = null
    let frame = 0

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

      // El contorno de los continentes es lo más costoso de recalcular
      // (recorre todos los puntos del mapa), así que se actualiza a ~30fps
      // en vez de en cada frame; a esta velocidad de rotación es imperceptible.
      frame++
      if (frame % 2 === 0) {
        projection.rotate([(phi * 180) / Math.PI, 0, 0])
        landEl.setAttribute('d', landPath(LAND))
      }
    }

    const tick = (now) => {
      const dt = lastT ? Math.min(now - lastT, 64) : 16
      lastT = now

      phi += omega * dt

      // La fricción ahora actúa sobre el "exceso" o "déficit" de velocidad.
      // Si haces scroll rápido, omega sube. Esta fórmula lo reduce suavemente
      // hasta que vuelva a ser exactamente su velocidad objetivo — la base o,
      // si el globo está saliendo de escena, la de giro acelerado.
      const target = exiting ? EXIT_OMEGA : BASE_OMEGA
      const excess = omega - target
      omega = target + excess * (FRICTION ** dt)

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
      observer?.disconnect()
    }
  }, [])

  return (
    <div className="globe" aria-hidden="true" ref={rootRef}>
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

          <path className="globe__land" ref={landRef} d={INITIAL_LAND_D} />

          <g className="globe__cities" ref={citiesRef}>
            {CITIES.map(({ lat, lon }) => {
              const initialPhi = window.scrollY * 0.0022
              const a = rad(lon) + initialPhi
              return (
                <circle
                  key={`${lat}-${lon}`}
                  r="4"
                  cx={R * Math.cos(rad(lat)) * Math.sin(a)}
                  cy={-R * Math.sin(rad(lat))}
                  fill="#fff"
                />
              )
            })}
          </g>
        </g>
      </svg>
    </div>
  )
}