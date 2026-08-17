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
  Unlink,
  Table as TableIcon,
  Clock,
  CheckCircle2,
  Settings,
  ShieldCheck,
  Search,
  Quote,
  List,
  ListOrdered,
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { API_BASE_URL, getBlogImageUrl } from "@/config/api";
import { fallbackBlogs } from "@/data/mockBlogs";
import { getLocalBlogs, saveLocalBlog, LocalBlog } from "@/utils/blogStorage";

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

  // Sidebar Settings Tab & Editor Mode
  const [activeTab, setActiveTab] = useState<"SETTINGS" | "EEAT" | "SEO">("SETTINGS");
  const [editorMode, setEditorMode] = useState<"VISUAL" | "CODE">("VISUAL");

  // Selection Range Ref to preserve selection across button clicks
  const savedRangeRef = useRef<Range | null>(null);
  const editorDivRef = useRef<HTMLDivElement>(null);
  const initialContentLoadedRef = useRef(false);

  const cleanHtmlForEditor = (htmlStr: string): string => {
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

  // Synchronize editor innerHTML safely
  const syncContentFromEditor = () => {
    if (editorDivRef.current) {
      const html = editorDivRef.current.innerHTML;
      setContent(html);
    }
  };

  const switchEditorMode = (mode: "VISUAL" | "CODE") => {
    if (mode === "CODE") {
      syncContentFromEditor();
    } else if (mode === "VISUAL") {
      setTimeout(() => {
        if (editorDivRef.current) {
          editorDivRef.current.innerHTML = content;
        }
      }, 0);
    }
    setEditorMode(mode);
  };

  // Selection saving & restoring helpers
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (editorDivRef.current) {
      editorDivRef.current.focus();
    }
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }
  };

  // Live Clock
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    })
  );

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Live clock timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set initial content inside editor ref once mounted or mode switched
  useEffect(() => {
    if (editorMode === "VISUAL" && editorDivRef.current && content && !initialContentLoadedRef.current) {
      editorDivRef.current.innerHTML = content;
      initialContentLoadedRef.current = true;
    }
  }, [editorMode, content]);

  // Fetch blog details if editing
  useEffect(() => {
    if (isEdit && id) {
      const fetchBlogDetails = async () => {
        setFetchLoading(true);
        let blog: Record<string, unknown> | LocalBlog | null = null;

        // 1. Try local storage custom blogs first
        const localList = getLocalBlogs();
        const foundLocal = localList.find((b) => String(b.id) === String(id) || b.slug === id);

        if (foundLocal) {
          blog = foundLocal;
        } else {
          // 2. Try fetching from backend API
          try {
            const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
            const data = await response.json().catch(() => null);
            if (data?.success && data?.blog) {
              blog = data.blog as Record<string, unknown>;
            } else {
              const listRes = await fetch(`${API_BASE_URL}/blogs`);
              const listData = await listRes.json().catch(() => null);
              if (listData?.success && Array.isArray(listData.blogs)) {
                blog = (listData.blogs as Record<string, unknown>[]).find(
                  (b) => String(b.id) === String(id) || b.slug === id
                ) || null;
              }
            }
          } catch (err) {
            console.warn("Could not fetch blog details from API:", err);
          }
        }

        // 3. Fallback to mock blogs
        if (!blog) {
          const foundMock = fallbackBlogs.find(
            (b) => String(b.id) === String(id) || b.slug === id
          );
          if (foundMock) blog = foundMock as unknown as Record<string, unknown>;
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
          
          const fetchedContent = cleanHtmlForEditor(String(blog.content || ""));
          setContent(fetchedContent);
          setExistingImage(String(blog.image || ""));
          setMetaTitle(String(blog.metaTitle || blog.title || ""));
          setMetaDescription(String(blog.metaDescription || blog.excerpt || ""));
          setAuthorRole(String((blog as LocalBlog).authorRole || "Financial Analyst & Credit Expert"));
          setFocusKeyword(String((blog as LocalBlog).focusKeyword || ""));
          setCtaHeading(String((blog as LocalBlog).ctaHeading || "Need Quick Funds Today?"));

          if (editorDivRef.current) {
            editorDivRef.current.innerHTML = fetchedContent;
            initialContentLoadedRef.current = true;
          }
        }
        setFetchLoading(false);
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

  // Formatting commands for Rich Text Editor
  const execCmd = (command: string, value: string | undefined = undefined) => {
    saveSelection();
    restoreSelection();
    document.execCommand(command, false, value);
    syncContentFromEditor();
  };

  // ADD LINK Handler (Robust selection preservation)
  const handleAddLink = () => {
    saveSelection();

    const sel = window.getSelection();
    let existingUrl = "";
    if (sel && sel.rangeCount > 0) {
      let node: Node | null = sel.getRangeAt(0).startContainer;
      while (node && node !== editorDivRef.current) {
        if (node.nodeName === "A") {
          existingUrl = (node as HTMLAnchorElement).getAttribute("href") || "";
          break;
        }
        node = node.parentNode;
      }
    }

    const inputUrl = window.prompt("Enter website link URL (e.g. https://waqtmoney.com):", existingUrl || "https://");
    if (inputUrl === null) return;

    let cleanUrl = inputUrl.trim();
    if (!cleanUrl) return;

    if (!/^https?:\/\//i.test(cleanUrl) && !cleanUrl.startsWith("/") && !cleanUrl.startsWith("#")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    restoreSelection();

    // If selection is empty, insert default link text
    const currentSel = window.getSelection();
    if (!currentSel || currentSel.isCollapsed || !currentSel.toString()) {
      const linkHtml = `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline font-semibold hover:text-purple-800">${cleanUrl}</a>`;
      document.execCommand("insertHTML", false, linkHtml);
    } else {
      document.execCommand("createLink", false, cleanUrl);
    }

    if (editorDivRef.current) {
      const links = editorDivRef.current.querySelectorAll("a");
      links.forEach((a) => {
        if (a.getAttribute("href") === cleanUrl) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
          a.className = "text-purple-600 underline font-semibold hover:text-purple-800";
        }
      });
    }

    syncContentFromEditor();
  };

  // REMOVE LINK Handler (Fix for User Issue #1)
  const handleRemoveLink = () => {
    saveSelection();
    restoreSelection();

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let node: Node | null = selection.getRangeAt(0).startContainer;
      while (node && node !== editorDivRef.current) {
        if (node.nodeName === "A") {
          const parent = node.parentNode;
          while (node.firstChild) {
            parent?.insertBefore(node.firstChild, node);
          }
          parent?.removeChild(node);
          syncContentFromEditor();
          return;
        }
        node = node.parentNode;
      }
    }

    document.execCommand("unlink", false);
    syncContentFromEditor();
  };

  // Helper to convert File to Data URL for offline fallback
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalContent = editorDivRef.current ? editorDivRef.current.innerHTML : content;
    if (!finalContent || !finalContent.trim() || finalContent.trim() === "<p></p>") {
      finalContent = content || "";
    }

    const rawSlug = slug.trim() || title.trim();
    const cleanSlug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!title.trim() || !cleanSlug.trim() || !finalContent.trim()) {
      setError("Please fill in Article Title, URL Slug, and Content Body.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    // Prepare image representation
    let finalImageUrl = imagePreview || existingImage || "/blog-assets/blog-1-personal-loan-guide.webp";
    if (imageFile) {
      const dataUrl = await fileToDataUrl(imageFile);
      if (dataUrl) finalImageUrl = dataUrl;
    }

    const blogPayload = {
      id: isEdit && id ? id : Date.now(),
      title: title.trim(),
      slug: cleanSlug,
      category,
      readTime,
      status: visibility === "Active" ? ("ACTIVE" as const) : ("INACTIVE" as const),
      author,
      authorRole,
      excerpt: excerpt || title,
      content: finalContent,
      image: finalImageUrl,
      created_at: new Date().toISOString(),
      metaTitle,
      metaDescription,
      focusKeyword,
      ctaHeading
    };

    let backendSuccess = false;

    // Try sending to backend server if reachable
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", cleanSlug);
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
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const url = isEdit ? `${API_BASE_URL}/blogs/${id}` : `${API_BASE_URL}/blogs`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers,
        body: formData
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        backendSuccess = true;
        if (data.blog?.image) {
          blogPayload.image = data.blog.image;
        }
      }
    } catch (err) {
      console.warn("Backend API not reachable for blog upload, using resilient local storage save fallback:", err);
    }

    // Always persist to local cache so user's work is never lost
    saveLocalBlog(blogPayload);

    setLoading(false);
    if (backendSuccess) {
      setSuccess(isEdit ? "Blog article updated successfully!" : "New blog article published successfully!");
    } else {
      setSuccess(
        isEdit
          ? "Blog article updated successfully! (Saved to local database)"
          : "New blog article published successfully! (Saved to local database)"
      );
    }

    setTimeout(() => navigate("/admin/blogs"), 1200);
  };

  // Dynamic Readiness Checklist (Out of 6)
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

      {/* Top Header Bar */}
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
              {/* Left Column (Spans 2 cols): Form Fields & Rich Text Editor */}
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

                {/* CONTENT BODY RICH TEXT EDITOR */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                      CONTENT BODY
                    </label>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => switchEditorMode("VISUAL")}
                        className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                          editorMode === "VISUAL"
                            ? "bg-white text-purple-700 shadow-2xs font-black border border-purple-100"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        🎨 Visual Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => switchEditorMode("CODE")}
                        className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                          editorMode === "CODE"
                            ? "bg-white text-purple-700 shadow-2xs font-black border border-purple-100"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        💻 HTML Code
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                    {editorMode === "VISUAL" && (
                      <div className="relative">
                        {/* Rich Formatting Toolbar */}
                        <div className="sticky top-0 z-30 bg-slate-50 border-b border-slate-200 p-2.5 flex flex-wrap items-center gap-1.5 text-xs select-none shadow-2xs">
                          {/* Headings */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("formatBlock", "<h2>")}
                            className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 font-extrabold text-slate-800 transition flex items-center gap-1"
                            title="Heading 2"
                          >
                            <Heading2 size={14} /> H2
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("formatBlock", "<h3>")}
                            className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 font-bold text-slate-800 transition flex items-center gap-1"
                            title="Heading 3"
                          >
                            <Heading3 size={14} /> H3
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("formatBlock", "<p>")}
                            className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 font-medium text-slate-700 transition"
                            title="Paragraph"
                          >
                            Paragraph
                          </button>

                          <div className="h-4 w-px bg-slate-200 mx-1" />

                          {/* Text Styles */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("bold")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-900 transition"
                            title="Bold"
                          >
                            <Bold size={14} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("italic")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-800 transition"
                            title="Italic"
                          >
                            <Italic size={14} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("underline")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-800 transition"
                            title="Underline"
                          >
                            <Underline size={14} />
                          </button>

                          <div className="h-4 w-px bg-slate-200 mx-1" />

                          {/* Alignment */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("justifyLeft")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition"
                            title="Align Left"
                          >
                            <AlignLeft size={14} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("justifyCenter")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition"
                            title="Align Center"
                          >
                            <AlignCenter size={14} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("justifyRight")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition"
                            title="Align Right"
                          >
                            <AlignRight size={14} />
                          </button>

                          <div className="h-4 w-px bg-slate-200 mx-1" />

                          {/* Lists & Quote */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("insertUnorderedList")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition flex items-center gap-1"
                            title="Bullet List"
                          >
                            <List size={14} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("insertOrderedList")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition flex items-center gap-1"
                            title="Numbered List"
                          >
                            <ListOrdered size={14} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("formatBlock", "blockquote")}
                            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition"
                            title="Blockquote"
                          >
                            <Quote size={14} />
                          </button>

                          <div className="h-4 w-px bg-slate-200 mx-1" />

                          {/* LINK MANAGEMENT */}
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              saveSelection();
                            }}
                            onClick={handleAddLink}
                            className="px-2.5 py-1 rounded bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white font-bold transition flex items-center gap-1 shadow-2xs"
                            title="Insert or Edit Link"
                          >
                            <Link2 size={13} /> Add Link
                          </button>

                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              saveSelection();
                            }}
                            onClick={handleRemoveLink}
                            className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white font-bold transition flex items-center gap-1 shadow-2xs"
                            title="Remove Link from selection"
                          >
                            <Unlink size={13} /> Remove Link
                          </button>

                          <div className="h-4 w-px bg-slate-200 mx-1" />

                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => execCmd("removeFormat")}
                            className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 text-slate-500 transition"
                            title="Clear Formatting"
                          >
                            🧹 Clear Format
                          </button>
                        </div>

                        {/* ContentEditable Document Area */}
                        <div className="max-h-[550px] overflow-y-auto">
                          <div
                            ref={editorDivRef}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onInput={syncContentFromEditor}
                            onBlur={syncContentFromEditor}
                            onKeyUp={saveSelection}
                            onMouseUp={saveSelection}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                document.execCommand("defaultParagraphSeparator", false, "p");
                              }
                            }}
                            className="blog-content-body min-h-[400px] p-6 focus:outline-none bg-white text-slate-800 font-sans leading-relaxed"
                          />
                        </div>
                      </div>
                    )}
                    {editorMode === "CODE" && (
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter HTML or plain text content here..."
                        className="w-full min-h-[400px] max-h-[550px] overflow-y-auto p-4 font-mono text-xs bg-slate-950 text-emerald-400 outline-none leading-relaxed"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Settings Tabs, Upload, & Readiness */}
              <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
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
                              <div className="relative h-56 w-full bg-slate-100 rounded-xl border border-slate-200 overflow-hidden">
                                <img
                                  src={imagePreview || getBlogImageUrl(existingImage)}
                                  alt="Cover Preview"
                                  className="w-full h-full object-contain object-center"
                                />
                              </div>
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
                                Supports JPG, PNG, WEBP up to 15MB
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
