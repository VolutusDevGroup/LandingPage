import useReveal from '../hooks/useReveal.js'
import { PROYECTOS } from '../data/projects.js'
import './Projects.css'

function ProjectCard({ mono, tag, name, text, tech }) {
  const ref = useReveal()
  return (
    <article className="project reveal" ref={ref}>
      <div className="project__visual" aria-hidden="true">
        {mono}
      </div>
      <div className="project__body">
        <p className="project__tag">{tag}</p>
        <h3 className="project__name">{name}</h3>
        <p className="project__text">{text}</p>
        <ul className="project__tech">
          {tech.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="projects section-divider"
    >
      <div className="container">
        <p className="eyebrow">Proyectos Destacados</p>
        <h2 id="proyectos-titulo" className="projects__titulo">
          Sistemas reales, en producción
        </h2>
        <p className="projects__lead">
          Plataformas de datos, agentes de IA, apps móviles y sitios
          optimizados al límite.
        </p>
        <div className="projects__grid">
          {PROYECTOS.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
