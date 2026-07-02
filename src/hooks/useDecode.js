import { useCallback, useEffect, useRef } from 'react'

// Efecto "decodificación": el texto pasa por glifos aleatorios que se
// asientan de izquierda a derecha hasta formar el texto final.
// El elemento debe llevar aria-hidden y convivir con una copia .sr-only,
// para que los lectores de pantalla nunca oigan los glifos intermedios.
const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

export default function useDecode(text, { duration = 1200 } = {}) {
  const ref = useRef(null)
  const rafRef = useRef(null)

  const play = useCallback(() => {
    const el = ref.current
    if (!el || el.classList.contains('is-decoding')) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text
      return
    }

    // Fija el ancho final para que los glifos no muevan el layout (CLS 0)
    el.textContent = text
    el.style.width = `${el.offsetWidth}px`
    el.classList.add('is-decoding')

    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const settled = Math.floor(p * text.length)
      let out = text.slice(0, settled)
      for (let i = settled; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      el.textContent = out
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        el.style.width = ''
        el.classList.remove('is-decoding')
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }, [text, duration])

  useEffect(() => {
    play()
    return () => {
      cancelAnimationFrame(rafRef.current)
      const el = ref.current
      if (el) {
        el.textContent = text
        el.style.width = ''
        el.classList.remove('is-decoding')
      }
    }
  }, [play, text])

  return { ref, play }
}
