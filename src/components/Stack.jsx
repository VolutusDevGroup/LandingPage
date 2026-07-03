import useReveal from '../hooks/useReveal.js'
import TechPrism from './TechPrism.jsx'
import './Stack.css'

// 7 grupos = 7 caras del prisma heptagonal
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
      className="section stack"
      aria-labelledby="stack-titulo"
    >
      {/* Iluminación azul de estudio: telón full-bleed tras el prisma,
          se intensifica con la velocidad del scroll (--energy) */}
      <div className="stack__studio" aria-hidden="true" />
      <div className="container stack__header reveal" ref={ref}>
        <p className="section__kicker">Stack Tecnológico</p>
        <h2 id="stack-titulo" className="section__title">
          Herramientas probadas, elegidas con criterio
        </h2>
        <p className="section__lead">
          Usamos tecnología moderna donde aporta y evitamos dependencias que
          solo agregan mantenimiento. El stack correcto para cada problema.
        </p>
      </div>
      <TechPrism groups={GROUPS} />
    </section>
  )
}
