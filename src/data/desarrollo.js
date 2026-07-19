// Carrousel de "Desarrollo de software": alterna 1 tarjeta de servicio,
// 2 de proyectos reales (ver src/data/projects.js) y 1 de tecnología,
// repetido 3 veces (12 tarjetas en total).
export const DESARROLLO = [
  // — Ciclo 1 —
  {
    destacada: true,
    titulo: 'Desarrollo de software',
    subtitulo: 'Cubrimos todo el ciclo de tu producto.',
    puntos: [
      'Arquitectura Full-Stack',
      'Aplicaciones móviles nativas',
      'Infraestructura Cloud escalable',
      'Flujos de CI/CD automatizados',
      'Integración avanzada de IA y LLMs',
    ],
  },
  {
    mono: 'CF',
    etiqueta: 'Plataforma de datos',
    titulo: 'CarFlip',
    subtitulo: 'Agregador de avisos de autos en venta en Chile.',
    puntos: [
      'Scraping resiliente de múltiples fuentes',
      'Historial de precios por vehículo',
      'Detección automática de oportunidades',
    ],
    tags: ['Python', 'PostgreSQL', 'AWS', 'Astro'],
  },
  {
    mono: 'HD',
    etiqueta: 'Automatización con IA',
    titulo: 'Agente IA HelpDesk',
    subtitulo: 'Clasifica tickets de soporte por correo con IA.',
    puntos: [
      'Monitoreo continuo del buzón',
      'Clasificación por categoría y prioridad',
      'Informes ejecutivos con dashboard',
    ],
    tags: ['Python', 'Gemini API', 'Apps Script'],
  },
  {
    mono: 'CL',
    etiqueta: 'Tecnología',
    titulo: 'Cloud',
    subtitulo: 'Infraestructura que escala con el producto.',
    puntos: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Firebase'],
  },

  // — Ciclo 2 —
  {
    mono: 'BE',
    etiqueta: 'Servicio',
    titulo: 'Backend',
    subtitulo: 'APIs y lógica de negocio robustas.',
    puntos: [
      'Diseño de APIs REST y GraphQL',
      'Autenticación y autorización',
      'Integraciones con servicios externos',
    ],
  },
  {
    mono: 'LM',
    etiqueta: 'App móvil',
    titulo: 'LapMaster',
    subtitulo: 'Cronometraje de pista multi-piloto en Android.',
    puntos: [
      'Vueltas y sectores en tiempo real',
      'Clima en vivo y GPS',
      'Historial con gráficos',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
  },
  {
    mono: 'BB',
    etiqueta: 'Sitio editorial',
    titulo: 'beatrizberger.cl',
    subtitulo: 'Sitio literario minimalista con foco en performance.',
    puntos: [
      'Más de 30 textos publicados',
      'SEO completo',
      'Lighthouse móvil ≥ 95',
    ],
    tags: ['React', 'Vite', 'SEO', 'WCAG AA'],
  },
  {
    mono: 'IA',
    etiqueta: 'Tecnología',
    titulo: 'Inteligencia Artificial',
    subtitulo: 'Automatización con modelos de lenguaje.',
    puntos: ['Gemini API', 'Claude API', 'ChatGPT API', 'LLMs'],
  },

  // — Ciclo 3 —
  {
    mono: 'MB',
    etiqueta: 'Servicio',
    titulo: 'Aplicaciones móviles',
    subtitulo: 'Apps nativas para iOS y Android.',
    puntos: [
      'Interfaces con Material 3 / HIG',
      'Integración con APIs y push notifications',
      'Publicación en tiendas',
    ],
  },
  {
    mono: 'PP',
    etiqueta: 'Herramienta de datos',
    titulo: 'Prospector Places',
    subtitulo: 'Extracción masiva de negocios vía Google Places API.',
    puntos: [
      'Grilla adaptativa de resultados',
      'Rastreo de contactos',
      'Análisis bayesiano de reseñas',
    ],
    tags: ['Python', 'Places API', 'Google Sheets'],
  },
  {
    mono: 'RB',
    etiqueta: 'Plataforma SaaS',
    titulo: 'RepoBase BPL',
    subtitulo: 'Base reutilizable para sitios de clientes.',
    puntos: [
      'Reservas y pagos integrados',
      'Panel de administración',
      'Facturación y correo transaccional',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Mercado Pago'],
  },
  {
    mono: 'DO',
    etiqueta: 'Tecnología',
    titulo: 'DevOps',
    subtitulo: 'Entrega continua sin fricción.',
    puntos: ['Docker', 'Kubernetes', 'GitHub Actions'],
  },
]
