import React, { useEffect, useState } from "react";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import { Mail, Phone, Calendar, User } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface ContactQuery {
  id: number;
  full_name: string;
  mobile: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminContacts() {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_BASE_URL}/admin/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setQueries(data.contacts);
      } else {
        setError(data.message || "Failed to load contact queries");
      }
    } catch (err) {
      setError("Network connection failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <AdminLayout>
      <SEO title="Admin Console - Contact Queries" robots="noindex, nofollow" />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact Queries</h1>
        <p className="mt-2 text-sm text-slate-500">
          Review helpdesk tickets and messages submitted by users through the contact forms.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="h-44 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse" />
          ))}
        </div>
      ) : queries.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center text-slate-400 font-semibold shadow-sm">
          No helpdesk queries found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {queries.map((query) => (
            <div
              key={query.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between border-b border-slate-50 pb-3 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User size={16} className="text-slate-400" />
                      {query.full_name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(query.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50">
                  "{query.message || "No message body provided"}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                <a href={`mailto:${query.email}`} className="flex items-center gap-1 hover:text-purple-600 transition">
                  <Mail size={14} />
                  {query.email}
                </a>
                <a href={`tel:${query.mobile}`} className="flex items-center gap-1 hover:text-purple-600 transition">
                  <Phone size={14} />
                  {query.mobile}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
