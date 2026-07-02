import { lazy, Suspense, useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Stack from './components/Stack.jsx'
import Projects from './components/Projects.jsx'
import Process from './components/Process.jsx'
import Team from './components/Team.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Los adornos (circuito + globo) son decorativos (aria-hidden): se cargan en
// chunks aparte y se montan cuando el hilo queda libre tras el primer paint.
// En el prerender no existen (useEffect no corre), así el HTML y el JS
// críticos quedan más livianos sin costo de SEO ni accesibilidad.
const CircuitBackground = lazy(
  () => import('./components/CircuitBackground.jsx'),
)
const Globe = lazy(() => import('./components/Globe.jsx'))

function useDecorReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setReady(true), { timeout: 1500 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  return ready
}

export default function App() {
  const decorReady = useDecorReady()

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      {decorReady && (
        <Suspense fallback={null}>
          <CircuitBackground />
          <Globe />
        </Suspense>
      )}
      <Nav />
      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Stack />
        <Projects />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
