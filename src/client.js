// Comportamiento del sitio en el navegador. El HTML llega prerenderizado
// (scripts/prerender.mjs), así que aquí solo se enganchan los efectos sobre
// el DOM existente: typewriter, reveal on-scroll, tabs y formulario.
// Vanilla a propósito: React no se envía al cliente (ver src/main.js).

const TYPING_MS = 80
const DELETING_MS = 45
const PAUSE_MS = 2000

function initTypewriter() {
  const texto = document.querySelector('.typewriter__text')
  if (!texto) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const palabras = [...document.querySelectorAll('.typewriter__sizer')].map(
    (el) => el.textContent,
  )
  const nodo = texto.firstChild // texto actual; el cursor es el <span> hermano
  let indice = 0
  let borrando = false

  function tick() {
    const palabra = palabras[indice]
    const actual = nodo.nodeValue
    let delay = TYPING_MS
    if (!borrando) {
      if (actual === palabra) {
        borrando = true
        delay = PAUSE_MS
      } else {
        nodo.nodeValue = palabra.slice(0, actual.length + 1)
      }
    } else if (actual) {
      nodo.nodeValue = actual.slice(0, -1)
      delay = DELETING_MS
    } else {
      borrando = false
      indice = (indice + 1) % palabras.length
    }
    setTimeout(tick, delay)
  }

  tick()
}

// El nav es fixed y transparente sobre el hero; se vuelve sólido apenas
// se hace scroll para no perder contraste sobre el resto de las secciones.
function initNavScroll() {
  const nav = document.querySelector('.nav')
  if (!nav) return

  let ticking = false
  function actualizar() {
    nav.classList.toggle('nav--solid', window.scrollY > 40)
    ticking = false
  }

  actualizar()
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(actualizar)
    },
    { passive: true },
  )
}

// Panel off-canvas del nav en móvil (≤ 640px). En escritorio el botón
// permanece oculto por CSS y este código nunca se ejecuta.
function initNavToggle() {
  const boton = document.querySelector('.nav__toggle')
  const panel = document.querySelector('.nav__links')
  if (!boton || !panel) return

  const esMobile = window.matchMedia('(max-width: 640px)')

  // Fuera de este breakpoint el panel vive en el flujo normal del nav
  // y siempre debe ser interactivo: inert solo aplica al panel off-canvas.
  function actualizarInert() {
    panel.inert = esMobile.matches && !panel.classList.contains('is-open')
  }

  function cerrar() {
    boton.setAttribute('aria-expanded', 'false')
    panel.classList.remove('is-open')
    actualizarInert()
  }

  function alternar() {
    const abierto = panel.classList.toggle('is-open')
    boton.setAttribute('aria-expanded', String(abierto))
    actualizarInert()
  }

  esMobile.addEventListener('change', actualizarInert)
  actualizarInert()

  boton.addEventListener('click', alternar)
  panel.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) cerrar()
  })
  document.addEventListener('click', (evento) => {
    if (
      panel.classList.contains('is-open') &&
      !panel.contains(evento.target) &&
      !boton.contains(evento.target)
    ) {
      cerrar()
    }
  })
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') cerrar()
  })
}

// El autoplay del video de fondo también es movimiento: se detiene en el
// primer frame (el poster) si el usuario prefiere movimiento reducido.
function initHeroVideo() {
  const video = document.querySelector('.hero__video')
  if (!video) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay')
    video.pause()
  }
}

// Agrega .is-visible cuando el elemento entra al viewport. La animación
// vive en CSS (.reveal) y respeta prefers-reduced-motion.
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

function initTabs() {
  const tablist = document.querySelector('.about__tablist')
  if (!tablist) return

  const tabs = [...tablist.querySelectorAll('[role="tab"]')]
  const paneles = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('aria-controls')),
  )
  const indicador = tablist.querySelector('.about__tab-indicador')
  const track = document.querySelector('.about__track')
  let activo = 0

  function medirIndicador() {
    const tab = tabs[activo]
    indicador.style.transform = `translateX(${tab.offsetLeft}px)`
    indicador.style.width = `${tab.offsetWidth}px`
  }

  function seleccionar(indice, enfocar = false) {
    activo = indice
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === indice))
      tab.tabIndex = i === indice ? 0 : -1
      tab.classList.toggle('is-activa', i === indice)
    })
    paneles.forEach((panel, i) => {
      panel.tabIndex = i === indice ? 0 : -1
      panel.inert = i !== indice
    })
    track.style.transform = `translateX(-${indice * 100}%)`
    medirIndicador()
    if (enfocar) tabs[indice].focus()
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => seleccionar(i))
  })
  tablist.addEventListener('keydown', (evento) => {
    const total = tabs.length
    if (evento.key === 'ArrowRight') seleccionar((activo + 1) % total, true)
    else if (evento.key === 'ArrowLeft')
      seleccionar((activo - 1 + total) % total, true)
    else if (evento.key === 'Home') seleccionar(0, true)
    else if (evento.key === 'End') seleccionar(total - 1, true)
    else return
    evento.preventDefault()
  })

  // Doble rAF: la primera medición espera al primer paint para no forzar
  // un layout de toda la página en el critical path.
  requestAnimationFrame(() => requestAnimationFrame(medirIndicador))
  window.addEventListener('resize', medirIndicador)
  // El ancho de las tabs depende de la fuente: re-medir cuando cargue.
  document.fonts.ready.then(medirIndicador)
}

const CONTACT_EMAIL = 'dpenaylilloluhrs@gmail.com'

const VALIDADORES = {
  name: (v) =>
    v.trim().length >= 2 || 'Escribe tu nombre (mínimo 2 caracteres).',
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
    'Ingresa un correo válido, por ejemplo nombre@empresa.com.',
  message: (v) =>
    v.trim().length >= 10 || 'Cuéntanos un poco más (mínimo 10 caracteres).',
}

function setError(input, mensaje) {
  const id = `${input.id}-error`
  const existente = document.getElementById(id)
  if (!mensaje) {
    input.setAttribute('aria-invalid', 'false')
    input.removeAttribute('aria-describedby')
    existente?.remove()
    return
  }
  let error = existente
  if (!error) {
    error = document.createElement('p')
    error.id = id
    error.className = 'field-error'
    error.setAttribute('role', 'alert')
    input.after(error)
  }
  error.textContent = mensaje
  input.setAttribute('aria-invalid', 'true')
  input.setAttribute('aria-describedby', id)
}

// Sitio estático sin backend: el envío abre el cliente de correo
// con el mensaje ya redactado.
function initContacto() {
  const form = document.querySelector('.contact__form')
  if (!form) return
  const status = form.querySelector('.contact__status')

  form.addEventListener('input', (evento) => setError(evento.target, ''))

  form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    status.textContent = ''

    let valido = true
    for (const [nombre, validar] of Object.entries(VALIDADORES)) {
      const resultado = validar(form.elements[nombre].value)
      setError(form.elements[nombre], resultado === true ? '' : resultado)
      if (resultado !== true) valido = false
    }
    if (!valido) return

    const { name, email, message } = form.elements
    const subject = encodeURIComponent(`Contacto desde la web — ${name.value}`)
    const body = encodeURIComponent(
      `${message.value}\n\n— ${name.value} (${email.value})`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    status.textContent =
      'Se abrió tu cliente de correo con el mensaje listo para enviar.'
  })
}

// Web Analytics de Vercel con el snippet oficial: sin el paquete
// @vercel/analytics ni su chunk extra de React.
function initAnalytics() {
  window.va =
    window.va ||
    function () {
      ;(window.vaq = window.vaq || []).push(arguments)
    }
  const script = document.createElement('script')
  script.defer = true
  script.src = '/_vercel/insights/script.js'
  document.head.appendChild(script)
}

export default function init() {
  initTypewriter()
  initNavScroll()
  initNavToggle()
  initHeroVideo()
  initReveal()
  initTabs()
  initContacto()
  if (import.meta.env.PROD) initAnalytics()
}
