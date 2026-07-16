import { lazy, Suspense } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Analytics no es crítico para el primer paint: carga en un chunk aparte
// fuera del bundle de hidratación.
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
)

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <Nav />
      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
