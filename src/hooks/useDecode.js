import { useEffect, useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'
// Quintic: arranca tan rápido como la cúbica pero estira la desaceleración
// final, dando una curva de salida más larga y fluida antes de asentar.
const easeOutQuint = (x) => 1 - Math.pow(1 - x, 5)

export default function useDecode(text, { duration = 1200, dotDelay = 600 } = {}) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return // Si no hay elemento asignado al ref, no hacemos nada

    const targetText = text + '.'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = targetText
      return
    }

    // Fijamos el ancho evaluando el texto CON el punto final
    // (display: inline-block y white-space: nowrap ya son permanentes por CSS,
    // así el salto de línea no vuelve a activarse al asentar el punto final)
    el.textContent = targetText
    el.style.minWidth = `${el.offsetWidth}px`
    el.classList.add('is-decoding')

    const start = performance.now()
    
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const easeProgress = easeOutQuint(p)
      const settled = Math.floor(easeProgress * text.length)
      
      let out = text.slice(0, settled)
      
      for (let i = settled; i < text.length; i++) {
        out += text[i] === ' ' 
          ? ' ' 
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      
      el.textContent = out

      if (p < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        timeoutRef.current = setTimeout(() => {
          if (el) {
            el.textContent = targetText
            el.style.minWidth = ''
            el.classList.remove('is-decoding')
          }
        }, dotDelay)
      }
    }
    
    rafRef.current = requestAnimationFrame(step)

    // Función de limpieza (vital para que funcione en React 18 Strict Mode)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      
      // Si el componente se desmonta inesperadamente, forzamos el texto final
      if (el) {
        el.textContent = targetText
        el.style.minWidth = ''
        el.style.whiteSpace = ''
        el.style.display = ''
        el.classList.remove('is-decoding')
      }
    }
  }, [text, duration, dotDelay])

  return { ref }
}