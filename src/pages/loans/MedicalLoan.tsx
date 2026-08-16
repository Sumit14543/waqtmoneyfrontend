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
  Heart,
  Stethoscope,
  Activity,
  ArrowRightLeft
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function MedicalLoan() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Medical Loan?",
      a: "A Medical Loan is an unsecured loan used to cover hospitalisation, surgery, diagnostics, medicines, and other medical expenses for yourself or your family."
    },
    {
      q: "2. Who is eligible for a Medical Loan?",
      a: "Medical Loan Eligibility generally requires a stable income, a reasonable credit score, and valid identity and income documents. Both salaried and self-employed individuals can apply."
    },
    {
      q: "3. What documents are required for a Medical Loan?",
      a: "Medical Loan Documents typically include Aadhaar Card, PAN Card, salary slip or income proof, bank statements, and a hospital bill or medical estimate, if available."
    },
    {
      q: "4. What is the Medical Loan Interest Rate?",
      a: "The Medical Loan Interest Rate starts from 11.0% p.a., with the exact rate depending on your loan amount, tenure, income, and credit profile. It is clearly disclosed before you accept your loan offer."
    },
    {
      q: "5. What is the maximum Medical Loan amount I can get?",
      a: "You can get a Medical Loan credit limit of up to ₹6,00,000, depending on your eligibility, income, and the estimated treatment cost."
    },
    {
      q: "6. How is my Medical Loan EMI calculated?",
      a: "Your Medical Loan EMI depends on the loan amount, interest rate, and the Medical Loan Tenure you select. Choosing a longer tenure lowers the EMI but increases total interest paid."
    },
    {
      q: "7. Can I use a Healthcare Loan for a family member's treatment?",
      a: "Yes, a Medical Loan or Healthcare Loan can typically be used for treatment expenses of your spouse, children, parents, or yourself."
    },
    {
      q: "8. How fast can I get a Medical Emergency Loan?",
      a: "Since the process is fully digital with minimal documentation, approval and disbursal for a Medical Emergency Loan can often happen within hours of submitting a complete application."
    },
    {
      q: "9. Is a Medical Loan the same as a Personal Loan?",
      a: "A Medical Loan is essentially a Medical Personal Loan positioned specifically for healthcare needs, while a standard personal loan can be used for any purpose."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LoanOrCredit",
      "name": "Medical Loan",
      "provider": {
        "@type": "FinancialService",
        "name": "Waqt Money"
      },
      "amount": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "maxValue": 600000
      },
      "annualPercentageRate": "11.0",
      "loanType": "Medical Loan",
      "areaServed": "IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Medical Loan",
      "description": "Need funds for a medical emergency? Apply Medical Loan Online with Waqt Money. Quick approval, minimal documents, and fast disbursal for all your healthcare expenses.",
      "url": "https://waqtmoney.com/medical-loan",
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
        title="Medical Loan in India – Apply Medical Loan Online | Waqt Money"
        description="Need funds for a medical emergency? Apply Medical Loan Online with Waqt Money. Quick approval, minimal documents, and fast disbursal for all your healthcare expenses."
        keywords="Medical Loan in India, Medical Loan Online, Emergency Medical Loan, Healthcare Loan, Medical Emergency Loan, Medical Loan for Hospital Bills, Hospital Expense Loan"
        canonicalUrl="https://waqtmoney.com/loans/medical-loan"
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
              Medical Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-rose-800 mb-5">
              <Heart className="h-3.5 w-3.5 fill-rose-600 text-rose-600" /> Emergency Healthcare Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Medical Loan in India
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              A medical emergency doesn't wait, and neither should your funds. A Medical Loan from Waqt Money gives you quick access to cash for hospitalisation, surgery, diagnostics, or any unplanned treatment cost — with interest rates starting from 11.0% p.a. and a credit limit of up to ₹6,00,000. Whether it's for you or a loved one, you can apply Medical Loan online in minutes, without pledging any collateral. As a trusted healthcare loan and medical emergency loan option in India, we make Medical Loan Online approvals fast, simple, and stress-free — so you can focus on recovery, not paperwork.
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
              <Stethoscope className="h-5 w-5 text-purple-600" /> Key Features at a Glance
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Credit Limit</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Up to ₹6,00,000</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-xl font-bold text-purple-700 mt-1">From 11.0% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Collateral Required</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Zero (Unsecured)</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Disbursal Speed</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Hours, Not Days</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Medical Loan? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-purple-600 shrink-0" />
                What is a Medical Loan?
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                A Medical Loan is an unsecured personal loan designed specifically to help you manage sudden or planned medical expenses. Unlike a regular personal loan, a Medical Loan in India is positioned around one purpose: making sure a health crisis never turns into a financial crisis. It can be used to cover hospital bills, surgery costs, diagnostic tests, medicines, and other treatment-related expenses for yourself, your spouse, your children, or your parents.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Because it is unsecured, you don't need to put up property, gold, or any other asset as security. The borrower simply needs to meet basic eligibility criteria, complete a short loan application, and once approved, the funds are disbursed directly to a bank account. This makes Medical Loan Online options far quicker than traditional bank loans, which often involve long queues, physical paperwork, and multi-day processing.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                In the broader world of consumer finance, medical loans exist to bridge exactly the gap where health insurance either doesn't apply, hasn't kicked in yet, or doesn't cover the full treatment cost. Many people don't have adequate healthcare financing in place, and hospitalisation costs in India can run into lakhs within days. A Medical Loan steps in as a fast, flexible way to arrange funds when time is the one thing you don't have. With minimal documentation and digital processing, it's built for exactly the kind of situation where speed matters most.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Benefits of a Medical Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Features & Benefits of a Medical Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                A Medical Loan from Waqt Money is designed around speed, simplicity, and financial support when you need it most. Here's what makes it a dependable choice during a medical emergency loan situation:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Zap className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Fast Approval & Disbursal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applications are reviewed quickly, and once your loan approval comes through, loan disbursement can happen within hours, not days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <ShieldCheck className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">No Collateral Required</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As an unsecured healthcare loan, you don't need to mortgage property or pledge assets to access funds.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <FileText className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Minimal Documentation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A short list of documents is all it takes — no lengthy paperwork trail.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <IndianRupee className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Flexible Loan Amount</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Borrow up to ₹6,00,000, based on your actual hospital expense loan requirement — whether it's a small diagnostic bill or a major surgery.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Clock className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Flexible Repayment</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose a tenure and EMI structure that fits your monthly budget, so repayment doesn't add to your stress.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Competitive Interest Rate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rates starting from 11.0% p.a., with transparent pricing and no hidden charges, so you know exactly what you're repaying.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <UserCheck className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Fully Digital Process</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  From application to loan disbursement, everything happens online — apply from your phone, upload documents digitally, and track real time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Activity className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Use Funds Flexibly</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once disbursed, the loan amount can be used for any medical purpose — hospital bills, medicines, tests, or post-treatment recovery costs.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-3xl mx-auto">
              Together, these features make a Medical Loan one of the most practical ways to arrange emergency funds without the delays of traditional lending.
            </div>
          </div>
        </section>

        {/* What Can You Use a Medical Loan For? */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What Can You Use a Medical Loan For?
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              A Medical Loan for Hospital Bills is one of the most common uses, but the funds aren't limited to hospitalisation alone. Here's where a Medical Loan can help:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Primary Medical Treatments</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Medical Loan for Surgery:</strong> Planned or emergency surgical procedures, including pre- and post-operative costs.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Medical Loan for Hospital Bills:</strong> Room charges, ICU costs, doctor's fees, and other hospital bills.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Medical Loan for Emergency Treatment:</strong> Sudden accidents, critical illness, or urgent care where funds are needed immediately.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Medical Loan for Healthcare Expenses:</strong> Diagnostic tests, medicines, specialist consultations, and follow-up care.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base">Medical Expenses Covered</h3>
              <p className="text-xs text-slate-500">Comprehensive coverage includes:</p>
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-rose-50/70 text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Emergency hospitalisation
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/70 text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Planned surgeries
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/70 text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Diagnostic tests
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/70 text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Medicines
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/70 text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Post-treatment expenses
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/70 text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Specialist consultations
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            Because a Medical Loan is disbursed directly to your account rather than paid to a hospital, you retain full control over how the funds are used — making it a versatile option for healthcare financing across every stage of medical treatment.
          </div>
        </section>

        {/* Medical Loan Eligibility Criteria */}
        <section id="eligibility" className="bg-slate-50 py-16 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Medical Loan Eligibility Criteria
              </h2>
              <p className="text-slate-600 text-base">
                Medical Loan Eligibility is kept simple so that funds can reach you quickly during a health emergency. While exact requirements may vary, general Medical Loan Eligibility Criteria include:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700">Indian resident, typically between 21 and 58 years of age</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700">Stable source of income — salaried or self-employed</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700">Minimum monthly income as defined by the lender</p>
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
                  <p className="text-sm text-slate-700">Valid income proof and identity documents</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">For Salaried Employees</h3>
                  <p className="text-xs text-slate-600">Typically requires proof of stable employment and salary credited directly to your bank account.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">For Self-Employed</h3>
                  <p className="text-xs text-slate-600">Needs to demonstrate business continuity and income through bank statements or tax filings.</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                The applicant's overall profile — income, credit history, and existing obligations — is assessed as part of a straightforward income verification and credit assessment process. Because the intent behind a Medical Loan is to help during urgent situations, this evaluation is generally faster and more streamlined than for standard personal loans, while still following responsible lending practices.
              </p>
            </div>

            <div className="text-center">
              <Link to="/user/apply">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                  Check Your Eligibility →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Documents Required for Medical Loan */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Documents Required for Medical Loan
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Documents Required for Medical Loan applications are kept minimal to speed up approval. Typically, you'll need:
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
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> Bank Statement (3–6 months)
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm font-semibold text-slate-800 sm:col-span-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" /> Hospital Bill or Medical Estimate (where applicable)
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 leading-relaxed">
            These Medical Loan Documents allow the lender to complete identity verification, income assessment, and documentation review quickly. Submitting clear, updated copies through the online portal helps avoid delays in the verification process, so your funds can be disbursed as fast as possible.
          </div>
        </section>

        {/* Medical Loan Interest Rate, Charges & Fees */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Medical Loan Interest Rate, Charges & Fees
              </h2>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                Understanding the Medical Loan Interest Rate and associated costs upfront helps you borrow with confidence. Waqt Money follows a transparent pricing structure:
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 p-6 space-y-3">
              <p className="text-sm text-slate-700"><strong>Interest Rate:</strong> Starting from <strong>11.0% p.a.</strong>, with the final rate determined based on your loan amount, tenure, income profile, and credit history.</p>
              <p className="text-sm text-slate-700"><strong>Medical Loan Processing Fee:</strong> A one-time fee deducted at the time of disbursal, clearly communicated before you accept the offer.</p>
              <p className="text-sm text-slate-700"><strong>No Hidden Charges:</strong> All applicable fees are disclosed upfront in your Loan Agreement.</p>
            </div>

            <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Lending institutions in India, including banks and NBFCs, operate within the guidelines set by the RBI to ensure fair practices around interest rates, fees, and recovery processes. Before signing your Loan Agreement, it's worth reviewing the total repayment amount — principal, interest, and processing fee combined — so there are no surprises later. A transparent fee structure isn't just a compliance requirement; it's what makes a Medical Loan a dependable option during an already stressful time.
            </div>
          </div>
        </section>

        {/* Medical Loan Amount, EMI & Repayment */}
        <section className="container mx-auto px-4 py-16 max-w-4xl space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Medical Loan Amount, EMI & Repayment
            </h2>
            <p className="text-slate-600 text-base">
              The Medical Loan EMI you pay each month depends on three factors: the loan amount you borrow, the interest rate applied, and the Medical Loan Tenure you choose.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-sm text-slate-600 leading-relaxed">
            <p><strong>Loan Amount:</strong> Ranges based on your requirement and eligibility, up to <strong>₹6,00,000</strong> — from smaller amounts for diagnostic or outpatient costs to larger sums for major surgeries or extended hospitalisation.</p>
            <p><strong>EMI:</strong> Calculated to fit comfortably within your monthly budget, so repayment doesn't strain your finances during recovery.</p>
            <p><strong>Flexible Repayment:</strong> Choose a tenure that balances a manageable EMI against the total interest paid over the loan term.</p>
            <p><strong>Repayment Schedule:</strong> Fixed monthly EMIs, deducted automatically from your linked bank account, keep repayment predictable.</p>
            <div className="pt-2">
              <Link to="/emi-calculator">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-700">
                  Open EMI Calculator →
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Once your loan approval is confirmed, loan disbursement typically happens quickly, and your first EMI cycle begins as per the agreed repayment schedule. Choosing a tenure that matches your income stability — rather than simply the lowest EMI — is usually the smarter approach for long-term financial comfort.
          </div>
        </section>

        {/* Factors That Affect Medical Loan Approval */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Factors That Affect Medical Loan Approval
              </h2>
              <p className="text-slate-600 text-base">
                Several factors influence both your Medical Loan Eligibility and the final loan amount you're offered:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Credit Score:</strong> A higher score generally improves your chances of quick approval and better terms.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Income:</strong> Your monthly income determines repayment capacity and the loan amount you qualify for.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Employment Type:</strong> Salaried and self-employed applicants may be evaluated slightly differently.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Existing Financial Obligations:</strong> Ongoing EMIs or debts are factored into your overall credit assessment.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Treatment Cost:</strong> The estimated cost of treatment can also guide the loan amount sanctioned.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Repayment Capacity:</strong> Lenders assess whether your income comfortably supports the proposed EMI.</p>
                </div>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-slate-600 italic">
                A strong income verification profile combined with a healthy credit history generally leads to faster approvals — which matters most when you're racing against a medical timeline.
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply for a Medical Loan Online? */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              How to Apply for a Medical Loan Online?
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Apply Medical Loan Online in a few simple steps:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Fill Application</h3>
              <p className="text-xs text-slate-600">Complete the Medical Loan Online Application with your basic personal, income, and loan requirement details.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Upload Documents</h3>
              <p className="text-xs text-slate-600">Submit your Aadhaar, PAN, income proof, and any relevant medical estimate or bill digitally.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Verification</h3>
              <p className="text-xs text-slate-600">The lender completes a quick verification process to confirm your details.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Approval & Offer</h3>
              <p className="text-xs text-slate-600">Once approved, receive your loan offer, including sanctioned amount, interest rate, and tenure.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                5
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Disbursal</h3>
              <p className="text-xs text-slate-600">After you accept the offer and complete e-signing, funds are transferred directly to your bank account.</p>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            The entire Medical Loan Online journey — from application to disbursal — is built to minimise processing time, so you can access funds when every hour counts.
          </div>
        </section>

        {/* Why Choose Waqt Money? */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Why Choose Waqt Money?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                When you're arranging funds during a health emergency, you need a lender you can trust to move fast without cutting corners. Here's why Waqt Money is a dependable choice for a Medical Loan:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Fast Online Application</p>
                    <p className="text-xs text-slate-600 mt-0.5">Apply from anywhere, anytime, without visiting a branch.</p>
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
                    <p className="text-sm font-semibold text-slate-900">Secure Digital Process</p>
                    <p className="text-xs text-slate-600 mt-0.5">Your data and documents are handled through a secure digital process at every step.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Transparent Charges</p>
                    <p className="text-xs text-slate-600 mt-0.5">No hidden fees — your Loan Agreement clearly lays out interest, processing fee, and repayment terms.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Quick Processing</p>
                    <p className="text-xs text-slate-600 mt-0.5">Streamlined digital lending designed to reduce delays during urgent situations.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dedicated Customer Support</p>
                    <p className="text-xs text-slate-600 mt-0.5">Our team is available to guide you through the process and answer questions at every stage.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start pt-2 border-t border-slate-100">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Responsible Lending</p>
                  <p className="text-xs text-slate-600 mt-0.5">We assess eligibility carefully to ensure the loan amount and EMI genuinely fit your repayment capacity.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
                As a financial institution focused on accessible, digital-first lending, Waqt Money is built to support families exactly when they need it — during a healthcare loan requirement, a sudden medical emergency loan, or planned treatment. Our goal is simple: help you get loan approval quickly, disburse funds without delay, and make repayment manageable, so you can focus on what matters — getting better.
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Sections */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-16">
          {/* Medical Loan vs Personal Loan */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                Medical Loan vs Personal Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                While a Medical Personal Loan and a standard personal loan are structurally similar — both unsecured, both repaid via EMI — they differ in purpose and positioning:
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-purple-900 text-white font-semibold">
                      <th className="py-3.5 px-5 w-1/4">Aspect</th>
                      <th className="py-3.5 px-5 w-3/8">Medical Loan</th>
                      <th className="py-3.5 px-5 w-3/8">Personal Loan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Purpose</td>
                      <td className="py-3.5 px-5 text-slate-600">Specifically for medical and healthcare expenses</td>
                      <td className="py-3.5 px-5 text-slate-600">General-purpose — travel, wedding, home renovation, etc.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Loan Amount</td>
                      <td className="py-3.5 px-5 text-slate-600">Often aligned with treatment cost or medical estimate</td>
                      <td className="py-3.5 px-5 text-slate-600">Based on broader income and eligibility assessment</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Repayment</td>
                      <td className="py-3.5 px-5 text-slate-600">Flexible tenure, structured around recovery timelines</td>
                      <td className="py-3.5 px-5 text-slate-600">Standard EMI tenure options</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Best Use Cases</td>
                      <td className="py-3.5 px-5 text-slate-600">Hospitalisation, surgery, emergency treatment, diagnostics</td>
                      <td className="py-3.5 px-5 text-slate-600">Discretionary or planned personal expenses</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 font-semibold text-slate-800">Flexibility</td>
                      <td className="py-3.5 px-5 text-slate-600">Funds used specifically for health-related needs</td>
                      <td className="py-3.5 px-5 text-slate-600">Funds can be used for virtually any purpose</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-4xl mx-auto">
              In practice, a Medical Loan is simply a personal loan positioned around urgency and healthcare — it can often be processed faster because the purpose is clear and the need is time-sensitive. If your requirement is strictly medical, a dedicated Medical Loan may offer a more relevant application experience and faster turnaround than a general personal loan.
            </p>
          </div>

          {/* Medical Loan vs Health Insurance */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                Medical Loan vs Health Insurance
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                A Medical Loan and health insurance serve different — often complementary — roles in managing healthcare costs:
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-purple-900 text-white font-semibold">
                      <th className="py-3.5 px-5 w-1/2">Medical Loan</th>
                      <th className="py-3.5 px-5 w-1/2">Health Insurance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 text-slate-700">Covers funding gaps when immediate cash is needed</td>
                      <td className="py-3.5 px-5 text-slate-700">Covers expenses as per policy terms</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 text-slate-700">Repaid through EMIs</td>
                      <td className="py-3.5 px-5 text-slate-700">Based on annual premium and coverage</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-5 text-slate-700">Useful when insurance is insufficient or unavailable</td>
                      <td className="py-3.5 px-5 text-slate-700">Depends on exclusions, waiting periods, and coverage limits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-4xl mx-auto">
              Many people assume insurance alone is enough, but waiting periods, coverage caps, and exclusions often leave a gap between what's covered and what's owed. A Medical Loan can bridge that gap, whether you have no insurance, exhausted your sum insured, or need funds before a claim is settled.
            </p>
          </div>
        </section>

        {/* Responsible Borrowing Guidance */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5 text-purple-600" />
              Responsible Borrowing Guidance
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              A Medical Loan can be a genuine lifeline during a health emergency, but it's still a financial commitment. Before you apply, keep a few things in mind:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <strong>Borrow only what you need:</strong> base your loan amount on the actual estimated treatment cost, not the maximum you're eligible for.
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <strong>Understand the total borrowing cost:</strong> factor in interest and processing fees, not just the EMI amount.
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <strong>Review eligibility and terms carefully:</strong> so the EMI comfortably fits your monthly budget during recovery.
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic pt-1">
              Borrowing responsibly ensures that the loan solves your immediate problem without creating a longer-term financial strain.
            </p>
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
              Apply for Your Medical Loan Today
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Don't let a medical emergency wait on paperwork. Apply Medical Loan Online with Waqt Money and get the financial support you need — fast, transparent, and hassle-free.
            </p>
            <div className="pt-4 flex justify-center">
              <Link to="/user/apply">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg">
                  Apply Medical Loan Online
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
