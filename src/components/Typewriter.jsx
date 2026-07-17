// Presentacional: renderiza la primera palabra; el ciclo de tipeo corre en
// el cliente (src/client.js) sobre este DOM.
export default function Typewriter({ words }) {
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
        {words[0]}
        <span className="typewriter__cursor" />
      </span>
    </span>
  )
}
