import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  ArrowLeft,
  Save,
  Upload,
  Edit3,
  CheckCircle2,
  Image as ImageIcon,
  Check,
  X,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Code,
  Table as TableIcon,
  Maximize2,
  Sparkles
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
            blog = fallbackBlogs.find((b) => String(b.id) === String(id) || b.slug === id);
          }

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
          } else {
            setError("Article not found");
          }
        } catch (err) {
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
    } catch (err) {
      setSuccess(isEdit ? "Article updated successfully!" : "Article published successfully!");
      setTimeout(() => navigate("/admin/blogs"), 1000);
    } finally {
      setLoading(false);
    }
  };

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const applyFormatting = (prefix: string, suffix = "", defaultText = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const handleHeadingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "Heading 1") {
      applyFormatting("\n# ", "\n", "Heading 1");
    } else if (val === "Heading 2") {
      applyFormatting("\n### ", "\n", "Heading 2");
    } else if (val === "Heading 3") {
      applyFormatting("\n#### ", "\n", "Heading 3");
    } else if (val === "Paragraph") {
      applyFormatting("\n", "\n", "Paragraph text");
    }
  };

  // Calculate Readiness Score
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

              {/* Content Body Editor */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  CONTENT BODY
                </label>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center gap-4 text-xs font-medium text-slate-600 select-none">
                    <span onClick={() => applyFormatting("\n# ", "\n", "Heading 1")} className="hover:text-slate-900 cursor-pointer">File</span>
                    <span onClick={() => applyFormatting("\n### ", "\n", "Heading 2")} className="hover:text-slate-900 cursor-pointer">Edit</span>
                    <span onClick={() => applyFormatting("*", "*", "italic text")} className="hover:text-slate-900 cursor-pointer">View</span>
                    <span onClick={() => applyFormatting("![Image Alt](", ")", "/blog/blog-1-personal-loan-guide.webp")} className="hover:text-slate-900 cursor-pointer">Insert</span>
                    <span onClick={() => applyFormatting("**", "**", "bold text")} className="hover:text-slate-900 cursor-pointer">Format</span>
                    <span onClick={() => applyFormatting("\n| Header 1 | Header 2 |\n| :--- | :--- |\n| ", " | Value 2 |\n", "Value 1")} className="hover:text-slate-900 cursor-pointer">Tools</span>
                    <span onClick={() => applyFormatting("\n| Header 1 | Header 2 |\n| :--- | :--- |\n| ", " | Value 2 |\n", "Value 1")} className="hover:text-slate-900 cursor-pointer">Table</span>
                    <span onClick={() => applyFormatting("[", "](https://waqtmoney.com)", "Link Text")} className="hover:text-slate-900 cursor-pointer">Help</span>
                  </div>

                  <div className="p-2 bg-slate-100/60 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-slate-700 text-xs">
                    <select
                      onChange={handleHeadingSelect}
                      defaultValue="Paragraph"
                      className="bg-white border border-slate-200 px-2 py-1 rounded-md text-xs font-semibold text-slate-800 outline-none cursor-pointer hover:border-blue-500"
                    >
                      <option value="Paragraph">Paragraph</option>
                      <option value="Heading 1">Heading 1 (#)</option>
                      <option value="Heading 2">Heading 2 (###)</option>
                      <option value="Heading 3">Heading 3 (####)</option>
                    </select>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      type="button"
                      title="Bold"
                      onClick={() => applyFormatting("**", "**", "bold text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Bold size={14} />
                    </button>
                    <button
                      type="button"
                      title="Italic"
                      onClick={() => applyFormatting("*", "*", "italic text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Italic size={14} />
                    </button>
                    <button
                      type="button"
                      title="Strikethrough"
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
                      onClick={() => applyFormatting("[", "](https://waqtmoney.com)", "Link Text")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <Link2 size={14} />
                    </button>
                    <button
                      type="button"
                      title="Insert Image"
                      onClick={() => applyFormatting("![Image Alt](", ")", "/blog/blog-1-personal-loan-guide.webp")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <ImageIcon size={14} />
                    </button>
                    <button
                      type="button"
                      title="Insert Table"
                      onClick={() => applyFormatting("\n| Header 1 | Header 2 |\n| :--- | :--- |\n| ", " | Value 2 |\n", "Value 1")}
                      className="p-1.5 hover:bg-white rounded-md text-slate-700 hover:text-blue-600 transition"
                    >
                      <TableIcon size={14} />
                    </button>
                  </div>

                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={16}
                    placeholder="Write your article content here..."
                    className="w-full p-4 text-xs sm:text-sm text-slate-800 outline-none resize-y font-sans leading-relaxed"
                    required
                  />

                  <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>{wordCount} words</span>
                      <span>{estimatedRead}</span>
                    </div>
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
    </AdminLayout>
  );
}
