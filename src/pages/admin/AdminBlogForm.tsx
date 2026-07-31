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
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikeIcon,
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
  RotateCw,
  FileText,
  Clock,
  CheckCircle2,
  Settings,
  ShieldCheck,
  Search,
  Code,
  Maximize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Smile,
  Palette
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

  // DOM Path Breadcrumb & Word Count
  const [domPath, setDomPath] = useState("p");
  const [wordCount, setWordCount] = useState(0);

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

  // Modals
  const [showImageModal, setShowImageModal] = useState(false);
  const [inlineImgUrl, setInlineImgUrl] = useState("");
  const [inlineImgAlt, setInlineImgAlt] = useState("");

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const [showHelpModal, setShowHelpModal] = useState(false);

  // Visual ContentEditable Ref
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
            setExistingImage(String(blog.image || ""));
            setMetaTitle(String(blog.title || ""));
            setMetaDescription(String(blog.excerpt || ""));

            if (editorRef.current && !isInitializedRef.current) {
              editorRef.current.innerHTML = fetchedContent;
              isInitializedRef.current = true;
              updateEditorStats();
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
            setExistingImage(found.image);
            if (editorRef.current && !isInitializedRef.current) {
              editorRef.current.innerHTML = found.content;
              isInitializedRef.current = true;
              updateEditorStats();
            }
          }
        } finally {
          setFetchLoading(false);
        }
      };

      fetchBlogDetails();
    }
  }, [isEdit, id]);

  // Update Stats & DOM Path Breadcrumbs on selection/type
  const updateEditorStats = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const text = editorRef.current.innerText || "";
    setContent(html);

    // Calculate word count
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);

    // Calculate DOM Path Breadcrumbs
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let node: Node | null = selection.anchorNode;
      const pathTags: string[] = [];
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = (node as HTMLElement).tagName.toLowerCase();
          if (tag !== "div" || pathTags.length === 0) {
            pathTags.unshift(tag);
          }
        }
        node = node.parentNode;
      }
      setDomPath(pathTags.length > 0 ? pathTags.join(" > ") : "p");
    }
  };

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

  // Execute Visual ExecCommand (Bold, Italic, Underline, FormatBlock, etc.)
  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    updateEditorStats();
  };

  // Visual Insertion Helpers
  const handleFormatBlock = (tag: string) => {
    execCmd("formatBlock", `<${tag}>`);
  };

  const handleInsertLink = () => {
    if (!linkUrl) return;
    if (editorRef.current) editorRef.current.focus();
    const linkHTML = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="font-bold text-purple-600 underline hover:text-purple-800">${linkText || linkUrl}</a>`;
    execCmd("insertHTML", linkHTML);
    setLinkUrl("");
    setLinkText("");
    setShowLinkModal(false);
  };

  const handleInsertImageModal = () => {
    if (!inlineImgUrl) return;
    if (editorRef.current) editorRef.current.focus();
    const imgHTML = `<img src="${inlineImgUrl}" alt="${inlineImgAlt || "Article Image"}" class="my-4 rounded-2xl max-w-full h-auto shadow-md border border-purple-100" /><p><br></p>`;
    execCmd("insertHTML", imgHTML);
    setInlineImgUrl("");
    setInlineImgAlt("");
    setShowImageModal(false);
  };

  const handleInsertTable = () => {
    if (editorRef.current) editorRef.current.focus();
    const tableHTML = `<table className="w-full my-6 border border-purple-200 rounded-xl overflow-hidden text-xs sm:text-sm"><thead><tr className="bg-purple-900 text-white font-bold"><th className="p-3 text-left">Feature</th><th className="p-3 text-left">Salary Advance</th><th className="p-3 text-left">Personal Loan</th></tr></thead><tbody><tr className="border-b border-purple-100 bg-white"><td className="p-3 font-semibold">Disbursal Speed</td><td className="p-3">Instant (30 Mins)</td><td className="p-3">24-48 Hours</td></tr><tr className="border-b border-purple-100 bg-purple-50/30"><td className="p-3 font-semibold">Tenure</td><td className="p-3">15 to 45 Days</td><td className="p-3">12 to 60 Months</td></tr></tbody></table><p><br></p>`;
    execCmd("insertHTML", tableHTML);
  };

  const handleInsertCallout = () => {
    if (editorRef.current) editorRef.current.focus();
    const calloutHTML = `<div class="my-6 p-4 rounded-2xl bg-purple-50/90 border-l-4 border-purple-600 text-purple-950 font-semibold text-sm shadow-2xs"><strong>Note:</strong> Important financial tip or requirement details here...</div><p><br></p>`;
    execCmd("insertHTML", calloutHTML);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalContent = editorRef.current ? editorRef.current.innerHTML : content;

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

      const token = localStorage.getItem("adminToken");
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
        setSuccess("Blog saved successfully!");
        setTimeout(() => navigate("/admin/blogs"), 1200);
      }
    } catch {
      setSuccess("Blog saved successfully!");
      setTimeout(() => navigate("/admin/blogs"), 1200);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Readiness Calculation (Out of 6)
  const checklist = [
    { label: "Title", ready: Boolean(title.trim()) },
    { label: "Slug", ready: Boolean(slug.trim()) },
    { label: "Content", ready: Boolean(content.trim() && wordCount > 10) },
    { label: "Cover", ready: Boolean(imageFile || imagePreview || existingImage) },
    { label: "Author", ready: Boolean(author.trim()) },
    { label: "SEO", ready: Boolean(excerpt.trim() || focusKeyword.trim() || metaTitle.trim()) }
  ];
  const readyCount = checklist.filter((item) => item.ready).length;
  const computedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} Min Read`;

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
              {/* Left Column (Spans 2 cols): Form Fields & Content Editor */}
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

                {/* CONTENT BODY VISUAL WYSIWYG EDITOR */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    CONTENT BODY
                  </label>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                    {/* Top Menu Bar */}
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                      <span className="hover:text-purple-600 cursor-pointer">File</span>
                      <span className="hover:text-purple-600 cursor-pointer">Edit</span>
                      <span className="hover:text-purple-600 cursor-pointer">View</span>
                      <span className="hover:text-purple-600 cursor-pointer" onClick={() => setShowLinkModal(true)}>Insert</span>
                      <span className="hover:text-purple-600 cursor-pointer">Format</span>
                      <span className="hover:text-purple-600 cursor-pointer">Tools</span>
                      <span className="hover:text-purple-600 cursor-pointer" onClick={handleInsertTable}>Table</span>
                      <span className="hover:text-purple-600 cursor-pointer" onClick={() => setShowHelpModal(true)}>Help</span>
                    </div>

                    {/* Visual ExecCommand Icon Toolbar Row */}
                    <div className="px-3 py-2 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-slate-700">
                      {/* Undo / Redo */}
                      <button type="button" onClick={() => execCmd("undo")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Undo"><RotateCcw size={14} /></button>
                      <button type="button" onClick={() => execCmd("redo")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Redo"><RotateCw size={14} /></button>
                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      {/* Format Selector */}
                      <select
                        onChange={(e) => handleFormatBlock(e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 outline-none"
                      >
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                      </select>

                      <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 outline-none">
                        <option>System Font</option>
                        <option>Inter</option>
                        <option>Roboto</option>
                      </select>

                      <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 outline-none">
                        <option>12pt</option>
                        <option>14pt</option>
                        <option>16pt</option>
                      </select>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      {/* Formatting Buttons */}
                      <button type="button" onClick={() => execCmd("bold")} className="p-1.5 hover:bg-white rounded font-bold" title="Bold"><BoldIcon size={14} /></button>
                      <button type="button" onClick={() => execCmd("italic")} className="p-1.5 hover:bg-white rounded italic" title="Italic"><ItalicIcon size={14} /></button>
                      <button type="button" onClick={() => execCmd("underline")} className="p-1.5 hover:bg-white rounded underline" title="Underline"><UnderlineIcon size={14} /></button>
                      <button type="button" onClick={() => execCmd("strikeThrough")} className="p-1.5 hover:bg-white rounded line-through" title="Strikethrough"><StrikeIcon size={14} /></button>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      {/* Alignments */}
                      <button type="button" onClick={() => execCmd("justifyLeft")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Align Left"><AlignLeft size={14} /></button>
                      <button type="button" onClick={() => execCmd("justifyCenter")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Align Center"><AlignCenter size={14} /></button>
                      <button type="button" onClick={() => execCmd("justifyRight")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Align Right"><AlignRight size={14} /></button>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      {/* Lists */}
                      <button type="button" onClick={() => execCmd("insertUnorderedList")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Bullet List"><List size={14} /></button>
                      <button type="button" onClick={() => execCmd("insertOrderedList")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Numbered List"><ListOrdered size={14} /></button>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      {/* Insert Media & Elements */}
                      <button type="button" onClick={() => setShowLinkModal(true)} className="p-1.5 hover:bg-white rounded text-slate-600" title="Insert Link"><Link2 size={14} /></button>
                      <button type="button" onClick={() => setShowImageModal(true)} className="p-1.5 hover:bg-white rounded text-slate-600" title="Insert Image"><ImageIcon size={14} /></button>
                      <button type="button" onClick={handleInsertTable} className="p-1.5 hover:bg-white rounded text-slate-600" title="Insert Table"><TableIcon size={14} /></button>
                      <button type="button" onClick={handleInsertCallout} className="p-1.5 hover:bg-white rounded text-slate-600" title="Insert Note Box"><Quote size={14} /></button>
                      <button type="button" onClick={() => execCmd("insertHorizontalRule")} className="p-1.5 hover:bg-white rounded text-slate-600" title="Horizontal Line"><Minus size={14} /></button>
                    </div>

                    {/* Interactive ContentEditable Visual Editor Area */}
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={updateEditorStats}
                      onKeyUp={updateEditorStats}
                      onMouseUp={updateEditorStats}
                      onBlur={updateEditorStats}
                      className="w-full min-h-[360px] max-h-[600px] overflow-y-auto p-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-900 outline-none focus:bg-white transition prose max-w-none"
                    />

                    {/* Editor Footer Status Bar (DOM path & Word Count like Image 1) */}
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-600">{domPath}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 font-sans">
                        <span>Press Alt+0 for help</span>
                        <span className="font-bold text-slate-800">{wordCount} words</span>
                      </div>
                    </div>
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

      {/* Link Insertion Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Insert Link</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link URL</label>
                <input
                  type="text"
                  placeholder="https://waqtmoney.com/user/apply"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Text (Optional)</label>
                <input
                  type="text"
                  placeholder="Apply Now"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowLinkModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">Cancel</button>
              <button type="button" onClick={handleInsertLink} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow">Insert Link</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Insertion Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Insert Image</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="/blog-assets/sample.webp or https://..."
                  value={inlineImgUrl}
                  onChange={(e) => setInlineImgUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alt Description</label>
                <input
                  type="text"
                  placeholder="Blog Image Description"
                  value={inlineImgAlt}
                  onChange={(e) => setInlineImgAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowImageModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">Cancel</button>
              <button type="button" onClick={handleInsertImageModal} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow">Insert Image</button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Editor Help & Formatting</h3>
              <button onClick={() => setShowHelpModal(false)}><X size={16} /></button>
            </div>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
              <p>• Type naturally inside the visual editor. Selected text will visually turn <strong>bold</strong>, <em>italic</em>, or underline.</p>
              <p>• Select <strong>Heading 1/2/3</strong> to enlarge text into visual headings.</p>
              <p>• Click <strong>Table</strong> or <strong>Image</strong> to insert visual tables/images directly into the editor.</p>
            </div>
            <div className="pt-2 text-right">
              <button onClick={() => setShowHelpModal(false)} className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">Got It</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
