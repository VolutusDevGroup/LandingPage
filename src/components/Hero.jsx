import Typewriter from './Typewriter'

const PALABRAS = ['soluciones', 'resultados', 'respuestas']

export default function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="hero">
      <div className="container">
        <div className="hero__layout">
          <div>
            <h1 id="hero-titulo" className="hero__title">
              <span>No buscamos problemas, sino</span>
              <span className="visually-hidden">soluciones</span>
              <Typewriter words={PALABRAS} />
            </h1>
            <p className="hero__lead">
              Como la nube volutus — una sola onda, precisa, que cruza el
              cielo sin perder su forma — construimos productos digitales de
              nivel empresarial: web, mobile, cloud e inteligencia artificial.
              Ingeniería ligera, medible y en producción.
            </p>
            <div className="hero__actions">
              <a className="btn btn-primary" href="#contacto">
                Contactar al equipo
              </a>
              <a className="btn btn-secondary" href="#proyectos">
                Ver proyectos
              </a>
            </div>
          </div>

          <figure className="hero__figure">
            <img
              className="hero__image"
              src="/image/hero-volutus-1000.webp"
              srcSet="/image/hero-volutus-640.webp 640w, /image/hero-volutus-1000.webp 1000w"
              sizes="(max-width: 900px) 100vw, 720px"
              alt="Nube volutus: una onda continua cruzando el cielo"
              width="1000"
              height="667"
              fetchPriority="high"
            />
            <figcaption className="hero__caption">
              Nube volutus <i>(Morning Glory)</i> sobre Burketown, Queensland,
              Australia. Fotografía: © Michael Zupanc.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
