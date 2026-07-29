import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import { Search, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

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
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [loanType, setLoanType] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 15;

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("admin_token");
      const url = new URL(`${API_BASE_URL}/admin/leads`);
      url.searchParams.append("page", String(page));
      url.searchParams.append("limit", String(limit));
      if (search) url.searchParams.append("search", search);
      if (loanType) url.searchParams.append("loanType", loanType);

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
  };

  useEffect(() => {
    fetchLeads();
  }, [page, loanType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  const totalPages = Math.ceil(totalCount / limit);

  const getStepBadgeColor = (step: string) => {
    const s = String(step || "").toLowerCase();
    if (s.includes("status") || s.includes("video") || s.includes("completed")) {
      return "bg-green-50 text-green-700 border-green-100";
    }
    if (s.includes("bank") || s.includes("references") || s.includes("slip")) {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }
    return "bg-purple-50 text-purple-700 border-purple-100";
  };

  return (
    <AdminLayout>
      <SEO title="Admin Console - Loan Leads" robots="noindex, nofollow" />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Loan Applications Leads</h1>
        <p className="mt-2 text-sm text-slate-500">
          View, search, and manage applicant logs submitted across Waqt Money portals.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mb-8 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md relative flex gap-2">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by Mobile, PAN, Name, Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-600 outline-none text-slate-800"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition"
          >
            Search
          </button>
        </form>

        <div className="w-full md:w-auto flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={loanType}
            onChange={(e) => {
              setLoanType(e.target.value);
              setPage(1);
            }}
            className="py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none text-slate-800 focus:bg-white"
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
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getStepBadgeColor(lead.current_step)}`}>
                        {(lead.current_step || "pan").replace(/-/g, " ")}
                      </span>
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
