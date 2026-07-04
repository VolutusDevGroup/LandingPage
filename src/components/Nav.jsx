import { useState } from 'react'
import './Nav.css'

const LINKS = [
  ['#quienes-somos', 'Quiénes Somos'],
  ['#servicios', 'Servicios'],
  ['#proyectos', 'Proyectos'],
  ['#proceso', 'Proceso']
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <nav className="nav__inner container" aria-label="Principal">
        <a className="nav__logo" href="#contenido">
          <span className="nav__logo-mark" aria-hidden="true" />
          Volutus<span className="nav__logo-dim"></span>
        </a>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="nav__toggle-bar" aria-hidden="true" />
          <span className="nav__toggle-bar" aria-hidden="true" />
          {open ? 'Cerrar menú' : 'Abrir menú'}
        </button>

        <div id="nav-menu" className={`nav__menu ${open ? 'nav__menu--open' : ''}`}>
          <ul className="nav__links">
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a className="nav__link" href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary nav__cta"
            href="#contacto"
            onClick={() => setOpen(false)}
          >
            Contactar
          </a>
        </div>
      </nav>
    </header>
  )
}
