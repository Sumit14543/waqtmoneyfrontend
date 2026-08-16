import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { Search, Eye, Clock, Flame, X, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { API_BASE_URL, getBlogImageUrl } from "@/config/api";
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
  const POSTS_PER_PAGE = 6;

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
          const activeOnly = data.blogs.filter(
            (b: Record<string, unknown>) => String(b.status || "ACTIVE").toUpperCase() !== "INACTIVE"
          );
          setBlogs(activeOnly);
          setFilteredBlogs(activeOnly);
        } else {
          const activeOnly = fallbackBlogs.filter(
            (b) => String(b.status || "ACTIVE").toUpperCase() !== "INACTIVE"
          );
          setBlogs(activeOnly as unknown as Blog[]);
          setFilteredBlogs(activeOnly as unknown as Blog[]);
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
      const sc = selectedCategory.toLowerCase().trim();
      result = result.filter((b) => {
        const cat = (b.category || "").toLowerCase().trim();
        const title = (b.title || "").toLowerCase();
        const slug = (b.slug || "").toLowerCase();
        const excerpt = (b.excerpt || "").toLowerCase();
        const text = `${cat} ${title} ${slug} ${excerpt}`;

        if (cat === sc || cat.includes(sc)) return true;
        if (sc.includes("personal")) {
          return text.includes("personal") || text.includes("finance") || text.includes("cibil") || text.includes("kyc");
        }
        if (sc.includes("business")) {
          return text.includes("business") || text.includes("msme") || text.includes("working");
        }
        if (sc.includes("payday")) {
          return text.includes("payday") || text.includes("salary") || text.includes("advance");
        }
        if (sc.includes("short")) {
          return text.includes("short") || text.includes("emergency") || text.includes("instant");
        }
        return false;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          (b.category && b.category.toLowerCase().includes(q))
      );
    }

    setFilteredBlogs(result);
    setCurrentPage(1); // Reset to page 1 on filter or search change
  }, [searchQuery, selectedCategory, blogs]);

  // Image Resolver with Fallbacks
  const getImageUrl = (img?: string, slug?: string, category?: string, title?: string, id?: number) => {
    if (img && img.trim()) {
      return getBlogImageUrl(img);
    }

    const text = `${slug || ""} ${category || ""} ${title || ""}`.toLowerCase();

    if (text.includes("short-term-emergency") || text.includes("emergency-cash-guide")) return "/blog-assets/blog-7-short-term-emergency.webp";
    if (text.includes("salary-advance") || text.includes("short-term-credit")) return "/blog-assets/blog-8-salary-advance-credit.webp";
    if (text.includes("cibil") || text.includes("score")) return "/blog-assets/blog-2-cibil-score-approval.webp";
    if (text.includes("working") || text.includes("factory")) return "/blog-assets/blog-4-working-capital-factory.webp";
    if (text.includes("business") || text.includes("msme") || text.includes("owner")) return "/blog-assets/blog-3-small-business-owner.webp";
    if (text.includes("payday-hygiene") || text.includes("debt consolidation")) return "/blog-assets/blog-5-payday-cash-advance.webp";
    if (text.includes("payday") || text.includes("instant-payday")) return "/blog-assets/blog-6-emergency-salary-loan.webp";

    const uniqueImages = [
      "/blog-assets/blog-1-personal-loan-guide.webp",
      "/blog-assets/blog-2-cibil-score-approval.webp",
      "/blog-assets/blog-3-small-business-owner.webp",
      "/blog-assets/blog-4-working-capital-factory.webp",
      "/blog-assets/blog-5-payday-cash-advance.webp",
      "/blog-assets/blog-6-emergency-salary-loan.webp",
      "/blog-assets/blog-7-short-term-emergency.webp",
      "/blog-assets/blog-8-salary-advance-credit.webp"
    ];

    const idx = Math.abs((id || 0) + (title ? title.length : 0)) % uniqueImages.length;
    return uniqueImages[idx];
  };

  const featuredPost = blogs.find((b) => b.popularRank === 1) || blogs[0];
  const popularReads = blogs.filter((b) => b.id !== featuredPost?.id).slice(0, 4);

  // Pagination calculation
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentDisplayedBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://waqtmoney.com/blog#blog",
      "name": "Waqt Money Financial Knowledge Hub",
      "description": "Expert guides and articles on Personal Loans, Business Credit, Payday Advances, CIBIL Score improvement, and Short Term Loans for salaried professionals in India.",
      "url": "https://waqtmoney.com/blog",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://waqtmoney.com/#website",
        "name": "Waqt Money",
        "url": "https://waqtmoney.com"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://waqtmoney.com/#organization",
        "name": "Waqt Money",
        "logo": {
          "@type": "ImageObject",
          "url": "https://waqtmoney.com/waqt-money-logo-imgg.png"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://waqtmoney.com/blog#articles",
      "name": "Waqt Money Blog Articles — Page 1",
      "url": "https://waqtmoney.com/blog",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://waqtmoney.com/blog/10-mistakes-to-avoid-before-applying-for-an-online-personal-loan",
          "name": "10 Mistakes to Avoid Before Applying for an Online Personal Loan",
          "description": "Avoid the top 10 mistakes before applying for an online personal loan. Learn expert tips to improve approval chances and apply with confidence today!",
          "image": "https://api.waqtmoney.com/uploads/1785934449625-2a5908fd-9c14-41a6-9d2b-ccb2730cbc74.webp"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://waqtmoney.com/blog/how-to-compare-personal-loan-offers-and-choose-the-best-one-for-your-needs",
          "name": "How to Compare Personal Loan Offers and Choose the Best One for Your Needs",
          "description": "Learn how to compare personal loan offers based on interest rates, EMIs, fees, and eligibility. Choose the best loan and apply online today!",
          "image": "https://api.waqtmoney.com/uploads/1785993156602-09d03f97-775d-4b0f-923f-5b329010361a.webp"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://waqtmoney.com/blog/what-documents-are-required-for-a-personal-loan-in-india",
          "name": "What Documents Are Required for a Personal Loan in India?",
          "description": "Learn which documents are required for a personal loan in India. Check the complete list, eligibility, verification process, and apply online today!",
          "image": "https://api.waqtmoney.com/uploads/1785993480686-4a14cceb-4f96-4b53-857f-eb6a9071c4a3.webp"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": "https://waqtmoney.com/blog/how-to-check-your-personal-loan-eligibility-before-applying-online",
          "name": "How to Check Your Personal Loan Eligibility Before Applying Online",
          "description": "Learn how to check your personal loan eligibility before applying online. Understand income, CIBIL score, documents, and apply with confidence today!",
          "image": "https://api.waqtmoney.com/uploads/1785994167108-f539a14b-a519-449b-b66d-b776cdbf845a.webp"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "url": "https://waqtmoney.com/blog/can-you-get-a-personal-loan-with-a-low-cibil-score",
          "name": "Can You Get a Personal Loan with a Low CIBIL Score?",
          "description": "Learn how to get a personal loan with a low CIBIL score. Explore eligibility, lender requirements, approval tips, and apply online today!",
          "image": "https://api.waqtmoney.com/uploads/1785994476562-c8ca83e3-1981-4613-8720-fd9157029977.webp"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "url": "https://waqtmoney.com/blog/salary-advance-loan-vs-payday-loan-key-differences-every-salaried-employee-should-know",
          "name": "Salary Advance Loan vs Payday Loan: Key Differences Every Salaried Employee Should Know",
          "description": "Compare salary advance loans vs payday loans to understand eligibility, interest rates, repayment, and choose the right option. Apply online today!",
          "image": "https://api.waqtmoney.com/uploads/1785910515584-dc41d4d2-7ab6-4cc3-8892-5f0e503a608d.png"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://waqtmoney.com/#website",
      "name": "Waqt Money",
      "url": "https://waqtmoney.com",
      "description": "Waqt Money — Instant Personal Loans, Payday Loans, Business Loans & Financial Guides for Salaried Professionals in India.",
      "publisher": {
        "@type": "Organization",
        "@id": "https://waqtmoney.com/#organization",
        "name": "Waqt Money"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://waqtmoney.com/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://waqtmoney.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Financial Knowledge Hub",
          "item": "https://waqtmoney.com/blog"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9ff] font-sans text-slate-900">
      <SEO
        title="Financial Knowledge Hub - Waqt Money"
        description="Expert financial guides on Personal Loans, Business Credit, Payday Advances, and Short Term Loans."
        keywords="financial blog, personal loan tips, business credit, payday loan, short term loan"
        canonicalUrl="https://waqtmoney.com/blog"
        schema={schema}
      />
      <Navbar />

      {/* Header Hero Banner - Deep Indigo/Purple Premium Gradient */}
      <header className="pt-28 pb-16 bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white text-center px-4 relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30 shadow-xs">
            <Sparkles size={13} className="text-purple-400" />
            Waqt Financial Insights & Guides
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Smart Borrowing & Finance Hub
          </h1>

          <p className="text-purple-200/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Clear, actionable financial advice on Personal Loans, Business Credit, CIBIL Scores, and Instant Salary Advances.
          </p>

          {/* Interactive Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-purple-300 pointer-events-none">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search articles by title, keywords or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-purple-900/40 border border-purple-700/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-purple-300/60 shadow-inner backdrop-blur transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-300 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Section: Featured Large Card + Trending Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="h-96 bg-white rounded-3xl animate-pulse border border-purple-100 shadow-xs" />
        ) : featuredPost ? (
          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {/* Featured Article Card (2 Cols - Image Top, Details Bottom) */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-purple-100/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-xl transition duration-300 group">
              <div>
                {/* Top Image Banner */}
                <div className="relative aspect-[16/6] w-full overflow-hidden bg-slate-100 border-b border-purple-50">
                  <img
                    src={getImageUrl(featuredPost.image, featuredPost.slug, featuredPost.category, featuredPost.title, featuredPost.id)}
                    alt={featuredPost.title}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-purple-600 transition">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>

              {/* Action & Metadata Footer Bar */}
              <div className="px-6 sm:px-7 py-4 border-t border-purple-50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-purple-600" />
                    {featuredPost.readTime || "5 Min Read"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} className="text-purple-600" />
                    {featuredPost.viewsCount || "92 Views"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200 shrink-0">
                    {featuredPost.category}
                  </span>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-600 hover:text-purple-800 transition"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Trending Reads */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-purple-100 pb-3 mb-4">
                  <Flame size={18} className="text-amber-500 fill-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900">Trending Reads</h3>
                </div>

                <div className="space-y-4">
                  {popularReads.map((pop, idx) => (
                    <div key={pop.id} className="flex items-start gap-3 group border-b border-purple-50 pb-3 last:border-0 last:pb-0">
                      <span className="text-xl font-black text-purple-600 font-mono leading-none pt-0.5">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <Link
                          to={`/blog/${pop.slug}`}
                          className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-purple-600 transition line-clamp-2 leading-snug"
                        >
                          {pop.title}
                        </Link>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Eye size={11} className="text-purple-400" />
                            {pop.viewsCount || "84 Views"}
                          </span>
                          <span>•</span>
                          <span className="text-purple-600 font-bold">{pop.category}</span>
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

      {/* Category Pill Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 shadow-2xs ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                  : "bg-white text-slate-700 hover:bg-purple-50 border border-purple-100 hover:border-purple-200"
              }`}
            >
              {cat === "All" ? "All Topics" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Article Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl border border-purple-100 animate-pulse" />
            ))}
          </div>
        ) : currentDisplayedBlogs.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-purple-100 text-center text-slate-500 font-semibold shadow-xs max-w-xl mx-auto space-y-4">
            <BookOpen size={40} className="mx-auto text-purple-400" />
            <h3 className="text-lg font-bold text-slate-800">No Articles Found</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any guides matching "{searchQuery || selectedCategory}". Try clearing your search or picking another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow hover:bg-purple-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentDisplayedBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-3xl border border-purple-100 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative aspect-[16/7] overflow-hidden bg-slate-100">
                    <img
                      src={getImageUrl(blog.image, blog.slug, blog.category, blog.title, blog.id)}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug line-clamp-2 group-hover:text-purple-600 transition">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 gap-2">
                      <Link
                        to={`/blog/${blog.slug}`}
                        aria-label={`Read full article: ${blog.title}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-600 hover:text-purple-800 transition"
                      >
                        Read Full Article <ArrowRight size={14} />
                      </Link>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-1 rounded-full border border-purple-200 shrink-0">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 py-4 border-t border-purple-50 flex items-center justify-between text-[11px] text-slate-400 font-medium bg-purple-50/20">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-purple-400" />
                    {blog.readTime || "5 Min Read"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={13} className="text-purple-400" />
                    {blog.viewsCount || "80 Views"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white border border-purple-100 text-xs font-bold text-slate-700 hover:bg-purple-50 disabled:opacity-40 disabled:hover:bg-white transition shadow-2xs"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-2xs ${
                  currentPage === pageNum
                    ? "bg-purple-600 text-white shadow-purple-600/30"
                    : "bg-white border border-purple-100 text-slate-700 hover:bg-purple-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white border border-purple-100 text-xs font-bold text-slate-700 hover:bg-purple-50 disabled:opacity-40 disabled:hover:bg-white transition shadow-2xs"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden border border-purple-900/40">
          <span className="inline-block bg-purple-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-xs">
            Financial Literacy Newsletter
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Get Weekly Credit Tips In Your Inbox
          </h2>
          <p className="text-purple-200 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Subscribe to receive expert guides on improving CIBIL scores, applying for instant loans, and managing debt.
          </p>

          <div className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-purple-300/60 shadow-inner"
            />
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-xl transition shadow-md shrink-0">
              Subscribe Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
