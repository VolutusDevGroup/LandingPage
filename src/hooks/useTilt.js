import { useRef, useEffect } from 'react'

// Profundidad sutil al mover el cursor sobre una tarjeta: escribe --rx/--ry
// como variables CSS (la transformación vive en .card--tilt). Sin re-render,
// desactivado con prefers-reduced-motion y en dispositivos sin puntero fino.
export default function useTilt(maxDeg = 4) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', `${(px * maxDeg * 2).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-py * maxDeg * 2).toFixed(2)}deg`)
    }

    const onLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [maxDeg])

  return ref
}
