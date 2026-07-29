import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import { ArrowLeft, User, Phone, Mail, Award, Landmark, Eye, Save, ToggleLeft, ToggleRight, Download, MapPin, AlertCircle, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface LeadDetail {
  application_id: string;
  loan_type: string;
  mobile: string;
  email: string;
  pan_number: string;
  uan_number: string;
  employment_status: string;
  monthly_income: string;
  loan_amount: string;
  loan_purpose: string;
  has_running_loan: number;
  full_name: string;
  dob: string;
  pincode: string;
  city: string;
  company_name: string;
  designation: string;
  office_email: string;
  salary_day: number;
  office_address: string;
  office_pincode: string;
  education: string;
  experience_years: number;
  bank_name: string;
  branch_name: string;
  account_holder: string;
  account_number: string;
  ifsc_code: string;
  reference1_name: string;
  reference1_mobile: string;
  reference1_relation: string;
  reference2_name: string;
  reference2_mobile: string;
  reference2_relation: string;
  selfie_photo: string;
  salary_slip_current: string;
  video_kyc: string;
  current_step: string;
  lead_visible: number;
  created_at: string;
  latitude?: number | string;
  longitude?: number | string;
  accuracy?: number | string;
  captured_at?: string;
  device_type?: string;
  browser?: string;
  operating_system?: string;
  user_agent?: string;
  ip_address?: string;
  location_status?: string;
  battery_status?: string;
  network_type?: string;
}

export default function AdminLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit fields
  const [currentStep, setCurrentStep] = useState("");
  const [leadVisible, setLeadVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");

  const fetchLeadDetails = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_BASE_URL}/admin/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLead(data.lead);
        setCurrentStep(data.lead.current_step || "pan");
        setLeadVisible(data.lead.lead_visible === 1);
      } else {
        setError(data.message || "Failed to load lead details");
      }
    } catch (err) {
      setError("Network connection failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_BASE_URL}/admin/leads/${id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_step: currentStep,
          lead_visible: leadVisible,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSaveSuccess("Lead status updated successfully");
        fetchLeadDetails();
      } else {
        setError(data.message || "Failed to update lead status");
      }
    } catch (err) {
      setError("Server connection failure");
    } finally {
      setSaveLoading(false);
    }
  };

  // Build file URL check helper
  const getFileUrl = (filePath: string) => {
    if (!filePath) return null;
    // Check if it's already an absolute URL
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    // Else point to node uploads server (we assume it runs on same API port or baseUrl)
    const base = API_BASE_URL.replace("/api", "");
    return `${base}/uploads/${filePath}`;
  };

  return (
    <AdminLayout>
      <SEO title="Admin Console - Lead Details" robots="noindex, nofollow" />

      <div className="mb-6">
        <Link to="/admin/leads" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-purple-600 transition">
          <ArrowLeft size={16} />
          Back to Leads list
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
          {error}
        </div>
      )}

      {saveSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium">
          {saveSuccess}
        </div>
      )}

      {loading ? (
        <div className="h-64 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse" />
      ) : !lead ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center text-slate-400 font-semibold shadow-sm">
          No details found for application ID: {id}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Info Blocks */}
          <div className="space-y-8">
            {/* Header Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 capitalize mb-3">
                  {lead.loan_type} Loan
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                  {lead.full_name || "Initiated Lead"}
                </h1>
                <p className="mt-1.5 text-xs text-slate-500 font-mono">Application ID: {lead.application_id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-semibold">Requested Amount</p>
                <p className="text-2xl font-extrabold text-purple-700 mt-1">
                  {lead.loan_amount ? `₹${parseFloat(lead.loan_amount).toLocaleString("en-IN")}` : "N/A"}
                </p>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <User size={20} className="text-purple-600" />
                Personal Information
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">PAN Card Number</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.pan_number || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Date of Birth</span>
                  <p className="mt-1 font-semibold text-slate-900">
                    {lead.dob ? new Date(lead.dob).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Mobile Number</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.mobile || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Personal Email</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.email || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Location / City</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.city ? `${lead.city} (${lead.pincode})` : "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Education Level</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.education || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Customer Live Location */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin size={20} className="text-purple-600" />
                  Customer Live Location
                </h2>

                {/* Status / Fraud Indicator Badge */}
                <div>
                  {!lead.latitude || !lead.longitude ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-100">
                      <AlertCircle size={14} />
                      Location Not Captured
                    </span>
                  ) : Number(lead.accuracy) > 100 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                      <AlertTriangle size={14} />
                      Low GPS Accuracy (&gt;100m)
                    </span>
                  ) : String(lead.location_status).toLowerCase() === "denied" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-100">
                      <ShieldAlert size={14} />
                      Permission Denied
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      <CheckCircle size={14} />
                      Verified Live GPS
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Latitude</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">
                    {lead.latitude ? String(lead.latitude) : "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Longitude</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">
                    {lead.longitude ? String(lead.longitude) : "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">GPS Accuracy</span>
                  <p className="mt-1 font-semibold text-slate-900">
                    {lead.accuracy ? `${Number(lead.accuracy).toFixed(1)} meters` : "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Captured Time</span>
                  <p className="mt-1 font-semibold text-slate-900">
                    {lead.captured_at
                      ? new Date(lead.captured_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Device & Browser</span>
                  <p className="mt-1 font-semibold text-slate-900">
                    {lead.device_type || lead.browser
                      ? `${lead.device_type || "Unknown"} • ${lead.browser || "Unknown"}${lead.operating_system ? ` (${lead.operating_system})` : ""}`
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">IP Address</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">
                    {lead.ip_address || "N/A"}
                  </p>
                </div>
              </div>

              {lead.latitude && lead.longitude && (
                <div className="pt-2 border-t border-slate-50 flex items-center">
                  <a
                    href={`https://www.google.com/maps?q=${lead.latitude},${lead.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition"
                  >
                    <MapPin size={16} />
                    📍 View on Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Employment Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Award size={20} className="text-purple-600" />
                Employment & Income
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Company Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.company_name || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Designation</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.designation || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Monthly Income</span>
                  <p className="mt-1 font-semibold text-slate-900">
                    {lead.monthly_income ? `₹${parseFloat(lead.monthly_income).toLocaleString("en-IN")}` : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">UAN / EPF Number</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.uan_number || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Office Email</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.office_email || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Salary Credit Day</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.salary_day ? `Day ${lead.salary_day} of month` : "N/A"}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Office Address</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.office_address ? `${lead.office_address} (${lead.office_pincode})` : "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Landmark size={20} className="text-purple-600" />
                Banking & Repayment accounts
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Bank Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.bank_name || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">IFSC Code</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.ifsc_code || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Account Number</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.account_number || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Account Holder Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.account_holder || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Phone size={20} className="text-purple-600" />
                Personal References
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 text-sm">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Reference 1</h3>
                  <p className="text-xs text-slate-500">Name / Relation</p>
                  <p className="font-semibold text-slate-900">{lead.reference1_name ? `${lead.reference1_name} (${lead.reference1_relation})` : "N/A"}</p>
                  <p className="text-xs text-slate-500 mt-2">Mobile</p>
                  <p className="font-semibold text-slate-900">{lead.reference1_mobile || "N/A"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Reference 2</h3>
                  <p className="text-xs text-slate-500">Name / Relation</p>
                  <p className="font-semibold text-slate-900">{lead.reference2_name ? `${lead.reference2_name} (${lead.reference2_relation})` : "N/A"}</p>
                  <p className="text-xs text-slate-500 mt-2">Mobile</p>
                  <p className="font-semibold text-slate-900">{lead.reference2_mobile || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Download size={20} className="text-purple-600" />
                Submitted KYC Documents
              </h2>
              <div className="grid gap-6 sm:grid-cols-3 text-sm">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="font-semibold text-slate-900">Selfie Photo</h3>
                    <p className="text-xs text-slate-500 mt-1">ID verification check photo</p>
                  </div>
                  {lead.selfie_photo ? (
                    <a
                      href={getFileUrl(lead.selfie_photo) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition"
                    >
                      <Eye size={12} />
                      View Image
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic mt-4">Not Uploaded</span>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="font-semibold text-slate-900">Salary Slip</h3>
                    <p className="text-xs text-slate-500 mt-1">Income verification slip</p>
                  </div>
                  {lead.salary_slip_current ? (
                    <a
                      href={getFileUrl(lead.salary_slip_current) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition"
                    >
                      <Eye size={12} />
                      View Document
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic mt-4">Not Uploaded</span>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="font-semibold text-slate-900">Video KYC</h3>
                    <p className="text-xs text-slate-500 mt-1">Live customer recording</p>
                  </div>
                  {lead.video_kyc ? (
                    <a
                      href={getFileUrl(lead.video_kyc) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition"
                    >
                      <Eye size={12} />
                      View Video
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic mt-4">Not Uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Status controls */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-50 pb-2">
                Actions & Status
              </h3>
              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Current Step / Status
                  </label>
                  <select
                    value={currentStep}
                    onChange={(e) => setCurrentStep(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none text-slate-800 focus:bg-white"
                  >
                    <option value="pan">PAN Card Verification</option>
                    <option value="aadhaar">Aadhaar KYC Verification</option>
                    <option value="basic-details">Basic Details Form</option>
                    <option value="work-details">Employment Details</option>
                    <option value="bank-details">Banking Details</option>
                    <option value="references">References Setup</option>
                    <option value="salary-slip">Salary Slip Upload</option>
                    <option value="customer-video-kyc">Video KYC Verification</option>
                    <option value="completed">Application Completed</option>
                    <option value="rejected">Application Rejected</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase">Lead Visible</span>
                  <button
                    type="button"
                    onClick={() => setLeadVisible(!leadVisible)}
                    className="text-purple-600 hover:text-purple-700 transition"
                  >
                    {leadVisible ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-slate-400" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition disabled:opacity-70"
                >
                  <Save size={14} />
                  {saveLoading ? "Saving..." : "Save Adjustments"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </AdminLayout>
  );
}
