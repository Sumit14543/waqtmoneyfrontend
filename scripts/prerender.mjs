// File: scripts/prerender.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 4173;
const API_BLOGS_URL = 'https://api.waqtmoney.com/api/blogs';

// All Indexable Static Canonical Routes
const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/emi-calculator',
  '/faqs',
  '/contact',
  '/blog',
  '/loans/personal-loan',
  '/loans/payday-loan',
  '/loans/short-term-loan',
  '/loans/vehicle-loan',
  '/loans/loan-against-property',
  '/loans/medical-loan',
  '/loans/business-loan',
  '/loans/education-loan',
  '/loans/delhi',
  '/loans/delhi-ncr',
  '/loans/gurugram',
  '/loans/noida-greater-noida',
  '/loans/ghaziabad',
  '/policies',
  '/privacy-policy',
  '/terms-conditions',
  '/grievance-redressal',
  '/fair-practices-code',
  '/responsible-lending',
  '/refund-policy',
  '/disclaimer',
];

function getLaunchOptions() {
  const options = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };

  const winChrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const winChrome86 = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  const winEdge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  if (process.platform === 'win32') {
    if (fs.existsSync(winChrome)) {
      options.executablePath = winChrome;
    } else if (fs.existsSync(winChrome86)) {
      options.executablePath = winChrome86;
    } else if (fs.existsSync(winEdge)) {
      options.executablePath = winEdge;
    }
  }

  return options;
}

async function getAllRoutes() {
  const routes = [...STATIC_ROUTES];
  try {
    console.log('Fetching live blog slugs from API:', API_BLOGS_URL);
    const res = await fetch(API_BLOGS_URL);
    const data = await res.json();
    const blogs = Array.isArray(data) ? data : data.blogs || data.data || [];
    for (const blog of blogs) {
      if (blog && blog.slug) {
        routes.push(`/blog/${String(blog.slug).trim().replace(/^\/+|\/+$/g, '')}`);
      }
    }
    console.log(`Loaded ${blogs.length} blog routes from API. Total routes to pre-render: ${routes.length}`);
  } catch (err) {
    console.warn('Warning: Could not fetch API blogs during build:', err.message);
  }
  return Array.from(new Set(routes));
}

async function runPrerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Dist directory does not exist! Please run build first.');
    process.exit(1);
  }

  // Preserve the clean Vite SPA shell (<div id="root"></div>) for dynamic routes like /user/apply and /repayment
  const spaHtmlPath = path.join(DIST_DIR, 'spa.html');
  fs.copyFileSync(path.join(DIST_DIR, 'index.html'), spaHtmlPath);
  console.log('Preserved clean SPA shell to dist/spa.html for dynamic client routes');

  const app = express();
  app.use(express.static(DIST_DIR));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, () => {
    console.log(`Pre-render local server started at http://localhost:${PORT}`);
  });

  let browser;
  try {
    const launchOptions = getLaunchOptions();
    browser = await puppeteer.launch(launchOptions);

    const routes = await getAllRoutes();
    console.log(`Starting pre-render for ${routes.length} total routes...`);

    for (const route of routes) {
      const page = await browser.newPage();
      const url = `http://localhost:${PORT}${route}`;
      try {
        console.log(`Pre-rendering: ${route}`);
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.waitForSelector('#root > *', { timeout: 10000 });

        // Ensure any canonicals generated with localhost during prerender are rewritten to https://waqtmoney.com
        let html = await page.content();
        html = html.replaceAll(`http://localhost:${PORT}`, 'https://waqtmoney.com');

        const cleanRoute = route.replace(/^\//, '');
        const outDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, cleanRoute);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
      } catch (err) {
        console.error(`Failed to pre-render ${route}:`, err.message);
      } finally {
        await page.close();
      }
    }
  } catch (browserErr) {
    console.error('Puppeteer execution error:', browserErr);
  } finally {
    if (browser) await browser.close();
    server.close();

    // Ensure repayment and apply form folders never exist statically in dist/
    const repaymentDir = path.join(DIST_DIR, 'repayment');
    if (fs.existsSync(repaymentDir)) {
      fs.rmSync(repaymentDir, { recursive: true, force: true });
      console.log('Removed dist/repayment to prevent static pre-rendering of repayment form');
    }
    const userDir = path.join(DIST_DIR, 'user');
    if (fs.existsSync(userDir)) {
      fs.rmSync(userDir, { recursive: true, force: true });
      console.log('Removed dist/user to prevent static pre-rendering of user apply form');
    }

    console.log('Pre-rendering complete! All static HTML snapshots written to dist/');
  }
}

runPrerender();
