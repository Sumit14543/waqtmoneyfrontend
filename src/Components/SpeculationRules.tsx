import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * SpeculationRules Component
 * Integrates the modern W3C Speculation Rules API for instant 0ms pre-rendering
 * and pre-fetching of next-likely routes based on user interactions.
 */
export default function SpeculationRules() {
  const location = useLocation();

  useEffect(() => {
    // Check if the current browser supports Speculation Rules API
    if (
      typeof HTMLScriptElement !== "undefined" &&
      HTMLScriptElement.supports &&
      HTMLScriptElement.supports("speculationrules")
    ) {
      const scriptId = "dynamic-speculation-rules";
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "speculationrules";

      // Common core & product routes to prerender on hover
      const prerenderUrls = [
        "/",
        "/about",
        "/services",
        "/emi-calculator",
        "/faqs",
        "/contact",
        "/policies",
        "/loans/personal-loan",
        "/loans/business-loan",
        "/loans/payday-loan",
        "/loans/loan-against-property",
        "/loans/vehicle-loan",
        "/loans/short-term-loan",
        "/loans/education-loan",
        "/loans/medical-loan",
        "/blog"
      ].filter((path) => path !== location.pathname);

      script.textContent = JSON.stringify({
        prerender: [
          {
            source: "list",
            urls: prerenderUrls.slice(0, 10),
            eagerness: "moderate"
          }
        ],
        prefetch: [
          {
            source: "list",
            urls: [
              "/privacy-policy",
              "/terms-conditions",
              "/repayment",
              "/refund-policy"
            ],
            eagerness: "conservative"
          }
        ]
      });

      document.head.appendChild(script);

      return () => {
        const el = document.getElementById(scriptId);
        if (el) el.remove();
      };
    }
  }, [location.pathname]);

  return null;
}
