import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Scale,
  HelpCircle,
  Zap,
  Lock,
  Percent,
  Calendar,
  FileText,
  UserCheck,
  ChevronRight,
  Headphones,
  Info
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function PaydayLoan() {
  // Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [tenureDays, setTenureDays] = useState<number>(30);

  // Interest rate: 1% per day
  const dailyRate = 0.01;
  const interestAmount = Math.round(loanAmount * dailyRate * tenureDays);
  const processingFeePct = 0.08; // 8% average
  const processingFee = Math.round(loanAmount * processingFeePct);
  const gstOnFee = Math.round(processingFee * 0.18);
  const totalRepayment = loanAmount + interestAmount + processingFee + gstOnFee;

  const faqs = [
    {
      q: "What is a Payday Loan?",
      a: "A Payday Loan is a Short-Term Loan designed for salaried individuals who need funds before their next salary credit, ranging from ₹5,000 to ₹1,00,000."
    },
    {
      q: "Who is eligible for Waqt Money's Payday Loan?",
      a: "Salaried employees aged 21–58, with a regular Monthly Salary, an active Salary Account, and valid documents may apply — approval is subject to eligibility and verification."
    },
    {
      q: "What documents are required?",
      a: "Aadhaar Card, PAN Card, a recent salary slip, and bank statements covering the last 6 months."
    },
    {
      q: "What is the Payday Loan interest rate?",
      a: "Interest is charged at 1% per day on your outstanding loan amount, disclosed clearly as part of your loan agreement."
    },
    {
      q: "What is the Payday Loan tenure?",
      a: "Tenure ranges from 15 to 45 days, aligned with your salary cycle — shorter than personal or business loan tenures."
    },
    {
      q: "Is a Payday Loan the same as a Salary Advance Loan or Instant Salary Loan?",
      a: "Yes — these terms commonly describe the same concept: a Loan Before Salary, repaid around your next salary credit."
    },
    {
      q: "Do I need collateral for an Emergency Cash Loan like this?",
      a: "No — Payday Loans are unsecured, so no property, gold, or asset pledge is required."
    },
    {
      q: "How much can I borrow?",
      a: "Loan amounts range from ₹5,00,0 to ₹1,00,000, depending on your salary, existing obligations, and Credit Assessment."
    },
    {
      q: "What charges apply besides interest?",
      a: "A processing fee of 7%–10% of the loan amount, plus GST @ 18% on all applicable fees and charges."
    },
    {
      q: "Can self-employed individuals apply?",
      a: "Payday Loans at Waqt Money are designed for salaried employees; self-employed applicants can explore a Business Loan or EDI Loan instead."
    },
    {
      q: "Is Waqt Money a registered lender?",
      a: "Yes — Waqt Money operates under the same registered NBFC as Waqt Finance, ensuring your loan is processed under regulated, compliant standards."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Payday Loan",
      "description": "Apply Payday Loan Online with Waqt Money. Get an Instant Payday Loan of ₹5,00,0 to ₹1,00,000, minimal documentation, and transparent charges for salaried employees.",
      "url": "https://waqtmoney.com/pay-day-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "100000"
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
        title="Payday Loan in India | Instant Salary Advance | Waqt Money"
        description="Apply Payday Loan Online with Waqt Money. Get an Instant Payday Loan of ₹5,000 to ₹1,00,000, minimal documentation, and transparent charges for salaried employees."
        keywords="Payday Loan, Instant Payday Loan India, Salary Advance Loan, Emergency Cash Loan, Loan Before Salary, Short-Term Finance, Payday Loan Online, Waqt Money"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-slate-50 via-purple-50/20 to-white pt-24 min-h-screen text-slate-800">
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
              Payday Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-10 md:py-16 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 px-4 py-1.5 text-xs font-bold text-purple-800 border border-purple-200 shadow-xs">
              <Zap className="h-3.5 w-3.5 text-purple-600 fill-purple-600" />
              Emergency Cash Loan • 100% Digital Process
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Instant Payday Loan <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                in India
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Need funds before your next salary credit? Apply Payday Loan Online with Waqt Money and access a Salary Advance Loan of ₹5,000 to ₹1,00,000 — a simple, secure digital process built for salaried employees who need short-term support for Emergency Cash Loan situations.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link to="/user/apply">
                <button className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-bold text-white shadow-lg shadow-purple-600/25 transition hover:bg-purple-700 hover:shadow-purple-600/40 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a href="#eligibility">
                <button className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-base font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 w-full sm:w-auto">
                  Check Your Eligibility →
                </button>
              </a>
            </div>

            {/* Highlights badges */}
            <div className="grid sm:grid-cols-3 gap-3 pt-4">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="h-5 w-5 text-purple-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Regulated NBFC</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <Lock className="h-5 w-5 text-purple-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Encrypted Digital KYC</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Zero Physical Branch Visit</span>
              </div>
            </div>
          </div>

          {/* Quick Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Payday Loan Overview
              </h2>
              <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md border border-purple-200">
                Salary Advance
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/60">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Loan Amount</p>
                <p className="text-xl font-extrabold text-purple-900 mt-1">₹5,000 to ₹1,00,000</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/60">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Interest Rate</p>
                <p className="text-xl font-extrabold text-purple-900 mt-1">1% per day</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/60">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tenure Range</p>
                <p className="text-xl font-extrabold text-purple-900 mt-1">15 to 45 Days</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100/60">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Processing Fee</p>
                <p className="text-xl font-extrabold text-purple-900 mt-1">7% – 10% (+18% GST)</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-300 font-medium">Borrower Target</p>
                <p className="text-sm font-bold">Salaried Employees Only</p>
              </div>
              <Link to="/user/apply">
                <span className="text-xs font-bold bg-purple-600 hover:bg-purple-500 px-3.5 py-2 rounded-lg text-white transition flex items-center gap-1">
                  Apply Now <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Estimator Widget */}
        <section className="py-12 bg-white border-y border-purple-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1 text-xs font-bold text-purple-700 border border-purple-200">
                <Percent className="h-3.5 w-3.5" />
                Transparent 1% Per Day Estimator
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-3">
                Estimate Your Payday Loan Repayment
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-800">Loan Amount Required</label>
                    <span className="text-lg font-extrabold text-purple-700">₹{loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                    <span>₹5,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-800">Tenure (Days)</label>
                    <span className="text-lg font-extrabold text-purple-700">{tenureDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    step="5"
                    value={tenureDays}
                    onChange={(e) => setTenureDays(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                    <span>15 Days</span>
                    <span>30 Days</span>
                    <span>45 Days</span>
                  </div>
                </div>

                <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-purple-600" />
                    Important Repayment Note:
                  </p>
                  <p>
                    Because interest accrues daily at 1% per day, choosing the shortest tenure you can comfortably manage will meaningfully reduce your total repayment amount.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Breakdown Estimate</span>
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Principal Amount:</span>
                      <span className="font-bold text-slate-800">₹{loanAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Interest (1%/day x {tenureDays} days):</span>
                      <span className="font-bold text-slate-800">₹{interestAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Processing Fee (~8% avg):</span>
                      <span className="font-bold text-slate-800">₹{processingFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST @ 18% on Fee:</span>
                      <span className="font-bold text-slate-800">₹{gstOnFee.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-extrabold text-slate-900 text-sm">Total Repayment:</span>
                      <span className="font-black text-lg text-purple-700">₹{totalRepayment.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link to="/user/apply">
                    <button className="w-full h-11 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-sm">
                      Apply For ₹{loanAmount.toLocaleString("en-IN")} Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Payday Loan? */}
        <section className="bg-white py-16 border-b border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              What is a Payday Loan?
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              A Payday Loan is a Short-Term Loan created for one specific situation — when an expense arrives before your Monthly Salary does. Rather than waiting anxiously for payday or turning to informal borrowing, salaried employees can apply for a Payday Loan in India and access Emergency Funds ranging from ₹5,000 to ₹1,00,000 through a fast, structured process.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              In practical terms, this is a Loan Before Salary: a bridge between something urgent — a medical bill, a delayed paycheck, a utility payment — and the income you already know is coming. As a borrower, the loan application itself is built to move quickly, since the entire purpose of this Salary Advance is speed, not a drawn-out approval cycle.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              At Waqt Money, this experience is fully digital — from Payday Loan Online application to fund transfer — designed specifically for salaried individuals with a stable income who need short-term liquidity. Waqt Money operates under the same registered NBFC as a https://waqtfinance.com, so every loan is processed under the same regulated, compliant lending standards. This makes the Payday Loan a distinct category within consumer finance: smaller in size, shorter in tenure, and built around your salary cycle rather than years of repayment.
            </p>
          </div>
        </section>

        {/* Features & Benefits of Payday Loan */}
        <section className="py-16 container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Features & Benefits of Payday Loan
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Every feature of Waqt Money's Instant Payday Loan is shaped around what salaried employees actually need when an expense can't wait.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Quick Processing</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Our Instant Payday Loan Online application is structured to reduce back-and-forth, so once your documents are verified, you can expect a decision without unnecessary delay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Simple Digital Application</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                There's no branch visit required. The entire Digital Application — from submitting your details to receiving Loan Disbursement — happens online, so you can apply from wherever you are.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Percent className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Clear, Disclosed Interest Rate</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                As a form of Short-Term Finance, your Interest Rate is calculated at 1% per day on the outstanding Loan Amount, disclosed clearly upfront so you know your total repayment obligation before you commit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Built for Real Needs</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Borrow anywhere from ₹5,000 to ₹1,00,000, matched to your salary and repayment capacity — enough to cover a genuine emergency without pushing you into unnecessary debt.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Minimal Documentation</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Basic KYC, a recent salary slip, and bank statements are typically all that's required — no lengthy paperwork trail to slow things down.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Secure Digital Process</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Every stage of Digital Lending, from application to disbursement, runs through encrypted, secure systems that protect your personal and financial information.
              </p>
            </div>
          </div>
        </section>

        {/* Payday Loan Eligibility Criteria */}
        <section id="eligibility" className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-purple-600" />
                Payday Loan Eligibility Criteria
              </h2>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                Payday Loan Eligibility at Waqt Money is built specifically for salaried employees, not business owners or self-employed applicants. You may qualify as a Payday Loan for Salaried Employees applicant if you meet the following requirements:
              </p>
            </div>

            {/* Eligibility Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-900 text-white text-xs font-bold uppercase">
                  <tr>
                    <th className="p-4">Criteria</th>
                    <th className="p-4">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Age</td>
                    <td className="p-4 font-semibold text-purple-700">21–58 years</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Income</td>
                    <td className="p-4">Regular Monthly Salary</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Bank Account</td>
                    <td className="p-4">Active Salary Account</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Employment</td>
                    <td className="p-4">Registered company or organization</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Contact Details</td>
                    <td className="p-4">Valid mobile number and email ID</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Approval here leans heavily on income stability rather than assets, since this is an unsecured, short-term product. That said, your Credit Score still plays a meaningful role in the overall Income Verification process — a stronger score generally supports smoother, faster approval and access to a higher Loan Amount within the ₹5,000–₹1,00,000 range.
            </p>

            <div className="p-5 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Self-Employed Applicants Note:</p>
              <p>
                If you're self-employed, this particular loan isn't the right fit for your income pattern — Waqt Money also offers other financing options, such as a Business Loan or EDI Loan, structured around variable business income rather than a fixed monthly salary.
              </p>
            </div>
          </div>
        </section>

        {/* Documents Required for Payday Loan */}
        <section className="py-16 container mx-auto px-4 max-w-4xl space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              Documents Required for Payday Loan
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Getting your Payday Loan Documents ready in advance helps move your application through verification faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-purple-700 mb-3 pb-2 border-b border-slate-100">
                Identity Proof
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Aadhaar Card
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  PAN Card
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Voter ID
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-purple-700 mb-3 pb-2 border-b border-slate-100">
                Address Proof
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Utility bills (&lt; 3 months old)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Passport
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Aadhaar Card
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-purple-700 mb-3 pb-2 border-b border-slate-100">
                Income Proof
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Salary Slip (most recent)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Employment ID Card
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  Bank Statement (last 6 months)
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            This Documentation process exists purely to confirm your identity, address, and income — since Payday Loan Eligibility depends significantly on Income Proof, having your salary slip and bank statements ready is the fastest way to move through the Verification Process without delay.
          </p>
        </section>

        {/* Payday Loan Interest Rate, Charges & Fees */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Percent className="h-6 w-6 text-purple-600" />
                Payday Loan Interest Rate, Charges & Fees
              </h2>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                Payday Loan Interest Rate at Waqt Money is charged at 1% per day on your outstanding Loan Amount — a rate structure common to short-term, salary-cycle lending, disclosed in full as part of your Loan Agreement so you can calculate your exact repayment before accepting the offer.
              </p>
            </div>

            {/* Charges Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-900 text-white text-xs font-bold uppercase">
                  <tr>
                    <th className="p-4">Charge</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Payday Loan Processing Fee</td>
                    <td className="p-4 font-semibold text-purple-700">7%–10% of the loan amount</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Applicable Taxes</td>
                    <td className="p-4">GST @ 18% on all fees and charges</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Late Payment Charges</td>
                    <td className="p-4">Applicable on any overdue amount, as per your loan agreement</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Bounce Charges</td>
                    <td className="p-4">Applicable if a scheduled repayment fails</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Documentation Charges</td>
                    <td className="p-4">A fixed processing charge, disclosed upfront</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Borrower Advisory:
              </p>
              <p>
                Since a 1% daily rate compounds meaningfully over even a short tenure, we recommend reviewing your total repayment amount — principal, interest, and processing fee combined — before accepting your loan offer. Waqt Money and Waqt Finance operate under the same registered NBFC, so all charges follow consistent, RBI-compliant disclosure standards across both platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Loan Amount, Tenure & Repayment */}
        <section className="py-16 container mx-auto px-4 max-w-4xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="h-6 w-6 text-purple-600" />
            Loan Amount, Tenure & Repayment
          </h2>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Your Payday Loan Amount ranges from ₹5,000 to ₹1,00,000, determined by your salary, existing financial obligations, and internal assessment — giving you access to Instant Cash Before Salary sized appropriately to your repayment capacity.
          </p>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Payday Loan Tenure ranges from 15 to 45 days, aligned to your salary cycle rather than the longer multi-year tenures seen with personal or business loans. This is what defines a Payday Loan as genuine Short-Term Finance: designed to be borrowed and repaid within weeks, not carried for years.
          </p>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Repayment is typically scheduled around your next salary credit date, through common digital payment methods. Because interest accrues daily at 1% per day, choosing the shortest tenure you can comfortably manage — rather than the maximum 45 days — will meaningfully reduce your total repayment amount. If your circumstances change, early repayment is generally supported as per your approved Repayment Schedule and loan terms.
          </p>
        </section>

        {/* How to Apply for a Payday Loan Online? */}
        <section className="bg-slate-900 text-white py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
                Simple 4-Step Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3">How to Apply for a Payday Loan Online?</h2>
              <p className="text-slate-400 text-sm mt-2">
                Apply Payday Loan Online with Waqt Money through a simple, four-step Digital Application:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="h-8 w-8 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">1</div>
                <h3 className="font-bold text-base text-white">Submit Your Application</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Complete the Payday Loan Online Application with your basic details and required documents.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="h-8 w-8 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">2</div>
                <h3 className="font-bold text-base text-white">Document Verification</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Our team reviews your submitted documents and assesses your eligibility as part of the Verification Process.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="h-8 w-8 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">3</div>
                <h3 className="font-bold text-base text-white">Loan Approval</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Once verification is complete, you'll receive confirmation of your approved loan amount (₹5,000–₹1,00,000) and tenure (15–45 days).
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="h-8 w-8 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">4</div>
                <h3 className="font-bold text-base text-white">Fund Disbursement</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  After completing your loan agreement, the approved amount is transferred to your bank account.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-xs sm:text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
              This entire process is designed to minimize Processing Time without cutting corners on verification — because a Payday Loan is only useful if it actually arrives when you need it, through a process you can trust.
            </p>
          </div>
        </section>

        {/* Why Choose Waqt Money for a Payday Loan? */}
        <section className="py-16 container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Choose Waqt Money for a Payday Loan?
            </h2>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
              When you're dealing with an Emergency Cash Loan situation, the lender you choose matters as much as the loan itself. Waqt Money operates under the same registered NBFC as Waqt Finance, which means your Payday Loan is processed under the same regulated, transparent lending standards — not through an informal or unlicensed channel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Zap className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Quick Processing</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                A Payday Loan Online experience built to move fast, without sacrificing proper verification.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Lock className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Fast Online Application</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Apply anytime, from anywhere, without visiting a branch.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <FileText className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Minimal Documentation</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Only the essentials required to verify your identity, address, and income.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">A Loan Amount That Fits</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Borrow between ₹5,000 and ₹1,00,000, based on your actual need and repayment ability.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Percent className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Transparent Charges</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Interest at 1% per day, processing fee of 7%–10%, and GST @ 18% — all disclosed clearly before you commit.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Secure Digital Process</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Your data is protected through encrypted systems at every stage of Digital Lending.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Headphones className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Dedicated Support</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Real assistance available throughout your Payday Loan journey.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <UserCheck className="h-6 w-6 text-purple-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900">Salaried Focus</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Built specifically around the needs of salaried employees needing short-term funds.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-slate-50 py-16 border-t border-slate-200/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
              <HelpCircle className="h-6 w-6 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner (Heading removed as requested) */}
        <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white py-16 border-t border-purple-800">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
            <p className="text-base sm:text-lg text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Facing an urgent expense before your next salary? Apply Payday Loan Online with Waqt Money today and access ₹5,000 to ₹1,00,000 through a simple, secure digital process built for salaried employees.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/user/apply">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-sm font-bold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-purple-300/40 bg-white/10 px-8 text-sm font-bold text-white transition hover:bg-white/20 w-full sm:w-auto">
                  Talk to an Expert
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
