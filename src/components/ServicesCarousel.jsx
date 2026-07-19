import { DESARROLLO } from '../data/desarrollo.js'
import { ICONOS } from '../data/icons.js'
import Icon from './Icon.jsx'

function Puntos({ items }) {
  return (
    <ul className="dev-services__puntos">
      {items.map((punto) => (
        <li key={punto}>
          <Icon paths={ICONOS.check} size={16} />
          <span>{punto}</span>
        </li>
      ))}
    </ul>
  )
}

function Card({ destacada, mono, etiqueta, titulo, subtitulo, puntos, tags }) {
  if (destacada) {
    return (
      <article role="listitem" className="dev-services__card is-destacada">
        <div className="dev-services__body">
          <h3 className="dev-services__card-titulo">{titulo}</h3>
          <p className="dev-services__subtitulo">{subtitulo}</p>
          <Puntos items={puntos} />
        </div>
      </article>
    )
  }

  return (
    <article role="listitem" className="dev-services__card">
      <div className="dev-services__visual" aria-hidden="true">
        {mono}
      </div>
      <div className="dev-services__body">
        <p className="dev-services__etiqueta">{etiqueta}</p>
        <h3 className="dev-services__card-titulo">{titulo}</h3>
        <p className="dev-services__subtitulo">{subtitulo}</p>
        <Puntos items={puntos} />
        {tags && (
          <ul className="dev-services__tags">
            {tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default function ServicesCarousel() {
  return (
    <section
      id="desarrollo"
      aria-label="Desarrollo de software"
      className="dev-services section-divider"
    >
      <div className="container">
        <div
          className="dev-services__carousel reveal"
          role="list"
          aria-label="Capacidades de desarrollo de software"
          tabIndex={0}
        >
          {DESARROLLO.map((s) => (
            <Card key={s.titulo} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
