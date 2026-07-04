// Stack tecnológico agrupado: alimenta las caras del prisma 3D (Services)
// y la grilla de tarjetas (Stack). 7 grupos = 7 caras del prisma heptagonal.
// `icon` referencia una clave de ICONS en Services.jsx.
export const GROUPS = [
  {
    label: 'Frontend',
    icon: 'web',
    items: ['React', 'Next.js', 'TypeScript', 'Astro', 'Vite'],
  },
  {
    label: 'Mobile',
    icon: 'mobile',
    items: ['Kotlin', 'Jetpack Compose', 'Material 3'],
  },
  {
    label: 'Backend',
    icon: 'backend',
    items: ['Node.js', 'Python', 'Spring Boot'],
  },
  {
    label: 'Datos',
    icon: 'db',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'],
  },
  {
    label: 'Cloud',
    icon: 'cloud',
    items: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Firebase'],
  },
  {
    label: 'DevOps',
    icon: 'devops',
    items: ['Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    label: 'IA',
    icon: 'ia',
    items: ['Gemini API', 'Claude API', 'ChatGPT API', 'Automatización con LLMs'],
  },
]
