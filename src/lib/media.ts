/**
 * Imágenes del sitio.
 *
 * IMPORTANTE: estas imágenes se generaron con IA (Higgsfield / Recraft 4.1) y
 * hoy se sirven desde el CDN de Higgsfield. Son imágenes premium genéricas de
 * agua e industria, NO fotos reales de la planta de MOG.
 *
 * Para producción:
 *  1) // REEMPLAZAR por fotografía real de tu planta, producto y línea.
 *  2) Descarga cada imagen y alójala localmente en /public/images, luego
 *     cambia estas URLs por rutas locales (ej. "/images/hero-bottle.webp").
 */
export const media = {
  // Botella premium con splash de agua, fondo claro (espacio a la izquierda)
  heroBottle:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/hf_20260624_030134_76e1a700-ad39-45d0-87a8-ea3e8e7468f7_min.webp",
  // Línea de embotellado, tono industrial frío
  bottlingLine:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/hf_20260624_030137_f7c46635-c0ab-4e97-acde-7921e7f43d94_min.webp",
  // Macro de agua / splash sobre fondo navy
  waterPour:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/hf_20260624_030147_5ba8c78b-312d-4d79-bb2a-f526f9665062_min.webp",
  // Grupo de botellas sin etiqueta sobre fondo claro
  bottlesGroup:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/hf_20260624_030149_b025f797-ebc9-4ba2-bb70-f80400e927e6_min.webp",
  // Detalle de llenado/tapado en la línea
  fillingLine:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3De3RdMNZReGlmJYXAnYF4EkDFp/hf_20260624_030152_7366c45e-4ac0-4caa-ade7-68e28db92476_min.webp",
} as const;
