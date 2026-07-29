import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = "https://waqtmoney.com";
const CURRENT_DATE = new Date().toISOString().split("T")[0];

const pages = [
  { path: "", changefreq: "daily", priority: 1.0 },
  { path: "services", changefreq: "weekly", priority: 0.8 },
  { path: "about", changefreq: "monthly", priority: 0.8 },
  { path: "faqs", changefreq: "weekly", priority: 0.8 },
  { path: "blog", changefreq: "daily", priority: 0.9 },
  { path: "blog/mastering-personal-loans-india-2026-guide", changefreq: "weekly", priority: 0.8 },
  { path: "blog/cibil-score-750-instant-approval-hacks", changefreq: "weekly", priority: 0.8 },
  { path: "blog/msme-business-loan-without-collateral-step-by-step", changefreq: "weekly", priority: 0.8 },
  { path: "blog/working-capital-loans-small-businesses-guide", changefreq: "weekly", priority: 0.8 },
  { path: "blog/payday-cash-advance-vs-personal-loans-explained", changefreq: "weekly", priority: 0.8 },
  { path: "blog/emergency-salary-advance-loan-approval-minutes", changefreq: "weekly", priority: 0.8 },
  { path: "blog/short-term-loans-salaried-professionals-complete-guide", changefreq: "weekly", priority: 0.8 },
  { path: "blog/salary-advance-apps-india-smart-borrowing-tips", changefreq: "weekly", priority: 0.8 },
  { path: "emi-calculator", changefreq: "monthly", priority: 0.8 },
  { path: "repayment", changefreq: "monthly", priority: 0.7 },
  { path: "policies", changefreq: "monthly", priority: 0.6 },
  { path: "privacy-policy", changefreq: "monthly", priority: 0.6 },
  { path: "terms-conditions", changefreq: "monthly", priority: 0.6 },
  { path: "grievance-redressal", changefreq: "monthly", priority: 0.6 },
  { path: "fair-practices-code", changefreq: "monthly", priority: 0.6 },
  { path: "refund-policy", changefreq: "monthly", priority: 0.6 },
  { path: "disclaimer", changefreq: "monthly", priority: 0.6 },
  { path: "responsible-lending", changefreq: "monthly", priority: 0.6 },
  { path: "loans/personal-loan", changefreq: "weekly", priority: 0.9 },
  { path: "loans/business-loan", changefreq: "weekly", priority: 0.9 },
  { path: "loans/payday-loan", changefreq: "weekly", priority: 0.9 },
  { path: "loans/loan-against-property", changefreq: "weekly", priority: 0.9 },
  { path: "loans/vehicle-loan", changefreq: "weekly", priority: 0.9 },
  { path: "loans/credit-services", changefreq: "weekly", priority: 0.9 },
  { path: "loans/education-loan", changefreq: "weekly", priority: 0.8 },
  { path: "loans/medical-loan", changefreq: "weekly", priority: 0.8 },
];

const generateSitemap = () => {
  const urlset = pages
    .map(
      (page) => `  <url>
    <loc>${DOMAIN}/${page.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;

  const outputPath = path.join(__dirname, "public", "sitemap.xml");
  fs.writeFileSync(outputPath, sitemapXml.trim(), "utf8");
  console.log(`Sitemap generated successfully at: ${outputPath}`);
};

generateSitemap();
