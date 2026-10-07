import { Helmet } from "react-helmet-async";

const CANONICAL_ORIGIN = "https://waqtmoney.com";
const DEFAULT_OG_IMAGE = "https://waqtmoney.com/og-banner-1200x630.webp";
const DEFAULT_KEYWORDS =
  "personal loan, business loan, payday loan, quick loans, online loan approval, instant loan India, Waqt Money, Waqt Finance";
const DEFAULT_DESCRIPTION =
  "Apply for quick, paperless personal loans, payday advances, business loans, and secured property credits. Instant approvals from licensed NBFC partner Waqt Finance Pvt Ltd.";
const SITE_NAME = "Waqt Money";

type SchemaType = Record<string, unknown> | Record<string, unknown>[];

export interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  canonical?: string;
  keywords?: string;
  robots?: string;
  noindex?: boolean;
  ogType?: string;
  ogImage?: string;
  schema?: SchemaType;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  canonical,
  keywords,
  robots,
  noindex = false,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  schema,
}: SEOProps) {
  // Always use the canonical non-www origin (never window.location.origin)
  const rawPath =
    typeof window !== "undefined"
      ? window.location.pathname.toLowerCase().replace(/\/+$/, "")
      : "";
  const fallbackUrl = rawPath ? `${CANONICAL_ORIGIN}${rawPath}` : `${CANONICAL_ORIGIN}/`;
  const finalCanonical = (canonical || canonicalUrl || fallbackUrl).toLowerCase();

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const finalRobots = noindex
    ? "noindex, nofollow"
    : robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Preserve page-level FinancialService schemas (needed for City Loan pages & /services)
  const structuredData = schema
    ? (() => {
        const items = (Array.isArray(schema) ? schema : [schema]) as Record<string, unknown>[];
        const cleaned = items
          .filter((item) => item && typeof item === "object")
          .map((item) => {
            const copy = { ...item };
            delete copy["@context"];
            return copy;
          });
        if (cleaned.length === 0) return null;
        if (cleaned.length === 1 && !Array.isArray(schema)) {
          return { "@context": "https://schema.org", ...cleaned[0] };
        }
        return { "@context": "https://schema.org", "@graph": cleaned };
      })()
    : null;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? (
        <meta name="keywords" content={`${DEFAULT_KEYWORDS}, ${keywords}`} />
      ) : (
        <meta name="keywords" content={DEFAULT_KEYWORDS} />
      )}
      <meta name="robots" content={finalRobots} />
      <meta name="author" content="Waqt Finance Pvt Ltd" />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema Markup */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
