// Presentacional: renderiza el primer pilar activo; la interacción de las
// tabs (click, teclado, indicador) corre en el cliente (src/client.js).
const PILARES = [
  {  
    
    numero: '01',
    titulo: 'Historia',
    // TODO: reemplazar por la historia real de Volutus.
    texto:
      'Nuestra historia está en construcción: pronto contaremos de dónde viene Volutus y hacia dónde va.',
    imagen: {
      src: '/image/hero-volutus-poster.webp',
      alt: 'Nube volutus alargada y cilíndrica cruzando baja sobre el horizonte',
      width: 960,
      height: 538,
    },
  },
  {
    numero: '02',
    titulo: 'Misión',
    texto:
      'Construir software confiable que resuelva problemas reales de negocio, con la calidad de un equipo grande y la cercanía de uno pequeño.',
    imagen: {
      src: '/image/mision-640.webp',
      srcSet:
        '/image/mision-480.webp 480w, /image/mision-640.webp 640w, /image/mision-960.webp 960w, /image/mision-1280.webp 1280w',
      alt: 'Silueta de un excursionista con bastones subiendo una ladera empinada frente al sol',
      width: 640,
      height: 274,
    },
  },
  {
    numero: '03',
    titulo: 'Visión',
    texto:
      'Ser el equipo al que se recurre cuando el software tiene que funcionar bien desde el primer día — y seguir en el aire sin sorpresas.',
    imagen: {
      src: '/image/vision-640.webp',
      srcSet:
        '/image/vision-480.webp 480w, /image/vision-640.webp 640w, /image/vision-960.webp 960w, /image/vision-1280.webp 1280w',
      alt: 'Persona de pie en la cima de una cresta montañosa contemplando un valle bajo un cielo nublado',
      width: 640,
      height: 274,
    },
  },
  {
    numero: '04',
    titulo: 'Filosofía',
    texto:
      'Dependencias mínimas, rendimiento medible y seguridad por diseño. Como la volutus: nada sobra, y por eso vuela.',
    imagen: {
      src: '/image/filosofia-640.webp',
      srcSet:
        '/image/filosofia-480.webp 480w, /image/filosofia-640.webp 640w, /image/filosofia-740.webp 740w',
      alt: 'Persona con equipo mínimo de pie sobre una cumbre rocosa por encima de un mar de nubes al atardecer',
      width: 640,
      height: 427,
    },
  }

]

export default function About() {
  return (
    <section
      id="quienes-somos"
      aria-labelledby="about-titulo"
      className="about section-divider"
    >
      <div className="container">
        <p className="eyebrow">Quiénes Somos</p>
        <h2 id="about-titulo" className="about__titulo">
          Ingeniería antes que espectáculo
        </h2>
        <p className="about__lead">
          Tratamos cada proyecto como un sistema en producción: arquitectura
          clara, código auditable y resultados que se miden con Lighthouse,
          no con promesas.
        </p>

        <div className="about__tabs reveal">
          <div className="about__tablist" role="tablist" aria-label="Pilares de Volutus">
            <span className="about__tab-indicador" aria-hidden="true" />
            {PILARES.map((p, i) => (
              <button
                key={p.numero}
                type="button"
                role="tab"
                id={`tab-${p.numero}`}
                aria-selected={i === 0}
                aria-controls={`panel-${p.numero}`}
                tabIndex={i === 0 ? 0 : -1}
                className={`about__tab${i === 0 ? ' is-activa' : ''}`}
              >
                <span className="about__numero">{p.numero}</span>
                {p.titulo}
              </button>
            ))}
          </div>

          <div className="about__panels">
            <div className="about__track">
              {PILARES.map((p, i) => (
                <div
                  key={p.numero}
                  id={`panel-${p.numero}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${p.numero}`}
                  tabIndex={i === 0 ? 0 : -1}
                  inert={i !== 0}
                  className="about__panel"
                >
                  <img
                    className="about__panel-img"
                    src={p.imagen.src}
                    srcSet={p.imagen.srcSet}
                    sizes={
                      p.imagen.srcSet &&
                      '(max-width: 640px) 100vw, min(620px, calc(50vw - 40px))'
                    }
                    alt={p.imagen.alt}
                    width={p.imagen.width}
                    height={p.imagen.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="about__panel-body">
                    <h3 className="about__panel-titulo">{p.titulo}</h3>
                    <p className="about__panel-texto">{p.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
