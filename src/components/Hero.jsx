import Typewriter from './Typewriter'
import './Hero.css'

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
              src="/image/Michael-Zupanc.jpg"
              alt="Nube volutus: una onda continua cruzando el cielo"
              width="1000"
              height="667"
              fetchPriority="high"
            />
            <figcaption className="hero__caption">
              A Beechcraft Bonanza (from Savannah Aviation) taking tourists on a scenic flight along a Morning Glory Cloud, near Burketown in North Queensland, Australia. © Michael Zupanc
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
