# MOG México — Sitio web (mogmx.com)

Sitio multipágina de **MOG México**: embotelladora y maquiladora especializada en
**agua mineral, embotellado y marca privada (private label)** en **Tehuacán, Puebla**.

Estética: agua premium (pureza, limpieza, lujo sereno) con credibilidad industrial B2B.

---

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (tokens centralizados)
- **Framer Motion** (reveals, micro-interacciones) + **GSAP ScrollTrigger** (línea de proceso) + **Lenis** (smooth scroll)
- **React Router** (ruteo real multipágina)
- **react-helmet-async** (SEO por página)
- Fuentes self-hosted: **Space Grotesk** (titulares) + **Inter** (cuerpo)

## Requisitos

- Node.js 18+ (recomendado 20+)

## Scripts

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # type-check + build de producción (genera /dist)
npm run preview  # sirve el build de producción localmente
npm run typecheck
```

---

## Estructura

```
public/                 favicon, robots.txt, sitemap.xml, _redirects (Netlify)
src/
  lib/
    site.ts             ← CONTENIDO CENTRAL: navegación, servicios, proceso,
                          capacidades, recursos, contacto. Edita aquí casi todo.
    seo.tsx             componente SEO por página
  components/
    layout/             Header, Footer, Layout, SmoothScroll, ScrollToTop, Logo
    hero/               Hero + fondo de agua animado
    sections/           bloques reutilizables (servicios, proceso, capacidades, CTA…)
    process/            ProcessTimeline (línea que se llena al hacer scroll)
    resources/          galería de video con lightbox + tarjetas de descarga
    contact/            QuoteForm (formulario de cotización con validación)
    ui/                 Button, Eyebrow, SectionHeading, MediaPlaceholder,
                        WaveDivider, CountUp, ServiceCard, Icon
  pages/                una carpeta por página (Home, Services, Process,
                        Capabilities, Resources, About, Contact, NotFound)
  index.css             tokens (CSS vars) + base + accesibilidad + reduced-motion
tailwind.config.js      tokens de color / tipografía / sombras / animaciones
```

---

## Tokens de color (centralizados)

Definidos en `tailwind.config.js` y replicados como variables CSS en `src/index.css`.

| Token | Hex | Uso |
|------|------|-----|
| `navy` | `#0E2A47` | texto principal y secciones oscuras |
| `blue` | `#1E7FB8` | acento agua (íconos, rellenos) |
| `blue-deep` | `#176FA3` | texto pequeño/enlaces (contraste AA) |
| `aqua` | `#2BA6D9` | acento agua claro |
| `mist` | `#CFE8F2` | fondos suaves |
| `foam` | `#F2F9FC` | fondos muy suaves |
| `slate` | `#5B6B78` | texto secundario |
| `amber` | `#C9892F` | **acento cálido, SOLO para botones/CTA** |

> El ámbar se usa exclusivamente en los CTA. El azul/aqua se usan con mesura.

---

## Qué editar antes de publicar

El sitio se entrega con **placeholders visibles y editables**. Busca los comentarios
`// EDITABLE` y `// REEMPLAZAR` y reemplaza con datos reales **verificados**.

1. **Datos de contacto** — `src/lib/site.ts` → `site.contact`
   - WhatsApp (`whatsapp`, formato internacional sin signos), `email`, `phone`.
2. **Cifras de la empresa** — están como placeholders en corchetes (`[N]`, `[capacidad]`,
   `[certificación]`). **No se afirma ningún número** hasta que lo reemplaces con datos reales.
   - Ver `capabilityStats`, `formats`, y la sección "Cifras ilustrativas" (Capacidades).
3. **Imágenes** — los slots `MediaPlaceholder` indican qué foto va en cada lugar.
   Pasa la prop `src` con la ruta real de la foto (botella, planta, línea de producción).
4. **Videos** — `src/lib/site.ts` → `videos[].videoId` (ID de YouTube/Vimeo).
5. **Descargas** — `src/lib/site.ts` → `downloads[].href` (rutas a tus PDF en `/public`).
6. **Certificaciones / aviso de privacidad** — reemplaza los placeholders correspondientes.
7. **Formulario de cotización** — hoy simula el envío (sin backend). Conecta tu endpoint
   o servicio de email en `src/components/contact/QuoteForm.tsx` (`onSubmit`).
8. **SEO** — actualiza el dominio en `src/lib/site.ts` (`site.url`) y en
   `public/sitemap.xml` / `public/robots.txt` si cambia.

---

## Despliegue

El sitio es una SPA estática. El build queda en `/dist`.

### Vercel
- Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
- `vercel.json` ya incluye el *rewrite* a `index.html` (ruteo del lado del cliente).

### Netlify
- Build command: `npm run build`. Publish directory: `dist`.
- `public/_redirects` ya incluye el fallback de SPA (`/* /index.html 200`).

---

## Accesibilidad y rendimiento

- Mobile-first, responsive, contraste **WCAG AA**, navegación por teclado, *skip link*.
- Respeta `prefers-reduced-motion` (todas las animaciones se desactivan).
- HTML semántico, `alt` descriptivos, `<title>`/meta por página, favicon, sitemap.
- Code-splitting por ruta y por vendor (gsap / motion / router) para un arranque ligero.
- Imágenes con `loading="lazy"`; sin scroll-jacking.

---

© MOG México. Tehuacán, Puebla, México.
