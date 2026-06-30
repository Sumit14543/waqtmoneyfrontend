import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CircleHelp,
  Clipboard,
  Copy,
  FileCheck2,
  ListChecks,
  Phone,
  Route,
  Coins,
  FileText,
  User,
  MapPin,
  Wallet,
  Briefcase,
  Lock,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import confetti from "canvas-confetti";

import { API_BASE_URL, getApiHeaders } from "@/config/api";

type Application = {
  application_id?: string;
  loan_amount?: number | string;
  loan_purpose?: string;
  full_name?: string;
  mobile?: string;
  city?: string;
  monthly_income?: number | string;
  employment_status?: string;
  last_activity_at?: string;
  email?: string;
  pan_number?: string;
  dob?: string;
  pincode?: string;
  company_name?: string;
  designation?: string;
  office_email?: string;
  salary_day?: number | string;
  office_address?: string;
  office_pincode?: string;
  experience_years?: number | string;
  bank_name?: string;
  account_holder?: string;
  account_number?: string;
  ifsc_code?: string;
  reference1_name?: string;
  reference1_mobile?: string;
  reference1_relation?: string;
  reference2_name?: string;
  reference2_mobile?: string;
  reference2_relation?: string;
  education?: string;
  branch_name?: string;
  uan_number?: string;
};

type CrmTimelineItem = {
  status?: string;
  stageKey?: string;
  publicStatus?: string;
  title?: string;
  description?: string;
  occurredAt?: string;
  createdAt?: string;
};

type CrmLeadStatus = {
  customerName?: string;
  phone?: string;
  crmStatus?: string;
  publicStatus?: string;
  currentStage?: string;
  statusCode?: string;
  dashboardCurrentStageKey?: string;
  dashboardStatusTitle?: string;
  dashboardStatusDescription?: string;
  dashboardNextExpectedAction?: string;
  dashboardProgressPercent?: number;
  statusTitle?: string;
  statusDescription?: string;
  progressPercent?: number;
  nextExpectedAction?: string;
  lastUpdatedAt?: string;
  timeline?: CrmTimelineItem[];
  disbursement?: {
    status?: string;
  } | null;
  repayment?: {
    status?: string;
    paidAmount?: number;
    balanceAmount?: number;
    totalAmount?: number;
  } | null;
  sanction?: {
    agreementNumber?: string;
    disbursedAmount?: number;
    dueDate?: string;
  };
};

type DashboardLoan = {
  id: string;
  loanId?: string;
  mobile?: string;
  amount?: number;
  requestedLoanAmount?: number;
  approvedLoanAmount?: number;
  totalRepayableAmount?: number;
  outstandingAmount?: number;
  paidAmount?: number;
  dueDate?: string;
  disbursalDate?: string;
  crmStatus?: CrmLeadStatus;
};

const getStoredApplicationId = () =>
  sessionStorage.getItem("applicationId") ||
  localStorage.getItem("applicationId") ||
  "";

const readJsonResponse = async (res: Response) => {
  const text = await res.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: "Server returned an invalid response" };
  }
};

const formatAmount = (value?: number | string) => {
  const amount = Number(value || 0);

  if (!Number.isFinite(amount) || amount <= 0) return "-";

  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
};

const formatDate = (value?: string) => {
  if (!value)
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date());

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatDateTime = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getTimelineText = (item?: CrmTimelineItem) =>
  [
    item?.stageKey,
    item?.status,
    item?.publicStatus,
    item?.title,
    item?.description,
  ]
    .join(" ")
    .toLowerCase();

const findTimelineIndex = (items: CrmTimelineItem[], patterns: RegExp[]) => {
  for (let i = items.length - 1; i >= 0; i--) {
    if (patterns.some((pattern) => pattern.test(getTimelineText(items[i])))) {
      return i;
    }
  }
  return -1;
};

const getCurrentTimelineIndex = (items: CrmTimelineItem[], status?: CrmLeadStatus) => {
  const dashboardStageKey = String(status?.dashboardCurrentStageKey || "").toLowerCase();
  const dashboardStagePatterns: Record<string, RegExp[]> = {
    loan_disbursed: [/loan\s+disbursed/, /\bdisbursed\b/],
    repayment_received: [/repayment\s+received/, /\brepayment\b.*\breceived\b/],
    sent_to_accounts: [/sent\s+to\s+accounts/, /queued\s+for\s+disbursement/],
  };

  if (dashboardStageKey) {
    const index = findTimelineIndex(items, dashboardStagePatterns[dashboardStageKey] || [
      new RegExp(dashboardStageKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    ]);

    if (index >= 0) return index;
  }

  const currentStage = String(status?.currentStage || status?.statusCode || "").toLowerCase();
  const exactIndex = items.findIndex((item) =>
    String(item.stageKey || item.status || item.publicStatus || "").toLowerCase() === currentStage
  );

  if (exactIndex >= 0) return exactIndex;

  if (currentStage) {
    const textIndex = findTimelineIndex(items, [
      new RegExp(currentStage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    ]);

    if (textIndex >= 0) return textIndex;
  }

  return Math.max(0, items.length - 1);
};

const getStepStatus = (step?: string) => {
  switch (step) {
    case "video_kyc_completed":
      return {
        title: "Application under review",
        description: "Your application has been received and is currently under review by our credit team.",
      };
    case "documents_uploaded":
      return {
        title: "Documents uploaded",
        description: "Your documents have been uploaded. Please complete your video KYC to proceed.",
      };
    case "basic_details":
    case "otp_verified":
      return {
        title: "Application in progress",
        description: "Please complete your application form to submit it for review.",
      };
    default:
      return {
        title: "Application under process",
        description: "Your application is under process. We will update you shortly.",
      };
  }
};

const maskAccountNumber = (num?: string) => {
  if (!num || num === "-") return "-";
  const clean = num.replace(/\s+/g, "");
  if (clean.length <= 4) return clean;
  return `•••• •••• ${clean.slice(-4)}`;
};

const LoanStatus = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [dashboardLoan, setDashboardLoan] = useState<DashboardLoan | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const applicationId = getStoredApplicationId();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("review") === "true" || params.get("reset") === "true") {
      localStorage.removeItem(`submitted_${applicationId}`);
      localStorage.removeItem("submitted_");
      return false;
    }
    return localStorage.getItem(`submitted_${applicationId}`) === "true";
  });

  const triggerConfetti = () => {
    // Left popper
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.1, y: 0.8 },
      colors: ["#8048e2", "#bd56e4", "#2f6ce5", "#16b978", "#f59e0b"],
      angle: 60,
    });
    // Right popper
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.9, y: 0.8 },
      colors: ["#8048e2", "#bd56e4", "#2f6ce5", "#16b978", "#f59e0b"],
      angle: 120,
    });
  };

  const handleSubmitApplication = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/application/update`, {
        method: "PUT",
        credentials: "include",
        headers: getApiHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          id: applicationId,
          submit_at: new Date().toISOString(),
        }),
      });

      const result = await readJsonResponse(response);

      if (!response.ok) {
        const params = new URLSearchParams(window.location.search);
        if (params.get("review") === "true") {
          console.warn("Bypassing API submit error in review mode");
        } else {
          throw new Error(result.message || "Failed to submit application");
        }
      }

      setIsSubmitted(true);
      localStorage.setItem(`submitted_${applicationId}`, "true");
      triggerConfetti();
    } catch (submitErr: any) {
      console.error("Submit application error:", submitErr);
      const params = new URLSearchParams(window.location.search);
      if (params.get("review") === "true") {
        setIsSubmitted(true);
        localStorage.setItem(`submitted_${applicationId}`, "true");
        triggerConfetti();
      } else {
        setError(submitErr.message || "Server not reachable during submission");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        triggerConfetti();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [applicationId, isSubmitted]);

  useEffect(() => {
    if (!applicationId) {
      setError("Application ID not found.");
      return;
    }

    const loadApplication = async () => {
      try {
        const dashboardResponse = await fetch(`${API_BASE_URL}/auth/dashboard`, {
          credentials: "include",
        });
        const dashboardResult = await readJsonResponse(dashboardResponse);

        let hasMatchingLoan = false;
        if (dashboardResponse.ok) {
          const loans: DashboardLoan[] = dashboardResult.data?.loans || [];
          const matchingLoan =
            loans.find((loan) => loan.id === applicationId || loan.loanId === applicationId) ||
            null;

          if (matchingLoan) {
            setDashboardLoan(matchingLoan);
            hasMatchingLoan = true;
          }
        }

        const response = await fetch(
          `${API_BASE_URL}/application/${applicationId}`,
          {
            headers: getApiHeaders(),
            credentials: "include",
          }
        );

        const result = await readJsonResponse(response);

        if (!response.ok) {
          if (!hasMatchingLoan) {
            setError(result.message || "Unable to load application status");
          }
          return;
        }

        const appData = result.data || null;
        setApplication(appData);
        if (appData && (appData.submit_at || localStorage.getItem(`submitted_${applicationId}`) === "true")) {
          setIsSubmitted(true);
          localStorage.setItem(`submitted_${applicationId}`, "true");
        }
      } catch (fetchError) {
        console.error("Application status fetch error:", fetchError);
        setError("Server not reachable");
      }
    };

    loadApplication();
  }, [applicationId]);

  const displayApplicationId =
    dashboardLoan?.id || application?.application_id || applicationId || "-";

  const crmStatus = dashboardLoan?.crmStatus || null;
  const rawTimeline = crmStatus?.timeline || [];
  const currentTimelineIndex = rawTimeline.length ? getCurrentTimelineIndex(rawTimeline, crmStatus || undefined) : -1;
  const visibleTimeline =
    currentTimelineIndex >= 0 ? rawTimeline.slice(0, currentTimelineIndex + 1) : rawTimeline;
  const useTimelineProgress = Boolean(crmStatus?.dashboardCurrentStageKey && rawTimeline.length);
  const progress = Math.min(
    100,
    Math.max(
      0,
      Number(
        useTimelineProgress
          ? ((currentTimelineIndex + 1) / rawTimeline.length) * 100
          : crmStatus?.dashboardProgressPercent ??
          crmStatus?.progressPercent ??
          (rawTimeline.length && currentTimelineIndex >= 0
            ? ((currentTimelineIndex + 1) / rawTimeline.length) * 100
            : 0)
      )
    )
  );
  const currentTimelineItem =
    currentTimelineIndex >= 0 ? rawTimeline[currentTimelineIndex] : undefined;
  const stepStatus = getStepStatus(application?.current_step);
  const liveStatusTitle =
    crmStatus?.dashboardStatusTitle ||
    crmStatus?.statusTitle ||
    crmStatus?.publicStatus ||
    currentTimelineItem?.title ||
    currentTimelineItem?.publicStatus ||
    stepStatus.title;
  const liveStatusDescription =
    crmStatus?.dashboardStatusDescription ||
    crmStatus?.statusDescription ||
    currentTimelineItem?.description ||
    stepStatus.description;
  const liveLastUpdated =
    crmStatus?.lastUpdatedAt ||
    currentTimelineItem?.occurredAt ||
    currentTimelineItem?.createdAt ||
    application?.last_activity_at;

  const copyApplicationId = async () => {
    try {
      await navigator.clipboard.writeText(displayApplicationId);
    } catch (copyError) {
      console.error("Copy application ID failed:", copyError);
    }
  };

  if (!isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-[#f8fafc] to-[#f1f5f9] py-6 px-4 sm:py-8 sm:px-6 relative overflow-hidden">
        {/* Animated glowing decorative backdrops */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-300/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-orange-300/10 blur-[100px] pointer-events-none" />

        <main className="mx-auto w-full max-w-[1000px] flex-1 relative z-10">
          {/* Dashboard Header */}
          <div className="text-center mb-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-purple-700 mb-2.5 border border-purple-200 uppercase tracking-wider">
              ✨ Final Submission
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071d3a] tracking-tight">
              Application Review Dashboard
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-3" />
          </div>

          {error && (
            <div className="mx-auto max-w-[1000px] mb-4 rounded-xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm font-semibold text-red-600 backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {/* Column 1 - Personal & Loan */}
            <div className="space-y-6">
              {/* Card 1: Personal details */}
              <section className="rounded-3xl border border-purple-100/70 bg-white/70 backdrop-blur-md p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:border-purple-200">
                <h2 className="flex items-center gap-3 text-base font-bold text-[#071d3a] border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100 shadow-sm">
                    <User className="h-4.5 w-4.5" />
                  </span>
                  Personal Details
                </h2>

                <div className="mt-2.5 space-y-0.5 font-sans">
                  {[
                    ["Applicant Name", application?.full_name || "-"],
                    ["Mobile Number", application?.mobile || "-"],
                    ["PAN Number", application?.pan_number || "-"],
                    ["Email Address", application?.email || "-"],
                    ["City", application?.city || "-"],
                    ["Pincode", application?.pincode || "-"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs py-2.5 px-1 border-b border-slate-100/60 hover:bg-purple-50/20 transition-colors duration-150 last:border-b-0">
                      <span className="text-[#52657d] font-semibold">{label}</span>
                      <span className="text-[#071d3a] font-bold text-right truncate max-w-[60%]">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Card 2: Loan details */}
              <section className="rounded-3xl border border-purple-100/70 bg-white/70 backdrop-blur-md p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:border-purple-200">
                <h2 className="flex items-center gap-3 text-base font-bold text-[#071d3a] border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                    <Coins className="h-4.5 w-4.5" />
                  </span>
                  Loan Requirements
                </h2>

                <div className="mt-2.5 space-y-0.5 font-sans">
                  {[
                    ["Requested Amount", formatAmount(application?.loan_amount || dashboardLoan?.approvedLoanAmount || dashboardLoan?.amount)],
                    ["Loan Purpose", application?.loan_purpose || "-"],
                    ["Application ID", displayApplicationId],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs py-2.5 px-1 border-b border-slate-100/60 hover:bg-purple-50/20 transition-colors duration-150 last:border-b-0">
                      <span className="text-[#52657d] font-semibold">{label}</span>
                      <span className="text-[#071d3a] font-bold text-right select-all truncate max-w-[60%]">{value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Column 2 - Employment details */}
            <div className="space-y-6">
              {/* Card 3: Employment details */}
              <section className="rounded-3xl border border-purple-100/70 bg-white/70 backdrop-blur-md p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:border-purple-200">
                <h2 className="flex items-center gap-3 text-base font-bold text-[#071d3a] border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                    <Briefcase className="h-4.5 w-4.5" />
                  </span>
                  Employment Details
                </h2>

                <div className="mt-2.5 space-y-0.5 font-sans">
                  {[
                    ["Employment Status", application?.employment_status || "-"],
                    ["Monthly Income", formatAmount(application?.monthly_income)],
                    ["Company Name", application?.company_name || "-"],
                    ["Designation", application?.designation || "-"],
                    ["Salary Day", application?.salary_day ? `Day ${application.salary_day}` : "-"],
                    ["Education", application?.education || "-"],
                    ["Total Experience", application?.experience_years ? `${application.experience_years} Years` : "-"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs py-2.5 px-1 border-b border-slate-100/60 hover:bg-purple-50/20 transition-colors duration-150 last:border-b-0">
                      <span className="text-[#52657d] font-semibold">{label}</span>
                      <span className="text-[#071d3a] font-bold text-right max-w-[60%] break-words">{value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Column 3 - Bank & References */}
            <div className="space-y-6">
              {/* Card 4: Bank details */}
              <section className="rounded-3xl border border-purple-100/70 bg-white/70 backdrop-blur-md p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:border-purple-200">
                <h2 className="flex items-center gap-3 text-base font-bold text-[#071d3a] border-b border-slate-100 pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                    <Wallet className="h-4.5 w-4.5" />
                  </span>
                  Bank Account Details
                </h2>

                <div className="mt-2.5 space-y-0.5 font-sans">
                  {[
                    ["Account Holder", application?.account_holder || "-"],
                    ["Bank Name", application?.bank_name || "-"],
                    ["Branch Name", application?.branch_name || "-"],
                    ["Account Number", application?.account_number || "-"],
                    ["IFSC Code", application?.ifsc_code || "-"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs py-2.5 px-1 border-b border-slate-100/60 hover:bg-purple-50/20 transition-colors duration-150 last:border-b-0">
                      <span className="text-[#52657d] font-semibold">{label}</span>
                      <span className="text-[#071d3a] font-bold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Card 5: Reference Details */}
              <section className="rounded-3xl border border-purple-100/70 bg-white/70 backdrop-blur-md p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:border-purple-200">
                <h2 className="flex items-center gap-3 text-base font-bold text-[#071d3a] border-b border-slate-100 pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shadow-sm">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  Reference Contacts
                </h2>

                <div className="mt-2.5 space-y-0.5 font-sans">
                  {[
                    ["Ref 1 Name", application?.reference1_name || "-"],
                    ["Ref 1 Mobile", application?.reference1_mobile || "-"],
                    ["Ref 2 Name", application?.reference2_name || "-"],
                    ["Ref 2 Mobile", application?.reference2_mobile || "-"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs py-2.5 px-1 border-b border-slate-100/60 hover:bg-purple-50/20 transition-colors duration-150 last:border-b-0">
                      <span className="text-[#52657d] font-semibold">{label}</span>
                      <span className="text-[#071d3a] font-bold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="text-center mt-6">
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmitApplication}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8048e2] to-[#bd56e4] px-12 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-200/50 hover:shadow-xl hover:shadow-purple-300/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 min-w-[200px]"
            >
              {submitting ? "Submitting... ⏳" : "Submit"}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f1f5f9] via-[#f8fafc] to-[#eef2ff] py-10 px-4 sm:py-16 sm:px-6">
      <div className="w-full max-w-[440px]">
        {/* CONGRATULATIONS / APPLICATION COMPLETED SECTION */}
        <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white/95 p-8 text-center shadow-[0_20px_50px_rgba(8,15,52,0.04)] relative">
          {/* Subtle glowing backdrops */}
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-150/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 h-48 w-48 rounded-full bg-indigo-150/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Success Checkmark */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-100/85">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>

            <h2 className="mt-6 text-xl sm:text-2xl font-black text-[#071d3a] tracking-tight">
              Congratulations, {application?.full_name || crmStatus?.customerName || "Customer"}! 🎉
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm font-bold text-emerald-600">
              Your Application is Completed & Submitted
            </p>

            <p className="mx-auto mt-4 text-xs sm:text-sm leading-relaxed text-[#52657d] font-medium font-sans">
              Thank you for submitting your details. Our verification team is currently reviewing your profile. We will notify you via SMS or Email as soon as the review is complete.
            </p>

            {/* Application ID Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50/80 px-4 py-2 text-xs font-bold text-[#071d3a]">
              <span className="text-slate-400 font-semibold font-sans">Application ID:</span>
              <span className="select-all">{displayApplicationId}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(displayApplicationId);
                }}
                className="p-0.5 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title="Copy Application ID"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>

            {/* Bottom Row: RBI Registered Partner on Left, 256-bit Secure on Right */}
            <div className="mt-8 pt-5 border-t border-slate-100/80 flex flex-wrap items-center justify-between gap-4 w-full font-sans">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>RBI Registered Partner</span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>256-bit Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanStatus;
