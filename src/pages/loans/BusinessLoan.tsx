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
  Building2,
  FileText,
  Calculator,
  ChevronDown,
  Percent,
  Briefcase,
  Sparkles,
  UserCheck,
  Check
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function BusinessLoan() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Business Loan?",
      a: "A Business Loan is financing that helps businesses cover expenses such as working capital, expansion, equipment purchase, or inventory management, repaid over an agreed tenure."
    },
    {
      q: "2. What is the Business Loan eligibility criteria?",
      a: "Salaried applicants need to be 21–58 years old with a minimum income of ₹25,000/month and a Credit Score of 700+; self-employed applicants need 3+ years of business vintage, ₹10 Lakhs+ annual turnover, and 2 years of filed ITRs."
    },
    {
      q: "3. What documents are required?",
      a: "Aadhaar Card, PAN Card, GST Registration or Udyam Registration where applicable, bank statements, and Income Tax Returns."
    },
    {
      q: "4. What is the Business Loan interest rate?",
      a: "Rates range from 10.49% to 24% p.a., depending on your Credit Score, income, and business profile."
    },
    {
      q: "5. What is the Business Loan EMI and how is it calculated?",
      a: "Your EMI depends on your loan amount, interest rate, and tenure — use our EMI calculator to see an exact breakdown before applying."
    },
    {
      q: "6. What is the maximum Business Loan tenure?",
      a: "Repayment tenure ranges from 12 to 60 months, depending on your loan amount and business profile."
    },
    {
      q: "7. Is collateral required for every Business Loan?",
      a: "Not necessarily — Waqt Money offers Unsecured Business Loan options for eligible applicants based on business performance and creditworthiness."
    },
    {
      q: "8. Can startups apply for a Business Loan?",
      a: "Yes — a Startup Business Loan is available for early-stage businesses that meet the eligibility criteria, subject to verification."
    },
    {
      q: "9. Is Waqt Money a registered lender?",
      a: "Yes — Waqt Money operates under the same registered NBFC as Waqt Finance, ensuring your Business Loan is processed under regulated, compliant standards."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Business Loan",
      "description": "Apply Business Loan Online with Waqt Money. A Working Capital Loan for MSMEs, startups, and small businesses — minimal documentation, transparent charges, and quick processing.",
      "url": "https://waqtmoney.com/business-loan",
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
        title="Business Loan in India | Apply Online | Waqt Money"
        description="Apply Business Loan Online with Waqt Money. A Working Capital Loan for MSMEs, startups, and small businesses — minimal documentation, transparent charges, and quick processing."
        keywords="Business Loan in India, Apply Business Loan Online, Working Capital Loan, MSME loan, startup business loan, small business loan, unsecured business loan"
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
              Business Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
              <Sparkles className="h-3.5 w-3.5" /> Working Capital & MSME Growth
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Business Loan in India
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Fund your working capital, inventory, or expansion plans with a Business Loan from Waqt Money. Apply Business Loan Online through a fast, secure Business Loan Online process — built for MSMEs, startups, and small businesses that need a genuine Working Capital Loan without unnecessary paperwork.
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
              <Briefcase className="h-5 w-5 text-purple-600" /> Key Features at a Glance
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-xl font-bold text-purple-700 mt-1">10.49% – 24% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Loan Tenure</p>
                <p className="text-xl font-bold text-purple-700 mt-1">12 to 60 Months</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Application Process</p>
                <p className="text-xl font-bold text-purple-700 mt-1">100% Digital</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Collateral</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Unsecured Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Business Loan? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-purple-600 shrink-0" />
                What is a Business Loan?
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                A Business Loan is financing designed to help a business owner manage expenses that don't always align neatly with cash coming in — working capital, inventory purchase, equipment, or a genuine growth opportunity that can't wait for the next quarter's revenue. Rather than dipping into personal savings or delaying a decision, a Business Loan in India gives entrepreneurs and business owners a structured way to access funds now and repay them over an agreed period.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                At Waqt Money, this means a fully digital Business Loan Online experience — from application to disbursement — built around the real pace of business, not traditional branch-based paperwork. Whether you run a retail shop, a service business, a small manufacturing unit, or an early-stage startup, an Online Business Loan can bridge the gap between where your business is today and where the next opportunity could take it.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                This isn't financing built for one type of company. MSMEs, startups, traders, and self-employed professionals all reach for this kind of Business Financing at different points — a seasonal cash crunch, a bulk order that needs upfront stock, or simply the working capital needed to keep operations steady while revenue catches up. Rather than putting growth decisions on hold, a Business Loan lets a business owner move forward now and repay gradually, in a way that's structured around actual Cash Flow rather than guesswork.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Benefits of Business Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Features & Benefits of Business Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Every part of Waqt Money's Business Loan is shaped around what small and growing businesses genuinely need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <IndianRupee className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">A Loan Amount That Fits Your Business</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Whether you're a Small Business Loan applicant covering a short-term gap or an MSME Loan applicant planning expansion, the sanctioned amount is sized to your turnover and repayment capacity, not a generic bracket.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Clock className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Flexible Repayment</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Choose a repayment tenure that aligns with how your business actually earns, so EMIs stay manageable instead of straining your monthly Cash Flow.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <ShieldCheck className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Unsecured Business Loan Options</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Many applicants can access funding without pledging property or business assets, with eligibility assessed on financial performance and creditworthiness instead.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <FileText className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Minimal Documentation</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Only essential paperwork is required, keeping the process accessible even for a Startup Business Loan applicant without years of formal financial history.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Sparkles className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast, Digital Approval</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The entire process runs through Digital Lending — apply online, get verified, and move toward Loan Approval and Loan Disbursement without a single branch visit.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Building2 className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Built for Business Expansion</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Use the funds for inventory, equipment, hiring, marketing, infrastructure upgrades, or simply strengthening Working Capital during a slow season — the choice is yours.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition md:col-span-2 lg:col-span-3">
                <UserCheck className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Support Across Business Stages</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  From an early-stage startup to an established MSME, the loan structure is designed to flex around where your business actually is, not a one-size-fits-all template.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Loan Eligibility Criteria */}
        <section id="eligibility" className="container mx-auto px-4 py-16 max-w-5xl scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Business Loan Eligibility Criteria
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Business Loan Eligibility Criteria at Waqt Money depends on your employment category and overall financial profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Salaried Individuals */}
            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                Business Loan for Salaried Individuals
              </h3>
              <p className="text-xs text-slate-500 mb-5 font-medium">Applying to fund a side business or venture</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                      <th className="py-2.5 px-3 font-semibold">Criteria</th>
                      <th className="py-2.5 px-3 font-semibold">Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Age</td>
                      <td className="py-3 px-3 text-slate-600">21–58 years</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Minimum Income</td>
                      <td className="py-3 px-3 text-slate-600">₹25,000/month</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Work Experience</td>
                      <td className="py-3 px-3 text-slate-600">1+ year overall (min. 6 months in current job)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Credit Score</td>
                      <td className="py-3 px-3 text-slate-600">700 or above</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Self-Employed / Business Owners */}
            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                Business Loan for Self-Employed / Business Owners
              </h3>
              <p className="text-xs text-slate-500 mb-5 font-medium">For traders, proprietors & corporate entities</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                      <th className="py-2.5 px-3 font-semibold">Criteria</th>
                      <th className="py-2.5 px-3 font-semibold">Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Age</td>
                      <td className="py-3 px-3 text-slate-600">25–65 years</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Business Vintage</td>
                      <td className="py-3 px-3 text-slate-600">3+ years</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Minimum Annual Turnover</td>
                      <td className="py-3 px-3 text-slate-600">₹10 Lakhs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">ITR Filed</td>
                      <td className="py-3 px-3 text-slate-600">Last 2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-purple-50/60 p-6 rounded-2xl border border-purple-100 text-sm text-slate-600 leading-relaxed mb-6">
            Beyond these baseline numbers, every application goes through a fair <strong>Credit Assessment</strong> — Income Verification, business stability, and existing debt all factor into the final decision. A stronger Credit Score and consistent turnover generally support smoother approval and access to more competitive terms, though approval is always subject to eligibility and verification rather than guaranteed by meeting the minimum criteria alone.
          </div>

          <div className="text-center">
            <Link to="/user/apply">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                Check Your Eligibility →
              </button>
            </Link>
          </div>
        </section>

        {/* Documents Required for Business Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Documents Required for Business Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Keeping your Business Loan Documents ready in advance helps speed up verification and approval.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-purple-900 text-white font-semibold">
                      <th className="py-3.5 px-6 w-1/3">Document Type</th>
                      <th className="py-3.5 px-6 w-2/3">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Identity Proof</td>
                      <td className="py-4 px-6 text-slate-600">Aadhaar Card, PAN Card, Voter ID</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Address Proof</td>
                      <td className="py-4 px-6 text-slate-600">Utility bills (within 3 months), Passport</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Business Proof</td>
                      <td className="py-4 px-6 text-slate-600">GST Registration, Udyam Registration (where applicable)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Financial Documents</td>
                      <td className="py-4 px-6 text-slate-600">Bank Statements (last 6 months), Income Tax Return (ITR)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Additional</td>
                      <td className="py-4 px-6 text-slate-600">Partnership Deed / Certificate of Incorporation, where applicable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 leading-relaxed">
              This Documentation process exists to confirm your identity, address, and business activity — additional documents may be requested depending on your specific business structure as part of the Verification Process.
            </div>
          </div>
        </section>

        {/* Business Loan Interest Rate, Charges & Fees */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Business Loan Interest Rate, Charges & Fees
            </h2>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              Business Loan Interest Rate at Waqt Money generally ranges from <strong>10.49% to 24% p.a.</strong>, based on your Credit Score, income profile, business vintage, and existing debt obligations, as confirmed in your Loan Agreement before you accept the offer.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-4 bg-purple-50 border-b border-purple-100 font-semibold text-purple-900 text-sm">
              Other charges disclosed upfront:
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                    <th className="py-3 px-6 font-semibold">Charge</th>
                    <th className="py-3 px-6 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-medium text-slate-800">Business Loan Processing Fee</td>
                    <td className="py-3.5 px-6 text-slate-600">6%–10% of the loan amount</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-medium text-slate-800">Late Payment Charges</td>
                    <td className="py-3.5 px-6 text-slate-600">36% p.a. on the outstanding amount</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-medium text-slate-800">EMI Bounce Charges</td>
                    <td className="py-3.5 px-6 text-slate-600">₹500 + 18% GST</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-medium text-slate-800">Penal Interest</td>
                    <td className="py-3.5 px-6 text-slate-600">Additional 3% p.a.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-medium text-slate-800">Documentation Charges</td>
                    <td className="py-3.5 px-6 text-slate-600">₹500–₹5,000</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-medium text-slate-800">Applicable Taxes</td>
                    <td className="py-3.5 px-6 text-slate-600">GST @ 18% on all fees and charges</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
            As a NBFC, Waqt Money follows a transparent-charges approach consistent with RBI Guidelines (where applicable) — every rate and fee is disclosed as part of your loan offer, with no charges applied beyond what's stated in your agreement.
          </div>

          <div className="text-center">
            <Link to="/user/apply">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                Apply Business Loan Online →
              </button>
            </Link>
          </div>
        </section>

        {/* Business Loan Amount, EMI & Repayment */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Business Loan Amount, EMI & Repayment
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <p className="text-slate-600 leading-relaxed text-base">
                Your Business Loan amount is calculated based on your business turnover, financial profile, and repayment capacity — giving you access to funding that fits your actual Working Capital needs rather than an arbitrary limit.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Business Loan Tenure typically ranges from 12 to 60 months, letting you choose a Flexible Repayment schedule that matches your business's cash flow cycle. A shorter tenure reduces total interest paid; a longer tenure keeps your monthly Business Loan EMI lighter.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Your EMI depends on three factors — loan amount, interest rate, and tenure. Use our Business Loan EMI Calculator to instantly estimate your monthly installment and see a full breakdown of principal versus interest before applying.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Need to close your loan early? Part-prepayment and foreclosure are available subject to the applicable charges outlined in your Loan Agreement, and timely repayment on your Repayment Schedule also supports a stronger credit profile for future financing needs.
              </p>

              <div className="pt-4 text-center sm:text-left">
                <Link to="/emi-calculator">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-100 text-purple-800 font-semibold text-sm hover:bg-purple-200 transition">
                    <Calculator className="h-4 w-4" />
                    Open Business Loan EMI Calculator
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply for a Business Loan Online? */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              How to Apply for a Business Loan Online?
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Apply Business Loan Online with Waqt Money through this simple, four-step Digital Application:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Submit Your Application</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete our Business Loan Online Application with your personal, business, and contact details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team reviews your submitted documents and evaluates your eligibility as part of the Verification Process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Loan Approval</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once verification is complete, you'll receive confirmation of your approved loan amount and terms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Fund Disbursement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                After completing your Loan Agreement, the approved amount is transferred directly to your bank account.
              </p>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed mb-8 max-w-4xl mx-auto">
            This entire process is designed to minimize Processing Time while maintaining proper verification at every step — because a Business Loan is only useful if it reaches your business exactly when the opportunity or expense demands it.
          </div>

          <div className="text-center">
            <Link to="/user/apply">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                Apply Now →
              </button>
            </Link>
          </div>
        </section>

        {/* Why Choose Waqt Money for a Business Loan? */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Why Choose Waqt Money for a Business Loan?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Choosing the right lender for your Business Loan matters as much as the loan itself. Waqt Money operates under the same registered NBFC as Waqt Finance, which means your loan is processed under consistent, regulated standards — not through an informal or unlicensed channel.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900">What makes Waqt Money a strong choice for business owners:</h3>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Fast Online Application</p>
                    <p className="text-xs text-slate-600 mt-0.5">Apply anytime, from anywhere, without a branch visit.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Minimal Documentation</p>
                    <p className="text-xs text-slate-600 mt-0.5">Only what's genuinely needed to verify your business and eligibility.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Transparent Charges</p>
                    <p className="text-xs text-slate-600 mt-0.5">Every interest rate, fee, and charge disclosed before you commit.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Secure Digital Process</p>
                    <p className="text-xs text-slate-600 mt-0.5">Your data protected through encrypted systems at every stage.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Quick Processing</p>
                    <p className="text-xs text-slate-600 mt-0.5">Structured to move your Business Loan Online application forward without unnecessary delay.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dedicated Customer Support</p>
                    <p className="text-xs text-slate-600 mt-0.5">Real assistance available through every stage of your Business Financing journey.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Built for Every Stage</p>
                    <p className="text-xs text-slate-600 mt-0.5">Whether you're an early Startup Business Loan applicant, an established MSME Loan borrower, or a Small Business Loan applicant managing seasonal cash flow, the structure adapts to where your business actually is.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
                Whether you need a Working Capital Loan to manage day-to-day operations or funding for genuine Business Growth, Waqt Money is built to help your business access capital through a process rooted in transparency rather than fine print.
              </div>
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
              Ready to fund your business's next step?
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Apply Business Loan Online with Waqt Money today and access working capital, expansion funds, or inventory financing through a simple, transparent digital process.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/user/apply" className="w-full sm:w-auto">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg w-full sm:w-auto">
                  Apply Now
                </button>
              </Link>
              <a href="#eligibility" className="w-full sm:w-auto">
                <button className="h-12 px-8 rounded-xl border border-purple-400 text-white font-bold text-base hover:bg-purple-800 transition w-full sm:w-auto">
                  Check Eligibility
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

