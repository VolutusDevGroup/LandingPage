import useReveal from '../hooks/useReveal.js'
import './Services.css'

// Iconos inline minimalistas (trazo 1.5, estilo Lucide) — sin dependencias
const ICONS = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  api: (
    <>
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 1 1 .8-8.93A6 6 0 0 1 19.5 12 3.5 3.5 0 0 1 18 18.7Z" />
    </>
  ),
  ia: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2m0-12-2 2M8 16l-2 2" />
    </>
  ),
  devops: (
    <>
      <path d="M12 3v6m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 12v-3" />
      <path d="M5 8l4 2.5M19 8l-4 2.5M5 16l4-2.5M19 16l-4-2.5" />
    </>
  ),
}

const SERVICES = [
  {
    icon: 'web',
    title: 'Desarrollo Web',
    text: 'Sitios y aplicaciones web rápidas, accesibles y optimizadas para SEO, desde landings estáticas hasta plataformas completas.',
  },
  {
    icon: 'mobile',
    title: 'Desarrollo Mobile',
    text: 'Apps Android nativas con Kotlin y Jetpack Compose: interfaces fluidas, arquitectura MVVM y publicación en Play Store.',
  },
  {
    icon: 'backend',
    title: 'Backend',
    text: 'Servicios robustos con Node.js, Python y Spring Boot sobre PostgreSQL, MySQL o MongoDB, con migraciones y tests.',
  },
  {
    icon: 'api',
    title: 'APIs e Integraciones',
    text: 'APIs REST bien documentadas e integraciones con terceros: pagos, correo, mapas, mensajería y servicios de datos.',
  },
  {
    icon: 'cloud',
    title: 'Cloud',
    text: 'Arquitecturas en AWS, Azure, Vercel y Supabase: cómputo, almacenamiento, CDN y bases de datos gestionadas a costo controlado.',
  },
  {
    icon: 'ia',
    title: 'Inteligencia Artificial',
    text: 'Agentes y automatizaciones con LLMs: clasificación de datos, procesamiento de documentos y flujos que ahorran horas de trabajo.',
  },
  {
    icon: 'devops',
    title: 'DevOps',
    text: 'CI/CD con GitHub Actions, contenedores con Docker y Kubernetes, monitoreo y despliegues reproducibles.',
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section
      id="servicios"
      className="section section--overlap services"
      aria-labelledby="servicios-titulo"
    >
      <div className="container">
        <div className="panel panel--left reveal reveal--left" ref={ref}>
        <p className="section__kicker">Servicios</p>
        <h2 id="servicios-titulo" className="section__title">
          Todo el ciclo del producto, un solo equipo
        </h2>
        <p className="section__lead">
          Desde la idea hasta la operación: cubrimos frontend, backend,
          infraestructura y automatización con IA.
        </p>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="card services__card reveal__item" style={{ '--i': i }}>
              <span className="services__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[s.icon]}
                </svg>
              </span>
              <h3 className="services__title">{s.title}</h3>
              <p className="services__text">{s.text}</p>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
