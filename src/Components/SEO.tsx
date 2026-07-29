import { Helmet } from "react-helmet-async";

type SchemaType = Record<string, any> | Record<string, any>[];

type SEOProps = {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  robots?: string; // e.g. "index, follow" or "noindex, nofollow"
  ogType?: string;
  ogImage?: string;
  schema?: SchemaType;
};

const DEFAULT_KEYWORDS =
  "personal loan, business loan, payday loan, quick loans, online loan approval, instant loan India, Waqt Money, Waqt Finance";
const DEFAULT_IMAGE = "https://waqtmoney.com/waqt-money-logo-img.png";
const SITE_NAME = "Waqt Money";

export default function SEO({
  title,
  description,
  canonicalUrl,
  keywords,
  robots = "index, follow",
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  schema,
}: SEOProps) {
  const currentUrl = canonicalUrl || typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  const fullTitle = title.includes("Waqt Money") ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={`${DEFAULT_KEYWORDS}, ${keywords}`} />}
      {!keywords && <meta name="keywords" content={DEFAULT_KEYWORDS} />}
      <meta name="robots" content={robots} />
      <meta name="author" content="Waqt Finance Pvt Ltd" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
