import { useEffect, useState } from 'react'
import './Typewriter.css'

const TYPING_MS = 80
const DELETING_MS = 45
const PAUSE_MS = 2000

export default function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const word = words[wordIndex]
    const delay = deleting ? DELETING_MS : text === word ? PAUSE_MS : TYPING_MS

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text === word) setDeleting(true)
        else setText(word.slice(0, text.length + 1))
      } else if (text) {
        setText(text.slice(0, -1))
      } else {
        setDeleting(false)
        setWordIndex((wordIndex + 1) % words.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, wordIndex, words])

  return (
    <span className="typewriter" aria-hidden="true">
      {/* Sizers invisibles: reservan el ancho de la palabra más larga
          para que el ciclo no provoque layout shift. */}
      {words.map((word) => (
        <span key={word} className="typewriter__sizer">
          {word}
        </span>
      ))}
      <span className="typewriter__text">
        {text}
        <span className="typewriter__cursor" />
      </span>
    </span>
  )
}
