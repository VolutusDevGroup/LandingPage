import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Contact.css'

const CONTACT_EMAIL = 'dpenaylilloluhrs@gmail.com'

const validate = ({ name, email, message }) => {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Escribe tu nombre (mínimo 2 caracteres).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'Ingresa un correo válido, por ejemplo nombre@empresa.com.'
  if (message.trim().length < 10)
    errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return errors
}

export default function Contact() {
  const ref = useReveal()
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
    if (Object.keys(found).length > 0) return

    const subject = encodeURIComponent(`Contacto desde la web — ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field = (name, label, type = 'text') => (
    <div className="contact__field">
      <label className="contact__label" htmlFor={`contact-${name}`}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={`contact-${name}`}
          className="contact__input contact__input--area"
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
          className="contact__input"
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
        <p id={`contact-${name}-error`} className="contact__error" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <section
      id="contacto"
      className="section section--overlap contact"
      aria-labelledby="contacto-titulo"
    >
      <div className="container reveal" ref={ref}>
        <div className="contact__panel card">
          <div className="contact__intro">
            <p className="section__kicker">Contacto</p>
            <h2 id="contacto-titulo" className="section__title">
              Hablemos de tu proyecto
            </h2>
            <p className="section__lead">
              Cuéntanos qué necesitas construir y te respondemos con una
              propuesta concreta: alcance, plazos y stack recomendado.
            </p>
            <p className="contact__direct">
              También puedes escribirnos directo a{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>

          <form className="contact__form" onSubmit={onSubmit} noValidate>
            {field('name', 'Nombre')}
            {field('email', 'Correo electrónico', 'email')}
            {field('message', '¿Qué necesitas construir?', 'textarea')}
            <button className="btn btn--primary contact__submit" type="submit">
              Enviar mensaje
            </button>
            <p className="contact__status" role="status">
              {sent
                ? 'Se abrió tu cliente de correo con el mensaje listo para enviar.'
                : ''}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
