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
            <video
              className="hero__video"
              poster="/image/hero-volutus-poster.webp"
              width="960"
              height="538"
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/videos/hero-volutus.webm" type="video/webm" />
              <source src="/videos/hero-volutus.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </div>
    </section>
  )
}
