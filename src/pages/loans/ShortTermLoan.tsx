import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  IndianRupee,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Scale,
  HelpCircle,
  FileText,
  ChevronDown,
  Sparkles,
  Check,
  Zap,
  UserCheck,
  Building2,
  Calendar,
  Layers,
  ArrowRightLeft
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function ShortTermLoan() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Short Term Loan?",
      a: "A Short Term Loan is an unsecured loan meant to be repaid over a brief period — typically weeks to a few months — designed to bridge temporary cash flow gaps or emergencies."
    },
    {
      q: "2. Who is eligible for a Short Term Loan?",
      a: "Salaried employees, working professionals, and in some cases self-employed individuals with a stable income and reasonable credit profile can apply."
    },
    {
      q: "3. What documents are required?",
      a: "You'll need your Aadhaar Card, PAN Card, salary slip or income proof, and recent bank statements for KYC and income verification."
    },
    {
      q: "4. What is the repayment period?",
      a: "The Short Term Loan Tenure generally ranges from a few weeks to a few months, depending on your loan offer and eligibility."
    },
    {
      q: "5. How is interest calculated?",
      a: "The Short Term Loan Interest Rate is determined based on your loan amount, tenure, income, and credit profile, and is disclosed clearly before you accept your offer."
    },
    {
      q: "6. Can I repay early?",
      a: "If you wish to repay before your scheduled date, reach out to our support team to understand the applicable terms."
    },
    {
      q: "7. How do I apply online?",
      a: "Fill out the online application, upload your documents, complete verification, review your offer, and receive disbursal directly to your bank account."
    },
    {
      q: "8. Is a Short Term Loan different from a Personal Loan?",
      a: "Yes — a Short Term Loan has a shorter tenure and is meant for temporary, defined needs, while a Personal Loan typically covers larger amounts over a longer repayment period."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Short Term Loan",
      "description": "Need funds for a short period? Apply Short Term Loan Online with Waqt Money. Quick eligibility check, minimal documents, and flexible repayment for emergencies.",
      "url": "https://waqtmoney.com/loans/short-term-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ];

  return (
    <>
      <SEO
        title="Short Term Loan Online – Quick Personal Short Term Loan | Waqt Money"
        description="Need funds for a short period? Apply Short Term Loan Online with Waqt Money. Quick eligibility check, minimal documents, and flexible repayment for emergencies."
        keywords="Short Term Loan Online, Personal Short Term Loan, Emergency Loan, Salary Advance Loan, Payday Loan, Instant Cash Loan, Short Term Loan India"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen text-slate-800">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-3 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            </li>
            <li className="before:content-['/'] before:mr-2">
              <Link to="/services" className="hover:text-purple-600 transition-colors">Loans</Link>
            </li>
            <li className="before:content-['/'] before:mr-2 text-slate-800 font-medium" aria-current="page">
              Short Term Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
              <Zap className="h-3.5 w-3.5" /> Instant Temporary Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Short Term Loan
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Need funds for a short period? Get a Short Term Loan Online with Waqt Money — minimal documents, quick digital verification, and flexible repayment built around your needs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link to="/user/apply">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#8048e2] px-7 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:bg-[#6d28d9] shadow-[0_4px_14px_rgba(128,72,226,0.35)] hover:shadow-[0_6px_20px_rgba(128,72,226,0.45)] hover:scale-[1.02] cursor-pointer">
                  Apply Now
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </Link>
              <a href="#eligibility">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300/90 bg-white px-7 text-sm sm:text-base font-semibold text-slate-800 transition-all duration-200 hover:bg-purple-50/60 hover:border-purple-300 hover:text-purple-700 cursor-pointer shadow-2xs">
                  Check Your Eligibility →
                </button>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-0 pointer-events-none"></div>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
              <Clock className="h-5 w-5 text-purple-600" /> Key Features at a Glance
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Repayment Period</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Weeks to Months</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Documentation</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Minimal KYC</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Process</p>
                <p className="text-xl font-bold text-purple-700 mt-1">100% Digital</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Verification</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Quick & Online</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Short Term Loan? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-purple-600 shrink-0" />
                What is a Short Term Loan?
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                A Short Term Loan is an unsecured loan designed to be repaid over a brief period — typically a few weeks to a few months — rather than over years like a standard loan. As a form of Short Term Loan India product, it exists to bridge temporary cash flow gaps, whether that's an unexpected bill, a medical expense, or a short window before your next income arrives.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                An Online Short Term Loan works much like a Personal Short Term Loan: it's unsecured, doesn't require collateral, and is assessed largely on your income and credit profile. It sits in the same family as an Emergency Loan, a Salary Advance Loan, or a Payday Loan — all are short-tenure credit options meant for quick, temporary needs rather than long-term financing.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                What sets a Short Term Loan apart is flexibility in tenure and amount — it can be structured for a slightly longer window than a typical payday loan, while still being far shorter than a standard personal loan. This makes it a practical Instant Cash Loan alternative for people who need funds quickly but don't want to commit to a multi-year repayment plan. Because the process is digital end-to-end, applying for a Short Term Loan online is generally faster than visiting a bank branch and working through traditional paperwork.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Benefits of a Short Term Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Features & Benefits of a Short Term Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                An Instant Short Term Loan from Waqt Money is built around speed, flexibility, and transparency:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <IndianRupee className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Flexible Loan Amount</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Borrow based on your genuine short-term requirement and eligibility.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Clock className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Short, Manageable Tenure</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Repay over a short period that suits a temporary cash flow need, rather than committing to years of EMIs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Calendar className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Flexible Repayment</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Repayment structures are designed to match how and when you expect funds to come back to you.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <ShieldCheck className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Transparent Processing Fee</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All applicable fees are clearly disclosed before you accept your loan offer.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Clear Interest Rate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your rate is disclosed upfront, based on your loan amount, tenure, and credit profile.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <FileText className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Minimal Documentation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Only basic KYC and income documents are required — no collateral, no guarantor.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <UserCheck className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Digital Process</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  From application to disbursal, everything happens online.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Zap className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Emergency Ready</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Designed to be processed quickly enough to help in genuinely urgent situations.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-3xl mx-auto">
              Together, these features make a Short Term Loan a practical option when you need funds quickly for a defined, temporary purpose.
            </div>
          </div>
        </section>

        {/* Common Uses of a Short Term Loan */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Common Uses of a Short Term Loan
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              A Short Term Loan can help cover a range of temporary needs, including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Primary Everyday Needs</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Short Term Loan for Medical Emergency:</strong> Sudden medical costs that need to be paid before your next paycheck.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Short Term Loan for Household Expenses:</strong> Covering essential monthly costs during a temporary cash crunch.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Short Term Loan for Utility Bills:</strong> Electricity, water, or other bills that are due sooner than expected.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Short Term Loan for Credit Card Bills:</strong> Avoiding late fees or high credit card interest by clearing dues on time.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Emergency Cash Loan Scenarios</h3>
              <p className="text-xs text-slate-500">Commonly used as an Emergency Cash Loan for:</p>
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-purple-50/60 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Medical emergencies
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/60 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Utility bills
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/60 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Household expenses
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/60 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Rent payments
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/60 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Unexpected expenses
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50/60 text-xs font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Temporary cash flow
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            Because it's structured for short-term use, a Short Term Loan works best when you have visibility into how and when you'll repay it — for larger, longer-term needs, a standard personal loan is usually a better fit.
          </div>
        </section>

        {/* Who Can Apply? */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Who Can Apply?
              </h2>
              <p className="text-slate-600 text-base">
                A Short Term Loan is designed for individuals with a stable, verifiable source of income. This typically includes:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Salaried Employees</h3>
                  <p className="text-xs text-slate-600">Individuals with a fixed monthly salary credited to their bank account.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Private Employees</h3>
                  <p className="text-xs text-slate-600">Employees at private companies with verifiable salary income.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Working Professionals</h3>
                  <p className="text-xs text-slate-600">Anyone in stable employment seeking a quick, temporary cash bridge.</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                Self-employed professionals and business owners may also be considered, subject to eligibility criteria and income documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Short Term Loan Eligibility */}
        <section id="eligibility" className="container mx-auto px-4 py-16 max-w-4xl scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Short Term Loan Eligibility
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Short Term Loan Eligibility is kept simple so funds can be accessed quickly when needed. General Short Term Loan Eligibility Criteria include:
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm space-y-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-sm text-slate-700">Indian resident, generally between 21 and 58 years of age</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-sm text-slate-700">Stable monthly income, whether salaried or self-employed</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-sm text-slate-700">Minimum income threshold as defined by the lender</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-sm text-slate-700">Reasonable credit score, reflecting responsible repayment history</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-sm text-slate-700">Valid documents for income verification</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Your overall profile — income stability, credit history, and existing obligations — is assessed as part of a standard eligibility review, keeping the process quick without skipping responsible checks.
          </div>

          <div className="text-center">
            <Link to="/user/apply">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                Check Your Eligibility →
              </button>
            </Link>
          </div>
        </section>

        {/* Documents Required */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Documents Required
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Documents Required for Short Term Loan applications are kept minimal, in line with the product's quick, short-tenure nature:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> Aadhaar Card
                </li>
                <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> PAN Card
                </li>
                <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> Salary Slip / Income Proof
                </li>
                <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> Bank Statement (Recent months)
                </li>
                <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm font-semibold text-slate-800 sm:col-span-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> Basic KYC details for identity verification
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 leading-relaxed">
              These Short Term Loan Documents allow Waqt Money to verify your identity, income, and repayment capacity efficiently, helping your application move through eligibility and disbursal without unnecessary delay.
            </div>
          </div>
        </section>

        {/* Interest Rate & Charges */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Interest Rate & Charges
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Understanding the Short Term Loan Interest Rate and associated charges upfront helps you plan repayment with clarity:
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 p-6 space-y-4">
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p><strong>Interest Rate:</strong> Determined based on your loan amount, tenure, income profile, and credit history.</p>
              <p><strong>Short Term Loan Processing Fee:</strong> A fee applicable at the time of disbursal, clearly disclosed before you accept your offer.</p>
              <p><strong>Other Loan Charges:</strong> Any additional processing charges are outlined transparently in your loan agreement.</p>
            </div>
          </div>

          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Final interest rates, fees, and loan terms depend on your eligibility, risk assessment, and lender policy at the time of application. We recommend reviewing your complete loan offer — including all charges — before accepting, so there are no surprises during repayment.
          </div>
        </section>

        {/* Repayment & Loan Tenure */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Repayment & Loan Tenure
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Short Term Loan Repayment is structured to match the temporary nature of the need it's meant to cover:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p><strong>Short Term Loan Tenure:</strong> A short window, generally ranging from a few weeks to a few months, depending on your loan offer.</p>
                <p><strong>Repayment Schedule:</strong> Structured around your income cycle, so repayment aligns with when funds are expected to come in.</p>
                <p><strong>Flexible Repayment:</strong> The exact structure — whether a single repayment or a short series of instalments — is confirmed in your loan agreement at the time of approval.</p>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed italic border-t border-slate-100">
                Because tenure is short, it's important to be confident in your repayment timeline before applying, so the loan resolves your temporary need without becoming a longer-term burden.
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Sections */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-16">
          {/* Short Term Loan vs Personal Loan */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                Short Term Loan vs Personal Loan
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-purple-900 text-white font-semibold">
                      <th className="py-3.5 px-5 w-1/4">Aspect</th>
                      <th className="py-3.5 px-5 w-3/8">Short Term Loan</th>
                      <th className="py-3.5 px-5 w-3/8">Personal Loan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Purpose</td>
                      <td className="py-3.5 px-5 text-slate-600">Temporary cash flow gaps, emergencies</td>
                      <td className="py-3.5 px-5 text-slate-600">Broader needs — travel, wedding, home renovation, etc.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Loan Amount</td>
                      <td className="py-3.5 px-5 text-slate-600">Typically smaller, aligned to short-term need</td>
                      <td className="py-3.5 px-5 text-slate-600">Often larger, based on income and eligibility</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Repayment Period</td>
                      <td className="py-3.5 px-5 text-slate-600">Weeks to a few months</td>
                      <td className="py-3.5 px-5 text-slate-600">Months to a few years</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Documentation</td>
                      <td className="py-3.5 px-5 text-slate-600">Minimal</td>
                      <td className="py-3.5 px-5 text-slate-600">Slightly more detailed</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Suitable For</td>
                      <td className="py-3.5 px-5 text-slate-600">Quick, temporary, defined needs</td>
                      <td className="py-3.5 px-5 text-slate-600">Larger, planned, or longer-term financial needs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
              An Emergency Loan like a Short Term Loan is best suited when you know exactly what you need funds for and expect to repay soon. A Personal Loan is the better choice for larger amounts repaid over a longer period.
            </p>
          </div>

          {/* Short Term Loan vs Payday Loan */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                Short Term Loan vs Payday Loan
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-purple-900 text-white font-semibold">
                      <th className="py-3.5 px-5 w-1/4">Aspect</th>
                      <th className="py-3.5 px-5 w-3/8">Short Term Loan</th>
                      <th className="py-3.5 px-5 w-3/8">Payday Loan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Purpose</td>
                      <td className="py-3.5 px-5 text-slate-600">Temporary needs with slightly more flexible tenure</td>
                      <td className="py-3.5 px-5 text-slate-600">Bridging the gap right before your next salary</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Repayment Period</td>
                      <td className="py-3.5 px-5 text-slate-600">A few weeks to a few months</td>
                      <td className="py-3.5 px-5 text-slate-600">Typically a few weeks, tied closely to salary date</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Typical Loan Amount</td>
                      <td className="py-3.5 px-5 text-slate-600">Can be somewhat higher, depending on eligibility</td>
                      <td className="py-3.5 px-5 text-slate-600">Usually smaller, aligned to salary-cycle gaps</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Best Use Cases</td>
                      <td className="py-3.5 px-5 text-slate-600">Slightly longer temporary needs, medical bills, utility dues</td>
                      <td className="py-3.5 px-5 text-slate-600">Very short-term gaps right before payday</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
              A Payday Loan or Salary Advance Loan is the more precise fit when your need is strictly about timing before your next paycheck. A Short Term Loan offers a bit more flexibility in both amount and tenure for temporary needs that don't fit neatly into a single salary cycle.
            </p>
          </div>
        </section>

        {/* How to Apply for a Short Term Loan Online? */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                How to Apply for a Short Term Loan Online?
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Apply Short Term Loan Online with Waqt Money in a few simple steps:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Fill Application</h3>
                <p className="text-xs text-slate-600">Complete the Online Short Term Loan Application with your basic personal and income details.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Upload Documents</h3>
                <p className="text-xs text-slate-600">Submit Aadhaar, PAN, income proof, and bank statement through a secure digital portal.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Online Verification</h3>
                <p className="text-xs text-slate-600">Your details go through a quick verification process to confirm eligibility.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                  4
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Review Your Offer</h3>
                <p className="text-xs text-slate-600">See your loan amount, interest rate, fees, and repayment terms before accepting.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                  5
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Disbursal</h3>
                <p className="text-xs text-slate-600">Once you accept, funds are transferred directly to your bank account.</p>
              </div>
            </div>

            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
              The full Short Term Loan Apply Online journey is designed to move through loan processing with minimal friction, from application to disbursal.
            </div>
          </div>
        </section>

        {/* Why Choose Waqt Money? */}
        <section className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why Choose Waqt Money?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              When you need a Short Term Loan Online, choosing a transparent, dependable lender matters. Here's what Waqt Money offers:
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Digital Application</p>
                  <p className="text-xs text-slate-600 mt-0.5">Apply from anywhere, without visiting a branch.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Transparent Process</p>
                  <p className="text-xs text-slate-600 mt-0.5">Interest rate, fees, and repayment terms are clearly disclosed before you accept your offer.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Secure Verification</p>
                  <p className="text-xs text-slate-600 mt-0.5">Your documents and data are handled through a secure, digital verification process.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Minimal Documentation</p>
                  <p className="text-xs text-slate-600 mt-0.5">Only the essentials — no unnecessary paperwork.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Dedicated Customer Support</p>
                  <p className="text-xs text-slate-600 mt-0.5">Our team is available to help you understand your loan offer and repayment schedule.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Responsible Lending</p>
                  <p className="text-xs text-slate-600 mt-0.5">Every application is assessed carefully to ensure the loan amount and repayment terms genuinely fit your situation.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
              Our goal is to make a Short Term Loan a genuinely useful bridge during temporary cash flow gaps — not a source of added financial stress.
            </div>
          </div>
        </section>

        {/* When Should You Choose a Short Term Loan? & Guidance */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-12">
            
            {/* When to choose */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                When Should You Choose a Short Term Loan?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                A Short Term Loan is a good fit when you're facing:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Temporary cash flow gaps:</strong> a short window where expenses outpace available funds.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Unexpected expenses:</strong> costs you didn't plan for, like a medical bill or urgent repair.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Time-sensitive financial needs:</strong> situations where waiting isn't an option.
                </li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-500 italic">
                If your need is ongoing or larger in scale, a standard Personal Loan is usually the more suitable option.
              </p>
            </div>

            {/* Approval Factors & Tips */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-base">Factors That Affect Loan Approval</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><strong>Income Stability:</strong> Consistent income improves your chances of approval.</li>
                  <li><strong>Employment Status:</strong> Salaried or verifiably self-employed status is generally assessed.</li>
                  <li><strong>Existing Loan Obligations:</strong> Other ongoing EMIs or debts are factored into the assessment.</li>
                  <li><strong>Credit Profile:</strong> Your credit score and repayment history play a role.</li>
                  <li><strong>Verification Results:</strong> Accurate, complete documentation helps avoid delays.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Scale className="h-4 w-4 text-purple-600" /> Responsible Borrowing Tips
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>Borrow only what you genuinely need for your short-term purpose.</li>
                  <li>Review all fees and repayment terms carefully before accepting your loan offer.</li>
                  <li>Plan your repayment timeline before applying, so it aligns with your expected income.</li>
                  <li>Avoid submitting multiple simultaneous loan applications, as this can affect your credit profile.</li>
                </ul>
              </div>
            </div>

            {/* Reasons for Non-Approval */}
            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 space-y-3">
              <h3 className="font-bold text-amber-900 text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" /> Common Reasons an Application May Not Be Approved
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-amber-800">
                <li className="flex items-center gap-2">• Incomplete or mismatched documents</li>
                <li className="flex items-center gap-2">• Eligibility criteria not met</li>
                <li className="flex items-center gap-2">• Issues during the verification process</li>
                <li className="flex items-center gap-2">• Insufficient repayment capacity relative to existing obligations</li>
              </ul>
            </div>

          </div>
        </section>

        {/* FAQs Section */}
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="h-7 w-7 text-purple-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm transition overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 font-semibold text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50/80 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-purple-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-purple-900 text-white py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold">
              Apply for Your Short Term Loan Today
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Don't let a temporary cash flow gap hold you back. Apply Short Term Loan Online with Waqt Money and get transparent, flexible funding when you need it most.
            </p>
            <div className="pt-4 flex justify-center">
              <Link to="/user/apply">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg">
                  Apply Short Term Loan Online
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
