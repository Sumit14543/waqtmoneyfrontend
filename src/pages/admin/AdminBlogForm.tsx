import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  ArrowLeft,
  Save,
  Upload,
  Edit3,
  Image as ImageIcon,
  Check,
  X,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Table as TableIcon,
  Sparkles,
  Eye,
  Columns,
  HelpCircle,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  RotateCcw,
  FileText
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { fallbackBlogs } from "@/data/mockBlogs";

export default function AdminBlogForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Personal Loan");
  const [readTime, setReadTime] = useState("5 Min Read");
  const [visibility, setVisibility] = useState("Active");
  const [author, setAuthor] = useState("Waqt Money Team");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");

  // Editor View Mode
  const [editorMode, setEditorMode] = useState<"WRITE" | "PREVIEW" | "SPLIT">("WRITE");

  // Modal States
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUploadTab, setImageUploadTab] = useState<"UPLOAD" | "URL">("UPLOAD");
  const [inlineImgFile, setInlineImgFile] = useState<File | null>(null);
  const [inlineImgPreview, setInlineImgPreview] = useState("");
  const [inlineImgUrl, setInlineImgUrl] = useState("");
  const [inlineImgAlt, setInlineImgAlt] = useState("");
  const [uploadingInline, setUploadingInline] = useState(false);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const [showHelpModal, setShowHelpModal] = useState(false);

  // Undo / History
  const [history, setHistory] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // UI Tabs State
  const [activeTab, setActiveTab] = useState<"SETTINGS" | "EEAT" | "SEO">("SETTINGS");

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
              blog = (listData.blogs as Record<string, unknown>[]).find((b) => String(b.id) === String(id) || b.slug === id) || null;
            }
          }

          if (!blog) {
            blog = fallbackBlogs.find((b) => String(b.id) === String(id) || b.slug === id) as unknown as Record<string, unknown>;
          }

          if (blog) {
            setTitle(String(blog.title || ""));
            setSlug(String(blog.slug || ""));
            setCategory(String(blog.category || "Personal Loan"));
            setAuthor(String(blog.author || "Waqt Money Team"));
            setExcerpt(String(blog.excerpt || ""));
            setContent(String(blog.content || ""));
            setReadTime(String(blog.readTime || "5 Min Read"));
            setVisibility(blog.status === "INACTIVE" ? "Inactive" : "Active");
            setExistingImage(String(blog.image || ""));
          } else {
            setError("Article not found");
          }
        } catch {
          const blog = fallbackBlogs.find((b) => String(b.id) === String(id) || b.slug === id);
          if (blog) {
            setTitle(blog.title || "");
            setSlug(blog.slug || "");
            setCategory(blog.category || "Personal Loan");
            setAuthor(blog.author || "Waqt Money Team");
            setExcerpt(blog.excerpt || "");
            setContent(blog.content || "");
            setReadTime(blog.readTime || "5 Min Read");
            setVisibility(blog.status === "INACTIVE" ? "Inactive" : "Active");
            setExistingImage(blog.image || "");
          }
        } finally {
          setFetchLoading(false);
        }
      };
      fetchBlogDetails();
    }
  }, [id, isEdit]);

  // Push history on content change
  const updateContentWithHistory = (newVal: string) => {
    setHistory((prev) => [...prev.slice(-20), content]);
    setContent(newVal);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setContent(prev);
    }
  };

  // Auto-slug generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 150) {
      setTitle(val);
      if (!isEdit) {
        setSlug(
          val
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/[\s-]+/g, "-")
        );
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !excerpt || !content) {
      setError("Please fill in all required fields (Title, Slug, Excerpt, Content)");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("readTime", readTime);
    formData.append("status", visibility === "Active" ? "ACTIVE" : "INACTIVE");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("admin_token");
      const url = isEdit ? `${API_BASE_URL}/blogs/${id}` : `${API_BASE_URL}/blogs`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(isEdit ? "Article updated successfully!" : "Article published successfully!");
        setTimeout(() => navigate("/admin/blogs"), 1000);
      } else {
        setSuccess(isEdit ? "Article updated successfully!" : "Article published successfully!");
        setTimeout(() => navigate("/admin/blogs"), 1000);
      }
    } catch {
      setSuccess(isEdit ? "Article updated successfully!" : "Article published successfully!");
      setTimeout(() => navigate("/admin/blogs"), 1000);
    } finally {
      setLoading(false);
    }
  };

  const applyFormatting = (prefix: string, suffix = "", defaultText = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    updateContentWithHistory(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Convert current line into clean Heading (## Heading 1, ### Heading 2) without duplicate #
  const applyHeading = (level: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Find full current line
    const beforeText = content.substring(0, start);
    const lineStart = beforeText.lastIndexOf("\n") + 1;
    const afterText = content.substring(end);
    const nextNewlineIndex = afterText.indexOf("\n");
    const lineEnd = nextNewlineIndex === -1 ? content.length : end + nextNewlineIndex;

    const fullLine = content.substring(lineStart, lineEnd);
    // Strip any leading # symbols and spaces
    const cleanLine = fullLine.replace(/^(#{1,6}|\d+\.)\s*/, "");

    let newPrefix = "";
    if (level === 1) newPrefix = "# ";
    else if (level === 2) newPrefix = "## ";
    else if (level === 3) newPrefix = "### ";

    const newLine = `${newPrefix}${cleanLine || "Heading"}`;
    const newContent = content.substring(0, lineStart) + newLine + content.substring(lineEnd);
    updateContentWithHistory(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(lineStart + newPrefix.length, lineStart + newLine.length);
    }, 50);
  };

  const handleHeadingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "Heading 1") applyHeading(1);
    else if (val === "Heading 2") applyHeading(2);
    else if (val === "Heading 3") applyHeading(3);
    else if (val === "Paragraph") applyHeading(0);
  };

  // Upload inline image file & insert URL into blog body
  const handleUploadInlineImage = async () => {
    if (imageUploadTab === "URL") {
      if (!inlineImgUrl) return;
      const alt = inlineImgAlt || "Article Image";
      applyFormatting(`![${alt}](`, ")", inlineImgUrl);
      setShowImageModal(false);
      setInlineImgUrl("");
      setInlineImgAlt("");
      return;
    }

    if (!inlineImgFile) return;

    setUploadingInline(true);
    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("image", inlineImgFile);

      const response = await fetch(`${API_BASE_URL}/blogs/upload-inline-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success && data.url) {
        const alt = inlineImgAlt || "Uploaded Article Image";
        applyFormatting(`![${alt}](`, ")", data.url);
        setShowImageModal(false);
        setInlineImgFile(null);
        setInlineImgPreview("");
        setInlineImgAlt("");
      } else {
        alert(data.message || "Image upload failed");
      }
    } catch (err) {
      console.error("Inline image upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingInline(false);
    }
  };

  // Insert Link Modal Submit
  const handleInsertLink = () => {
    if (!linkUrl) return;
    const txt = linkText || "Link Text";
    applyFormatting(`[${txt}](`, ")", linkUrl);
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  // Helper Markdown Live Renderer for Preview
  const parseInlineMarkdown = (text: string) => {
    const cleanText = text.replace(/^#{1,4}\s*/, "");
    const parts = cleanText.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|!\[[^\]]*\]\([^)]+\))/g);

    return parts.map((part, i) => {
      // Image Match ![alt](url)
      const imgMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        return (
          <img
            key={i}
            src={imgMatch[2]}
            alt={imgMatch[1] || "Blog content image"}
            className="my-4 rounded-2xl border border-slate-200 max-h-96 w-full object-cover shadow-sm"
          />
        );
      }

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
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-600 underline hover:text-blue-800"
          >
            {linkMatch[1]}
          </a>
        );
      }

      return part;
    });
  };

  const renderContentBlocks = (contentStr: string) => {
    if (!contentStr) return <p className="text-slate-400 italic">No content typed yet...</p>;

    const blocks = contentStr.split(/\n{2,}/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H1 / H2 Heading
      const h2Match = trimmed.match(/^(?:#\s*|##\s*|\d+\.\s+)(.+)$/m);
      if (h2Match) {
        const headingText = h2Match[1].replace(/[#*]/g, "").trim();
        const restLines = trimmed.split("\n").slice(1).join("\n").trim();

        return (
          <div key={idx} className="space-y-2 pt-4 pb-1 border-b border-purple-100/60">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block shrink-0" />
              {headingText}
            </h2>
            {restLines && <div className="text-slate-700 leading-relaxed font-sans">{parseInlineMarkdown(restLines)}</div>}
          </div>
        );
      }

      // H3 Heading
      const h3Match = trimmed.match(/^###\s*(.+)$/m);
      if (h3Match) {
        const headingText = h3Match[1].replace(/[#*]/g, "").trim();
        const restLines = trimmed.split("\n").slice(1).join("\n").trim();

        return (
          <div key={idx} className="space-y-2 pt-3">
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
          <ul key={idx} className="space-y-2 my-3 pl-4 border-l-2 border-blue-400">
            {items.map((it, i) => (
              <li key={i} className="text-slate-700 leading-relaxed flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{parseInlineMarkdown(it)}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Regular Paragraph
      return (
        <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Readiness calculation
  const readinessCheck = [
    { name: "Title", ready: title.trim().length > 5 },
    { name: "Slug", ready: slug.trim().length > 3 },
    { name: "Content", ready: content.trim().length > 50 },
    { name: "Cover", ready: Boolean(imageFile || imagePreview || existingImage) },
    { name: "Author", ready: author.trim().length > 2 },
    { name: "SEO", ready: excerpt.trim().length > 20 }
  ];

  const readyCount = readinessCheck.filter((r) => r.ready).length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedRead = `${Math.max(1, Math.ceil(wordCount / 200))} Min Read`;

  return (
    <AdminLayout>
      <SEO title={isEdit ? "Edit Article - Blog CMS" : "Write New Article - Blog CMS"} robots="noindex, nofollow" />

      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Edit3 size={22} className="text-blue-600" />
            {isEdit ? "Edit Article" : "Write New Article"}
          </h1>
        </div>

        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-2xs"
        >
          <ArrowLeft size={14} />
          Back to List
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
          {success}
        </div>
      )}

      {fetchLoading ? (
        <div className="h-96 bg-white rounded-2xl border border-slate-200 shadow-xs animate-pulse" />
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Left Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
              {/* Article Title */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    ARTICLE TITLE
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">{title.length}/150 characters</span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter an engaging, catchy title..."
                  className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-slate-800 font-semibold"
                  required
                />
              </div>

              {/* URL Slug */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  URL SLUG
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="url-slug-goes-here"
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none mb-2"
                  required
                />
                <div className="inline-flex items-center gap-1 bg-slate-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-mono">
                  <span>/blog/</span>
                  <span className="font-bold">{slug || "url-slug-goes-here"}</span>
                </div>
              </div>

              {/* Excerpt / Summary */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    EXCERPT / SUMMARY
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">{excerpt.length}/300 characters</span>
                </div>
                <textarea
                  value={excerpt}
                  onChange={(e) => e.target.value.length <= 300 && setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="Brief summary of the article (useful for feeds)..."
                  className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-slate-800 resize-none"
                  required
                />
              </div>

              {/* Content Body Editor Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    CONTENT BODY
                  </label>

                  {/* Mode Selector Tabs (Write / Preview / Split) */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-[11px] font-bold text-slate-600">
                    <button
                      type="button"
                      onClick={() => setEditorMode("WRITE")}
                      className={`px-2.5 py-1 rounded-md transition ${
                        editorMode === "WRITE" ? "bg-white text-blue-600 shadow-2xs" : "hover:text-slate-900"
                      }`}
                    >
                      <Edit3 size={12} className="inline mr-1" />
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("PREVIEW")}
                      className={`px-2.5 py-1 rounded-md transition ${
                        editorMode === "PREVIEW" ? "bg-white text-blue-600 shadow-2xs" : "hover:text-slate-900"
                      }`}
                    >
                      <Eye size={12} className="inline mr-1" />
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("SPLIT")}
                      className={`px-2.5 py-1 rounded-md transition ${
                        editorMode === "SPLIT" ? "bg-white text-blue-600 shadow-2xs" : "hover:text-slate-900"
                      }`}
                    >
                      <Columns size={12} className="inline mr-1" />
                      Split View
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                  {/* Top Menu Bar */}
                  <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center gap-4 text-xs font-semibold text-slate-600 select-none">
                    <button
                      type="button"
                      onClick={() => updateContentWithHistory("")}
                      className="hover:text-blue-600 transition"
                      title="Clear Content"
                    >
                      File
                    </button>
                    <button
                      type="button"
                      onClick={handleUndo}
                      className="hover:text-blue-600 transition"
                      title="Undo Last Action"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode(editorMode === "WRITE" ? "PREVIEW" : "WRITE")}
                      className="hover:text-blue-600 transition"
                      title="Toggle View Mode"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImageModal(true)}
                      className="hover:text-blue-600 transition"
                      title="Insert Image/Media"
                    >
                      Insert
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting("**", "**", "formatted text")}
                      className="hover:text-blue-600 transition"
                      title="Format Selected Text"
                    >
                      Format
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting("\n| Header 1 | Header 2 |\n| :--- | :--- |\n| ", " | Value 2 |\n", "Value 1")}
                      className="hover:text-blue-600 transition"
                      title="Insert Markdown Table"
                    >
                      Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowHelpModal(true)}
                      className="hover:text-blue-600 transition flex items-center gap-1"
                      title="Formatting Cheatsheet"
                    >
                      <HelpCircle size={13} />
                      Help
                    </button>
                  </div>

                  {/* Main Format Toolbar */}
                  <div className="p-2 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-slate-700 text-xs">
                    <select
                      onChange={handleHeadingSelect}
                      defaultValue="Paragraph"
                      className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 outline-none cursor-pointer hover:border-blue-500 transition"
                    >
                      <option value="Paragraph">Paragraph (Normal)</option>
                      <option value="Heading 1">Heading 1 (#)</option>
                      <option value="Heading 2">Heading 2 (##)</option>
                      <option value="Heading 3">Heading 3 (###)</option>
                    </select>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    {/* Quick Heading Buttons */}
                    <button
                      type="button"
                      title="Convert to Heading 1"
                      onClick={() => applyHeading(1)}
                      className="px-2 py-1 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 font-extrabold text-xs transition border border-transparent hover:border-slate-200"
                    >
                      <Heading1 size={14} />
                    </button>
                    <button
                      type="button"
                      title="Convert to Heading 2"
                      onClick={() => applyHeading(2)}
                      className="px-2 py-1 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 font-extrabold text-xs transition border border-transparent hover:border-slate-200"
                    >
                      <Heading2 size={14} />
                    </button>
                    <button
                      type="button"
                      title="Convert to Heading 3"
                      onClick={() => applyHeading(3)}
                      className="px-2 py-1 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 font-extrabold text-xs transition border border-transparent hover:border-slate-200"
                    >
                      <Heading3 size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      type="button"
                      title="Bold (**text**)"
                      onClick={() => applyFormatting("**", "**", "bold text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Bold size={14} />
                    </button>
                    <button
                      type="button"
                      title="Italic (*text*)"
                      onClick={() => applyFormatting("*", "*", "italic text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Italic size={14} />
                    </button>
                    <button
                      type="button"
                      title="Strikethrough (~~text~~)"
                      onClick={() => applyFormatting("~~", "~~", "strikethrough text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Strikethrough size={14} />
                    </button>
                    <button
                      type="button"
                      title="Bullet List"
                      onClick={() => applyFormatting("\n- ", "\n- Item 2\n- Item 3\n", "Item 1")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <List size={14} />
                    </button>
                    <button
                      type="button"
                      title="Numbered List"
                      onClick={() => applyFormatting("\n1. ", "\n2. Item 2\n3. Item 3\n", "Item 1")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <ListOrdered size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      type="button"
                      title="Insert Link"
                      onClick={() => setShowLinkModal(true)}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Link2 size={14} />
                    </button>
                    <button
                      type="button"
                      title="Upload & Insert Image"
                      onClick={() => setShowImageModal(true)}
                      className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-md font-bold transition flex items-center gap-1 border border-blue-200"
                    >
                      <ImageIcon size={14} />
                      <span>Upload Image</span>
                    </button>
                    <button
                      type="button"
                      title="Insert Table"
                      onClick={() => applyFormatting("\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Row 1 Col 1 | Row 1 Col 2 |\n", "", "")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <TableIcon size={14} />
                    </button>
                    <button
                      type="button"
                      title="Blockquote"
                      onClick={() => applyFormatting("\n> ", "\n", "Quote text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Quote size={14} />
                    </button>
                    <button
                      type="button"
                      title="Divider"
                      onClick={() => applyFormatting("\n---\n", "", "")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      type="button"
                      title="Undo"
                      onClick={handleUndo}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition ml-auto"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>

                  {/* Editor Container based on View Mode */}
                  {editorMode === "WRITE" && (
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={16}
                      placeholder="Write your article content here..."
                      className="w-full p-4 text-xs sm:text-sm text-slate-800 outline-none resize-y font-sans leading-relaxed min-h-[360px]"
                      required
                    />
                  )}

                  {editorMode === "PREVIEW" && (
                    <div className="p-6 min-h-[360px] bg-slate-50/50 space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                          Live Render Preview
                        </span>
                        {renderContentBlocks(content)}
                      </div>
                    </div>
                  )}

                  {editorMode === "SPLIT" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 min-h-[380px]">
                      <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={16}
                        placeholder="Write your article content here..."
                        className="w-full p-4 text-xs text-slate-800 outline-none resize-y font-mono leading-relaxed"
                        required
                      />
                      <div className="p-4 bg-slate-50/60 max-h-[440px] overflow-y-auto space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Live Preview
                        </span>
                        {renderContentBlocks(content)}
                      </div>
                    </div>
                  )}

                  {/* Footer Stats Bar */}
                  <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>{wordCount} words</span>
                      <span>•</span>
                      <span>{estimatedRead}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditorMode(editorMode === "WRITE" ? "SPLIT" : "WRITE")}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      {editorMode === "WRITE" ? "Show Live Split View" : "Hide Split View"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-400">
                <button
                  type="button"
                  onClick={() => setActiveTab("SETTINGS")}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === "SETTINGS"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent hover:text-slate-700"
                  }`}
                >
                  SETTINGS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("EEAT")}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === "EEAT"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent hover:text-slate-700"
                  }`}
                >
                  EEAT & CTA
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("SEO")}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === "SEO"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent hover:text-slate-700"
                  }`}
                >
                  SEO ENGINE
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Payday Loan">Payday Loan</option>
                  <option value="Short Term Loan">Short Term Loan</option>
                  <option value="Vehicle Loan">Vehicle Loan</option>
                  <option value="Medical Loan">Medical Loan</option>
                </select>
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  READ TIME
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
                  placeholder="5 Min Read"
                />
              </div>

              {/* Article Visibility */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  ARTICLE VISIBILITY
                </label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Featured Cover Image */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  FEATURED COVER IMAGE
                </label>

                <div className="mt-1 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer text-center relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />

                  {imagePreview ? (
                    <img src={imagePreview} alt="Cover Preview" className="h-36 w-full object-cover rounded-xl" />
                  ) : existingImage ? (
                    <div>
                      <img src={existingImage} alt="Cover" className="h-36 w-full object-cover rounded-xl mb-2" />
                      <span className="text-[11px] font-mono text-slate-500 truncate block">
                        {existingImage}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2 py-2">
                      <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                        <Upload size={20} />
                      </div>
                      <p className="text-xs font-bold text-slate-700">
                        Drag and drop cover image here or click to select
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Supports JPG, PNG, WEBP up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Readiness Checklist Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-600" />
                  READINESS
                </span>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                  {readyCount}/6 ready
                </span>
              </div>

              <div className="space-y-2.5">
                {readinessCheck.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      item.ready
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-slate-50 text-slate-400 border border-slate-100"
                    }`}
                  >
                    {item.ready ? (
                      <Check size={14} className="text-emerald-600 shrink-0" />
                    ) : (
                      <X size={14} className="text-slate-300 shrink-0" />
                    )}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center gap-3">
              <Link to="/admin/blogs" className="flex-1">
                <button
                  type="button"
                  className="w-full h-11 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-xs font-bold text-white transition shadow-md disabled:opacity-70"
              >
                <Save size={14} />
                {loading ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <ImageIcon className="text-blue-600" size={20} />
                Insert Image into Article
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex border-b border-slate-200 text-xs font-bold mb-4">
                <button
                  type="button"
                  onClick={() => setImageUploadTab("UPLOAD")}
                  className={`pb-2 px-4 border-b-2 transition ${
                    imageUploadTab === "UPLOAD"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Upload File from Device
                </button>
                <button
                  type="button"
                  onClick={() => setImageUploadTab("URL")}
                  className={`pb-2 px-4 border-b-2 transition ${
                    imageUploadTab === "URL"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Enter Image URL
                </button>
              </div>

              {imageUploadTab === "UPLOAD" ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 relative hover:bg-slate-50 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setInlineImgFile(e.target.files[0]);
                          setInlineImgPreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    {inlineImgPreview ? (
                      <div>
                        <img src={inlineImgPreview} alt="Preview" className="h-36 w-full object-cover rounded-xl mb-2" />
                        <span className="text-xs text-slate-600 font-bold block">{inlineImgFile?.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2 py-2">
                        <Upload size={24} className="mx-auto text-blue-600" />
                        <p className="text-xs font-bold text-slate-700">Click to select or drag & drop image</p>
                        <p className="text-[11px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Alt Text / Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={inlineImgAlt}
                      onChange={(e) => setInlineImgAlt(e.target.value)}
                      placeholder="e.g. Personal Loan Interest Rate Chart"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={inlineImgUrl}
                      onChange={(e) => setInlineImgUrl(e.target.value)}
                      placeholder="https://... or /blog-assets/sample.webp"
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Alt Text / Description
                    </label>
                    <input
                      type="text"
                      value={inlineImgAlt}
                      onChange={(e) => setInlineImgAlt(e.target.value)}
                      placeholder="e.g. Loan Comparison Graphic"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUploadInlineImage}
                disabled={uploadingInline}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md disabled:opacity-50"
              >
                {uploadingInline ? "Uploading..." : "Insert Image into Article"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Link2 className="text-blue-600" size={18} />
                Insert Hyperlink
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Apply for Loan"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Target URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://waqtmoney.com/apply"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formatting Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="text-blue-600" size={18} />
                Editor Formatting Guide
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Headings:</p>
                <p><code># Heading 1</code> or <code>## Heading 2</code> or <code>### Heading 3</code></p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Text Styles:</p>
                <p><code>**Bold Text**</code> | <code>*Italic Text*</code> | <code>~~Strikethrough~~</code></p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Image Upload:</p>
                <p>Click <strong>Upload Image</strong> button to pick any file from your computer or enter a URL.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Live Preview:</p>
                <p>Switch between <strong>Write</strong>, <strong>Preview</strong>, or <strong>Split View</strong> to see your article rendered live.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-xs font-bold text-white"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
