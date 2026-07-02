import CircuitBackground from './components/CircuitBackground.jsx'
import Globe from './components/Globe.jsx'
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

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <CircuitBackground />
      <Globe />
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
