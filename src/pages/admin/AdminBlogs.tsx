import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  CheckCircle2,
  Edit3,
  Tag,
  Search,
  ExternalLink,
  Eye,
  Clock,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { API_BASE_URL, getBlogImageUrl } from "@/config/api";
import { fallbackBlogs } from "@/data/mockBlogs";

interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  author?: string;
  created_at: string;
  image?: string;
  readTime?: string;
  viewsCount?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      const data = await response.json();
      if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
        setBlogs(data.blogs.map((b: AdminBlog) => ({ ...b, status: b.status || "ACTIVE" })));
      } else {
        setBlogs(
          fallbackBlogs.map((b) => ({
            ...b,
            status: "ACTIVE" as const
          }))
        );
      }
    } catch (err) {
      setBlogs(
        fallbackBlogs.map((b) => ({
          ...b,
          status: "ACTIVE" as const
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setActionLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("status", newStatus);

      await fetch(`${API_BASE_URL}/blogs/${blog.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered list logic
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || b.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || (b.status || "ACTIVE").toUpperCase() === selectedStatus.toUpperCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalArticles = blogs.length;
  const activeArticles = blogs.filter((b) => (b.status || "ACTIVE") === "ACTIVE").length;
  const inactiveArticles = totalArticles - activeArticles;
  const categoriesCount = Array.from(new Set(blogs.map((b) => b.category))).length;

  return (
    <AdminLayout>
      <SEO title="Blog CMS Control - Waqt Money" robots="noindex, nofollow" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Blog CMS Control
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Create, update, toggle status, and manage articles for the website
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{totalArticles}</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL ARTICLES</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{activeArticles}</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Edit3 size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{inactiveArticles}</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">INACTIVE</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Tag size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{categoriesCount}</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">CATEGORIES</p>
          </div>
        </div>
      </div>

      {/* Main Articles Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table Filter / Controls Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Articles ({filteredBlogs.length})</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[260px] flex-1 sm:flex-none">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, slug or status..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-slate-800"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Payday Loan">Payday Loan</option>
              <option value="Short Term Loan">Short Term Loan</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>

            {/* Write New Article Button */}
            <Link to="/admin/blogs/new">
              <button className="inline-flex items-center gap-2 bg-[#1D4ED8] hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm">
                <Plus size={16} />
                Write New Article
              </button>
            </Link>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">COVER</th>
                <th className="py-3.5 px-5">ARTICLE TITLE</th>
                <th className="py-3.5 px-5">CATEGORY</th>
                <th className="py-3.5 px-5">SLUG URL</th>
                <th className="py-3.5 px-5">READ TIME</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5">CREATED</th>
                <th className="py-3.5 px-5 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    Loading blogs from database...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    No articles found matching your query.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => {
                  const coverImg = getBlogImageUrl(blog.image);
                  const status = blog.status || "ACTIVE";
                  return (
                    <tr key={blog.id} className="hover:bg-slate-50/60 transition">
                      {/* Cover Thumbnail */}
                      <td className="py-3 px-5">
                        <div className="h-10 w-16 relative bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                          <img
                            src={coverImg}
                            alt={blog.title}
                            className="w-full h-full object-contain p-0.5"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.failed) {
                                target.dataset.failed = "true";
                                target.src = "/blog-assets/blog-1-personal-loan-guide.webp";
                              }
                            }}
                          />
                        </div>
                      </td>

                      {/* Article Title */}
                      <td className="py-3 px-5 max-w-xs font-bold text-slate-900 leading-snug">
                        {blog.title}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-5 text-slate-600 font-medium">
                        {blog.category}
                      </td>

                      {/* Slug URL */}
                      <td className="py-3 px-5 max-w-[180px] truncate">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                        >
                          /blog/{blog.slug}
                        </a>
                      </td>

                      {/* Read Time */}
                      <td className="py-3 px-5 text-slate-600 font-medium">
                        {blog.readTime || "5 Min Read"}
                      </td>

                      {/* Status Pill */}
                      <td className="py-3 px-5">
                        <button
                          onClick={() => handleToggleStatus(blog)}
                          disabled={actionLoading}
                          title="Click to toggle Status"
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                            status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          {status === "ACTIVE" ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                          {status}
                        </button>
                      </td>

                      {/* Created Date */}
                      <td className="py-3 px-5 text-slate-400 font-medium whitespace-nowrap">
                        {new Date(blog.created_at || Date.now()).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short"
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/admin/blogs/edit/${blog.id}`}>
                            <button
                              title="Edit Article"
                              className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition border border-slate-200"
                            >
                              <Edit size={14} />
                            </button>
                          </Link>
                          <button
                            title="Delete Article"
                            onClick={() => handleDelete(blog.id)}
                            disabled={actionLoading}
                            className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition border border-slate-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
