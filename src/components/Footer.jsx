const LINKS = [
  ['#quienes-somos', 'Quiénes Somos'],
  ['#servicios', 'Servicios'],
  ['#proyectos', 'Proyectos'],
  ['#contacto', 'Contacto'],
]

const SOCIAL = [
  ['https://github.com/VolutusDevGroup', 'GitHub']
]

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.11-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer section-divider">
      <div className="footer__inner container">
        <div>
          <p className="footer__logo">
            <span className="footer__logo-mark" aria-hidden="true" />
            Volutus
          </p>
          <p className="footer__tagline">
            Soluciones simples para tu negocio.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Pie de página">
          {LINKS.map(([href, label]) => (
            <a key={href} className="footer__link" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer__social">
          {SOCIAL.map(([href, label]) => (
            <a
              key={label}
              className="footer__link footer__social-link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} Volutus. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
