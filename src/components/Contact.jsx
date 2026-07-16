import { useState } from 'react'
import './Contact.css'

const CONTACT_EMAIL = 'dpenaylilloluhrs@gmail.com'

const validate = ({ name, email, message }) => {
  const errors = {}
  if (name.trim().length < 2)
    errors.name = 'Escribe tu nombre (mínimo 2 caracteres).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'Ingresa un correo válido, por ejemplo nombre@empresa.com.'
  if (message.trim().length < 10)
    errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  // Sitio estático sin backend: el envío abre el cliente de correo
  // con el mensaje ya redactado.
  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setSent(false)
    if (Object.keys(found).length > 0) return

    const subject = encodeURIComponent(`Contacto desde la web — ${values.name}`)
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field = (name, label, type = 'text') => (
    <div className="field contact__field">
      <label htmlFor={`contact-${name}`}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={`contact-${name}`}
          className="input"
          name={name}
          rows="5"
          value={values[name]}
          onChange={onChange}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        />
      ) : (
        <input
          id={`contact-${name}`}
          className="input"
          type={type}
          name={name}
          autoComplete={name === 'email' ? 'email' : 'name'}
          value={values[name]}
          onChange={onChange}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        />
      )}
      {errors[name] && (
        <p id={`contact-${name}-error`} className="field-error" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  )

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
        <form className="contact__form" onSubmit={onSubmit} noValidate>
          {field('name', 'Nombre')}
          {field('email', 'Correo electrónico', 'email')}
          {field('message', '¿Qué necesitas construir?', 'textarea')}
          <button className="btn btn-primary contact__submit" type="submit">
            Enviar mensaje
          </button>
          <p className="contact__status" role="status">
            {sent
              ? 'Se abrió tu cliente de correo con el mensaje listo para enviar.'
              : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
