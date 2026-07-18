# Volutus — Landing Page

Landing page de Volutus, construida con React y Vite, con pre-renderizado estático para SEO y rendimiento.

[Diseño de referencia en Canva](https://www.canva.com/design/DAHPg0F3exU/gsNlD7AkpXAVVIyV5ObjTQ/edit?ui=eyJFIjp7Im0iOnRydWUsIkE_IjoibiJ9LCJLIjp7IkEiOiIyYTZiZDgyMy1mY2UyLTRlYTMtYTdmMi1kMTM0OTA2N2RhMDEifX0)

![1784330479927](image/README/1784330479927.png)


## Stack

- React 19 — solo en build: se usa como motor de plantillas para el prerender.
- Vite 7
- CSS puro (tokens y componentes en [DESIGN.md](DESIGN.md))
- JavaScript vanilla en el cliente ([src/client.js](src/client.js))

## Arquitectura

En producción **React no se envía al navegador**. El script de build:

1. `vite build` — genera el bundle cliente en `dist/`.
2. `vite build --ssr src/entry-server.jsx` — genera el bundle SSR en `.prerender/`.
3. `node scripts/prerender.mjs` — inyecta el HTML de `<App />` en
   `dist/index.html` e inlinea el CSS en un `<style>` (elimina la request
   bloqueante del critical path).

El único JS que llega al cliente es `src/client.js` (vanilla), que engancha
sobre el HTML prerenderizado: typewriter del hero, reveal on-scroll, tabs de
"Quiénes Somos", validación y envío del formulario (POST a `/api/contact`) y
Vercel Web Analytics vía snippet oficial (sin paquete npm).

El formulario de contacto lo procesa `api/contact.js`, una función
serverless de Vercel que reenvía el mensaje por mail vía
[Resend](https://resend.com) (requiere la variable de entorno
`RESEND_API_KEY` configurada en el proyecto de Vercel). Incluye un campo
honeypot oculto como filtro básico contra spam automatizado.

En desarrollo el root llega vacío y React monta la App en el navegador
(`src/dev.jsx`); Vite elimina ese bloque del bundle de producción.

## Comandos

```bash
pnpm install       # instalar dependencias
pnpm dev           # servidor de desarrollo
pnpm build         # build de producción + pre-render
pnpm preview       # previsualizar el build
```

## Estructura

```
index.html              # shell HTML: meta SEO, Open Graph, JSON-LD, preload de fuente
api/
  contact.js            # función serverless (Vercel): envía el formulario vía Resend
scripts/
  prerender.mjs         # inyecta el HTML prerenderizado e inlinea el CSS
src/
  App.jsx               # composición de la página
  main.js               # entrada del cliente (estilos + init)
  client.js             # comportamiento en el navegador (vanilla JS)
  entry-server.jsx      # entrada del prerender (renderToString)
  dev.jsx               # montaje de React solo en desarrollo
  components/           # secciones (Nav, Hero, About, Services, Projects, Contact, Footer) con su CSS
  data/                 # contenido estático (servicios, proyectos)
  styles/               # tokens y estilos base (index.css) + orden de la cascada (main.css)
public/
  fonts/                # Archivo variable autohospedada (woff2)
  image/                # imágenes optimizadas (webp con srcset)
  robots.txt, sitemap.xml, llms.txt
```

## SEO

- HTML completo prerenderizado (sin depender de JS para indexar).
- Meta description, canonical, Open Graph, Twitter Card y JSON-LD
  (`WebSite` + `Organization`) en `index.html`.
- `robots.txt`, `sitemap.xml` y `llms.txt` en `public/`.
- Imágenes con `srcset`, dimensiones explícitas y `loading="lazy"` fuera
  del viewport inicial; la imagen del hero con `fetchpriority="high"`.
