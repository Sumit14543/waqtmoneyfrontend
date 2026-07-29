import React, { useEffect, useState } from "react";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  Users,
  LayoutList,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight,
  BookOpen,
  Plus,
  Filter,
  Eye,
  TrendingUp,
  CreditCard,
  PieChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";

interface SummaryData {
  applicationsCount: number;
  heroLeadsCount: number;
  contactsCount: number;
  blogsCount: number;
  recentLeads: Array<{
    application_id: string;
    full_name: string;
    loan_type: string;
    loan_amount: string;
    current_step: string;
    created_at: string;
  }>;
  loanDistribution: Array<{
    loan_type: string;
    count: number;
  }>;
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<SummaryData>({
    applicationsCount: 0,
    heroLeadsCount: 0,
    contactsCount: 0,
    blogsCount: 0,
    recentLeads: [],
    loanDistribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const response = await fetch(`${API_BASE_URL}/admin/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setSummary(data.summary);
        } else {
          setError(data.message || "Failed to load dashboard summary");
        }
      } catch (err) {
        setError("Network connection failure");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const statsCards = [
    {
      name: "Total Loan Applications",
      count: summary.applicationsCount,
      desc: "Registered applicant records",
      icon: Users,
      color: "from-purple-600 to-indigo-600",
      link: "/admin/leads",
      badge: "Active",
    },
    {
      name: "Published Articles",
      count: summary.blogsCount,
      desc: "Live blog & finance guides",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-600",
      link: "/admin/blogs",
      badge: "Dynamic",
    },
    {
      name: "Homepage Leads",
      count: summary.heroLeadsCount,
      desc: "Mobile number signups",
      icon: LayoutList,
      color: "from-amber-500 to-orange-600",
      link: "/admin/leads",
      badge: "Inbound",
    },
    {
      name: "Contact Queries",
      count: summary.contactsCount,
      desc: "Helpdesk support tickets",
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-600",
      link: "/admin/contacts",
      badge: "Support",
    },
  ];

  const getStepBadgeColor = (step: string) => {
    const s = String(step || "").toLowerCase();
    if (s.includes("completed") || s.includes("status")) {
      return "bg-green-50 text-green-700 border-green-100";
    }
    if (s.includes("bank") || s.includes("work")) {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }
    return "bg-purple-50 text-purple-700 border-purple-100";
  };

  const totalDistCount = summary.loanDistribution.reduce((acc, curr) => acc + (curr.count || 0), 0) || 1;

  return (
    <AdminLayout>
      <SEO title="Admin Console - Dashboard Overview" robots="noindex, nofollow" />

      {/* Header and Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Console Dashboard</h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Real-time analytics, loan distribution metrics, and recent application activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/blogs/new"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-purple-600 px-4 text-xs font-semibold text-white shadow-md shadow-purple-600/20 hover:bg-purple-700 transition"
          >
            <Plus size={15} />
            Write Blog Post
          </Link>
          <Link
            to="/admin/leads"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white shadow hover:bg-slate-800 transition"
          >
            <Filter size={15} />
            Filter Leads
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* 4 Metric Cards */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="h-36 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {statsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.name}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.badge}</span>
                    <div className={`h-10 w-10 rounded-2xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-slate-900">{card.count.toLocaleString("en-IN")}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{card.name}</p>
                </div>
                <div className="mt-4 border-t border-slate-50 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{card.desc}</span>
                  <Link to={card.link} className="font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-0.5">
                    View
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Analytics Section: Live Recent Activity Feed + Loan Distribution */}
      <div className="grid gap-8 lg:grid-cols-3 mb-10">
        {/* Recent Applications Feed (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-purple-600" />
                <h2 className="text-lg font-bold text-slate-900">Recent Applications Activity</h2>
              </div>
              <Link to="/admin/leads" className="text-xs font-bold text-purple-600 hover:underline">
                View all leads →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                    <th className="pb-3 px-3">Applicant Name</th>
                    <th className="pb-3 px-3">Loan Type</th>
                    <th className="pb-3 px-3">Amount</th>
                    <th className="pb-3 px-3">Current Step</th>
                    <th className="pb-3 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                  {loading ? (
                    [1, 2, 3].map((idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td colSpan={5} className="py-4 px-3">
                          <div className="h-4 bg-slate-100 rounded w-full" />
                        </td>
                      </tr>
                    ))
                  ) : summary.recentLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-semibold">
                        No recent loan applications logged yet.
                      </td>
                    </tr>
                  ) : (
                    summary.recentLeads.map((lead) => (
                      <tr key={lead.application_id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-slate-900">{lead.full_name || "Initiated Lead"}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{lead.application_id}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 capitalize">
                            {lead.loan_type || "N/A"}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-900">
                          {lead.loan_amount ? `₹${parseFloat(lead.loan_amount).toLocaleString("en-IN")}` : "N/A"}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize ${getStepBadgeColor(lead.current_step)}`}>
                            {(lead.current_step || "pan").replace(/-/g, " ")}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <Link to={`/admin/leads/${lead.application_id}`}>
                            <button className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition border border-purple-100">
                              <Eye size={13} />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Product Category Distribution Chart Breakdown (1 Column) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4 mb-6">
              <PieChart size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-slate-900">Loan Distribution</h2>
            </div>

            <div className="space-y-4">
              {loading ? (
                [1, 2, 3].map((idx) => (
                  <div key={idx} className="h-10 bg-slate-50 rounded-xl animate-pulse" />
                ))
              ) : summary.loanDistribution.length === 0 ? (
                <p className="text-xs text-slate-400 font-semibold py-8 text-center">No category metrics calculated.</p>
              ) : (
                summary.loanDistribution.map((item) => {
                  const percentage = Math.round((item.count / totalDistCount) * 100);
                  return (
                    <div key={item.loan_type} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{item.loan_type || "General"} Loan</span>
                        <span className="text-slate-500">{item.count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-50 pt-4 text-center">
            <span className="text-xs text-slate-400 font-medium">Aggregated across active applicant records</span>
          </div>
        </div>
      </div>

      {/* Safeguard Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Administrative Safeguards & Compliance</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed max-w-4xl">
              This console provides administrative access to customer KYC documents, employment parameters, and banking information. In compliance with RBI guidelines for digital lending (Guidelines on Digital Lending, 2022), ensure all customer information is handled confidentially and is utilized strictly for verified underwriting operations.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
