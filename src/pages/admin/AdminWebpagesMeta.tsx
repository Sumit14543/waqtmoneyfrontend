import React, { useState, useEffect } from "react";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  DEFAULT_WEBPAGES,
  WebpageMeta,
  getWebpageMeta,
  saveWebpageMeta,
  resetWebpageMeta,
  syncWebpagesMetaWithApi,
  WebpageFAQ
} from "@/utils/webpageMetaStorage";
import {
  Search,
  Globe,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
  Eye,
  Smartphone,
  Monitor,
  Sparkles,
  Layers,
  FileCode,
  Tag
} from "lucide-react";
import { toast } from "sonner";

export default function AdminWebpagesMeta() {
  const [pages, setPages] = useState<WebpageMeta[]>(DEFAULT_WEBPAGES);
  const [selectedPath, setSelectedPath] = useState<string>("/");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [saving, setSaving] = useState(false);
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">("desktop");
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  // Form Fields State for Selected Page
  const [pageName, setPageName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [faqs, setFaqs] = useState<WebpageFAQ[]>([]);
  const [customSchemaJson, setCustomSchemaJson] = useState("");

  // Load latest data from API & LocalStorage
  const refreshPages = async () => {
    const map = await syncWebpagesMetaWithApi();
    const updated = DEFAULT_WEBPAGES.map((p) => {
      const custom = map[p.path];
      return custom ? { ...p, ...custom } : { ...p };
    });
    setPages(updated);
  };

  useEffect(() => {
    refreshPages();
  }, []);

  // Update form inputs when selected page changes
  useEffect(() => {
    const current = getWebpageMeta(selectedPath);
    setPageName(current.pageName || "");
    setMetaTitle(current.metaTitle || "");
    setMetaDescription(current.metaDescription || "");
    setKeywords(current.keywords || "");
    setCanonicalUrl(current.canonicalUrl || `https://waqtmoney.com${current.path}`);
    setOgImage(current.ogImage || "/landing_banner_img.webp");
    setRobots(current.robots || "index, follow");
    setFaqs(current.faqs && current.faqs.length > 0 ? current.faqs : [{ question: "", answer: "" }]);
    setCustomSchemaJson(current.customSchemaJson || "");
    setShowJsonPreview(false);
  }, [selectedPath]);

  // Filtered pages list
  const filteredPages = pages.filter((page) => {
    const matchesCategory =
      selectedCategory === "All" || page.category === selectedCategory;
    const matchesSearch =
      page.pageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.path.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedPageObj = pages.find((p) => p.path === selectedPath) || DEFAULT_WEBPAGES[0];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const validFaqs = faqs.filter((f) => f.question.trim() && f.answer.trim());

    // Validate custom schema if provided
    if (customSchemaJson.trim()) {
      try {
        JSON.parse(customSchemaJson);
      } catch (err) {
        toast.error("Invalid Custom Schema JSON format. Please check syntax.");
        setSaving(false);
        return;
      }
    }

    const payload: Partial<WebpageMeta> = {
      pageName,
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      keywords: keywords.trim(),
      canonicalUrl: canonicalUrl.trim(),
      ogImage: ogImage.trim(),
      robots,
      faqs: validFaqs,
      customSchemaJson: customSchemaJson.trim()
    };

    const ok = await saveWebpageMeta(selectedPath, payload);
    setSaving(false);

    if (ok) {
      toast.success(`Metadata for ${selectedPageObj.pageName} saved successfully!`);
      await refreshPages();
    } else {
      toast.error("Failed to save metadata to server.");
    }
  };

  const handleReset = async () => {
    if (window.confirm(`Reset ${selectedPageObj.pageName} back to default system metadata?`)) {
      await resetWebpageMeta(selectedPath);
      toast.info(`Metadata reset to default for ${selectedPageObj.pageName}`);
      await refreshPages();
      const current = getWebpageMeta(selectedPath);
      setMetaTitle(current.metaTitle || "");
      setMetaDescription(current.metaDescription || "");
      setKeywords(current.keywords || "");
      setCanonicalUrl(current.canonicalUrl || `https://waqtmoney.com${current.path}`);
      setOgImage(current.ogImage || "/landing_banner_img.webp");
      setRobots(current.robots || "index, follow");
      setFaqs(current.faqs && current.faqs.length > 0 ? current.faqs : [{ question: "", answer: "" }]);
      setCustomSchemaJson("");
    }
  };

  const categories = ["All", "Core", "Loans", "Locations", "Legal", "Tools"];

  // Character counter helper colors
  const getTitleColor = (len: number) => {
    if (len >= 45 && len <= 60) return "text-emerald-600";
    if (len > 60) return "text-rose-500 font-bold";
    return "text-amber-500";
  };

  const getDescColor = (len: number) => {
    if (len >= 130 && len <= 160) return "text-emerald-600";
    if (len > 160) return "text-rose-500 font-bold";
    return "text-amber-500";
  };

  return (
    <AdminLayout>
      <SEO title="Webpages SEO & Metadata Manager - Waqt Admin" robots="noindex, nofollow" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                <Globe size={22} />
              </span>
              Webpages Metadata & SEO Manager
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Customize Meta Titles, Descriptions, Google FAQ Schemas, and Canonical URLs across all pages
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
              Total Pages: {pages.length}
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Pages Directory Sidebar + Metadata Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Pages Directory List (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col max-h-[820px]">
            {/* Search & Filter Header */}
            <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search page name or path..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-600 transition"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Pages List */}
            <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-2 space-y-1">
              {filteredPages.map((p) => {
                const isSelected = p.path === selectedPath;
                return (
                  <button
                    key={p.path}
                    type="button"
                    onClick={() => setSelectedPath(p.path)}
                    className={`w-full text-left p-3 rounded-2xl transition flex items-center justify-between group ${
                      isSelected
                        ? "bg-purple-50/80 border border-purple-200 text-purple-900 shadow-2xs"
                        : "hover:bg-slate-50 border border-transparent text-slate-700"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold truncate block">{p.pageName}</span>
                        {p.isCustomized && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" title="Customized" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate block mt-0.5">
                        {p.path}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shrink-0 ${
                        isSelected
                          ? "bg-purple-200 text-purple-800"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      {p.category}
                    </span>
                  </button>
                );
              })}

              {filteredPages.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400 font-medium">
                  No pages match your filter
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Metadata & FAQ Schema Editor (Spans 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Card Header */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-slate-900">{pageName}</h2>
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg">
                        {selectedPath}
                      </span>
                      {selectedPageObj.isCustomized ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                          Customized
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                          System Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Configure search engine appearance and Google Rich Snippet schemas
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={selectedPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                    >
                      <ExternalLink size={12} />
                      View Live
                    </a>
                    {selectedPageObj.isCustomized && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition"
                      >
                        <RotateCcw size={12} />
                        Reset
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition disabled:opacity-50"
                    >
                      <Save size={13} />
                      {saving ? "Saving..." : "Save Meta"}
                    </button>
                  </div>
                </div>

                {/* Live Google Search Snippet Preview */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-purple-600" />
                      Live Google Search Snippet Preview
                    </span>
                    <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setDevicePreview("desktop")}
                        className={`p-1 rounded text-xs ${
                          devicePreview === "desktop"
                            ? "bg-purple-100 text-purple-700"
                            : "text-slate-400 hover:text-slate-700"
                        }`}
                        title="Desktop Preview"
                      >
                        <Monitor size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDevicePreview("mobile")}
                        className={`p-1 rounded text-xs ${
                          devicePreview === "mobile"
                            ? "bg-purple-100 text-purple-700"
                            : "text-slate-400 hover:text-slate-700"
                        }`}
                        title="Mobile Preview"
                      >
                        <Smartphone size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Preview Box */}
                  <div
                    className={`bg-white p-4 rounded-xl border border-slate-200 font-sans transition-all ${
                      devicePreview === "mobile" ? "max-w-sm mx-auto shadow-sm" : "w-full"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src="/favicon-32x32.png"
                        alt="favicon"
                        className="w-4 h-4 rounded-full border border-slate-200"
                      />
                      <div className="leading-tight">
                        <span className="text-xs text-slate-800 font-medium block">Waqt Money</span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {canonicalUrl || `https://waqtmoney.com${selectedPath}`}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer leading-snug truncate">
                      {metaTitle || `${pageName} - Waqt Money`}
                    </h3>
                    <p className="text-xs text-[#4d5156] mt-1 leading-relaxed line-clamp-2">
                      {metaDescription ||
                        "Instant personal loans, payday loans, and business loans online with Waqt Money. Quick approvals and paperless verification."}
                    </p>

                    {/* Rich FAQ Snippet Preview if FAQs exist */}
                    {faqs.some((f) => f.question.trim()) && (
                      <div className="mt-3 pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          FAQ Rich Snippets (Google Dropdowns):
                        </span>
                        {faqs.slice(0, 2).map((faq, idx) =>
                          faq.question.trim() ? (
                            <div key={idx} className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                              <span className="text-purple-600 font-bold">›</span>
                              <span className="hover:underline cursor-pointer">{faq.question}</span>
                            </div>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 1: Standard Meta Fields */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Tag size={14} className="text-purple-600" />
                    Essential Metadata
                  </h3>

                  {/* Meta Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">Meta Title</label>
                      <span className={`text-[10px] ${getTitleColor(metaTitle.length)}`}>
                        {metaTitle.length}/60 characters (Recommended: 50-60)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="e.g. Instant Personal Loan in India | Waqt Money"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">Meta Description</label>
                      <span className={`text-[10px] ${getDescColor(metaDescription.length)}`}>
                        {metaDescription.length}/160 characters (Recommended: 130-160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Enter a compelling summary for search engine results..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                    />
                  </div>

                  {/* Keywords & Canonical URL Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Focus Keywords (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="personal loan, quick cash, instant approval"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Canonical URL
                      </label>
                      <input
                        type="text"
                        value={canonicalUrl}
                        onChange={(e) => setCanonicalUrl(e.target.value)}
                        placeholder="https://waqtmoney.com/..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                      />
                    </div>
                  </div>

                  {/* OG Image & Robots Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Social Share / OG Image URL
                      </label>
                      <input
                        type="text"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="/landing_banner_img.webp"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Robots Crawl Directive
                      </label>
                      <select
                        value={robots}
                        onChange={(e) => setRobots(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                      >
                        <option value="index, follow">index, follow (Standard Public Page)</option>
                        <option value="noindex, follow">noindex, follow (Hide from search, follow links)</option>
                        <option value="noindex, nofollow">noindex, nofollow (Strict Private / Block)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Google FAQ Schema Builder for this Webpage */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <HelpCircle size={14} className="text-purple-600" />
                        Webpage FAQ Schema Builder (Google Rich Snippets)
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Add Question & Answer pairs for this page. They are automatically injected into the page's Schema.org FAQPage JSON-LD.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 transition flex items-center gap-1 shadow-2xs"
                    >
                      <Plus size={13} />
                      Add FAQ
                    </button>
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-2xs space-y-2.5 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                            FAQ Question #{index + 1}
                          </span>
                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const next = [...faqs];
                                  const temp = next[index - 1];
                                  next[index - 1] = next[index];
                                  next[index] = temp;
                                  setFaqs(next);
                                }}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white"
                                title="Move Up"
                              >
                                <ChevronUp size={13} />
                              </button>
                            )}
                            {index < faqs.length - 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const next = [...faqs];
                                  const temp = next[index + 1];
                                  next[index + 1] = next[index];
                                  next[index] = temp;
                                  setFaqs(next);
                                }}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white"
                                title="Move Down"
                              >
                                <ChevronDown size={13} />
                              </button>
                            )}
                            {faqs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                                className="p-1 rounded-md text-rose-500 hover:bg-rose-100"
                                title="Delete FAQ"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-1">
                            Question:
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. What documents are needed to apply?"
                            value={faq.question}
                            onChange={(e) => {
                              const next = [...faqs];
                              next[index].question = e.target.value;
                              setFaqs(next);
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-purple-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-1">
                            Answer:
                          </label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Aadhaar card, PAN card, and 3 months bank statement."
                            value={faq.answer}
                            onChange={(e) => {
                              const next = [...faqs];
                              next[index].answer = e.target.value;
                              setFaqs(next);
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-normal text-slate-800 outline-none focus:ring-2 focus:ring-purple-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Schema Preview */}
                  {faqs.some((f) => f.question.trim() && f.answer.trim()) && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowJsonPreview(!showJsonPreview)}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1.5"
                      >
                        <Eye size={13} />
                        {showJsonPreview ? "Hide" : "Preview"} Injected FAQPage JSON-LD Schema
                      </button>

                      {showJsonPreview && (
                        <div className="mt-2 p-3.5 bg-slate-900 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto relative">
                          <button
                            type="button"
                            onClick={() => {
                              const schemaObj = {
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                mainEntity: faqs
                                  .filter((f) => f.question.trim() && f.answer.trim())
                                  .map((f) => ({
                                    "@type": "Question",
                                    name: f.question.trim(),
                                    acceptedAnswer: {
                                      "@type": "Answer",
                                      text: f.answer.trim()
                                    }
                                  }))
                              };
                              navigator.clipboard.writeText(JSON.stringify(schemaObj, null, 2));
                              toast.success("Schema copied to clipboard!");
                            }}
                            className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-bold flex items-center gap-1"
                          >
                            <Copy size={11} /> Copy JSON
                          </button>
                          <pre>
                            {JSON.stringify(
                              {
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                mainEntity: faqs
                                  .filter((f) => f.question.trim() && f.answer.trim())
                                  .map((f) => ({
                                    "@type": "Question",
                                    name: f.question.trim(),
                                    acceptedAnswer: {
                                      "@type": "Answer",
                                      text: f.answer.trim()
                                    }
                                  }))
                              },
                              null,
                              2
                            )}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Section 3: Advanced Custom Schema JSON-LD */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <FileCode size={14} className="text-purple-600" />
                    Custom Schema.org JSON-LD (Optional)
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Paste custom JSON-LD schema (e.g. BreadcrumbList, Product, Service) to be included in the page &lt;head&gt;.
                  </p>
                  <textarea
                    rows={4}
                    value={customSchemaJson}
                    onChange={(e) => setCustomSchemaJson(e.target.value)}
                    placeholder='{"@type": "Service", "name": "Instant Credit Service"}'
                    className="w-full p-3 font-mono text-xs bg-slate-950 text-emerald-400 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 leading-relaxed"
                  />
                </div>

                {/* Bottom Submit Bar */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Changes take effect immediately on public web pages and next static build
                  </span>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-50"
                  >
                    <Save size={14} />
                    {saving ? "Saving Changes..." : "Save Meta Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
