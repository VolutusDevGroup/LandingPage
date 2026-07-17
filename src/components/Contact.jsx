// Presentacional: la validación y el envío por mailto corren en el
// cliente (src/client.js).
const CONTACT_EMAIL = 'dpenaylilloluhrs@gmail.com'

const field = (name, label, type = 'text') => (
  <div className="field contact__field">
    <label htmlFor={`contact-${name}`}>{label}</label>
    {type === 'textarea' ? (
      <textarea
        id={`contact-${name}`}
        className="input"
        name={name}
        rows="5"
        aria-invalid="false"
      />
    ) : (
      <input
        id={`contact-${name}`}
        className="input"
        type={type}
        name={name}
        autoComplete={name === 'email' ? 'email' : 'name'}
        aria-invalid="false"
      />
    )}
  </div>
)

export default function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="contact section-divider"
    >
      <div className="contact__grid">
        <div className="contact__panel">
          <div>
            <p className="contact__eyebrow">Contacto</p>
            <h2 id="contacto-titulo" className="contact__titulo">
              Hablemos de tu proyecto.
            </h2>
          </div>
          <div>
            <p className="contact__intro">
              Cuéntanos qué necesitas construir y respondemos con una
              propuesta concreta: alcance, plazos y stack recomendado.
            </p>
            <a className="contact__email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <form className="contact__form" noValidate>
          {field('name', 'Nombre')}
          {field('email', 'Correo electrónico', 'email')}
          {field('message', '¿Qué necesitas construir?', 'textarea')}
          <button className="btn btn-primary contact__submit" type="submit">
            Enviar mensaje
          </button>
          <p className="contact__status" role="status"></p>
        </form>
      </div>
    </section>
  )
}
