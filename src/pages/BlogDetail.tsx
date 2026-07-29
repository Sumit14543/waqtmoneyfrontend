import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Eye,
  Search,
  Facebook,
  Twitter,
  Linkedin,
  Send
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";
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

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
        const data = await response.json();
        if (data.success && data.blog) {
          setBlog(data.blog);
        } else {
          // Fallback to local array
          const found = fallbackBlogs.find((b) => b.slug === slug || String(b.id) === slug);
          if (found) {
            setBlog(found as any);
          } else {
            setError("Blog article not found");
          }
        }
      } catch (err) {
        const found = fallbackBlogs.find((b) => b.slug === slug || String(b.id) === slug);
        if (found) {
          setBlog(found as any);
        } else {
          setError("Server not reachable");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  const getImageUrl = (imgPath?: string) => {
    if (!imgPath) return "/blog/blog-1-personal-loan-guide.webp";
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return imgPath;
    if (imgPath.startsWith("/blog/") || imgPath.startsWith("/uploads/")) return imgPath;
    return `/blog/${imgPath}`;
  };

  // Helper function to render Markdown cleanly without raw ## or **
  const parseInlineMarkdown = (text: string) => {
    let cleanText = text.replace(/^#{1,4}\s*/, "");
    const parts = cleanText.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <Link
            key={i}
            to={linkMatch[2]}
            className="font-bold text-purple-600 hover:text-purple-800 hover:underline"
          >
            {linkMatch[1]}
          </Link>
        );
      }

      return part;
    });
  };

  const renderFormattedMarkdown = (contentStr: string) => {
    if (!contentStr) return null;
    const blocks = contentStr.split(/\n{2,}/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H2 Heading (e.g. ## Heading or 1. Heading)
      const h2Match = trimmed.match(/^(?:##\s*|\d+\.\s+)(.+)$/m);
      if (h2Match) {
        const headingText = h2Match[1].replace(/[\#\*]/g, "").trim();
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const restLines = trimmed.split("\n").slice(1).join("\n").trim();

        return (
          <div key={idx} id={headingId} className="space-y-3 pt-6 pb-2 border-b border-purple-100/60">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-600 inline-block shrink-0" />
              {headingText}
            </h2>
            {restLines && <div className="text-slate-700 leading-relaxed font-sans">{parseInlineMarkdown(restLines)}</div>}
          </div>
        );
      }

      // H3 Heading (e.g. ### Heading)
      const h3Match = trimmed.match(/^###\s*(.+)$/m);
      if (h3Match) {
        const headingText = h3Match[1].replace(/[\#\*]/g, "").trim();
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const restLines = trimmed.split("\n").slice(1).join("\n").trim();

        return (
          <div key={idx} id={headingId} className="space-y-2 pt-4">
            <h3 className="text-lg font-bold text-slate-800 leading-snug">
              {headingText}
            </h3>
            {restLines && <div className="text-slate-700 leading-relaxed font-sans">{parseInlineMarkdown(restLines)}</div>}
          </div>
        );
      }

      // Bullet Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((l) => l.replace(/^[-*]\s*/, "").trim());
        return (
          <ul key={idx} className="space-y-2 my-4 pl-4 border-l-2 border-purple-200">
            {items.map((it, i) => (
              <li key={i} className="text-slate-700 leading-relaxed flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>{parseInlineMarkdown(it)}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Regular Paragraph
      return (
        <p key={idx} className="text-slate-700 text-base leading-relaxed font-sans">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Generate Table of Contents items dynamically
  const extractTableOfContents = (contentStr: string) => {
    if (!contentStr) return [];
    const headings: string[] = [];
    const blocks = contentStr.split(/\n{2,}/);
    blocks.forEach((block) => {
      const match = block.match(/^(?:##\s*|###\s*|\d+\.\s+)(.+)$/m);
      if (match) {
        const clean = match[1].replace(/[\#\*]/g, "").trim();
        if (clean.length > 3) headings.push(clean);
      }
    });
    return headings;
  };

  const tableOfContents = blog ? extractTableOfContents(blog.content) : [];

  return (
    <div className="min-h-screen bg-[#faf9ff]">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-slate-200 rounded-xl w-1/3" />
              <div className="h-12 bg-slate-200 rounded-xl w-3/4" />
              <div className="h-96 bg-slate-200 rounded-3xl w-full" />
            </div>
          ) : error || !blog ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-purple-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h2>
              <p className="text-slate-600 mb-6">{error || "The requested blog post could not be located."}</p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-purple-700 transition shadow-md"
              >
                <ArrowLeft size={16} />
                Back to Blog Hub
              </Link>
            </div>
          ) : (
            <>
              <SEO
                title={blog.title}
                description={blog.excerpt}
                ogType="article"
                ogImage={getImageUrl(blog.image)}
                schema={{
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  "headline": blog.title,
                  "description": blog.excerpt,
                  "author": {
                    "@type": "Organization",
                    "name": blog.author || "Waqt Finance Pvt Ltd"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Waqt Money",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://waqtmoney.com/waqt-money-logo-img.png"
                    }
                  },
                  "datePublished": blog.created_at || "2026-07-21"
                }}
              />

              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Link to="/" className="hover:text-purple-600">Home</Link>
                <ChevronRight size={12} />
                <Link to="/blog" className="hover:text-purple-600">Blog</Link>
                <ChevronRight size={12} />
                <span className="text-slate-900 truncate max-w-xs">{blog.title}</span>
              </nav>

              {/* Category Pill & Main Title */}
              <div className="mb-6 space-y-3">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
                  {blog.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {blog.title}
                </h1>

                {/* Author & Stats Card Header */}
                <div className="mt-4 flex flex-wrap items-center gap-4 bg-white p-3.5 rounded-2xl border border-purple-100 shadow-2xs text-xs text-slate-500">
                  <span className="flex items-center gap-2 font-bold text-slate-800">
                    <div className="h-7 w-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-extrabold">
                      WM
                    </div>
                    {blog.author || "Waqt Finance Team"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar size={13} className="text-purple-500" />
                    {new Date(blog.created_at || Date.now()).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock size={13} className="text-purple-500" />
                    {blog.readTime || "5 Min Read"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Eye size={13} className="text-purple-500" />
                    {blog.viewsCount || "142 Views"}
                  </span>
                </div>
              </div>

              {/* Hero Cover Image Banner */}
              <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 shadow-md mb-10 border border-slate-100">
                <img
                  src={getImageUrl(blog.image)}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Content & Sidebar Layout */}
              <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
                {/* Left Column: Article Body */}
                <article className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-sm space-y-6">
                  {/* Lead Excerpt */}
                  <div className="text-slate-700 text-base sm:text-lg leading-relaxed font-semibold border-l-4 border-purple-600 pl-5 py-2 bg-purple-50/60 rounded-r-2xl">
                    {blog.excerpt}
                  </div>

                  {/* Formatted Content without raw ## or ** */}
                  <div className="text-slate-700 text-base leading-relaxed space-y-6 font-sans">
                    {renderFormattedMarkdown(blog.content)}
                  </div>
                </article>

                {/* Right Column: Sticky Sidebar */}
                <aside className="space-y-6">
                  {/* Search Box */}
                  <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Search Guides</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search guides..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-purple-600"
                      />
                      <Search size={14} className="absolute right-3 top-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Table of Contents Sticky Box */}
                  {tableOfContents.length > 0 && (
                    <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-3 sticky top-24">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2.5">
                        Table of Contents
                      </h3>
                      <ol className="space-y-2 text-xs text-slate-600 font-medium">
                        {tableOfContents.map((heading, i) => {
                          const headingId = heading.toLowerCase().replace(/[^a-z0-9]/g, "-");
                          return (
                            <li key={i} className="hover:text-purple-600 transition truncate">
                              <a href={`#${headingId}`} className="block py-1 hover:underline">
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
                    <span className="inline-block bg-purple-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      INSTANT DECISION
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
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
