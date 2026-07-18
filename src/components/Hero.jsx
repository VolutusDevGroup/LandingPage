import Typewriter from './Typewriter'

const PALABRAS = ['problemas', 'excusas', 'atajos']

export default function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="hero">
      <video
        className="hero__video"
        src="/videos/hero.mp4"
        poster="/image/hero-volutus-1000.webp"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="container hero__content">
        <h1 id="hero-titulo" className="hero__title reveal">
          <span className="hero__title-line">Construimos soluciones, no</span>
          <span className="visually-hidden">problemas</span>
          <span className="hero__title-word">
            <Typewriter words={PALABRAS} />
          </span>
        </h1>
        <div className="hero__actions reveal">
          <a className="btn btn-primary" href="#contacto">
            Contáctanos
          </a>
          <a className="btn btn-secondary" href="#proyectos">
            Proyectos
          </a>
        </div>
      </div>
      <a className="hero__scroll" href="#quienes-somos">
        Desliza para explorar
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  )
}
