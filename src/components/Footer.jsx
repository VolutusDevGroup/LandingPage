const LINKS = [
  ['#quienes-somos', 'Quiénes Somos'],
  ['#desarrollo', 'Servicios'],
  ['#contacto', 'Contacto'],
]

const SOCIAL = [
  ['https://github.com/', 'GitHub'],
  ['https://www.linkedin.com/', 'LinkedIn'],
]

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
              className="footer__link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} Volutus. Todos los derechos reservados.</p>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <video
          className="footer__wordmark-video"
          src="/videos/hero.mp4"
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
    </footer>
  )
}
