import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/Components/admin/AdminLayout";
import SEO from "@/Components/SEO";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Award,
  Landmark,
  Eye,
  Save,
  ToggleLeft,
  ToggleRight,
  Download,
  MapPin,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Check,
  Video,
  FileText,
  Camera,
  Calendar,
  Building,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { getStepMeta, APPLICATION_ALL_STEPS } from "@/utils/stepHelper";

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
  last_activity_at?: string;
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

  const [currentStep, setCurrentStep] = useState("");
  const [leadVisible, setLeadVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");

  const fetchLeadDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_BASE_URL}/admin/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success && data.lead) {
        setLead(data.lead);
        setCurrentStep(data.lead.current_step || "basic_details");
        setLeadVisible(data.lead.lead_visible === 1);
      } else {
        setError(data.message || "Failed to load lead details");
      }
    } catch (err) {
      setError("Network connection failure");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLeadDetails();
  }, [fetchLeadDetails]);

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

  const getFileUrl = (filePath: string) => {
    if (!filePath) return null;
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    const base = API_BASE_URL.replace("/api", "");
    const cleanPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
    return `${base}${cleanPath}`;
  };

  const stepMeta = lead ? getStepMeta(lead.current_step) : null;

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
          {/* Main Content Area */}
          <div className="space-y-8">
            {/* Header Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 uppercase tracking-wider border border-purple-100">
                    {lead.loan_type || "Payday"} Loan
                  </span>
                  {stepMeta && (
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${stepMeta.badgeColor}`}>
                      {stepMeta.badgeText}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {lead.full_name || "Initiated Lead"}
                </h1>
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 font-mono">
                  <span>ID: {lead.application_id}</span>
                  <span>•</span>
                  <span>
                    Submitted:{" "}
                    {new Date(lead.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>
              <div className="sm:text-right bg-purple-50/50 p-4 rounded-2xl border border-purple-100 w-full sm:w-auto">
                <p className="text-xs text-purple-600 uppercase font-bold tracking-wider">Requested Loan Amount</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-purple-900 mt-1">
                  {lead.loan_amount ? `₹${parseFloat(lead.loan_amount).toLocaleString("en-IN")}` : "N/A"}
                </p>
              </div>
            </div>

            {/* Application Progress Tracker / Stepper Card */}
            {stepMeta && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles size={20} className="text-purple-600" />
                      Application Journey & Completion Status
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Current Stage: <strong className="text-slate-800">{stepMeta.label}</strong> ({stepMeta.stepNumber} of 8 steps completed)
                    </p>
                  </div>
                  <span className="text-lg font-extrabold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
                    {stepMeta.percent}%
                  </span>
                </div>

                {/* Overall Progress Bar */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      stepMeta.isComplete ? "bg-emerald-500" : "bg-gradient-to-r from-purple-600 to-indigo-600"
                    }`}
                    style={{ width: `${stepMeta.percent}%` }}
                  />
                </div>

                {/* Visual 8-Step Timeline */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
                  {APPLICATION_ALL_STEPS.map((s) => {
                    const isDone = s.id <= stepMeta.stepNumber;
                    const isCurrent = s.id === stepMeta.stepNumber;

                    return (
                      <div
                        key={s.id}
                        className={`p-3 rounded-2xl border text-center transition ${
                          isCurrent
                            ? "border-purple-600 bg-purple-50/80 shadow-sm ring-2 ring-purple-600/20"
                            : isDone
                            ? "border-emerald-200 bg-emerald-50/50"
                            : "border-slate-100 bg-slate-50/40 opacity-60"
                        }`}
                      >
                        <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold mb-1.5">
                          {isDone ? (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                              <Check size={14} />
                            </div>
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                              {s.id}
                            </div>
                          )}
                        </div>
                        <p className={`text-[11px] font-bold leading-tight ${isCurrent ? "text-purple-900" : isDone ? "text-emerald-900" : "text-slate-500"}`}>
                          {s.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Personal Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <User size={20} className="text-purple-600" />
                Personal & Contact Details
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Full Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.full_name || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">PAN Card Number</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.pan_number || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Date of Birth</span>
                  <p className="mt-1 font-semibold text-slate-900">
                    {lead.dob
                      ? new Date(lead.dob).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
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
                  <span className="text-xs text-slate-400 uppercase font-semibold">City & Pincode</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.city ? `${lead.city} (${lead.pincode})` : lead.pincode || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Education Level</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.education || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Loan Purpose</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.loan_purpose || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Running Loan?</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.has_running_loan === 1 ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>

            {/* Employment & Income Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Award size={20} className="text-purple-600" />
                Employment & Monthly Income
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Employment Status</span>
                  <p className="mt-1 font-semibold text-slate-900 capitalize">{lead.employment_status || "Salaried"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Company Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.company_name || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Designation</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.designation || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Monthly Income / Salary</span>
                  <p className="mt-1 font-extrabold text-emerald-700">
                    {lead.monthly_income ? `₹${parseFloat(lead.monthly_income).toLocaleString("en-IN")}` : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">UAN / EPF Number</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.uan_number || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Official Email</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.office_email || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Salary Credit Day</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.salary_day ? `Day ${lead.salary_day} of month` : "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Experience</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.experience_years ? `${lead.experience_years} years` : "N/A"}</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Office Address</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.office_address ? `${lead.office_address} (${lead.office_pincode})` : "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Banking Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Landmark size={20} className="text-purple-600" />
                Banking & Account Information
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Bank Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.bank_name || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Account Holder Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.account_holder || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Account Number</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.account_number || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">IFSC Code</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.ifsc_code || "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Branch Name</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.branch_name || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Personal References */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Phone size={20} className="text-purple-600" />
                Personal References
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">Reference 1 (Primary)</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">Name / Relation</p>
                    <p className="font-semibold text-slate-900">{lead.reference1_name ? `${lead.reference1_name} (${lead.reference1_relation})` : "N/A"}</p>
                    <p className="text-xs text-slate-500 pt-2">Mobile</p>
                    <p className="font-semibold text-slate-900">{lead.reference1_mobile || "N/A"}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">Reference 2 (Secondary)</h3>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">Name / Relation</p>
                    <p className="font-semibold text-slate-900">{lead.reference2_name ? `${lead.reference2_name} (${lead.reference2_relation})` : "N/A"}</p>
                    <p className="text-xs text-slate-500 pt-2">Mobile</p>
                    <p className="font-semibold text-slate-900">{lead.reference2_mobile || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Documents & Media */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                <Download size={20} className="text-purple-600" />
                Uploaded Documents & Video KYC Media
              </h2>

              <div className="grid gap-6 md:grid-cols-3 text-sm">
                {/* Selfie Photo */}
                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-purple-700 font-bold">
                      <Camera size={18} />
                      Selfie Photo
                    </div>
                    <p className="text-xs text-slate-500 mt-1">ID verification check photo</p>
                  </div>

                  {lead.selfie_photo ? (
                    <div className="space-y-3">
                      <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-200 border border-slate-200 flex items-center justify-center">
                        <img
                          src={getFileUrl(lead.selfie_photo) || ""}
                          alt="Selfie Check"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                      <a
                        href={getFileUrl(lead.selfie_photo) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition"
                      >
                        <Eye size={14} />
                        View / Download Photo
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic">Not Uploaded Yet</span>
                  )}
                </div>

                {/* Salary Slip */}
                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-purple-700 font-bold">
                      <FileText size={18} />
                      Salary Slip / Proof
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Income verification document</p>
                  </div>

                  {lead.salary_slip_current ? (
                    <div className="space-y-3">
                      <div className="h-36 w-full rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-2 text-center">
                        <FileText size={40} className="text-purple-600" />
                      </div>
                      <a
                        href={getFileUrl(lead.salary_slip_current) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition"
                      >
                        <Eye size={14} />
                        View Salary Slip
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic">Not Uploaded Yet</span>
                  )}
                </div>

                {/* Video KYC */}
                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-purple-700 font-bold">
                      <Video size={18} />
                      Video KYC Recording
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Live video consent recording</p>
                  </div>

                  {lead.video_kyc ? (
                    <div className="space-y-3">
                      <video
                        controls
                        className="h-36 w-full rounded-xl border border-slate-200 bg-black object-cover"
                        src={getFileUrl(lead.video_kyc) || ""}
                      />
                      <a
                        href={getFileUrl(lead.video_kyc) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 text-xs font-semibold text-white shadow hover:bg-purple-700 transition"
                      >
                        <Eye size={14} />
                        Open Video Player
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic">Not Uploaded Yet</span>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Live Location & Device Audit */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin size={20} className="text-purple-600" />
                  Customer Live Location & Device Audit
                </h2>

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
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      <CheckCircle size={14} />
                      Verified Live GPS Location
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Latitude</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.latitude ? String(lead.latitude) : "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Longitude</span>
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.longitude ? String(lead.longitude) : "N/A"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">GPS Accuracy</span>
                  <p className="mt-1 font-semibold text-slate-900">{lead.accuracy ? `${Number(lead.accuracy).toFixed(1)} meters` : "N/A"}</p>
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
                  <p className="mt-1 font-semibold text-slate-900 font-mono">{lead.ip_address || "N/A"}</p>
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
                    📍 View Customer Location on Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Action & Status Controls */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5 sticky top-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-50 pb-2">
                Manage Lead Status
              </h3>
              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                    Current Step / Stage
                  </label>
                  <select
                    value={currentStep}
                    onChange={(e) => setCurrentStep(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none text-slate-800 focus:bg-white"
                  >
                    <option value="basic_details">Step 1 • Basic Details Form</option>
                    <option value="pan_verify">Step 2 • PAN Card Verification</option>
                    <option value="aadhaar_verify">Step 3 • Aadhaar KYC Verification</option>
                    <option value="work_details">Step 4 • Employment Details</option>
                    <option value="bank_details">Step 5 • Banking Details</option>
                    <option value="references">Step 6 • References Setup</option>
                    <option value="documents_uploaded">Step 7 • Salary Slip Uploaded</option>
                    <option value="video_kyc_completed">Step 8 • Video KYC Completed</option>
                    <option value="completed">Application Completed</option>
                    <option value="rejected">Application Rejected</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-b border-slate-50">
                  <div>
                    <span className="text-xs font-bold text-slate-700 uppercase block">Lead Visible</span>
                    <span className="text-[11px] text-slate-400">Show in active queues</span>
                  </div>
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
                  {saveLoading ? "Saving Changes..." : "Save Status Adjustments"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </AdminLayout>
  );
}
