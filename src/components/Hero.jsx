import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content container">
        <p className="hero__kicker">
          <span className="hero__status" aria-hidden="true" />
          Estudio de ingeniería de software
        </p>
        <h1 id="hero-titulo" className="hero__title">
          Software que se siente
          <br />
          <span className="electric-text">vivo y en producción</span>
        </h1>
        <p className="hero__subtitle">
          Diseñamos y construimos productos digitales de nivel empresarial:
          web, mobile, cloud e inteligencia artificial. Ingeniería sólida,
          entregas medibles y una obsesión por el rendimiento.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contacto">
            Contactar al equipo
          </a>
          <a className="btn btn--ghost" href="#proyectos">
            Ver proyectos
          </a>
        </div>
        <dl className="hero__stats">
          <div className="hero__stat">
            <dt>Proyectos en producción</dt>
            <dd>6+</dd>
          </div>
          <div className="hero__stat">
            <dt>Lighthouse objetivo</dt>
            <dd>≥ 95</dd>
          </div>
          <div className="hero__stat">
            <dt>Accesibilidad</dt>
            <dd>WCAG AA</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
