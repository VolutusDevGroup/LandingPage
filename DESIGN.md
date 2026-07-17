# DESIGN.md

## Volutus Design System

### Filosofía

Volutus representa ingeniería de software de alto nivel.

Cada decisión de diseño debe transmitir precisión, simplicidad,
confianza, independencia, elegancia, dominio técnico. El diseño debe
sentirse inevitable. Si un elemento puede eliminarse sin afectar el
objetivo, debe eliminarse.

## Principios

1. La función domina la forma.
2. Menos componentes, más espacio y mejor tipografía.
3. El contenido es protagonista.
4. Movimiento con propósito.
5. Consistencia absoluta.

## Personalidad visual

Minimalista, elegante, industrial, tecnológico, artesanal y preciso.
Esquinas rectas en todos los componentes (sin `border-radius`): la
retícula y los divisores marcados (`.section-divider`, 2 px) refuerzan
el carácter industrial.

## Colores

Tema "cielo", definido como custom properties en
`src/styles/index.css`:

| Token                  | Valor                                | Uso                          |
| ---------------------- | ------------------------------------ | ---------------------------- |
| `--color-bg`           | `#ffffff`                            | Fondo principal              |
| `--color-surface`      | `#e9f0f6`                            | Superficies destacadas       |
| `--color-text`         | `#17242f`                            | Texto principal              |
| `--color-accent`       | `#1a5f9e`                            | Único color de acento        |
| `--color-divider`      | `color-mix(#17242f 40%, transparent)`| Divisores y bordes           |
| `--color-neutral-*`    | `100 / 600 / 700 / 800`              | Escala de grises azulados    |
| `--color-accent-*`     | `100 / 600 / 700 / 800`              | Estados hover/active del acento |

Los estados derivados (hover, selección, bordes suaves) se generan con
`color-mix()` sobre estos tokens; no se introducen colores fuera de la
paleta.

## Tipografía

**Archivo** (variable, pesos 100–900), autohospedada en
`public/fonts/archivo-latin.woff2` con `font-display: swap` y preload
en `index.html`. Es la única fuente del sitio, para títulos y cuerpo.

- Títulos: peso 800, `line-height: 1.12`, `letter-spacing: -0.02em`.
- Cuerpo: 15 px, `line-height: 1.6`.
- Fallback: `system-ui, -apple-system, 'Segoe UI', sans-serif`.

## Espaciado y layout

Escala basada en 4 px: `--space-1` (4) a `--space-8` (32).

- Contenedor: `--max-width: 1320px` con `padding-inline: 24px`.
- Easing único: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.

## Componentes base

Definidos en `src/styles/index.css` y reutilizados en toda la landing:

- `.btn` / `.btn-primary` / `.btn-secondary` — botones rectos; el
  primario usa el acento con estados 600/700.
- `.eyebrow` — etiqueta de sección en mayúsculas con barra de acento.
- `.tag` — chip neutro para tecnologías.
- `.input` / `.field` / `.field-error` — formularios con estados de
  error accesibles (`aria-invalid`, `role="alert"`).
- `.section-divider` — separador de secciones.
- `.reveal` — aparición al hacer scroll (opacidad + translateY),
  activada por IntersectionObserver.
- `.skip-link` y `.visually-hidden` — utilidades de accesibilidad.

## Movimiento

Discreto y con propósito, siempre sobre CSS con `--ease-out`:

- Typewriter en el hero (con sizers que reservan ancho: cero layout shift).
- Reveal al entrar al viewport.
- Deslizamiento del track e indicador en las tabs de "Quiénes Somos".

Todo el movimiento se desactiva con `prefers-reduced-motion: reduce`.

## Responsive

Diseño fluido (grids y `max-width`) con ajustes puntuales:

- `≤ 900px` — el hero pasa a una columna.
- `≤ 640px` — las tabs de About se compactan y las imágenes van a 100vw.

Debe verse impecable en XL, L, M y S, sin overflow ni layout shift.

## Accesibilidad

Contraste AA, navegación completa por teclado (tabs con patrón ARIA y
flechas/Home/End), skip link, HTML semántico, `focus-visible` con el
acento, y textos alternativos descriptivos en todas las imágenes.

## Performance

Objetivo: 100 / 100 / 100 / 100 en Lighthouse, LCP < 2 s y CLS = 0.
El diseño nunca justifica degradar estas métricas: nada de fuentes
extra, librerías de animación ni imágenes sin optimizar.

## Definición de éxito

Una interfaz Volutus transmite intención, disciplina y excelencia
técnica sin depender de efectos visuales.
