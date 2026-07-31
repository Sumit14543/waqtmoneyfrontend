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
  Car,
  Bike,
  ArrowRightLeft
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function VehicleLoan() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Vehicle Loan?",
      a: "A Vehicle Loan is financing that helps you purchase a car, bike, or commercial vehicle, repaid through monthly EMIs over an agreed tenure."
    },
    {
      q: "2. What is the Vehicle Loan Eligibility Criteria?",
      a: "Salaried applicants need to be 21–58 years old with a minimum income of ₹25,000/month and a Credit Score of 700+; self-employed applicants need 3+ years of business vintage and ₹10 Lakhs+ annual turnover."
    },
    {
      q: "3. What documents are required?",
      a: "Aadhaar Card, PAN Card, address proof, salary slips or ITR, bank statements, and a vehicle quotation or invoice from the dealer."
    },
    {
      q: "4. What is the Vehicle Loan interest rate?",
      a: "Rates generally range from 10.49% to 24% p.a., depending on your Credit Score, income, and financial profile."
    },
    {
      q: "5. What is the Vehicle Loan EMI, and how is it calculated?",
      a: "Your EMI depends on your loan amount, interest rate, and tenure — use our EMI Calculator for an instant breakdown."
    },
    {
      q: "6. What is the Vehicle Loan Tenure?",
      a: "Tenure is flexible and chosen based on your repayment capacity — shorter tenures reduce total interest, longer tenures ease monthly EMI."
    },
    {
      q: "7. Can I get a Car Loan for a used vehicle?",
      a: "Yes — Waqt Money offers financing for both new and used vehicles, with terms adjusted based on the vehicle's age and value."
    },
    {
      q: "8. Can I prepay my Bike Loan or Car Loan without penalty?",
      a: "Part-prepayment and foreclosure are available subject to the charges outlined in your loan agreement."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Vehicle Loan",
      "description": "Apply Vehicle Loan Online with Waqt Money. Get a Car Loan or Bike Loan with competitive rates, minimal documentation, and quick approval for new or used vehicles.",
      "url": "https://waqtmoney.com/loans/vehicle-loan",
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
        title="Vehicle Loan in India | Car & Bike Loan Online | Waqt Money"
        description="Apply Vehicle Loan Online with Waqt Money. Get a Car Loan or Bike Loan with competitive rates, minimal documentation, and quick approval for new or used vehicles."
        keywords="Vehicle Loan Online, Car Loan, Bike Loan, Vehicle Finance, Used Car Loan, Two Wheeler Loan, Auto Loan India"
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
              Vehicle Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
              <Car className="h-3.5 w-3.5" /> Vehicle Finance Online
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Vehicle Loan in India
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Buying a car or bike? Apply Vehicle Loan Online with Waqt Money and get Vehicle Finance for new or used vehicles — competitive interest rates, minimal documentation, and a fast digital process that gets you behind the wheel sooner rather than later.
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
              <Car className="h-5 w-5 text-purple-600" /> Vehicle Finance Snapshot
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 relative z-10">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-xl font-bold text-purple-700 mt-1">From 10.49% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">On-Road Funding</p>
                <p className="text-xl font-bold text-purple-700 mt-1">Up to 90%–100%</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Vehicle Types</p>
                <p className="text-xl font-bold text-purple-700 mt-1">New & Used</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Process</p>
                <p className="text-xl font-bold text-purple-700 mt-1">100% Digital</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Vehicle Loan? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-purple-600 shrink-0" />
                What is a Vehicle Loan?
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                A Vehicle Loan is financing that helps you purchase a car, bike, or commercial vehicle without paying the full amount upfront. Instead of draining your savings for a Vehicle Purchase, you pay a portion as a down payment and borrow the rest, repaying it through a structured Loan Amount and monthly EMI over your chosen tenure.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                A Vehicle Loan in India works fundamentally like most secured consumer loans — the vehicle itself typically serves as security until the loan is fully repaid. As a Borrower, your Loan Application is assessed on your income, credit profile, and the value of the vehicle you're purchasing.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                At Waqt Money, this entire process happens through a Vehicle Loan Online application — no lengthy branch visits, no stacks of paperwork. Waqt Money operates under the same registered NBFC as Waqt Finance, so every loan is processed under the same regulated, transparent lending standards. Whether you're financing a new hatchback, a used sedan, or a two-wheeler for your daily commute, this is consumer finance built around a simple goal: getting you into your vehicle sooner, with a repayment plan that fits your budget.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Benefits of a Vehicle Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Features & Benefits of a Vehicle Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Every feature of Waqt Money's Vehicle Loan is designed to make vehicle ownership more accessible:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Zap className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Quick, Hassle-Free Approval</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once your documents are verified, Loan Approval decisions move quickly, so you're not stuck waiting while a great deal on your dream vehicle slips away.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <IndianRupee className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Flexible Loan Amount</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your sanctioned amount is based on your income, credit profile, and the vehicle's value — whether it's a budget-friendly hatchback or a premium car.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Car className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Financing for New & Used Vehicles</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether you're buying brand new or a certified pre-owned vehicle, financing options are structured to fit your choice.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Competitive Interest Rate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enjoy a transparent Interest Rate structure with no hidden costs, helping you plan the true cost of vehicle ownership from day one.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Clock className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Flexible Repayment Tenure</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose a repayment schedule that fits your monthly budget — shorter tenures for less total interest, longer tenures for a lighter EMI.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <FileText className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Minimal Documentation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Basic identity, address, and income proof are usually enough, making the process simple even for first-time borrowers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition sm:col-span-2 lg:col-span-1">
                <Bike className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 mb-2">Auto Loan Options for Every Need</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether it's a Car Loan or a Bike Loan, the loan structure adapts to the vehicle and your repayment capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Vehicle Loans */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Types of Vehicle Loans
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Not every vehicle purchase looks the same — here's how Waqt Money's financing breaks down by vehicle type:
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-purple-900 text-white font-semibold">
                    <th className="py-3.5 px-5 w-1/3">Vehicle Type</th>
                    <th className="py-3.5 px-5 w-2/3">What It Covers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">New Car Loan</td>
                    <td className="py-3.5 px-5 text-slate-600">Financing for brand-new cars purchased directly from an authorized Vehicle Dealer</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Used Car Loan</td>
                    <td className="py-3.5 px-5 text-slate-600">Financing for certified pre-owned or resale vehicles, with terms adjusted for vehicle age</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Two Wheeler Loan</td>
                    <td className="py-3.5 px-5 text-slate-600">Financing for bikes and scooters, ideal for daily commute needs</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Commercial Vehicle Financing</td>
                    <td className="py-3.5 px-5 text-slate-600">Financing for business-use vehicles, subject to eligibility and internal assessment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl mx-auto">
            Whichever category fits your need, the underlying process stays the same — apply online, get verified, and move toward Vehicle Ownership through a structured, transparent loan. New vehicles typically qualify for a higher Loan Amount relative to on-road price, while used vehicles are assessed with the vehicle's age and current market value factored into the offer.
          </div>
        </section>

        {/* Vehicle Loan Eligibility Criteria */}
        <section id="eligibility" className="bg-slate-50 py-16 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Vehicle Loan Eligibility Criteria
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Vehicle Loan Eligibility Criteria at Waqt Money depends on your employment type and financial profile:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Salaried */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-purple-900 text-white p-4 font-bold text-center text-base">
                  Vehicle Loan for Salaried
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b">
                        <th className="py-2.5 px-4 w-1/2">Criteria</th>
                        <th className="py-2.5 px-4 w-1/2">Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Age</td>
                        <td className="py-2.5 px-4 text-slate-600">21–58 years</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Minimum Income</td>
                        <td className="py-2.5 px-4 text-slate-600">₹25,000/month</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Work Experience</td>
                        <td className="py-2.5 px-4 text-slate-600">1+ year overall (6 months in current job)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Credit Score</td>
                        <td className="py-2.5 px-4 text-slate-600">700 or above</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Self-Employed */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-purple-900 text-white p-4 font-bold text-center text-base">
                  Vehicle Loan for Self-Employed
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b">
                        <th className="py-2.5 px-4 w-1/2">Criteria</th>
                        <th className="py-2.5 px-4 w-1/2">Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Age</td>
                        <td className="py-2.5 px-4 text-slate-600">25–65 years</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Business Vintage</td>
                        <td className="py-2.5 px-4 text-slate-600">3+ years</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">Minimum Turnover</td>
                        <td className="py-2.5 px-4 text-slate-600">₹10 Lakhs/year</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-800">ITR Filed</td>
                        <td className="py-2.5 px-4 text-slate-600">Last 2 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
              Beyond these baseline numbers, Income Verification and a fair Credit Assessment factor into the final decision. A stronger Credit Score generally supports both a higher approved Loan Amount and a more competitive interest rate — though every application is evaluated individually, and approval is always subject to eligibility and verification.
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

        {/* Documents Required for Vehicle Loan */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Documents Required for Vehicle Loan
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Getting your Vehicle Loan Documents ready in advance helps speed up verification and approval:
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-purple-900 text-white font-semibold">
                    <th className="py-3.5 px-5 w-1/3">Document Type</th>
                    <th className="py-3.5 px-5 w-2/3">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Identity Proof</td>
                    <td className="py-3.5 px-5 text-slate-600">Aadhaar Card, PAN Card, Voter ID</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Address Proof</td>
                    <td className="py-3.5 px-5 text-slate-600">Utility bills (within 3 months), Passport</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Income Proof</td>
                    <td className="py-3.5 px-5 text-slate-600">Last 3 months' salary slips, Bank Statement (6 months), Form 16 / ITR</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Vehicle-Related</td>
                    <td className="py-3.5 px-5 text-slate-600">Vehicle Invoice or quotation from the dealer, Driving Licence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
            This Documentation process exists to confirm your identity, address, income, and the vehicle you're purchasing — having your dealer quotation ready alongside your personal documents speeds up the entire Verification Process.
          </div>
        </section>

        {/* Vehicle Loan Interest Rate, Charges & Fees */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Vehicle Loan Interest Rate, Charges & Fees
              </h2>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                Vehicle Loan Interest Rate at Waqt Money is determined by your Credit Score, employment type, income, and existing debt — generally ranging from <strong>10.49% to 24% p.a.</strong>, with well-qualified applicants (Credit Score 750+) typically securing rates closer to the lower end.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
              <div className="p-4 bg-purple-900 text-white font-bold text-base">
                Other Charges Disclosed in Your Loan Agreement
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold border-b">
                      <th className="py-3 px-5 w-1/3">Charge</th>
                      <th className="py-3 px-5 w-2/3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-800">Vehicle Loan Processing Fee</td>
                      <td className="py-3 px-5 text-slate-600">6%–10% of the loan amount</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-800">Late Payment Charges</td>
                      <td className="py-3 px-5 text-slate-600">36% p.a. on the outstanding amount</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-800">EMI Bounce Charges</td>
                      <td className="py-3 px-5 text-slate-600">₹500 + 18% GST</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-800">Penal Interest</td>
                      <td className="py-3 px-5 text-slate-600">Additional 3% p.a.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-800">Documentation Charges</td>
                      <td className="py-3 px-5 text-slate-600">₹500–₹5,000</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-800">Applicable Taxes</td>
                      <td className="py-3 px-5 text-slate-600">GST @ 18% on all fees and charges</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
              As part of the same registered NBFC as Waqt Finance, Waqt Money follows a transparent-charges approach consistent with RBI guidelines — every applicable rate and fee is disclosed before you accept your loan offer.
            </div>
          </div>
        </section>

        {/* Vehicle Loan Amount, EMI & Repayment */}
        <section className="container mx-auto px-4 py-16 max-w-4xl space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Vehicle Loan Amount, EMI & Repayment
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Your Vehicle Loan amount is generally available up to <strong>90%–100% of the vehicle's on-road price</strong>, depending on your eligibility, income, and credit profile — with the remaining portion covered as your down payment.
            </p>
            <p>
              Vehicle Loan Tenure is flexible, letting you choose a repayment schedule that fits your monthly budget. A shorter tenure reduces total interest paid; a longer tenure keeps your Vehicle Loan EMI lighter month to month.
            </p>
            <p>
              Your EMI depends on three factors — loan amount, interest rate, and tenure. Use our Vehicle Loan EMI Calculator to instantly estimate your monthly installment and see a full breakdown of principal versus interest before applying.
            </p>
            <p>
              Part-prepayment is available from ₹10,000 or one EMI, whichever is higher, and foreclosure requests should be submitted 15 days in advance — giving you the flexibility to close your loan early once your finances allow.
            </p>
            <div className="pt-2">
              <Link to="/emi-calculator">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-700">
                  Open EMI Calculator →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Factors That Affect Your Vehicle Loan Approval */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Factors That Affect Your Vehicle Loan Approval
              </h2>
              <p className="text-slate-600 text-base">
                Several factors together shape your approval odds and the terms you're offered:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Credit Score:</strong> A stronger Credit Score generally supports faster approval and a more competitive Interest Rate.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Down Payment:</strong> A higher down payment reduces your required Loan Amount, which can improve approval odds and lower your EMI.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Income:</strong> Your monthly or annual income relative to the vehicle's cost directly affects how much you're eligible to borrow.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Employment Type:</strong> Salaried applicants with stable income sometimes see smoother approval, though self-employed applicants with consistent turnover are equally eligible.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Vehicle Age:</strong> For a Used Car Loan, the vehicle's age affects both eligibility and the loan-to-value offered, since older vehicles carry different resale value considerations.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Vehicle Registration:</strong> Proper Vehicle Registration and clear ownership documentation (for used vehicles) are essential parts of the verification process.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60 sm:col-span-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700"><strong>Existing Loan Obligations:</strong> Lower existing debt improves your repayment capacity in the eyes of the lender, supporting both approval and better terms.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply for a Vehicle Loan Online? */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              How to Apply for a Vehicle Loan Online?
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Apply Vehicle Loan Online with Waqt Money through this simple, four-step Digital Application:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Step 1: Submit Application (~5 mins)</h3>
              <p className="text-xs text-slate-600">Complete the Vehicle Loan Online Application with your personal, vehicle, and contact details.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Step 2: Verification (24–48 hrs)</h3>
              <p className="text-xs text-slate-600">Our team verifies your submitted documents and evaluates your eligibility as part of the Verification Process.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Step 3: Loan Approval</h3>
              <p className="text-xs text-slate-600">Once verification is complete, receive confirmation of your approved loan amount and terms.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">Step 4: Fund Disbursement</h3>
              <p className="text-xs text-slate-600">After completing your loan agreement, funds are transferred directly to your bank account or the dealer.</p>
            </div>
          </div>

          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            This entire Digital Application is designed to minimize Processing Time while maintaining proper verification, so you can move from application to driving your vehicle without unnecessary delay.
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
                Choosing the right Financial Institution for your Vehicle Loan matters as much as choosing the vehicle itself. Waqt Money operates under the same registered NBFC as Waqt Finance, meaning your Car Loan or Bike Loan is processed under consistent, regulated standards.
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
                    <p className="text-xs text-slate-600 mt-0.5">Apply anytime, from anywhere, without a branch visit.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Secure Digital Process</p>
                    <p className="text-xs text-slate-600 mt-0.5">Your data protected through encrypted systems at every stage of Digital Lending.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Minimal Documentation</p>
                    <p className="text-xs text-slate-600 mt-0.5">Only what's genuinely needed to verify your identity, income, and vehicle.</p>
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
                    <p className="text-sm font-semibold text-slate-900">Quick Processing</p>
                    <p className="text-xs text-slate-600 mt-0.5">Structured to move your application forward without unnecessary delay.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dedicated Customer Support</p>
                    <p className="text-xs text-slate-600 mt-0.5">Real assistance available through every stage of your Vehicle Finance journey.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
                Whether you're financing your first car or upgrading your two-wheeler, Waqt Money is built to help you access Vehicle Finance through a process rooted in transparency, not fine print.
              </div>
            </div>
          </div>
        </section>

        {/* New Car Loan vs Used Car Loan */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-purple-600" />
              New Car Loan vs Used Car Loan
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Deciding between financing a new or used vehicle affects more than just the price tag — here's how the loan terms typically compare:
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-purple-900 text-white font-semibold">
                    <th className="py-3.5 px-5 w-1/4">Factor</th>
                    <th className="py-3.5 px-5 w-3/8">New Car Loan</th>
                    <th className="py-3.5 px-5 w-3/8">Used Car Loan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Interest Rate</td>
                    <td className="py-3.5 px-5 text-slate-600">Generally lower</td>
                    <td className="py-3.5 px-5 text-slate-600">Generally slightly higher</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Loan Amount</td>
                    <td className="py-3.5 px-5 text-slate-600">Up to 90–100% of on-road price</td>
                    <td className="py-3.5 px-5 text-slate-600">Typically a lower percentage of vehicle value</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Down Payment</td>
                    <td className="py-3.5 px-5 text-slate-600">Lower down payment required</td>
                    <td className="py-3.5 px-5 text-slate-600">Higher down payment often required</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Tenure</td>
                    <td className="py-3.5 px-5 text-slate-600">Longer tenure options available</td>
                    <td className="py-3.5 px-5 text-slate-600">Tenure often shorter, tied to vehicle age</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Eligibility</td>
                    <td className="py-3.5 px-5 text-slate-600">Standard eligibility criteria apply</td>
                    <td className="py-3.5 px-5 text-slate-600">May factor in vehicle age and condition</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-4xl mx-auto">
            If you're buying new, you'll generally see more favorable financing terms and a higher loan-to-value ratio. If you're buying used, expect a slightly higher rate and a larger down payment — but often a lower overall vehicle cost that can still make the total EMI more affordable.
          </p>
        </section>

        {/* Responsible Borrowing */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5 text-purple-600" />
              A Note on Responsible Borrowing
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              Before taking a Vehicle Loan, it's worth evaluating your monthly EMI affordability against your existing income and expenses — not just whether you're eligible for the maximum loan amount available. Factor in the total repayment cost over your chosen tenure, including interest and applicable charges, not just the vehicle's sticker price. A vehicle loan sized to what you can comfortably repay each month protects both your finances and your ability to enjoy the vehicle without added financial stress. Approval is always subject to eligibility and verification.
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
              Ready to drive home your new vehicle?
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Apply Vehicle Loan Online with Waqt Money today for a Car Loan or Bike Loan with competitive rates and minimal paperwork.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link to="/user/apply">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg">
                  Apply Now
                </button>
              </Link>
              <a href="#eligibility">
                <button className="h-12 px-6 rounded-xl border border-purple-300 text-white font-bold text-base hover:bg-purple-800 transition">
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
