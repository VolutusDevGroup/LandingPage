import { useEffect, useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

export default function useDecode(text, { duration = 2500, dotDelay = 600 } = {}) {
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

    // Configuración inicial de estilos
    el.style.display = 'inline-block'
    el.style.whiteSpace = 'nowrap'
    
    // Fijamos el ancho evaluando el texto CON el punto final
    el.textContent = targetText
    el.style.minWidth = `${el.offsetWidth}px`
    el.classList.add('is-decoding')

    const start = performance.now()
    
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const easeProgress = easeOutCubic(p)
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
            el.style.whiteSpace = ''
            el.style.display = ''
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