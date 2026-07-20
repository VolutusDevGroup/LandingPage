import { DESARROLLO } from '../data/desarrollo.js'

// Estructura tal cual salió del diseño (Claude Design): header con eyebrow
// "Proyectos Destacados" + título "Servicios reales, en producción" + flechas, track horizontal con 3
// variantes de tarjeta (principal / ejemplo / video) e indicadores debajo.
// Los estilos van inline porque así se definieron en el diseño original.
// El contenido multimedia (imagePlaceholder) se genera después.

function Puntos({ items, variante }) {
  if (variante === 'ejemplo') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {items.map((punto) => (
          <div key={punto} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 13, lineHeight: 1.5, flex: 'none' }}>✓</span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'color-mix(in oklab, #ffffff 90%, transparent)' }}>
              {punto}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
        borderTop: '1px solid color-mix(in oklab, #17242f 15%, transparent)',
      }}
    >
      {items.map((punto) => (
        <div
          key={punto}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '12px 0',
            borderBottom: '1px solid color-mix(in oklab, #17242f 15%, transparent)',
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              background: '#17242f',
              color: '#ffffff',
              fontSize: 11,
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✓
          </span>
          <span style={{ fontSize: 14, lineHeight: 1.4, color: '#17242f' }}>{punto}</span>
        </div>
      ))}
    </div>
  )
}

function ImagenPlaceholder({ texto }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#3d4a54',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        textAlign: 'center',
        color: 'color-mix(in oklab, #ffffff 55%, transparent)',
        fontSize: 12,
        lineHeight: 1.4,
      }}
    >
      {texto}
    </div>
  )
}

function CardPrincipal({ numero, titulo, subtitulo, puntos }) {
  return (
    <div
      role="listitem"
      style={{
        flex: 'none',
        width: 340,
        height: 480,
        scrollSnapAlign: 'start',
        border: '1px solid color-mix(in oklab, #17242f 40%, transparent)',
        background: '#e9f0f6',
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 24px 24px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 24,
          top: 20,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 64,
          fontWeight: 700,
          color: 'color-mix(in oklab, #17242f 12%, transparent)',
          lineHeight: 1,
        }}
      >
        {numero}
      </div>
      <h3
        style={{
          fontWeight: 800,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#17242f',
          margin: '40px 0 10px',
          maxWidth: 200,
        }}
      >
        {titulo}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: '#3d4a54', margin: '0 0 20px' }}>{subtitulo}</p>
      <Puntos items={puntos} variante="principal" />
    </div>
  )
}

function CardEjemplo({ mono, etiqueta, titulo, subtitulo, puntos, tags, imagePlaceholder }) {
  return (
    <div
      role="listitem"
      style={{
        flex: 'none',
        width: 340,
        height: 480,
        scrollSnapAlign: 'start',
        border: '1px solid color-mix(in oklab, #17242f 40%, transparent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ImagenPlaceholder texto={imagePlaceholder} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(23,36,47,0.88) 0%, rgba(23,36,47,0.5) 32%, rgba(23,36,47,0) 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          width: 40,
          height: 40,
          background: 'color-mix(in oklab, #1a5f9e 30%, #17242f)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {mono}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, zIndex: 2 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'color-mix(in oklab, #ffffff 70%, transparent)',
            marginBottom: 8,
            pointerEvents: 'none',
          }}
        >
          {etiqueta}
        </div>
        <h3
          style={{
            fontWeight: 800,
            fontSize: 21,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 8px',
            pointerEvents: 'none',
          }}
        >
          {titulo}
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: 'color-mix(in oklab, #ffffff 82%, transparent)',
            margin: '0 0 14px',
            pointerEvents: 'none',
          }}
        >
          {subtitulo}
        </p>
        <div style={{ pointerEvents: 'none' }}>
          <Puntos items={puntos} variante="ejemplo" />
        </div>
        {tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: '#ffffff',
                  border: '1px solid color-mix(in oklab, #ffffff 40%, transparent)',
                  padding: '5px 9px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CardVideo({ titulo, imagePlaceholder }) {
  return (
    <div
      role="listitem"
      style={{
        flex: 'none',
        width: 620,
        height: 480,
        scrollSnapAlign: 'start',
        border: '1px solid color-mix(in oklab, #17242f 40%, transparent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ImagenPlaceholder texto={imagePlaceholder} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(23,36,47,0.75) 0%, rgba(23,36,47,0.25) 40%, rgba(23,36,47,0.1) 100%)',
          pointerEvents: 'none',
        }}
      />
      <button
        type="button"
        aria-label="Reproducir video"
        style={{
          position: 'absolute',
          right: 32,
          bottom: 32,
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'color-mix(in oklab, #ffffff 92%, transparent)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#17242f">
          <polygon points="6,4 20,12 6,20" />
        </svg>
      </button>
      <div style={{ position: 'absolute', left: 24, bottom: 24, zIndex: 2, pointerEvents: 'none' }}>
        <h3 style={{ fontWeight: 800, fontSize: 21, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
          {titulo}
        </h3>
      </div>
    </div>
  )
}

function Card(item) {
  if (item.tipo === 'principal') return <CardPrincipal {...item} />
  if (item.tipo === 'ejemplo') return <CardEjemplo {...item} />
  return <CardVideo {...item} />
}

export default function ServicesCarousel() {
  return (
    <section id="desarrollo" aria-label="Desarrollo de software">
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '64px 24px 56px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 40,
            borderBottom: '1px solid color-mix(in oklab, #17242f 40%, transparent)',
            paddingBottom: 24,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '0 0 16px' }}>
              <span style={{ width: 24, height: 2, background: '#1a5f9e', display: 'inline-block' }} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1a5f9e',
                }}
              >
                Proyectos Destacados
              </span>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#17242f', margin: 0 }}>
              Servicios reales, en producción
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 2, flex: 'none' }}>
            <button
              type="button"
              className="dev-services__prev"
              aria-label="Anterior"
              style={{
                width: 44,
                height: 44,
                border: '1px solid color-mix(in oklab, #17242f 40%, transparent)',
                background: '#ffffff',
                color: '#17242f',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ←
            </button>
            <button
              type="button"
              className="dev-services__next"
              aria-label="Siguiente"
              style={{
                width: 44,
                height: 44,
                border: '1px solid color-mix(in oklab, #17242f 40%, transparent)',
                background: '#17242f',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              →
            </button>
          </div>
        </div>

        <div
          className="vc-track"
          role="list"
          aria-label="Capacidades de desarrollo de software"
          tabIndex={0}
          style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12 }}
        >
          {DESARROLLO.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
          {DESARROLLO.map((item, i) => (
            <span
              key={i}
              style={{
                width: 24,
                height: 2,
                background: item.tipo === 'ejemplo' ? '#1a5f9e' : 'color-mix(in oklab, #17242f 30%, transparent)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
