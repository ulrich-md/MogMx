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
    "Agua mineral de Tehuacán, Puebla, embotellada con tu marca. Marca propia, mejora de formulación y diversidad de envases y tapas, también para otras bebidas.",
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
    slug: "agua-mineral-tehuacan",
    icon: "Drop",
    title: "Agua mineral de Tehuacán",
    summary:
      "El agua que solo da este valle, embotellada con tu nombre.",
    detail:
      "Tehuacán es la cuna del agua mineral en México. Cuidamos su perfil característico lote a lote, para que quien pruebe tu marca reconozca siempre lo mismo.",
    points: [
      "Origen mineral de Tehuacán",
      "Perfil cuidado en cada lote",
      "Carácter propio, imposible de imitar fuera del valle",
    ],
  },
  {
    slug: "marca-propia",
    icon: "Tag",
    title: "Marca propia",
    summary: "Tu nombre en el envase, tuyo de principio a fin.",
    detail:
      "El producto sale con tu marca, tu identidad y tu presentación. Tú decides cómo se ve y a quién le habla; nosotros lo hacemos realidad contigo.",
    points: [
      "Producto terminado con tu marca",
      "Acompañamiento en presentación e identidad",
      "La misma calidad entre una corrida y la siguiente",
    ],
  },
  {
    slug: "formulacion",
    icon: "TestTube",
    title: "Mejora de formulación",
    summary:
      "Experiencia para llevar tu idea, o tu fórmula actual, a su mejor versión.",
    detail:
      "Partimos de lo que ya tienes, sea una idea en la cabeza o una fórmula que quieres mejorar, y la trabajamos con pruebas y ajustes hasta dejarla como la imaginaste.",
    points: [
      "Del concepto a una fórmula lista",
      "Pruebas y ajustes con acompañamiento",
      "Mejora de fórmulas que ya existen",
    ],
  },
  {
    slug: "envases-y-tapas",
    icon: "Package",
    title: "Envases y tapas",
    summary:
      "Diversidad de envases, tapas y presentaciones para tu proyecto.",
    detail:
      "Manejamos múltiples tipos de envase y tapa. Esa flexibilidad es lo que te deja elegir la presentación correcta para tu mercado, y cambiarla cuando tu marca lo pida.",
    points: [
      "Múltiples envases y presentaciones",
      "Diversidad y manejo de tapas",
      "Cambio de formato según tu mercado",
    ],
  },
  {
    slug: "otras-bebidas",
    icon: "Flask",
    title: "Otras bebidas",
    summary: "Más allá del agua: lo que tu marca necesite envasar.",
    detail:
      "El agua mineral y purificada es nuestro origen, no nuestro límite. Envasamos otras bebidas según el proyecto y su perfil.",
    points: [
      "Agua mineral y purificada",
      "Otras bebidas según tu proyecto",
      "Presentaciones adaptadas a cada bebida",
    ],
  },
  {
    slug: "producto-final",
    icon: "Sparkle",
    title: "Producto final",
    summary: "Etiquetado, codificado y listo para su primer anaquel.",
    detail:
      "Cerramos con el detalle que se ve: etiqueta, codificado y empaque, para que tu producto salga de aquí listo para venderse.",
    points: [
      "Etiquetado y codificado",
      "Empaque listo para distribución",
      "Presentación lista para anaquel",
    ],
  },
];

/* ----------------------------------------------------------------- */
/*  Process (De la posibilidad a la realidad)                         */
/* ----------------------------------------------------------------- */
export type ProcessStep = {
  n: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Tu idea",
    description:
      "Nos cuentas qué quieres lograr y a quién le quieres vender. De ahí sale una propuesta clara, sin compromiso.",
  },
  {
    n: "02",
    title: "Formulación",
    description:
      "Definimos el perfil de tu bebida con pruebas y ajustes, hasta que sea la que tenías en la cabeza.",
  },
  {
    n: "03",
    title: "Envase y tapa",
    description:
      "Eliges entre múltiples envases, tapas y presentaciones la combinación correcta para tu mercado.",
  },
  {
    n: "04",
    title: "Producción",
    description:
      "Preparamos tu corrida y la cuidamos con control de calidad, lote por lote.",
  },
  {
    n: "05",
    title: "Tu marca",
    description:
      "Etiqueta, codificado y datos de lote. El envase deja de ser nuestro y pasa a ser tuyo.",
  },
  {
    n: "06",
    title: "Producto final",
    description:
      "Empaque y entrega. Tu marca existe y está lista para su primer anaquel.",
  },
];

/* ----------------------------------------------------------------- */
/*  Capabilities                                                      */
/* ----------------------------------------------------------------- */
export const waterTypes = [
  {
    title: "Agua mineral de Tehuacán",
    description:
      "El agua del valle que le dio nombre al agua mineral en México, con su perfil característico intacto.",
  },
  {
    title: "Agua purificada",
    description:
      "Agua sometida a procesos de purificación para un perfil limpio y neutro.",
  },
  {
    title: "Otras bebidas",
    description:
      "Más allá del agua: envasamos otras bebidas según tu proyecto y su perfil.",
  },
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
    title: "Normativa y estándares",
    description:
      "Producimos bajo la normativa vigente para agua y bebidas, con controles propios de alto estándar en cada lote.",
  },
];

/* ----------------------------------------------------------------- */
/*  About / values                                                    */
/* ----------------------------------------------------------------- */
export const values = [
  {
    icon: "Drop",
    title: "Origen",
    description:
      "El agua de Tehuacán no se replica en otro lado. Ese carácter es el punto de partida de tu marca.",
  },
  {
    icon: "ShieldCheck",
    title: "Consistencia",
    description:
      "Calidad constante entre lotes, para que tu marca sepa siempre igual.",
  },
  {
    icon: "Package",
    title: "Versatilidad",
    description:
      "Múltiples envases, tapas y presentaciones. Tu producto se adapta a tu mercado, no al revés.",
  },
  {
    icon: "Sparkle",
    title: "Oficio",
    description:
      "Trabajamos contigo el detalle, de la fórmula al anaquel, como se trabaja un producto propio.",
  },
];

/* Quote form: project types */
export const projectTypes = [
  "Agua mineral de Tehuacán con mi marca",
  "Agua purificada con mi marca",
  "Otra bebida con mi marca",
  "Mejora de una fórmula que ya tengo",
  "Aún lo estoy definiendo",
  "Otro",
];
