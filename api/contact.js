// Vercel Serverless Function: recibe el POST del formulario de contacto y
// envía el mail vía Resend. Sin dependencias: usa fetch nativo.

const RESEND_API_URL = 'https://api.resend.com/emails'
const CONTACT_EMAIL = 'dpenaylilloluhrs@gmail.com'

const VALIDADORES = {
  name: (v) =>
    typeof v === 'string' && v.trim().length >= 2 && v.trim().length <= 100,
  email: (v) =>
    typeof v === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) &&
    v.trim().length <= 200,
  message: (v) =>
    typeof v === 'string' && v.trim().length >= 10 && v.trim().length <= 5000,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  const { name, email, message, website } = req.body ?? {}

  // Honeypot: los bots suelen rellenar todos los campos, incluido este
  // oculto para personas. Si viene con contenido, se ignora en silencio.
  if (website) return res.status(200).json({ ok: true })

  const valido =
    VALIDADORES.name(name) &&
    VALIDADORES.email(email) &&
    VALIDADORES.message(message)
  if (!valido) return res.status(400).json({ error: 'Datos inválidos.' })

  if (!process.env.RESEND_API_KEY) {
    console.error('Falta la variable de entorno RESEND_API_KEY')
    return res.status(500).json({ error: 'Error del servidor.' })
  }

  const respuesta = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Volutus <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      reply_to: email.trim(),
      subject: `Contacto desde la web — ${name.trim()}`,
      text: `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`,
    }),
  })

  if (!respuesta.ok) {
    console.error('Resend respondió con error', await respuesta.text())
    return res.status(502).json({ error: 'No se pudo enviar el mensaje.' })
  }

  return res.status(200).json({ ok: true })
}
