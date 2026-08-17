import { Helmet } from "react-helmet-async";

type SchemaType = Record<string, unknown> | Record<string, unknown>[];

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
  const fallbackUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname.toLowerCase().replace(/\/$/, "")}`
      : "https://waqtmoney.com";
  const currentUrl = (canonicalUrl || fallbackUrl).toLowerCase();
  const fullTitle = title.includes("Waqt Money") ? title : `${title} | ${SITE_NAME}`;

  // Format schema cleanly into valid JSON-LD graph structure without duplicates
  const formatSchema = (input: SchemaType) => {
    if (!input) return null;
    const list: Record<string, unknown>[] = Array.isArray(input) ? input : [input];

    // Remove duplicates based on @type and @id or name
    const seenTypes = new Set<string>();
    const deduplicatedList: Record<string, unknown>[] = [];

    list.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const typeStr = String(item["@type"] || "");
      const key = item["@id"] ? String(item["@id"]) : typeStr;
      
      // Skip top-level FinancialService from page-level schemas since index.html already has the master FinancialService schema
      if (typeStr === "FinancialService") {
        return;
      }

      if (typeStr === "Organization") {
        if (seenTypes.has(typeStr)) return;
        seenTypes.add(typeStr);
      } else if (key) {
        if (seenTypes.has(key)) return;
        seenTypes.add(key);
      }

      // Clean redundant inner @context
      const cleanItem = { ...item };
      delete cleanItem["@context"];
      deduplicatedList.push(cleanItem);
    });

    if (deduplicatedList.length === 0) return null;
    if (deduplicatedList.length === 1 && !Array.isArray(input)) {
      return { "@context": "https://schema.org", ...deduplicatedList[0] };
    }

    return {
      "@context": "https://schema.org",
      "@graph": deduplicatedList
    };
  };

  const formattedSchema = schema ? formatSchema(schema) : null;

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
      {formattedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(formattedSchema)}
        </script>
      )}
    </Helmet>
  );
}
