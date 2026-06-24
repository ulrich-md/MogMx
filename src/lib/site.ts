/**
 * MOG Mexico - Central site content & configuration.
 * Edit copy, navigation, services, and contact data here.
 *
 * IMPORTANT: Any company metric (years, liters, lines, %, clients,
 * certifications) is a VISIBLE placeholder in brackets, e.g. "[N]".
 * Replace each one with a verified figure and remove the // EDITABLE note.
 */

export const site = {
  name: "MOG México",
  short: "MOG",
  domain: "mogmx.com",
  url: "https://mogmx.com",
  // Honest, affirmable description (no metrics claimed).
  description:
    "Maquila, embotellado y marca privada de agua mineral y purificada en Tehuacán, Puebla. Producimos tu marca de agua de principio a fin.",
  location: {
    city: "Tehuacán",
    state: "Puebla",
    country: "México",
    label: "Tehuacán, Puebla, México",
  },
  contact: {
    // EDITABLE: número real de WhatsApp (formato internacional, sin signos)
    whatsapp: "522380000000",
    whatsappDisplay: "+52 238 000 0000",
    // EDITABLE: correo real de contacto
    email: "contacto@mogmx.com",
    // EDITABLE: teléfono real
    phone: "+52 238 000 0000",
  },
} as const;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.contact.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const mailtoHref = (subject?: string) =>
  `mailto:${site.contact.email}${
    subject ? `?subject=${encodeURIComponent(subject)}` : ""
  }`;

/* ----------------------------------------------------------------- */
/*  Navigation                                                        */
/* ----------------------------------------------------------------- */
export type NavItem = { label: string; to: string };

export const nav: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proceso", to: "/proceso" },
  { label: "Capacidades", to: "/capacidades" },
  { label: "Recursos", to: "/recursos" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
];

/** The single primary CTA, used identically everywhere (no duplicate intent). */
export const primaryCta = { label: "Cotiza tu proyecto", to: "/contacto" };

/* ----------------------------------------------------------------- */
/*  Services (the 6 affirmable services)                              */
/* ----------------------------------------------------------------- */
export type Service = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "maquila-agua-mineral",
    icon: "Drop",
    title: "Maquila de agua mineral",
    summary:
      "Manufactura por contrato de agua mineral, lista para salir con tu marca.",
    detail:
      "Operamos tu producción de agua mineral bajo contrato, desde el manejo de la fuente hasta el producto terminado, cuidando perfil y consistencia en cada lote.",
    points: [
      "Producción por contrato de principio a fin",
      "Control de perfil mineral por lote",
      "Volúmenes adaptables a tu demanda",
    ],
  },
  {
    slug: "embotellado",
    icon: "Flask",
    title: "Embotellado de agua purificada y mineral",
    summary:
      "Llenado y sellado de agua purificada y mineral en distintos formatos.",
    detail:
      "Líneas de llenado, tapado y sellado para agua purificada y mineral, con cambios de formato y presentación según el proyecto.",
    points: [
      "Agua purificada y mineral",
      "Formatos y presentaciones flexibles",
      "Sellado e inspección en línea",
    ],
  },
  {
    slug: "marca-privada",
    icon: "Tag",
    title: "Marca privada / private label",
    summary:
      "Tu marca, embotellada por nosotros. Tú creces, nosotros producimos.",
    detail:
      "Producimos agua con tu marca: tú defines identidad, formato y presentación; nosotros nos encargamos de fabricarla con calidad constante.",
    points: [
      "Producto terminado con tu marca",
      "Acompañamiento en formato y presentación",
      "Calidad constante entre corridas",
    ],
  },
  {
    slug: "desarrollo-formulacion",
    icon: "TestTube",
    title: "Desarrollo de producto y formulación",
    summary:
      "Definimos contigo el perfil del agua y la presentación del producto.",
    detail:
      "Te acompañamos en el desarrollo del producto: definición de perfil, pruebas y ajustes hasta llegar a una fórmula y presentación listas para producción.",
    points: [
      "Definición de perfil y concepto",
      "Pruebas y ajustes de formulación",
      "Preparación para escalar a producción",
    ],
  },
  {
    slug: "lineas-envasado",
    icon: "Factory",
    title: "Líneas de producción y envasado",
    summary: "Capacidad instalada de envasado para distintos volúmenes.",
    detail:
      "Líneas de producción y envasado preparadas para distintas presentaciones, con cambios de formato y trazabilidad por lote.",
    points: [
      "Distintas presentaciones y formatos",
      "Trazabilidad por lote",
      "Capacidad escalable [capacidad] // EDITABLE",
    ],
  },
  {
    slug: "etiquetado-empaque",
    icon: "Package",
    title: "Etiquetado y empaque",
    summary: "Etiquetado, codificado y empaque listo para distribución.",
    detail:
      "Aplicación de etiqueta, codificado y empaque final para que el producto salga listo para almacén y distribución.",
    points: [
      "Etiquetado y codificado",
      "Empaque para distribución",
      "Presentación lista para anaquel",
    ],
  },
];

/* ----------------------------------------------------------------- */
/*  Process (Cotización -> Entrega)                                   */
/* ----------------------------------------------------------------- */
export type ProcessStep = {
  n: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Cotización",
    description:
      "Nos cuentas tu proyecto (tipo de agua, formato y volumen estimado) y preparamos una propuesta clara.",
  },
  {
    n: "02",
    title: "Formulación",
    description:
      "Definimos el perfil del agua y la presentación, con pruebas y ajustes hasta dejar el producto listo.",
  },
  {
    n: "03",
    title: "Producción",
    description:
      "Programamos la corrida y producimos bajo control de calidad, cuidando consistencia en cada lote.",
  },
  {
    n: "04",
    title: "Envasado",
    description:
      "Llenado, tapado y sellado en el formato definido, con inspección en línea.",
  },
  {
    n: "05",
    title: "Etiquetado",
    description:
      "Aplicamos etiqueta, codificado y los datos de lote para trazabilidad.",
  },
  {
    n: "06",
    title: "Entrega",
    description:
      "Empaque final y entrega de tu producto terminado, listo para almacén y distribución.",
  },
];

/* ----------------------------------------------------------------- */
/*  Capabilities                                                      */
/* ----------------------------------------------------------------- */
export const waterTypes = [
  {
    title: "Agua mineral",
    description:
      "Agua de origen mineral, embotellada cuidando su perfil característico.",
  },
  {
    title: "Agua purificada",
    description:
      "Agua sometida a procesos de purificación para un perfil limpio y neutro.",
  },
];

// Formats / presentations are placeholders to confirm with real catalog.
export const formats = [
  { label: "Presentación individual", note: "[formato] ml // EDITABLE" },
  { label: "Presentación personal", note: "[formato] L // EDITABLE" },
  { label: "Presentación familiar", note: "[formato] L // EDITABLE" },
  { label: "Presentación para distribución", note: "[formato] L // EDITABLE" },
];

export const capabilityStats = [
  // EDITABLE: cifras de ejemplo. Cada una es editable y NO es un dato afirmado.
  { value: "[capacidad]", unit: "L / día", label: "Capacidad de envasado" },
  { value: "[N]", unit: "líneas", label: "Líneas de producción" },
  { value: "[N]", unit: "formatos", label: "Formatos disponibles" },
];

/**
 * Illustrative example metrics for the animated count-up.
 * These are NOT verified facts: each is tagged "ejemplo · editable" in the UI.
 * EDITABLE: reemplazar por cifras reales verificadas (o quitar la sección).
 */
export const exampleMetrics = [
  { to: 8, label: "Formatos de envasado" },
  { to: 12, label: "Controles por lote" },
  { to: 4, label: "Tipos de presentación" },
];

export const qualityPoints = [
  {
    icon: "ShieldCheck",
    title: "Control de calidad",
    description:
      "Controles a lo largo del proceso para mantener la consistencia entre lotes.",
  },
  {
    icon: "MapPin",
    title: "Trazabilidad por lote",
    description:
      "Cada lote queda identificado para dar seguimiento del origen al producto final.",
  },
  {
    icon: "Medal",
    title: "Certificaciones",
    description:
      "Operamos bajo [certificación] // EDITABLE: indicar certificaciones reales y vigentes.",
  },
];

/* ----------------------------------------------------------------- */
/*  Resources: videos (lightbox-ready) + downloads                    */
/* ----------------------------------------------------------------- */
export type VideoResource = {
  title: string;
  description: string;
  provider: "youtube" | "vimeo";
  // EDITABLE: reemplazar por el ID real del video
  videoId: string;
};

export const videos: VideoResource[] = [
  {
    title: "Recorrido por la planta",
    description: "Conoce nuestras instalaciones y líneas de embotellado.",
    provider: "youtube",
    videoId: "", // EDITABLE: ID de YouTube, ej. "dQw4w9WgXcQ"
  },
  {
    title: "Nuestro proceso de producción",
    description: "Del agua de origen al producto terminado con tu marca.",
    provider: "youtube",
    videoId: "", // EDITABLE: ID de YouTube
  },
  {
    title: "Marca privada en acción",
    description: "Cómo acompañamos a las marcas que producen con nosotros.",
    provider: "vimeo",
    videoId: "", // EDITABLE: ID de Vimeo
  },
];

export type DownloadResource = {
  title: string;
  description: string;
  kind: string;
  // EDITABLE: reemplazar por la ruta real del archivo (PDF, etc.)
  href: string;
};

export const downloads: DownloadResource[] = [
  {
    title: "Ficha técnica",
    description: "Especificaciones de producto y presentaciones.",
    kind: "PDF",
    href: "#", // EDITABLE: /docs/ficha-tecnica.pdf
  },
  {
    title: "Catálogo de presentaciones",
    description: "Formatos y opciones de envasado disponibles.",
    kind: "PDF",
    href: "#", // EDITABLE: /docs/catalogo.pdf
  },
  {
    title: "Certificaciones",
    description: "Documentación de calidad y cumplimiento.",
    kind: "PDF",
    href: "#", // EDITABLE: /docs/certificaciones.pdf
  },
];

/* ----------------------------------------------------------------- */
/*  About / values                                                    */
/* ----------------------------------------------------------------- */
export const values = [
  {
    icon: "Drop",
    title: "Pureza",
    description:
      "El agua es el producto. Cuidamos su perfil y limpieza en cada etapa.",
  },
  {
    icon: "ShieldCheck",
    title: "Consistencia",
    description:
      "Calidad constante entre lotes para que tu marca sea siempre la misma.",
  },
  {
    icon: "MapPin",
    title: "Trazabilidad",
    description:
      "Seguimiento por lote, del agua de origen al producto terminado.",
  },
  {
    icon: "Factory",
    title: "Capacidad industrial",
    description:
      "Infraestructura de embotellado pensada para producir a escala.",
  },
];

/* Quote form: project types */
export const projectTypes = [
  "Maquila de agua mineral",
  "Embotellado de agua purificada",
  "Marca privada / private label",
  "Desarrollo de producto",
  "Otro",
];
