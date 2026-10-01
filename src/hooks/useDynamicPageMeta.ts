import { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWebpageMeta, syncWebpagesMetaWithApi, WebpageMeta } from "@/utils/webpageMetaStorage";

interface FallbackMetaProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  robots?: string;
}

export function useDynamicPageMeta(fallbackProps: FallbackMetaProps) {
  const location = useLocation();
  const [meta, setMeta] = useState<WebpageMeta>(() =>
    getWebpageMeta(location.pathname)
  );

  useEffect(() => {
    // 1. Synchronously set from local cache
    setMeta(getWebpageMeta(location.pathname));

    // 2. Refresh from backend in background
    let mounted = true;
    syncWebpagesMetaWithApi().then((map) => {
      if (mounted) {
        const normalized = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
        if (map[normalized]) {
          setMeta(map[normalized]);
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  // Build merged props and FAQPage schema
  const resolvedSEO = useMemo(() => {
    const title = meta.metaTitle || fallbackProps.title;
    const description = meta.metaDescription || fallbackProps.description;
    const keywords = meta.keywords || fallbackProps.keywords;
    const canonicalUrl = meta.canonicalUrl || fallbackProps.canonicalUrl;
    const ogImage = meta.ogImage || fallbackProps.ogImage;
    const robots = meta.robots || fallbackProps.robots || "index, follow";

    // Prepare Schema
    const schemas: Record<string, unknown>[] = [];
    if (fallbackProps.schema) {
      if (Array.isArray(fallbackProps.schema)) {
        schemas.push(...fallbackProps.schema);
      } else {
        schemas.push(fallbackProps.schema);
      }
    }

    // If FAQs are configured for this page, add standard FAQPage schema
    if (meta.faqs && meta.faqs.length > 0) {
      const validFaqs = meta.faqs.filter((f) => f.question?.trim() && f.answer?.trim());
      if (validFaqs.length > 0) {
        schemas.push({
          "@type": "FAQPage",
          mainEntity: validFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question.trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.trim(),
            },
          })),
        });
      }
    }

    // Optional custom JSON-LD schema
    if (meta.customSchemaJson) {
      try {
        const parsed = JSON.parse(meta.customSchemaJson);
        if (Array.isArray(parsed)) schemas.push(...parsed);
        else if (typeof parsed === "object" && parsed !== null) schemas.push(parsed);
      } catch (e) {
        console.warn("Invalid customSchemaJson for", location.pathname, e);
      }
    }

    return {
      title,
      description,
      keywords,
      canonicalUrl,
      ogImage,
      robots,
      schema: schemas.length > 0 ? schemas : undefined,
    };
  }, [meta, fallbackProps, location.pathname]);

  return resolvedSEO;
}
