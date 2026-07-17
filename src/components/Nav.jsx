const LINKS = [
  ['#quienes-somos', 'Quiénes Somos'],
  ['#servicios', 'Servicios'],
  ['#proyectos', 'Proyectos'],
]

export default function Nav() {
  return (
    <header className="nav">
      <nav className="nav__inner container" aria-label="Principal">
        <a className="nav__logo" href="#contenido">
          <span className="nav__logo-mark" aria-hidden="true" />
          Volutus
        </a>
        <div className="nav__links">
          {LINKS.map(([href, label]) => (
            <a key={href} className="nav__link" href={href}>
              {label}
            </a>
          ))}
          <a className="btn btn-primary nav__cta" href="#contacto">
            Contactar
          </a>
        </div>
      </nav>
    </header>
  )
}
