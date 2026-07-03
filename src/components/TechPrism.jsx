import './TechPrism.css'

// Prisma heptagonal 3D inspirado en el cubo de codewiki.google:
// caras de vidrio con aristas luminosas girando en un carrusel CSS puro
// (perspective + preserve-3d), sin librerías 3D. Gira de forma continua
// y lenta para poder leer las caras; prefers-reduced-motion la congela.
//
// Geometría: 7 caras de ancho W separadas 360/7 = 51.4286°. Cada cara se
// empuja hacia afuera el apotema del heptágono: (W/2) / tan(PI/7) ≈ W * 1.038.
// Las tapas (caps) son heptágonos con clip-path cuyo circunradio es
// apotema / cos(PI/7) ≈ W * 1.152 (contenedor de lado W * 2.305).

const STEP = 360 / 7

// Heptágono con un vértice arriba y una arista plana centrada abajo: al
// rotarlo 90° en X, esa arista queda alineada con la cara frontal (k = 0).
const HEPTAGON = `polygon(
  50% 0%, 89.09% 18.83%, 98.75% 61.13%, 71.69% 95.05%,
  28.31% 95.05%, 1.25% 61.13%, 10.91% 18.83%
)`

export default function TechPrism({ groups }) {
  return (
    <div className="prism">
      <div className="prism__scene" aria-hidden="false">
        <span className="prism__beam" aria-hidden="true" />
        <div className="prism__wheel">
          {groups.map((g, k) => (
            <article
              key={g.label}
              className="prism__face"
              style={{ '--k': k, transform: `rotateY(${(k * STEP).toFixed(4)}deg) translateZ(var(--prism-r))` }}
            >
              <h3 className="prism__label">{g.label}</h3>
              <ul className="prism__items">
                {g.items.map((item) => (
                  <li key={item} className="prism__item">
                    <span className="prism__node" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <span
            className="prism__cap prism__cap--top"
            style={{ clipPath: HEPTAGON }}
            aria-hidden="true"
          />
          <span
            className="prism__cap prism__cap--bottom"
            style={{ clipPath: HEPTAGON }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
