import './Footer.css'

const LINKS = [
  ['#quienes-somos', 'Quiénes Somos'],
  ['#servicios', 'Servicios'],
  ['#proyectos', 'Proyectos'],
  ['#proceso', 'Proceso'],
  ['#contacto', 'Contacto'],
]

const SOCIAL = [
  ['https://github.com/', 'GitHub'],
  ['https://www.linkedin.com/', 'LinkedIn'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="footer__logo-mark" aria-hidden="true" />
            Volutus<span className="footer__logo-dim"></span>
          </span>
          <p className="footer__tagline">
            Ingeniería de software de nivel empresarial.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Pie de página">
          <ul className="footer__links">
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a className="footer__link" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__social">
          {SOCIAL.map(([href, label]) => (
            <li key={label}>
              <a
                className="footer__link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__bottom container">
        
        <p>© {new Date().getFullYear()} Volutus. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
