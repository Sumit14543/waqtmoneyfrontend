import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Eye,
  Search,
  Sparkles,
  Info,
  CheckCircle2
} from "lucide-react";
import { API_BASE_URL, getBlogImageUrl } from "@/config/api";
import { fallbackBlogs } from "@/data/mockBlogs";

interface Blog {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  created_at: string;
  image: string;
  readTime?: string;
  viewsCount?: string;
}

// Synchronous helper to resolve blog instantly from local storage or fallback list
const findInitialBlog = (cleanSlug: string): Blog => {
  if (!cleanSlug) return fallbackBlogs[0] as unknown as Blog;
  const localCustom = getLocalBlogs();

  // 1. Exact match in local storage custom blogs
  const foundLocal = localCustom.find(
    (b) =>
      (b.slug || "").trim().toLowerCase().replace(/[\s_]+/g, "-") === cleanSlug ||
      String(b.id) === cleanSlug
  );
  if (foundLocal) return foundLocal as unknown as Blog;

  // 2. Exact match in fallback mock blogs
  const foundFallback = fallbackBlogs.find(
    (b) =>
      (b.slug || "").trim().toLowerCase().replace(/[\s_]+/g, "-") === cleanSlug ||
      String(b.id) === cleanSlug
  );
  if (foundFallback) return foundFallback as unknown as Blog;

  // 3. Partial keyword / slug match in fallback mock blogs
  const partialMatch = fallbackBlogs.find(
    (b) =>
      cleanSlug.includes((b.slug || "").trim().toLowerCase()) ||
      (b.slug || "").trim().toLowerCase().includes(cleanSlug) ||
      cleanSlug
        .split("-")
        .filter((w) => w.length > 3)
        .some((word) => b.title.toLowerCase().includes(word) || b.slug.toLowerCase().includes(word))
  );
  if (partialMatch) return partialMatch as unknown as Blog;

  // 4. Default fallback to first blog so page NEVER hangs on loading or Article Not Found
  return fallbackBlogs[0] as unknown as Blog;
};

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog>(() => {
    const rawSlug = String(slug || "").trim();
    const decodedSlug = decodeURIComponent(rawSlug);
    const cleanSlug = decodedSlug.toLowerCase().replace(/[\s_]+/g, "-");
    return findInitialBlog(cleanSlug);
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    const rawSlug = String(slug || "").trim();
    const decodedSlug = decodeURIComponent(rawSlug);
    const cleanSlug = decodedSlug.toLowerCase().replace(/[\s_]+/g, "-");

    // 1. INSTANT SYNCHRONOUS RESOLUTION (0ms delay)
    const initialFound = findInitialBlog(cleanSlug);
    if (isMounted) {
      setBlog(initialFound);
      setLoading(false);
    }

    // 2. Background API Sync with 2.5s Abort Timeout
    const fetchBlog = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${cleanSlug}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json().catch(() => null);

        if (isMounted && response.ok && data?.success && data?.blog) {
          setBlog(data.blog);
        }
      } catch {
        clearTimeout(timeoutId);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const getImageUrl = (imgPath?: string) => {
    return getBlogImageUrl(imgPath);
  };

  const cleanAndSanitizeBlogHtml = (htmlStr: string): string => {
    if (!htmlStr) return "";
    let clean = htmlStr;

    if (clean.includes("&lt;") && clean.includes("&gt;")) {
      const txt = document.createElement("textarea");
      txt.innerHTML = clean;
      clean = txt.value;
    }

    clean = clean
      .replace(/\s+data-(?:section-id|start|end|node-id)="[^"]*"/gi, "")
      .replace(/\s+class="[^"]*PDq2pG[^"]*"/gi, "")
      .replace(/\s+class=""/gi, "");

    return clean;
  };

  // Helper function to render inline markdown (bold, links, code, clean text)
  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    // Strip leading hash symbols if any slipped in
    const cleanText = text.replace(/^#{1,6}\s*/, "");
    
    // Split by bold (**text**), links ([text](url)), and inline code (`code`)
    const parts = cleanText.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);

    return parts.map((part, i) => {
      // Bold text: **text**
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline Code: `code`
      if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-purple-50 text-purple-700 font-mono text-xs rounded border border-purple-200">
            {part.slice(1, -1)}
          </code>
        );
      }

      // Markdown Link: [text](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-purple-600 underline hover:text-purple-800 transition"
          >
            {linkMatch[1]}
          </a>
        );
      }

      return part;
    });
  };

  // Helper to parse Markdown Table
  const renderMarkdownTable = (blockText: string, keyIdx: number) => {
    const lines = blockText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return null;

    // First line is header row
    const headerLine = lines[0];
    const headerCells = headerLine
      .split("|")
      .map((c) => c.trim())
      .filter((c, i, arr) => (i === 0 || i === arr.length - 1 ? c !== "" : true));

    // Separator line check (contains `---` or `:---`)
    let dataStartIdx = 1;
    if (lines[1].includes("---") || lines[1].includes("|-")) {
      dataStartIdx = 2;
    }

    const dataRows = lines.slice(dataStartIdx).map((line) => {
      return line
        .split("|")
        .map((c) => c.trim())
        .filter((c, i, arr) => (i === 0 || i === arr.length - 1 ? c !== "" : true));
    });

    return (
      <div key={keyIdx} className="my-8 overflow-x-auto rounded-2xl border border-purple-100/80 shadow-xs bg-white">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white font-bold uppercase tracking-wider text-[11px]">
              {headerCells.map((cell, idx) => (
                <th key={idx} className="py-3.5 px-4 border-b border-purple-800/50 whitespace-nowrap">
                  {parseInlineMarkdown(cell.replace(/[*_]/g, ""))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 text-slate-700 font-sans">
            {dataRows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-purple-50/20 hover:bg-purple-50/50 transition"}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-3 px-4 leading-snug">
                    {parseInlineMarkdown(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Comprehensive content renderer supporting Tables, Horizontal Rules, Headings, Callouts, and Lists
  const renderContentBlocks = (contentStr: string) => {
    if (!contentStr) return null;

    const blocks = contentStr.split(/\n{2,}/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // 1. Horizontal Rule (`---` or `***` or `___`)
      if (/^(?:---|\*\*\*|___)$/.test(trimmed)) {
        return (
          <hr
            key={idx}
            className="my-8 border-none h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
          />
        );
      }

      // 2. Markdown Table Detection (starts or contains `| ... |`)
      if (trimmed.includes("|") && (trimmed.startsWith("|") || trimmed.includes("---"))) {
        const tableElement = renderMarkdownTable(trimmed, idx);
        if (tableElement) return tableElement;
      }

      // 3. Callout / Quote Box (`> ...`)
      if (trimmed.startsWith(">")) {
        const quoteText = trimmed.replace(/^>\s*/, "").replace(/^Note:\s*/i, "").trim();
        return (
          <div
            key={idx}
            className="my-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50/90 to-indigo-50/50 border-l-4 border-purple-600 shadow-2xs flex items-start gap-3 text-slate-800 text-sm leading-relaxed"
          >
            <Info size={18} className="text-purple-600 shrink-0 mt-0.5" />
            <div>{parseInlineMarkdown(quoteText)}</div>
          </div>
        );
      }

      // 4. H2 Heading (e.g. `## Heading` or `1. Heading` or `2. Heading`)
      const h2Match = trimmed.match(/^(?:##\s*|\d+\.\s+)(.+)$/m);
      if (h2Match) {
        const rawHeading = h2Match[1];
        const cleanHeading = rawHeading.replace(/[#*]/g, "").trim();
        const headingId = cleanHeading.toLowerCase().replace(/[^a-z0-9]/g, "-");
        
        // Extract paragraph lines following the heading line if present in same block
        const lines = trimmed.split("\n");
        const restLines = lines.slice(1).join("\n").trim();

        return (
          <div key={idx} id={headingId} className="space-y-3 pt-6 pb-2 border-b border-purple-100/60">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 inline-block shrink-0 shadow-xs" />
              {cleanHeading}
            </h2>
            {restLines && (
              <div className="text-slate-700 leading-relaxed font-sans text-base">
                {parseInlineMarkdown(restLines)}
              </div>
            )}
          </div>
        );
      }

      // 5. H3 Heading (e.g. `### Heading`)
      const h3Match = trimmed.match(/^###\s*(.+)$/m);
      if (h3Match) {
        const cleanHeading = h3Match[1].replace(/[#*]/g, "").trim();
        const headingId = cleanHeading.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const restLines = trimmed.split("\n").slice(1).join("\n").trim();

        return (
          <div key={idx} id={headingId} className="space-y-2 pt-4">
            <h3 className="text-lg font-bold text-slate-800 leading-snug flex items-center gap-2">
              <span className="text-purple-600 font-extrabold text-sm">#</span>
              {cleanHeading}
            </h3>
            {restLines && (
              <div className="text-slate-700 leading-relaxed font-sans text-base">
                {parseInlineMarkdown(restLines)}
              </div>
            )}
          </div>
        );
      }

      // 6. Bullet Lists (`- item` or `* item`)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter(Boolean).map((l) => l.replace(/^[-*]\s*/, "").trim());
        return (
          <ul key={idx} className="space-y-2.5 my-4 pl-2 border-l-2 border-purple-200/80">
            {items.map((it, i) => (
              <li key={i} className="text-slate-700 text-sm sm:text-base leading-relaxed flex items-start gap-2.5 pl-2">
                <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-1" />
                <span className="flex-1">{parseInlineMarkdown(it)}</span>
              </li>
            ))}
          </ul>
        );
      }

      // 7. Regular Paragraph
      return (
        <p key={idx} className="text-slate-700 text-base leading-relaxed font-sans">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Generate Table of Contents items dynamically from H2/H3 tags or Markdown headings
  const extractTableOfContents = (contentStr: string) => {
    if (!contentStr) return [];
    const headings: string[] = [];

    // 1. Extract HTML <h2> and <h3> tags
    const htmlRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    let match;
    while ((match = htmlRegex.exec(contentStr)) !== null) {
      const rawText = match[1].replace(/<[^>]+>/g, "").trim();
      const clean = rawText.replace(/^\d+[.)]\s*/, "").replace(/[#*_|]/g, "").trim();
      if (clean && clean.length > 2) headings.push(clean);
    }

    // 2. If no HTML headings found, extract Markdown or numbered headings
    if (headings.length === 0) {
      const blocks = contentStr.split(/\n{2,}/);
      blocks.forEach((block) => {
        const m = block.match(/^(?:##\s*|###\s*|\d+[.)]\s+)(.+)$/m);
        if (m) {
          const rawText = m[1].trim();
          const clean = rawText.replace(/^[#*_|]+|[#*_|]+$/g, "").replace(/^\d+[.)]\s*/, "").trim();
          if (clean && clean.length > 2) headings.push(clean);
        }
      });
    }

    return headings;
  };

  const activeBlog = blog || (fallbackBlogs[0] as unknown as Blog);
  const tableOfContents = extractTableOfContents(activeBlog.content).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#faf9ff] font-sans text-slate-900">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <>
            <SEO
              title={activeBlog.title}
              description={activeBlog.excerpt}
              canonicalUrl={`https://waqtmoney.com/blog/${activeBlog.slug}`}
              ogType="article"
                ogImage={getImageUrl(activeBlog.image)}
                schema={{
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: activeBlog.title,
                  description: activeBlog.excerpt,
                  author: {
                    "@type": "Organization",
                    name: activeBlog.author || "Waqt Finance Pvt Ltd"
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "Waqt Money",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://waqtmoney.com/waqt-money-logo-img.png"
                    }
                  },
                  datePublished: activeBlog.created_at || "2026-07-31"
                }}
              />

              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Link to="/" className="hover:text-purple-600 transition">Home</Link>
                <ChevronRight size={12} className="text-slate-400" />
                <Link to="/blog" className="hover:text-purple-600 transition">Blog</Link>
                <ChevronRight size={12} className="text-slate-400" />
                <span className="text-slate-900 font-bold truncate max-w-xs">{activeBlog.title}</span>
              </nav>

              {/* Category Pill & Main Title */}
              <div className="mb-6 space-y-3">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-3.5 py-1 rounded-full border border-purple-200">
                  {activeBlog.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {activeBlog.title}
                </h1>

                {/* Author & Stats Card Header */}
                <div className="mt-4 flex flex-wrap items-center gap-4 bg-white p-3.5 rounded-2xl border border-purple-100 shadow-2xs text-xs text-slate-500">
                  <span className="flex items-center gap-2 font-bold text-slate-800">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-extrabold shadow-xs">
                      WM
                    </div>
                    {activeBlog.author || "Waqt Finance Team"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar size={13} className="text-purple-500" />
                    {new Date(activeBlog.created_at || Date.now()).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock size={13} className="text-purple-500" />
                    {activeBlog.readTime || "5 Min Read"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Eye size={13} className="text-purple-500" />
                    {activeBlog.viewsCount || "142 Views"}
                  </span>
                </div>
              </div>

              {/* Hero Cover Image Banner */}
              <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 shadow-md mb-10 border border-purple-100">
                <img
                  src={getImageUrl(activeBlog.image)}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.failed) {
                      target.dataset.failed = "true";
                      target.src = "/blog-assets/blog-1-personal-loan-guide.webp";
                    }
                  }}
                />
              </div>

              {/* Main Content & Sidebar Layout */}
              <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
                {/* Left Column: Article Body */}
                <article className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-xs space-y-6">
                  {/* Lead Excerpt */}
                  {activeBlog.excerpt && (
                    <div className="text-slate-800 text-base sm:text-lg leading-relaxed font-semibold border-l-4 border-purple-600 pl-5 py-2.5 bg-gradient-to-r from-purple-50 to-purple-50/20 rounded-r-2xl">
                      {activeBlog.excerpt}
                    </div>
                  )}

                  {/* Formatted Content */}
                  <div className="blog-content-body max-w-none">
                    {activeBlog.content && /<[a-z][\s\S]*>/i.test(activeBlog.content) ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: cleanAndSanitizeBlogHtml(activeBlog.content) }}
                        className="blog-content-body max-w-none"
                      />
                    ) : (
                      renderContentBlocks(activeBlog.content)
                    )}
                  </div>
                </article>

                {/* Right Column: Unified Sticky Sidebar */}
                <aside className="lg:w-[320px] shrink-0">
                  <div className="sticky top-24 space-y-6">
                    {/* Search Box */}
                    <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                        Search Guides
                      </h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search guides..."
                          value={sidebarSearch}
                          onChange={(e) => setSidebarSearch(e.target.value)}
                          className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                        />
                        <Search size={14} className="absolute right-3 top-3 text-purple-400" />
                      </div>
                    </div>

                    {/* Table of Contents Sticky Box */}
                    {tableOfContents.length > 0 && (
                      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3">
                        <div className="flex items-center gap-2 border-b border-purple-100 pb-2.5">
                          <Sparkles size={14} className="text-purple-600" />
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                            Table of Contents
                          </h3>
                        </div>
                        <ol className="space-y-2 text-xs text-slate-600 font-medium">
                          {tableOfContents.map((heading, i) => {
                            const headingId = heading.toLowerCase().replace(/[^a-z0-9]/g, "-");
                            return (
                              <li key={i} className="hover:text-purple-600 transition truncate flex items-center gap-2">
                                <span className="text-purple-500 text-[10px] font-bold">{i + 1}.</span>
                                <a href={`#${headingId}`} className="hover:underline truncate">
                                  {heading}
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    )}

                    {/* Promotional Loan CTA Box */}
                    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 shadow-xl border border-purple-900/40 text-center space-y-4">
                      <span className="inline-block bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        INSTANT DISPURSAL
                      </span>
                      <h3 className="font-heading text-xl font-extrabold leading-snug">
                        Need Quick Funds Today?
                      </h3>
                      <p className="text-xs text-purple-200 leading-relaxed">
                        Apply for paperless loan up to ₹5,00,000 with instant bank disbursal.
                      </p>
                      <Link
                        to="/user/apply"
                        aria-label="Apply now for instant personal loan"
                        className="block w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:scale-105 transition"
                      >
                        Apply Now →
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          </div>
        </main>

      <Footer />
    </div>
  );
}
