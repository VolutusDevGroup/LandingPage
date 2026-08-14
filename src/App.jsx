import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ServicesCarousel from './components/ServicesCarousel.jsx'
import ContactHero from './components/ContactHero.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <About />
        <ServicesCarousel />
        <ContactHero />
      </main>
      <Footer />
    </>
  )
}
