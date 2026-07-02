import useReveal from '../hooks/useReveal.js'
import './Team.css'

const MEMBERS = [
  {
    name: 'Diego Peña y Lillo',
    role: 'Full-Stack & Arquitectura',
    focus: 'Web, datos y automatización con IA',
  },
  {
    name: 'Becker',
    role: 'Backend & Datos',
    focus: 'APIs, bases de datos y pipelines',
  },
  {
    name: 'Iván',
    role: 'Mobile & Frontend',
    focus: 'Android nativo e interfaces',
  },
  {
    name: 'Vincent',
    role: 'Cloud & DevOps',
    focus: 'Infraestructura, CI/CD y despliegues',
  },
]

const initials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export default function Team() {
  const ref = useReveal()

  return (
    <section
      id="equipo"
      className="section section--overlap team"
      aria-labelledby="equipo-titulo"
    >
      <div className="container">
        <div className="panel panel--left reveal reveal--left" ref={ref}>
        <p className="section__kicker">Equipo</p>
        <h2 id="equipo-titulo" className="section__title">
          Las personas detrás del código
        </h2>
        <p className="section__lead">
          Un equipo compacto donde cada integrante domina su área y todos
          entienden el sistema completo.
        </p>
        <ul className="team__grid">
          {MEMBERS.map((m, i) => (
            <li key={m.name} className="card team__card reveal__item" style={{ '--i': i }}>
              <span className="team__avatar" aria-hidden="true">
                {initials(m.name)}
              </span>
              <h3 className="team__name">{m.name}</h3>
              <p className="team__role">{m.role}</p>
              <p className="team__focus">{m.focus}</p>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
