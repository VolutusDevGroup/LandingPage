import useReveal from '../hooks/useReveal.js'
import useTilt from '../hooks/useTilt.js'
import './Projects.css'

const PROJECTS = [
  {
    name: 'CarFlip',
    tag: 'Plataforma de datos',
    text: 'Agregador de avisos de autos en venta en Chile: scraping resiliente, historial de precios y detección automática de oportunidades de compra.',
    tech: ['Python', 'PostgreSQL', 'AWS', 'Astro'],
  },
  {
    name: 'Agente IA HelpDesk',
    tag: 'Automatización con IA',
    text: 'Agente que monitorea un buzón de correo, clasifica tickets con IA por categoría y prioridad, y genera informes ejecutivos con dashboard.',
    tech: ['Python', 'Gemini API', 'Apps Script'],
  },
  {
    name: 'LapMaster',
    tag: 'App móvil',
    text: 'App Android para cronometraje de pista multi-piloto: vueltas, sectores, clima en vivo, GPS e historial con gráficos.',
    tech: ['Kotlin', 'Jetpack Compose', 'MVVM'],
  },
  {
    name: 'beatrizberger.cl',
    tag: 'Sitio editorial',
    text: 'Sitio literario minimalista con más de 30 textos, optimización total de performance y SEO completo. Lighthouse móvil ≥ 95.',
    tech: ['React', 'Vite', 'SEO', 'WCAG AA'],
  },
  {
    name: 'Prospector Places',
    tag: 'Herramienta de datos',
    text: 'Extracción masiva de negocios vía Google Places API con grilla adaptativa, rastreo de contactos y análisis bayesiano de reseñas.',
    tech: ['Python', 'Places API', 'Google Sheets'],
  },
  {
    name: 'RepoBase BPL',
    tag: 'Plataforma SaaS',
    text: 'Base reutilizable para sitios de clientes con reservas, pagos y panel admin: integraciones de pago, correo transaccional y facturación.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Mercado Pago'],
  },
]

function ProjectCard({ project, index }) {
  const tiltRef = useTilt()

  return (
    <article
      ref={tiltRef}
      className="card card--tilt projects__card reveal__item"
      style={{ '--i': index }}
    >
      <div className="projects__thumb" aria-hidden="true">
        <span className="projects__thumb-glow" />
        <span className="projects__thumb-initial">{project.name[0]}</span>
      </div>
      <p className="projects__tag">{project.tag}</p>
      <h3 className="projects__name">{project.name}</h3>
      <p className="projects__text">{project.text}</p>
      <ul className="projects__tech">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Projects() {
  const ref = useReveal()

  return (
    <section
      id="proyectos"
      className="section section--overlap projects"
      aria-labelledby="proyectos-titulo"
    >
      <div className="container">
        <div className="panel panel--right reveal reveal--right" ref={ref}>
        <p className="section__kicker">Proyectos Destacados</p>
        <h2 id="proyectos-titulo" className="section__title">
          Sistemas reales, en producción
        </h2>
        <p className="section__lead">
          Una muestra de lo que construimos: plataformas de datos, agentes de
          IA, apps móviles y sitios optimizados al límite.
        </p>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
