import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import { Search, Eye, Filter, ChevronLeft, ChevronRight, Download, Calendar, RotateCcw } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { getStepMeta } from "@/utils/stepHelper";

interface Lead {
  id: number;
  application_id: string;
  loan_type: string;
  mobile: string;
  email: string;
  pan_number: string;
  full_name: string;
  loan_amount: string;
  current_step: string;
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [loanType, setLoanType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 20;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("admin_token");
      const url = new URL(`${API_BASE_URL}/admin/leads`);
      url.searchParams.append("page", String(page));
      url.searchParams.append("limit", String(limit));
      if (search) url.searchParams.append("search", search);
      if (loanType) url.searchParams.append("loanType", loanType);
      if (startDate) url.searchParams.append("startDate", startDate);
      if (endDate) url.searchParams.append("endDate", endDate);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
        setTotalCount(data.totalCount);
      } else {
        setError(data.message || "Failed to load leads list");
      }
    } catch (err) {
      setError("Network connection failure");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, loanType, startDate, endDate]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const url = new URL(`${API_BASE_URL}/admin/leads/export`);
      if (search) url.searchParams.append("search", search);
      if (loanType) url.searchParams.append("loanType", loanType);
      if (startDate) url.searchParams.append("startDate", startDate);
      if (endDate) url.searchParams.append("endDate", endDate);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      const fileName = `WaqtMoney_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export leads. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const applyPreset = (preset: string) => {
    const today = new Date();
    const formatDate = (d: Date) => d.toISOString().split("T")[0];

    if (preset === "today") {
      setStartDate(formatDate(today));
      setEndDate(formatDate(today));
    } else if (preset === "yesterday") {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      setStartDate(formatDate(y));
      setEndDate(formatDate(y));
    } else if (preset === "7days") {
      const start = new Date(today);
      start.setDate(start.getDate() - 7);
      setStartDate(formatDate(start));
      setEndDate(formatDate(today));
    } else if (preset === "30days") {
      const start = new Date(today);
      start.setDate(start.getDate() - 30);
      setStartDate(formatDate(start));
      setEndDate(formatDate(today));
    } else if (preset === "thisMonth") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(formatDate(start));
      setEndDate(formatDate(today));
    } else if (preset === "clear") {
      setStartDate("");
      setEndDate("");
    }
    setPage(1);
  };

  const resetAllFilters = () => {
    setSearch("");
    setLoanType("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <AdminLayout>
      <SEO title="Admin Console - Loan Leads" robots="noindex, nofollow" />

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Loan Applications Leads</h1>
          <p className="mt-2 text-sm text-slate-500">
            View, search, filter, and export applicant logs submitted across Waqt Money portals.
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting || loading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
        >
          <Download size={18} />
          {exporting ? "Exporting CSV..." : "Export Leads CSV"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Filter and Search Section */}
      <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        {/* Top Controls: Search + Loan Type + Reset */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md relative flex gap-2">
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search by Mobile, PAN, Name, Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-600 outline-none text-slate-800"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition"
            >
              Search
            </button>
          </form>

          <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
              <Filter size={16} className="text-slate-400" />
              <select
                value={loanType}
                onChange={(e) => {
                  setLoanType(e.target.value);
                  setPage(1);
                }}
                className="py-1.5 bg-transparent text-sm outline-none text-slate-800"
              >
                <option value="">All Loan Types</option>
                <option value="Personal">Personal Loan</option>
                <option value="Business">Business Loan</option>
                <option value="Payday">Payday Loan</option>
                <option value="Property">Loan Against Property</option>
                <option value="Vehicle">Vehicle Loan</option>
                <option value="Education">Education Loan</option>
                <option value="Medical">Medical Loan</option>
              </select>
            </div>

            {(search || loanType || startDate || endDate) && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-100 transition"
              >
                <RotateCcw size={14} /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Date Filter Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Calendar size={15} className="text-purple-600" />
              <span>Filter By Date:</span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="startDate" className="text-xs font-semibold text-slate-600">From:</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="endDate" className="text-xs font-semibold text-slate-600">To:</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => applyPreset("today")}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 font-semibold transition"
            >
              Today
            </button>
            <button
              onClick={() => applyPreset("yesterday")}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 font-semibold transition"
            >
              Yesterday
            </button>
            <button
              onClick={() => applyPreset("7days")}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 font-semibold transition"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => applyPreset("30days")}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 font-semibold transition"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => applyPreset("thisMonth")}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 font-semibold transition"
            >
              This Month
            </button>
            {(startDate || endDate) && (
              <button
                onClick={() => applyPreset("clear")}
                className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 transition"
              >
                Clear Dates
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Application ID</th>
                <th className="py-4 px-6">Loan Type</th>
                <th className="py-4 px-6">Mobile</th>
                <th className="py-4 px-6">Requested Amount</th>
                <th className="py-4 px-6">Current Step</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {loading ? (
                [1, 2, 3, 4, 5].map((idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td colSpan={8} className="py-5 px-6">
                      <div className="h-4 bg-slate-100 rounded-md w-full" />
                    </td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 px-6 text-center text-slate-400 font-semibold">
                    No leads found matching current parameters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.application_id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {lead.full_name || "Initiated Lead"}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">{lead.application_id}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800 capitalize">
                        {lead.loan_type || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-6">{lead.mobile}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {lead.loan_amount ? `₹${parseFloat(lead.loan_amount).toLocaleString("en-IN")}` : "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      {(() => {
                        const stepMeta = getStepMeta(lead.current_step);
                        return (
                          <div className="flex flex-col gap-1.5 max-w-[180px]">
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold tracking-tight ${stepMeta.badgeColor}`}>
                              {stepMeta.badgeText}
                            </span>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  stepMeta.isComplete ? "bg-emerald-500" : "bg-purple-600"
                                }`}
                                style={{ width: `${stepMeta.percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link to={`/admin/leads/${lead.application_id}`}>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition shadow-sm border border-purple-100">
                          <Eye size={15} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-5 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">
              Showing Page {page} of {totalPages} ({totalCount} total leads)
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
