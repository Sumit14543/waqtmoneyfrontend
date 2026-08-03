import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Link2,
  Table as TableIcon,
  Clock,
  CheckCircle2,
  Settings,
  ShieldCheck,
  Search
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { fallbackBlogs } from "@/data/mockBlogs";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tinymce: any;
  }
}

export default function AdminBlogForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Personal Loan");
  const [readTime, setReadTime] = useState("5 Min Read");
  const [visibility, setVisibility] = useState<"Active" | "Inactive">("Active");
  const [author, setAuthor] = useState("Waqt Money Team");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  // EEAT & SEO States
  const [authorRole, setAuthorRole] = useState("Financial Analyst & Credit Expert");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ctaHeading, setCtaHeading] = useState("Need Quick Funds Today?");

  // Sidebar Settings Tab
  const [activeTab, setActiveTab] = useState<"SETTINGS" | "EEAT" | "SEO">("SETTINGS");

  // TinyMCE Ready & Loading States
  const [editorReady, setEditorReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const initialContentRef = useRef("");

  // Live Clock
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }));

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Live clock timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load TinyMCE CDN script dynamically
  useEffect(() => {
    const initEditor = () => {
      if (!window.tinymce) return;

      window.tinymce.remove("#blog-content-editor");
      window.tinymce.init({
        selector: "#blog-content-editor",
        height: 480,
        menubar: "file edit view insert format tools table help",
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
          "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "code", "help", "wordcount"
        ],
        toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | forecolor backcolor | code fullscreen help",
        statusbar: true,
        elementpath: true,
        content_style: `
          body { font-family: Inter, system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.6; color: #1e293b; padding: 12px; }
          h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-top: 1.5rem; margin-bottom: 0.75rem; }
          h2 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-top: 1.25rem; margin-bottom: 0.5rem; }
          h3 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-top: 1rem; margin-bottom: 0.5rem; }
          p { margin-bottom: 1rem; }
          table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; font-size: 13px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
          th { background-color: #581c87; color: white; font-weight: 700; }
          tr:nth-child(even) { background-color: #f8fafc; }
          blockquote { border-left: 4px solid #9333ea; background-color: #faf5ff; padding: 10px 16px; border-radius: 0 12px 12px 0; color: #581c87; margin: 1.25rem 0; font-weight: 600; }
        `,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setup: (editor: any) => {
          editorRef.current = editor;
          editor.on("init", () => {
            setEditorReady(true);
            if (initialContentRef.current) {
              editor.setContent(initialContentRef.current);
            }
          });
          editor.on("change keyup input NodeChange", () => {
            const html = editor.getContent();
            setContent(html);
          });
        }
      });
    };

    if (window.tinymce) {
      initEditor();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js";
      script.referrerPolicy = "origin";
      script.onload = () => {
        initEditor();
      };
      document.head.appendChild(script);
    }

    return () => {
      if (window.tinymce) {
        window.tinymce.remove("#blog-content-editor");
      }
    };
  }, []);

  // Fetch blog details if editing
  useEffect(() => {
    if (isEdit && id) {
      const fetchBlogDetails = async () => {
        setFetchLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
          const data = await response.json();
          let blog: Record<string, unknown> | null = null;

          if (data.success && data.blog) {
            blog = data.blog as Record<string, unknown>;
          } else {
            const listRes = await fetch(`${API_BASE_URL}/blogs`);
            const listData = await listRes.json();
            if (listData.success && Array.isArray(listData.blogs)) {
              blog = (listData.blogs as Record<string, unknown>[]).find(
                (b) => String(b.id) === String(id) || b.slug === id
              ) || null;
            }
          }

          if (!blog) {
            const found = fallbackBlogs.find(
              (b) => String(b.id) === String(id) || b.slug === id
            );
            if (found) blog = found as unknown as Record<string, unknown>;
          }

          if (blog) {
            setTitle(String(blog.title || ""));
            setSlug(String(blog.slug || ""));
            setCategory(String(blog.category || "Personal Loan"));
            setReadTime(String(blog.readTime || "5 Min Read"));
            setVisibility(
              String(blog.status || "").toUpperCase() === "INACTIVE" ? "Inactive" : "Active"
            );
            setAuthor(String(blog.author || "Waqt Money Team"));
            setExcerpt(String(blog.excerpt || ""));
            const fetchedContent = String(blog.content || "");
            setContent(fetchedContent);
            initialContentRef.current = fetchedContent;
            setExistingImage(String(blog.image || ""));
            setMetaTitle(String(blog.title || ""));
            setMetaDescription(String(blog.excerpt || ""));

            if (editorRef.current) {
              editorRef.current.setContent(fetchedContent);
            }
          }
        } catch (err) {
          console.error("Error fetching blog details:", err);
          const found = fallbackBlogs.find(
            (b) => String(b.id) === String(id) || b.slug === id
          );
          if (found) {
            setTitle(found.title);
            setSlug(found.slug);
            setCategory(found.category);
            setReadTime(found.readTime || "5 Min Read");
            setAuthor(found.author || "Waqt Money Team");
            setExcerpt(found.excerpt);
            setContent(found.content);
            initialContentRef.current = found.content;
            setExistingImage(found.image);

            if (editorRef.current) {
              editorRef.current.setContent(found.content);
            }
          }
        } finally {
          setFetchLoading(false);
        }
      };

      fetchBlogDetails();
    }
  }, [isEdit, id]);

  // Auto-generate URL slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  };

  // Image Drag & Drop Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalContent = editorRef.current ? editorRef.current.getContent() : content;

    if (!title.trim() || !slug.trim() || !finalContent.trim()) {
      setError("Please fill in Article Title, URL Slug, and Content Body.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug.toLowerCase().trim());
      formData.append("category", category);
      formData.append("readTime", readTime);
      formData.append("status", visibility === "Active" ? "ACTIVE" : "INACTIVE");
      formData.append("author", author);
      formData.append("excerpt", excerpt || title);
      formData.append("content", finalContent);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = localStorage.getItem("admin_token") || localStorage.getItem("adminToken");
      const url = isEdit ? `${API_BASE_URL}/blogs/${id}` : `${API_BASE_URL}/blogs`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        },
        body: formData
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSuccess(isEdit ? "Blog article updated successfully!" : "New blog article published successfully!");
        setTimeout(() => navigate("/admin/blogs"), 1200);
      } else {
        const msg = data?.message || (isEdit ? "Failed to update blog article." : "Failed to publish blog article.");
        setError(msg);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error while saving blog.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Readiness Calculation (Out of 6)
  const checklist = [
    { label: "Title", ready: Boolean(title.trim()) },
    { label: "Slug", ready: Boolean(slug.trim()) },
    { label: "Content", ready: Boolean(content.trim()) },
    { label: "Cover", ready: Boolean(imageFile || imagePreview || existingImage) },
    { label: "Author", ready: Boolean(author.trim()) },
    { label: "SEO", ready: Boolean(excerpt.trim() || focusKeyword.trim() || metaTitle.trim()) }
  ];
  const readyCount = checklist.filter((item) => item.ready).length;

  return (
    <AdminLayout>
      <SEO title={`${isEdit ? "Edit Blog" : "Create New Blog"} - Waqt Finance Admin`} robots="noindex, nofollow" />

      {/* Top Header Bar with Breadcrumbs and Clock */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Blog CMS Control
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Create, update, and manage dynamic articles for the website
          </p>
        </div>

        {/* Live Clock Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
          <Clock size={14} className="text-purple-600" />
          <span>{currentTime}</span>
        </div>
      </div>

      {fetchLoading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-600">Loading article editor...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Notifications */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center justify-between">
              <span>{error}</span>
              <button type="button" onClick={() => setError("")}><X size={14} /></button>
            </div>
          )}
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-center justify-between">
              <span>{success}</span>
              <button type="button" onClick={() => setSuccess("")}><X size={14} /></button>
            </div>
          )}

          {/* Main Card Wrapper */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Card Title Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">✍️</span>
                <h2 className="text-base font-extrabold text-slate-900">
                  {isEdit ? "Edit Article" : "Write New Article"}
                </h2>
              </div>
              <Link
                to="/admin/blogs"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                <ArrowLeft size={13} />
                Back to List
              </Link>
            </div>

            {/* Main Form 2-Column Grid */}
            <div className="p-6 grid gap-8 lg:grid-cols-3">
              {/* Left Column (Spans 2 cols): Form Fields & TinyMCE Editor */}
              <div className="lg:col-span-2 space-y-5">
                {/* ARTICLE TITLE */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                      ARTICLE TITLE
                    </label>
                    <span className="text-[10px] font-medium text-slate-400">
                      {title.length}/150 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={150}
                    placeholder="Enter an engaging, catchy title..."
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                </div>

                {/* URL SLUG */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL SLUG
                  </label>
                  <input
                    type="text"
                    placeholder="url-slug-goes-here"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                  />
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-mono border border-purple-100">
                    <Link2 size={12} />
                    <span>/blog/<strong>{slug || "url-slug-goes-here"}</strong></span>
                  </div>
                </div>

                {/* EXCERPT / SUMMARY */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                      EXCERPT / SUMMARY
                    </label>
                    <span className="text-[10px] font-medium text-slate-400">
                      {excerpt.length}/300 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={300}
                    placeholder="Brief summary of the article (useful for feeds, search results and card previews)..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 transition"
                  />
                </div>

                {/* CONTENT BODY TINYMCE EDITOR CONTAINER */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    CONTENT BODY
                  </label>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                    <textarea
                      id="blog-content-editor"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full min-h-[400px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (Spans 1 col): Settings Tabs, Upload, & Readiness Checklist */}
              <div className="space-y-6">
                {/* Settings Tab Selector Bar */}
                <div className="bg-slate-50 p-1 rounded-2xl border border-slate-200 flex items-center gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("SETTINGS")}
                    className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                      activeTab === "SETTINGS"
                        ? "bg-white text-purple-700 shadow-2xs border border-purple-100"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Settings size={13} />
                    SETTINGS
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("EEAT")}
                    className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                      activeTab === "EEAT"
                        ? "bg-white text-purple-700 shadow-2xs border border-purple-100"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <ShieldCheck size={13} />
                    EEAT & CTA
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("SEO")}
                    className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                      activeTab === "SEO"
                        ? "bg-white text-purple-700 shadow-2xs border border-purple-100"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Search size={13} />
                    SEO ENGINE
                  </button>
                </div>

                {/* Tab Content Box */}
                <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                  {activeTab === "SETTINGS" && (
                    <>
                      {/* CATEGORY */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                          CATEGORY
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-purple-600"
                        >
                          <option value="Personal Loan">Personal Loan</option>
                          <option value="Business Loan">Business Loan</option>
                          <option value="Payday Loan">Payday Loan</option>
                          <option value="Short Term Loan">Short Term Loan</option>
                        </select>
                      </div>

                      {/* READ TIME */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                          READ TIME
                        </label>
                        <input
                          type="text"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          placeholder="e.g. 5 Min Read"
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      {/* ARTICLE VISIBILITY */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                          ARTICLE VISIBILITY
                        </label>
                        <select
                          value={visibility}
                          onChange={(e) => setVisibility(e.target.value as "Active" | "Inactive")}
                          className={`w-full px-3 py-2.5 border rounded-xl text-xs font-extrabold outline-none focus:ring-2 focus:ring-purple-600 ${
                            visibility === "Active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-rose-50 text-rose-700 border-rose-300"
                          }`}
                        >
                          <option value="Active">Active (Visible on Site)</option>
                          <option value="Inactive">Inactive (Hidden from Site)</option>
                        </select>
                      </div>

                      {/* FEATURED COVER IMAGE DROPZONE */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                          FEATURED COVER IMAGE
                        </label>

                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          className="border-2 border-dashed border-purple-200 hover:border-purple-500 rounded-2xl p-4 bg-white text-center cursor-pointer transition relative"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />

                          {imagePreview || existingImage ? (
                            <div className="space-y-2">
                              <img
                                src={imagePreview || existingImage}
                                alt="Cover Preview"
                                className="h-32 w-full object-cover rounded-xl border border-slate-200"
                              />
                              <p className="text-[10px] font-bold text-purple-600">Click or drag new image to replace</p>
                            </div>
                          ) : (
                            <div className="space-y-2 py-3">
                              <div className="h-10 w-10 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <Upload size={18} />
                              </div>
                              <p className="text-xs font-bold text-slate-800">
                                Drag and drop cover image here or click to select
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                Supports JPG, PNG, WEBP up to 5MB
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "EEAT" && (
                    <>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                          AUTHOR NAME
                        </label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                          AUTHOR ROLE / CREDENTIALS
                        </label>
                        <input
                          type="text"
                          value={authorRole}
                          onChange={(e) => setAuthorRole(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                          SIDEBAR CTA HEADING
                        </label>
                        <input
                          type="text"
                          value={ctaHeading}
                          onChange={(e) => setCtaHeading(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "SEO" && (
                    <>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                          FOCUS KEYWORD
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. personal loan approval"
                          value={focusKeyword}
                          onChange={(e) => setFocusKeyword(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                          META TITLE
                        </label>
                        <input
                          type="text"
                          value={metaTitle || title}
                          onChange={(e) => setMetaTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                          META DESCRIPTION
                        </label>
                        <textarea
                          rows={2}
                          value={metaDescription || excerpt}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* READINESS CHECKLIST CARD */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      📋 READINESS
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      readyCount === 6 ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {readyCount}/6 ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    {checklist.map((item) => (
                      <div
                        key={item.label}
                        className={`p-2 rounded-xl border flex items-center gap-2 transition ${
                          item.ready
                            ? "bg-emerald-50/70 border-emerald-200 text-emerald-800"
                            : "bg-slate-50 border-slate-200 text-slate-400"
                        }`}
                      >
                        <CheckCircle2 size={14} className={item.ready ? "text-emerald-600" : "text-slate-300"} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Link
                    to="/admin/blogs"
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Save size={14} />
                    )}
                    <span>{isEdit ? "Update Post" : "Save Post"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
