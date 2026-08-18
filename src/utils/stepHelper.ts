export type StepMeta = {
  stepNumber: number;
  totalSteps: number;
  label: string;
  badgeText: string;
  percent: number;
  badgeColor: string;
  isComplete: boolean;
};

export const getStepMeta = (stepRaw: string): StepMeta => {
  const s = String(stepRaw || "").toLowerCase().trim();

  if (["video_kyc_completed", "completed", "loan_disbursed", "repayment_received"].includes(s)) {
    return {
      stepNumber: 8,
      totalSteps: 8,
      label: "Video KYC Completed",
      badgeText: "Step 8/8 • Video KYC Completed",
      percent: 100,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      isComplete: true,
    };
  }
  if (["documents_uploaded", "upload_docs", "salary_slip"].includes(s)) {
    return {
      stepNumber: 7,
      totalSteps: 8,
      label: "Documents Uploaded",
      badgeText: "Step 7/8 • Docs Uploaded",
      percent: 87,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      isComplete: false,
    };
  }
  if (["references", "references_completed"].includes(s)) {
    return {
      stepNumber: 6,
      totalSteps: 8,
      label: "References Provided",
      badgeText: "Step 6/8 • References Submitted",
      percent: 75,
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      isComplete: false,
    };
  }
  if (["bank_details", "bank"].includes(s)) {
    return {
      stepNumber: 5,
      totalSteps: 8,
      label: "Bank Details Submitted",
      badgeText: "Step 5/8 • Bank Details",
      percent: 62,
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      isComplete: false,
    };
  }
  if (["work_details", "company_details", "employment"].includes(s)) {
    return {
      stepNumber: 4,
      totalSteps: 8,
      label: "Work Details Submitted",
      badgeText: "Step 4/8 • Work Details",
      percent: 50,
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      isComplete: false,
    };
  }
  if (["aadhaar_verify", "aadhaar_verified", "aadhaar"].includes(s)) {
    return {
      stepNumber: 3,
      totalSteps: 8,
      label: "Aadhaar Verified",
      badgeText: "Step 3/8 • Aadhaar Verified",
      percent: 37,
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      isComplete: false,
    };
  }
  if (["pan_verify", "pan_verified", "pan"].includes(s)) {
    return {
      stepNumber: 2,
      totalSteps: 8,
      label: "PAN Verified",
      badgeText: "Step 2/8 • PAN Verified",
      percent: 25,
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
      isComplete: false,
    };
  }
  if (s === "rejected" || s === "cancelled") {
    return {
      stepNumber: 0,
      totalSteps: 8,
      label: "Application Rejected",
      badgeText: "Rejected",
      percent: 0,
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      isComplete: false,
    };
  }

  return {
    stepNumber: 1,
    totalSteps: 8,
    label: "Basic Details / Initiated",
    badgeText: "Step 1/8 • Basic Details",
    percent: 12,
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isComplete: false,
  };
};

export const APPLICATION_ALL_STEPS = [
  { id: 1, name: "Basic Details", key: "basic_details" },
  { id: 2, name: "PAN Verification", key: "pan_verify" },
  { id: 3, name: "Aadhaar KYC", key: "aadhaar_verify" },
  { id: 4, name: "Work Details", key: "work_details" },
  { id: 5, name: "Bank Details", key: "bank_details" },
  { id: 6, name: "References", key: "references" },
  { id: 7, name: "Upload Docs", key: "documents_uploaded" },
  { id: 8, name: "Video KYC", key: "video_kyc_completed" },
];
