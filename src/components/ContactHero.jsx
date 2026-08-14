// Presentacional: como el resto del sitio, el JSX solo define el markup
// para el prerender (React no se envía al cliente en producción). El video
// por breakpoint, el panel deslizante y la lógica del formulario corren en
// vanilla JS — ver src/client.js#initContactHero.
//
// El contenido del panel replica 1:1 (estilos inline incluidos) el diseño
// "Volutus Contacto.dc.html", igual que ServicesCarousel replica su propio
// comp — así se mantiene fidelidad exacta al diseño aprobado.

const QUIEN = [
  { value: 'persona', label: 'Persona / cliente independiente' },
  { value: 'empresa', label: 'Empresa u organización' },
]

const NECESIDADES = [
  { value: 'dev', label: 'Desarrollo de software a medida' },
  { value: 'ia', label: 'Integración de IA / automatización' },
  { value: 'app', label: 'Aplicación móvil' },
  { value: 'cloud', label: 'Infraestructura cloud' },
  { value: 'orientacion', label: 'No sé bien, necesito orientación' },
]

const ESTADOS = [
  { value: 'idea', label: 'Idea / desde cero' },
  { value: 'existente', label: 'Proyecto existente que necesita mejoras' },
  { value: 'consultoria', label: 'Solo quiero una consultoría' },
]

const PRESUPUESTOS = [
  ['', 'Selecciona un rango'],
  ['menos-1000', 'Menos de $1.000 USD'],
  ['1000-5000', '$1.000 a $5.000 USD'],
  ['5000-20000', '$5.000 a $20.000 USD'],
  ['mas-20000', 'Más de $20.000 USD'],
  ['sin-definir', 'Aún no lo tenemos definido'],
]

const cardStyle = {
  border: '1px solid color-mix(in oklab, #ffffff 18%, transparent)',
  background: '#0f1922',
  padding: '28px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 22,
}

const cardLabelStyle = { display: 'flex', alignItems: 'center', gap: 10 }

const cardNumStyle = {
  width: 22,
  height: 22,
  background: '#1a5f9e',
  color: '#ffffff',
  fontSize: 11,
  fontWeight: 800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
}

const cardLabelTextStyle = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#5f6e79',
}

const fieldWrapStyle = { display: 'flex', flexDirection: 'column', gap: 8 }
const fieldLabelStyle = { fontSize: 13, fontWeight: 700, color: '#e9f0f6' }
const errorTextStyle = { fontSize: 12, color: '#d97b7b' }

const pillGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 8,
}

const pillStackStyle = { display: 'flex', flexDirection: 'column', gap: 8 }

// Estados interactivos (foco, hover, seleccionado, inválido) viven en CSS
// (ver .ch-field / .ch-pill en ContactHero.css): un style inline no puede
// expresar :hover ni :focus, y pisaría cualquier clase que los maneje.
function campoTexto(name, label, type = 'text', placeholder = '', variante) {
  return (
    <label style={fieldWrapStyle}>
      <span style={fieldLabelStyle}>{label}</span>
      <input
        className={variante === 'loose' ? 'ch-field ch-field--loose' : 'ch-field'}
        type={type}
        name={name}
        placeholder={placeholder}
        aria-describedby={`contact-hero-${name}-error`}
      />
      <span
        id={`contact-hero-${name}-error`}
        style={errorTextStyle}
        data-role="error"
        hidden
      ></span>
    </label>
  )
}

function grupoPills(name, label, opciones, modo, variante) {
  return (
    <div style={fieldWrapStyle}>
      <span style={fieldLabelStyle}>{label}</span>
      <div
        role="group"
        aria-label={label}
        data-pill-group={name}
        data-pill-mode={modo}
        style={variante === 'dot' ? pillStackStyle : pillGridStyle}
        aria-describedby={`contact-hero-${name}-error`}
      >
        {opciones.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={variante ? `ch-pill ch-pill--${variante}` : 'ch-pill'}
            data-value={opt.value}
            aria-pressed="false"
          >
            {variante === 'check' && <span className="ch-pill-check" aria-hidden="true"></span>}
            {variante === 'dot' && <span className="ch-pill-dot" aria-hidden="true"></span>}
            {opt.label}
          </button>
        ))}
      </div>
      <span
        id={`contact-hero-${name}-error`}
        style={errorTextStyle}
        data-role="error"
        hidden
      ></span>
    </div>
  )
}

export default function ContactHero() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-hero-titulo"
      className="contact-hero section-divider"
    >
      <video
        className="contact-hero__video"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        data-src-mobile="/videos/iphone_view.webm"
        data-src-tablet="/videos/tablet_view.webm"
        data-src-desktop="/videos/desktop_view.webm"
      >
        <source type="video/webm" />
      </video>

      <div className="contact-hero__intro">
        <h2 id="contact-hero-titulo" className="contact-hero__intro-title">
          Los mejores proyectos empezaron con una sola pregunta.
        </h2>
        <p className="contact-hero__intro-subtitle">¿Cuál es la tuya?</p>
        <button
          type="button"
          className="contact-hero__cta"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="contact-hero-panel"
        >
          Hablemos de tu proyecto
        </button>
      </div>

      <div
        className="contact-hero__overlay"
        id="contact-hero-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-hero-form-titulo"
      >
        <div className="contact-hero__panel">
          <button
            type="button"
            className="contact-hero__close"
            aria-label="Cerrar formulario"
          >
            ✕
          </button>

          <div className="contact-hero__panel-inner">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '0 0 18px' }}>
              <span style={{ width: 24, height: 2, background: '#1a5f9e', display: 'inline-block' }}></span>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a5f9e' }}>
                Contacto
              </span>
            </div>
            <h3
              id="contact-hero-form-titulo"
              style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 12px' }}
            >
              Hablemos de tu proyecto
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#5f6e79', margin: '0 0 44px', maxWidth: 420 }}>
              Cuéntanos qué necesitas. Un ingeniero revisa cada mensaje — no un formulario automático.
            </p>

            <form className="contact-hero__form" noValidate>
              <div style={cardStyle}>
                <div style={cardLabelStyle}>
                  <span style={cardNumStyle}>1</span>
                  <span style={cardLabelTextStyle}>Tus datos</span>
                </div>

                {campoTexto('name', 'Nombre', 'text', 'Tu nombre')}
                {campoTexto('email', 'Email', 'email', 'tu@correo.com')}
                {grupoPills('quien', '¿Con quién hablamos?', QUIEN, 'single')}
              </div>

              <div style={cardStyle}>
                <div style={cardLabelStyle}>
                  <span style={cardNumStyle}>2</span>
                  <span style={cardLabelTextStyle}>Sobre el proyecto</span>
                </div>

                {grupoPills('necesidades', '¿Qué necesitas?', NECESIDADES, 'multi', 'check')}
                {grupoPills('estado', 'Estado del proyecto', ESTADOS, 'single', 'dot')}

                <label style={fieldWrapStyle}>
                  <span style={fieldLabelStyle}>Presupuesto estimado</span>
                  <select
                    className="ch-field ch-field--loose ch-select"
                    name="budget"
                    defaultValue=""
                  >
                    {PRESUPUESTOS.map(([valor, texto]) => (
                      <option key={valor} value={valor} disabled={valor === ''}>
                        {texto}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: 12, lineHeight: 1.5, color: '#5f6e79' }}>
                    Inversión estimada para este proyecto — nos ayuda a preparar la respuesta correcta.
                  </span>
                </label>

                <label style={fieldWrapStyle}>
                  <span style={{ ...fieldLabelStyle, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Cuéntanos el problema</span>
                    <span style={{ color: '#5f6e79', fontWeight: 400 }} data-role="counter">
                      500 caracteres restantes
                    </span>
                  </span>
                  <textarea
                    className="ch-field ch-field--loose"
                    name="message"
                    maxLength={500}
                    rows={4}
                    placeholder="¿Qué quieres resolver y por qué importa ahora?"
                  ></textarea>
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button className="ch-cta" type="submit">
                  Iniciar conversación <span aria-hidden="true">→</span>
                </button>
                <span style={{ fontSize: 13, color: '#5f6e79', textAlign: 'center' }}>
                  Respondemos en menos de 24 horas hábiles.
                </span>
              </div>
              <p className="contact-hero__status" role="status"></p>
            </form>

            <div
              className="contact-hero__success"
              hidden
              style={{
                border: '1px solid color-mix(in oklab, #ffffff 24%, transparent)',
                background: '#0f1922',
                padding: '40px 28px',
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  background: '#1a5f9e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 800,
                }}
                aria-hidden="true"
              >
                ✓
              </span>
              <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', color: '#ffffff', margin: '8px 0 0' }}>
                Mensaje recibido
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#e9f0f6', margin: 0 }}>
                Vamos a revisar lo que nos contaste y te respondemos por email en menos de 24 horas hábiles con los
                próximos pasos concretos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
