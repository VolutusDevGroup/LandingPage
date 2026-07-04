import { useEffect, useRef } from 'react'

// Marca el elemento con `is-offscreen` cuando sale por completo del viewport
// (más un margen de seguridad) para que el CSS pause sus animaciones
// infinitas con animation-play-state. Solo se pausa lo que no se ve, así que
// los píxeles en pantalla no cambian; el margen cubre glows/sombras que
// sobresalen del borde de la sección.
export default function usePauseWhenHidden(margin = '200px') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-offscreen', !entry.isIntersecting)
      },
      { rootMargin: `${margin} 0px ${margin} 0px` },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [margin])

  return ref
}
