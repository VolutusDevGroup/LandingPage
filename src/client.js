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

// El video del footer no trae autoplay ni preload: recién se pide y se
// reproduce cuando está por entrar en pantalla (mismo archivo que el
// hero, así que el navegador lo sirve de caché en vez de descargarlo de
// nuevo).
function initFooterVideo() {
  const video = document.querySelector('.footer__wordmark-video')
  if (!video) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          video.play()
          observer.unobserve(video)
        }
      }
    },
    { threshold: 0.1 },
  )
  observer.observe(video)
}

// La rueda del mouse desplaza el carrousel en horizontal (igual que el
// sitio de referencia) y también se puede arrastrar con el mouse.
function initDevCarousel() {
  const carrusel = document.querySelector('.vc-track')
  if (!carrusel) return

  document.querySelector('.dev-services__prev')?.addEventListener('click', () => {
    carrusel.scrollBy({ left: -360, behavior: 'smooth' })
  })
  document.querySelector('.dev-services__next')?.addEventListener('click', () => {
    carrusel.scrollBy({ left: 360, behavior: 'smooth' })
  })

  // Rueda vertical -> scroll horizontal, con inercia (lerp hacia un
  // objetivo) en vez de saltos instantáneos por cada tick: así se siente
  // deslizante y no rígido. Se libera en los extremos para no atrapar el
  // scroll normal de la página. scroll-snap-type se desactiva mientras
  // dura la animación: si no, el navegador "snapea" cada paso chico de
  // vuelta al inicio antes de que se note.
  const SUAVIZADO = 0.2 // 0-1: más alto = alcanza el objetivo más rápido
  let objetivo = carrusel.scrollLeft
  let animando = false

  function paso() {
    if (!animando) return // cancelado desde afuera (p.ej. el usuario agarró el carrousel)
    const diferencia = objetivo - carrusel.scrollLeft
    if (Math.abs(diferencia) < 0.5) {
      carrusel.scrollLeft = objetivo
      animando = false
      carrusel.classList.remove('is-wheeling')
      return
    }
    carrusel.scrollLeft += diferencia * SUAVIZADO
    requestAnimationFrame(paso)
  }

  function iniciarInercia(destino) {
    const maxScroll = carrusel.scrollWidth - carrusel.clientWidth
    objetivo = Math.min(Math.max(destino, 0), maxScroll)
    if (!animando) {
      animando = true
      carrusel.classList.add('is-wheeling')
      requestAnimationFrame(paso)
    }
  }

  carrusel.addEventListener(
    'wheel',
    (evento) => {
      if (Math.abs(evento.deltaY) <= Math.abs(evento.deltaX)) return

      // Si no hay inercia en curso, el objetivo parte de la posición real
      // (por si el usuario arrastró o hizo scroll por otro medio antes).
      if (!animando) objetivo = carrusel.scrollLeft

      const maxScroll = carrusel.scrollWidth - carrusel.clientWidth
      const enInicio = objetivo <= 0
      const enFinal = objetivo >= maxScroll
      if ((evento.deltaY < 0 && enInicio) || (evento.deltaY > 0 && enFinal)) return

      evento.preventDefault()
      iniciarInercia(objetivo + evento.deltaY)
    },
    { passive: false },
  )

  // Arrastrar con el mouse (clic y mover). El touch ya se desplaza nativo
  // gracias a overflow-x + scroll-snap, así que esto solo aplica al mouse.
  // La posición se aplica en requestAnimationFrame (no en cada pointermove)
  // para que el trazo no dependa de la frecuencia del sensor del mouse, y
  // al soltar se proyecta un envión con la velocidad reciente, frenado por
  // el mismo loop de inercia de la rueda — así no se detiene en seco.
  let arrastrando = false
  let inicioX = 0
  let inicioScroll = 0
  let punteroX = 0
  let ultimoX = 0
  let ultimoTiempo = 0
  let velocidadX = 0 // px/ms

  function seguirPuntero() {
    if (!arrastrando) return
    carrusel.scrollLeft = inicioScroll - (punteroX - inicioX)
    requestAnimationFrame(seguirPuntero)
  }

  carrusel.addEventListener('pointerdown', (evento) => {
    if (evento.pointerType !== 'mouse') return
    arrastrando = true
    animando = false // corta cualquier inercia de la rueda en curso
    carrusel.classList.remove('is-wheeling')
    inicioX = evento.clientX
    inicioScroll = carrusel.scrollLeft
    punteroX = evento.clientX
    ultimoX = evento.clientX
    ultimoTiempo = evento.timeStamp
    velocidadX = 0
    carrusel.classList.add('is-dragging')
    carrusel.setPointerCapture(evento.pointerId)
    requestAnimationFrame(seguirPuntero)
  })

  carrusel.addEventListener('pointermove', (evento) => {
    if (!arrastrando) return
    punteroX = evento.clientX
    const dt = evento.timeStamp - ultimoTiempo
    if (dt > 0) {
      velocidadX = (evento.clientX - ultimoX) / dt
      ultimoX = evento.clientX
      ultimoTiempo = evento.timeStamp
    }
  })

  function soltar() {
    if (!arrastrando) return
    arrastrando = false
    carrusel.classList.remove('is-dragging')
    // Proyecta la velocidad al soltar como un envión chico; el mismo
    // suavizado de la rueda se encarga de frenarlo.
    iniciarInercia(carrusel.scrollLeft - velocidadX * 180)
  }
  carrusel.addEventListener('pointerup', soltar)
  carrusel.addEventListener('pointercancel', soltar)
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
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function mostrarError(input, mensaje) {
  input.classList.toggle('is-invalid', Boolean(mensaje))
  const error = document.getElementById(`contact-hero-${input.name}-error`)
  if (!error) return
  error.textContent = mensaje
  error.hidden = !mensaje
}

function mostrarErrorGrupo(grupo, mensaje) {
  const error = document.getElementById(grupo.getAttribute('aria-describedby'))
  if (!error) return
  error.textContent = mensaje
  error.hidden = !mensaje
}

// Botones "pill": aria-pressed es el único estado (CSS lo pinta, ver
// .ch-pill[aria-pressed] en ContactHero.css). En modo single, elegir uno
// limpia al resto del grupo; en multi, cada botón se alterna solo.
function initPillGroup(grupo) {
  const modo = grupo.dataset.pillMode
  const botones = [...grupo.querySelectorAll('.ch-pill')]
  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      if (modo === 'single') {
        botones.forEach((b) => b.setAttribute('aria-pressed', String(b === boton)))
      } else {
        boton.setAttribute(
          'aria-pressed',
          String(boton.getAttribute('aria-pressed') !== 'true'),
        )
      }
      mostrarErrorGrupo(grupo, '')
    })
  })
}

function seleccionGrupo(grupo) {
  return [...grupo.querySelectorAll('[aria-pressed="true"]')].map((boton) => ({
    value: boton.dataset.value,
    label: boton.textContent.trim(),
  }))
}

// Sitio estático sin backend: el envío abre el cliente de correo con el
// mensaje ya redactado y, si el usuario vuelve, muestra la confirmación
// del diseño ("Mensaje recibido") en vez de dejar el formulario vacío.
function initContactoForm(form) {
  const status = form.querySelector('.contact-hero__status')
  const success = form.parentElement.querySelector('.contact-hero__success')
  const { name: nombre, email, message: mensaje, budget: presupuesto } = form.elements
  const quienGrupo = form.querySelector('[data-pill-group="quien"]')
  const necesidadesGrupo = form.querySelector('[data-pill-group="necesidades"]')
  const estadoGrupo = form.querySelector('[data-pill-group="estado"]')

  form.querySelectorAll('[data-pill-group]').forEach(initPillGroup)

  const contador = form.querySelector('[data-role="counter"]')
  if (contador) {
    const max = mensaje.maxLength || 500
    const actualizarContador = () => {
      contador.textContent = `${max - mensaje.value.length} caracteres restantes`
    }
    mensaje.addEventListener('input', actualizarContador)
    actualizarContador()
  }

  nombre.addEventListener('blur', () => {
    mostrarError(nombre, nombre.value.trim() ? '' : 'Ingresa tu nombre.')
  })
  email.addEventListener('blur', () => {
    mostrarError(email, EMAIL_RE.test(email.value.trim()) ? '' : 'Ingresa un email válido.')
  })

  form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    status.textContent = ''

    const nombreError = nombre.value.trim() ? '' : 'Ingresa tu nombre.'
    const emailError = EMAIL_RE.test(email.value.trim()) ? '' : 'Ingresa un email válido.'
    const quienSeleccion = seleccionGrupo(quienGrupo)
    const quienError = quienSeleccion.length ? '' : 'Selecciona una opción.'

    mostrarError(nombre, nombreError)
    mostrarError(email, emailError)
    mostrarErrorGrupo(quienGrupo, quienError)
    if (nombreError || emailError || quienError) return

    const necesidadesSeleccion = seleccionGrupo(necesidadesGrupo)
    const estadoSeleccion = seleccionGrupo(estadoGrupo)

    const detalles = [
      `¿Con quién hablamos?: ${quienSeleccion[0].label}`,
      necesidadesSeleccion.length &&
        `¿Qué necesita?: ${necesidadesSeleccion.map((n) => n.label).join(', ')}`,
      estadoSeleccion.length && `Estado del proyecto: ${estadoSeleccion[0].label}`,
      presupuesto.value && `Presupuesto: ${presupuesto.selectedOptions[0].textContent}`,
    ]
      .filter(Boolean)
      .join('\n')

    const subject = encodeURIComponent(`Contacto desde la web — ${nombre.value}`)
    const body = encodeURIComponent(
      `${mensaje.value}\n\n${detalles}\n\n— ${nombre.value} (${email.value})`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    form.hidden = true
    if (success) success.hidden = false
  })
}

// Sección "Hablemos de tu proyecto": video de fondo según breakpoint (se
// carga recién al entrar en viewport, igual que el video del footer) y
// panel de contacto que se desliza desde abajo. El panel nace inert y solo
// se activa al abrirlo, para que quede fuera del tab order mientras está
// oculto.
function initContactHero() {
  const video = document.querySelector('.contact-hero__video')
  const boton = document.querySelector('.contact-hero__cta')
  const overlay = document.querySelector('.contact-hero__overlay')
  const cerrar = document.querySelector('.contact-hero__close')
  const form = document.querySelector('.contact-hero__form')
  if (!video || !boton || !overlay || !cerrar || !form) return

  const fuente = video.querySelector('source')
  const esMobile = window.matchMedia('(max-width: 767px)')
  const esTablet = window.matchMedia(
    '(min-width: 768px) and (max-width: 1199px)',
  )

  function elegirFuente() {
    if (esMobile.matches) return video.dataset.srcMobile
    if (esTablet.matches) return video.dataset.srcTablet
    return video.dataset.srcDesktop
  }

  function actualizarFuente() {
    const src = elegirFuente()
    if (fuente.getAttribute('src') === src) return
    const reproduciendo = !video.paused
    fuente.src = src
    video.load()
    if (reproduciendo) video.play()
  }

  actualizarFuente()
  esMobile.addEventListener('change', actualizarFuente)
  esTablet.addEventListener('change', actualizarFuente)

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play()
            observer.unobserve(video)
          }
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(video)
  }

  overlay.inert = true

  function alEscape(evento) {
    if (evento.key === 'Escape') cerrarPanel()
  }

  function abrirPanel() {
    overlay.classList.add('is-open')
    overlay.inert = false
    boton.setAttribute('aria-expanded', 'true')
    cerrar.focus()
    document.addEventListener('keydown', alEscape)
  }

  function cerrarPanel() {
    overlay.classList.remove('is-open')
    overlay.inert = true
    boton.setAttribute('aria-expanded', 'false')
    boton.focus()
    document.removeEventListener('keydown', alEscape)
  }

  boton.addEventListener('click', abrirPanel)
  cerrar.addEventListener('click', cerrarPanel)
  overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) cerrarPanel()
  })

  initContactoForm(form)
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
  initFooterVideo()
  initDevCarousel()
  initReveal()
  initTabs()
  initContactHero()
  if (import.meta.env.PROD) initAnalytics()
}
