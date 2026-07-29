import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { Search, Eye, Clock, Flame } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { fallbackBlogs } from "@/data/mockBlogs";

interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  created_at: string;
  readTime?: string;
  viewsCount?: string;
  popularRank?: number | null;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>(fallbackBlogs as unknown as Blog[]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(fallbackBlogs as unknown as Blog[]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;

  const categories = [
    "All",
    "Personal Loan",
    "Business Loan",
    "Payday Loan",
    "Short Term Loan"
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        const data = await response.json().catch(() => null);
        if (response.ok && data?.success && Array.isArray(data?.blogs) && data.blogs.length > 0) {
          setBlogs(data.blogs);
          setFilteredBlogs(data.blogs);
        } else {
          setBlogs(fallbackBlogs as unknown as Blog[]);
          setFilteredBlogs(fallbackBlogs as unknown as Blog[]);
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        setBlogs(fallbackBlogs as unknown as Blog[]);
        setFilteredBlogs(fallbackBlogs as unknown as Blog[]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...blogs];

    if (selectedCategory && selectedCategory !== "All") {
      const sc = selectedCategory.toLowerCase();
      result = result.filter((b) => {
        const cat = (b.category || "").toLowerCase();
        const title = (b.title || "").toLowerCase();
        const slug = (b.slug || "").toLowerCase();
        const excerpt = (b.excerpt || "").toLowerCase();
        const text = `${cat} ${title} ${slug} ${excerpt}`;

        if (sc.includes("personal")) {
          return text.includes("personal") || text.includes("finance") || text.includes("cibil") || text.includes("kyc") || text.includes("tax") || text.includes("80e");
        }
        if (sc.includes("business")) {
          return text.includes("business") || text.includes("msme") || text.includes("working") || text.includes("credit");
        }
        if (sc.includes("payday")) {
          return text.includes("payday") || text.includes("salary") || text.includes("debt consolidation") || text.includes("cash advance");
        }
        if (sc.includes("short")) {
          return text.includes("short") || text.includes("advance") || text.includes("emergency") || text.includes("instant");
        }
        return cat.includes(sc);
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q)
      );
    }

    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to page 1 on filter or search change
  }, [searchQuery, selectedCategory, blogs]);

  // Bulletproof Image Resolver with Guaranteed Unique Images
  const getImageUrl = (img?: string, slug?: string, category?: string, title?: string, id?: number) => {
    if (img && img.trim()) {
      let clean = img.trim();
      if (clean.startsWith("http://") || clean.startsWith("https://")) {
        return clean;
      }
      clean = clean.replace(/\.(png|jpg|jpeg)$/i, ".webp");
      if (clean.startsWith("/blog/blog-") || clean.startsWith("blog/blog-")) {
        return clean.startsWith("/") ? clean : `/${clean}`;
      }
    }

    const text = `${slug || ""} ${category || ""} ${title || ""}`.toLowerCase();

    if (text.includes("short-term-emergency") || text.includes("emergency-cash-guide")) return "/blog/blog-7-short-term-emergency.webp";
    if (text.includes("salary-advance") || text.includes("short-term-credit")) return "/blog/blog-8-salary-advance-credit.webp";
    if (text.includes("cibil") || text.includes("score")) return "/blog/blog-2-cibil-score-approval.webp";
    if (text.includes("working") || text.includes("factory")) return "/blog/blog-4-working-capital-factory.webp";
    if (text.includes("business") || text.includes("msme") || text.includes("owner")) return "/blog/blog-3-small-business-owner.webp";
    if (text.includes("payday-hygiene") || text.includes("debt consolidation")) return "/blog/blog-5-payday-cash-advance.webp";
    if (text.includes("payday") || text.includes("instant-payday")) return "/blog/blog-6-emergency-salary-loan.webp";
    if (text.includes("education") || text.includes("80e") || text.includes("tax")) return "/blog/blog-2-cibil-score-approval.webp";
    if (text.includes("aadhaar") || text.includes("kyc") || text.includes("technology")) return "/blog/blog-7-short-term-emergency.webp";

    const uniqueImages = [
      "/blog/blog-1-personal-loan-guide.webp",
      "/blog/blog-2-cibil-score-approval.webp",
      "/blog/blog-3-small-business-owner.webp",
      "/blog/blog-4-working-capital-factory.webp",
      "/blog/blog-5-payday-cash-advance.webp",
      "/blog/blog-6-emergency-salary-loan.webp",
      "/blog/blog-7-short-term-emergency.webp",
      "/blog/blog-8-salary-advance-credit.webp"
    ];

    const idx = Math.abs((id || 0) + (title ? title.length : 0)) % uniqueImages.length;
    return uniqueImages[idx];
  };

  const featuredPost = blogs.find((b) => b.popularRank === 1) || blogs[0];
  const popularReads = blogs.filter((b) => b.id !== featuredPost?.id).slice(0, 3);

  // Pagination calculation
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentDisplayedBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 700, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SEO
        title="Financial Knowledge Hub - Waqt Money"
        description="Expert financial guides on Personal Loans, Business Credit, Payday Advances, and Short Term Loans."
        keywords="financial blog, personal loan tips, business credit, payday loan, short term loan"
      />
      <Navbar />

      {/* Header Banner - Waqt Money Purple Theme */}
      <header className="pt-28 pb-14 bg-gradient-to-br from-purple-950 via-slate-900 to-purple-950 text-white text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-3 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
            Waqt Learning Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Financial Knowledge Hub
          </h1>
          <p className="text-purple-200/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Expert guides, smart loan tips, and financial updates for Personal, Business, Payday, and Short Term credit needs.
          </p>

          {/* Centered Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-purple-300">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search guides by title, keywords or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-purple-300/60 shadow-inner backdrop-blur"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section: Featured Post (Left) + Popular Reads (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="h-96 bg-white rounded-3xl animate-pulse border border-slate-100 shadow-sm" />
        ) : featuredPost ? (
          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {/* Left: Featured Large Card (Spans 2 Columns) */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition">
              <div className="md:w-1/2 relative bg-slate-100 min-h-[260px]">
                <img
                  src={getImageUrl(featuredPost.image, featuredPost.slug, featuredPost.category, featuredPost.title, featuredPost.id)}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-purple-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  FEATURED ARTICLE
                </span>
              </div>
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full inline-block mb-3 border border-purple-100">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug hover:text-purple-600 transition">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-slate-400" />
                    {featuredPost.readTime || "5 Min Read"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={13} className="text-slate-400" />
                    {featuredPost.viewsCount || "92 Views"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Popular Reads Box (1 Column) */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-purple-50 pb-3 mb-4">
                  <Flame size={18} className="text-amber-500" />
                  <h3 className="font-bold text-base text-slate-900">Popular Reads</h3>
                </div>

                <div className="space-y-4">
                  {popularReads.map((pop, idx) => (
                    <div key={pop.id} className="flex items-start gap-3 group">
                      <span className="text-2xl font-black text-purple-600 font-mono leading-none">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <Link
                          to={`/blog/${pop.slug}`}
                          className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-purple-600 transition line-clamp-2"
                        >
                          {pop.title}
                        </Link>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Eye size={11} />
                            {pop.viewsCount || "84 Views"}
                          </span>
                          <span>•</span>
                          <span className="text-purple-600 font-semibold">{pop.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Category Tabs Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow shadow-purple-600/20"
                  : "bg-white text-slate-700 hover:bg-purple-50 border border-slate-200"
              }`}
            >
              {cat === "All" ? "All Topics" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3-Column Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : currentDisplayedBlogs.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-slate-100 text-center text-slate-400 font-semibold shadow-sm">
            No blog posts found matching your search or category choice.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentDisplayedBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition duration-300 group"
              >
                <div>
                  {/* Top Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getImageUrl(blog.image, blog.slug, blog.category, blog.title, blog.id)}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-extrabold text-purple-700 uppercase tracking-wider shadow-sm border border-purple-50">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-2 group-hover:text-purple-600 transition">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <Link
                      to={`/blog/${blog.slug}`}
                      aria-label={`Read full article: ${blog.title}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-purple-600 hover:text-purple-700 pt-2"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {blog.readTime || "5 Min Read"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {blog.viewsCount || "80 Views"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Real Interactive Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-purple-50 disabled:opacity-40 disabled:hover:bg-white transition"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  currentPage === pageNum
                    ? "bg-purple-600 text-white shadow shadow-purple-600/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-purple-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-purple-50 disabled:opacity-40 disabled:hover:bg-white transition"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden border border-purple-900/40">
          <span className="inline-block bg-purple-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Stay Ahead on Your Finances
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Get Weekly Financial Wisdom In Your Inbox
          </h2>
          <p className="text-purple-200 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Join our newsletter to receive the latest credit guides and personal finance tips directly in your inbox.
          </p>

          <div className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-purple-300/60"
            />
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition shadow shrink-0">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-purple-800/40">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Need Funds For Your Business or Personal Needs?</h3>
            <p className="text-purple-200 text-xs sm:text-sm mt-1">
              Apply today and receive quick approval with transparent digital documentation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/apply"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              Talk To Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
