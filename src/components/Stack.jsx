import useReveal from '../hooks/useReveal.js'
import './Stack.css'

const GROUPS = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Astro', 'Vite'],
  },
  {
    label: 'Mobile',
    items: ['Kotlin', 'Jetpack Compose', 'Material 3'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Python', 'Spring Boot'],
  },
  {
    label: 'Datos',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'],
  },
  {
    label: 'Cloud',
    items: ['AWS', 'Azure', 'Vercel', 'Firebase'],
  },
  {
    label: 'DevOps',
    items: ['Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    label: 'IA',
    items: ['Gemini API', 'Claude API', 'Automatización con LLMs'],
  },
]

export default function Stack() {
  const ref = useReveal()

  return (
    <section
      id="stack"
      className="section section--overlap stack"
      aria-labelledby="stack-titulo"
    >
      <div className="container">
        <div className="panel panel--left reveal reveal--left" ref={ref}>
          <p className="section__kicker">Stack Tecnológico</p>
          <h2 id="stack-titulo" className="section__title">
            Herramientas probadas, elegidas con criterio
          </h2>
          <p className="section__lead">
            Usamos tecnología moderna donde aporta y evitamos dependencias que
            solo agregan mantenimiento. El stack correcto para cada problema.
          </p>
          <div className="stack__grid">
            {GROUPS.map((g, i) => (
              <article key={g.label} className="card stack__card reveal__item" style={{ '--i': i }}>
                <h3 className="stack__label">{g.label}</h3>
                <ul className="stack__list">
                  {g.items.map((item) => (
                    <li key={item} className="stack__item">
                      <span className="stack__node" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
