import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, "dist");

// Default list of static & marketing routes to prerender
const STATIC_ROUTES = [
  // Core Pages
  "/",
  "/services",
  "/about",
  "/faqs",
  "/contact",
  "/policies",
  "/emi-calculator",
  "/repayment",

  // Legal & Regulatory Pages
  "/privacy-policy",
  "/terms-conditions",
  "/grievance-redressal",
  "/fair-practices-code",
  "/refund-policy",
  "/disclaimer",
  "/responsible-lending",

  // Loan Products
  "/loans/personal-loan",
  "/loans/business-loan",
  "/loans/payday-loan",
  "/loans/loan-against-property",
  "/loans/vehicle-loan",
  "/loans/short-term-loan",
  "/loans/education-loan",
  "/loans/medical-loan",

  // Location Pages
  "/loans/delhi",
  "/loans/delhi-ncr",
  "/loans/gurugram",
  "/loans/noida-greater-noida",
  "/loans/ghaziabad",

  // Blog Hub
  "/blog"
];

// Extract blog slugs from mockBlogs.ts and sitemap to ensure all public articles get prerendered
const extractBlogRoutes = () => {
  const routes = new Set();

  try {
    const mockBlogsPath = path.resolve(__dirname, "src/data/mockBlogs.ts");
    if (fs.existsSync(mockBlogsPath)) {
      const content = fs.readFileSync(mockBlogsPath, "utf8");
      const matches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
      for (const match of matches) {
        if (match[1]) routes.add(`/blog/${match[1].trim()}`);
      }
    }
  } catch (err) {
    console.warn("Could not read mockBlogs.ts for blog slugs:", err.message);
  }

  try {
    const sitemapPath = path.resolve(__dirname, "generate-sitemap.js");
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, "utf8");
      const matches = content.matchAll(/https:\/\/waqtmoney\.com(\/blog\/[^<\s"']+)/g);
      for (const match of matches) {
        if (match[1]) routes.add(match[1].trim());
      }
    }
  } catch (err) {
    console.warn("Could not read generate-sitemap.js for blog slugs:", err.message);
  }

  return Array.from(routes);
};

// Locate Chrome or Edge executable across OS environments
const findBrowserExecutable = () => {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const commonPaths = [
    // Windows paths
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    path.join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    path.join(process.env.LOCALAPPDATA || "", "Microsoft\\Edge\\Application\\msedge.exe"),
    // Linux / CI paths
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
    // macOS paths
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  ];

  for (const execPath of commonPaths) {
    if (execPath && fs.existsSync(execPath)) {
      return execPath;
    }
  }

  return null;
};

// Simple MIME lookup
const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".xml": "application/xml"
  };
  return mimeTypes[ext] || "application/octet-stream";
};

// Start a lightweight static server for the built dist directory
const startStaticServer = async (port = 4173) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const parsedUrl = new URL(req.url, `http://localhost:${port}`);
        let pathname = decodeURIComponent(parsedUrl.pathname);

        // Security check: prevent directory traversal
        const safePath = path.normalize(path.join(DIST_DIR, pathname));
        if (!safePath.startsWith(DIST_DIR)) {
          res.writeHead(403);
          return res.end("Forbidden");
        }

        let filePath = safePath;

        // Check if file exists, or if directory has index.html
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          filePath = path.join(filePath, "index.html");
        }

        // SPA Fallback: if not found, serve original dist/index.html
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          filePath = path.join(DIST_DIR, "index.html");
        }

        const data = fs.readFileSync(filePath);
        res.writeHead(200, { "Content-Type": getMimeType(filePath) });
        res.end(data);
      } catch (err) {
        res.writeHead(500);
        res.end("Internal Server Error: " + err.message);
      }
    });

    server.listen(port, () => {
      resolve(server);
    });

    server.on("error", (err) => {
      reject(err);
    });
  });
};

const prerender = async () => {
  console.log("\n=======================================================");
  console.log("   🚀 WAQT MONEY HIGH-PERFORMANCE PRE-RENDERER (SSG)   ");
  console.log("=======================================================\n");

  if (!fs.existsSync(DIST_DIR)) {
    console.error("❌ Error: dist/ directory not found. Run 'npm run build' first!");
    process.exit(1);
  }

  const executablePath = findBrowserExecutable();
  if (!executablePath) {
    console.warn("⚠️ Warning: Could not locate Chrome or Edge executable.");
    console.warn("   Pre-rendering skipped. Build will continue with dynamic SPA index.html.");
    console.warn("   To enable pre-rendering in CI/CD, set PUPPETEER_EXECUTABLE_PATH environment variable.");
    process.exit(0);
  }

  console.log(`🔍 Detected browser engine: ${executablePath}`);

  // Combine static and blog routes
  const blogRoutes = extractBlogRoutes();
  const allRoutes = Array.from(new Set([...STATIC_ROUTES, ...blogRoutes]));
  console.log(`📋 Total routes to prerender: ${allRoutes.length} pages (${STATIC_ROUTES.length} static + ${blogRoutes.length} blog posts)\n`);

  // Start local static server
  const PORT = 4173 + Math.floor(Math.random() * 100);
  const server = await startStaticServer(PORT);
  console.log(`🌐 Local prerender server listening on http://localhost:${PORT}`);

  // Launch headless browser
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
      "--single-process"
    ]
  });

  const startTime = Date.now();
  let successCount = 0;
  let failureCount = 0;

  // Process pages with 4 concurrent workers
  const CONCURRENCY = 4;
  const queue = [...allRoutes];

  const worker = async (workerId) => {
    const page = await browser.newPage();

    // Optimize page: block external trackers, analytics and unnecessary third-party calls during prerender
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url().toLowerCase();
      if (
        url.includes("google-analytics.com") ||
        url.includes("googletagmanager.com") ||
        url.includes("facebook.net") ||
        url.includes("doubleclick.net")
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Expose prerender flag to window
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    while (queue.length > 0) {
      const route = queue.shift();
      const pageStart = Date.now();

      try {
        const targetUrl = `http://localhost:${PORT}${route}`;
        await page.goto(targetUrl, {
          waitUntil: "networkidle2",
          timeout: 25000
        });

        // Wait for React to mount content inside #root
        await page.waitForSelector("#root > *", { timeout: 8000 }).catch(() => {});

        // Wait brief tick for React-Helmet-Async to update title & meta tags
        await page.waitForFunction(
          () => document.title && document.title.trim().length > 0,
          { timeout: 3000 }
        ).catch(() => {});

        // Extra 100ms for lazy state stabilization
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Mark HTML document as pre-rendered
        await page.evaluate(() => {
          const rootEl = document.getElementById("root");
          if (rootEl) {
            rootEl.setAttribute("data-prerendered", "true");
          }
          let meta = document.querySelector('meta[name="prerendered-at"]');
          if (!meta) {
            meta = document.createElement("meta");
            meta.name = "prerendered-at";
            document.head.appendChild(meta);
          }
          meta.content = new Date().toISOString();
        });

        const html = await page.content();
        const pageTitle = await page.title();

        // Determine destination file
        let outputFile;
        if (route === "/") {
          outputFile = path.join(DIST_DIR, "index.html");
        } else {
          // Normalize route into directory path: e.g. /loans/personal-loan -> dist/loans/personal-loan/index.html
          const cleanRoute = route.replace(/^\/+/, "").replace(/\/+$/, "");
          const targetDir = path.join(DIST_DIR, cleanRoute);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          outputFile = path.join(targetDir, "index.html");
        }

        fs.writeFileSync(outputFile, html, "utf8");
        const fileSizeKb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
        const durationMs = Date.now() - pageStart;

        console.log(`  ✅ [${fileSizeKb} KB - ${durationMs}ms] ${route} -> "${pageTitle.slice(0, 45)}..."`);
        successCount++;
      } catch (err) {
        console.error(`  ❌ Failed to prerender ${route}:`, err.message);
        failureCount++;
      }
    }

    await page.close();
  };

  // Run workers concurrently
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker(i + 1));
  }

  await Promise.all(workers);

  // Cleanup
  await browser.close();
  server.close();

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log("\n=======================================================");
  console.log(`  🎉 Pre-rendering Complete in ${totalTime}s`);
  console.log(`  ✨ Successfully Pre-rendered: ${successCount} pages`);
  if (failureCount > 0) {
    console.log(`  ⚠️ Failed pages: ${failureCount}`);
  }
  console.log("=======================================================\n");
};

prerender().catch((err) => {
  console.error("Prerender encountered a fatal error:", err);
  process.exit(1);
});
