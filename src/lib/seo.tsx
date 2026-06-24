import { Helmet } from "react-helmet-async";
import { site } from "./site";

type SeoProps = {
  title: string;
  description?: string;
  path?: string;
  /** JSON-LD structured data object, optional */
  jsonLd?: Record<string, unknown>;
};

/**
 * Per-page SEO: title, description, canonical, Open Graph, Twitter, JSON-LD.
 */
export function Seo({ title, description, path = "/", jsonLd }: SeoProps) {
  const fullTitle = `${title} · ${site.name}`;
  const desc = description ?? site.description;
  const url = `${site.url}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="es_MX" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

/** Organization JSON-LD reused on the home page. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.state,
    addressCountry: "MX",
  },
};
