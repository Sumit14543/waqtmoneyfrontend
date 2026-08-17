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
  Calculator,
  ChevronDown,
  User,
  HeartPulse,
  Sparkles,
  Check,
  Building2,
  GraduationCap,
  Home,
  UserCheck,
  HelpCircle as QuestionIcon
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function PersonalLoan() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Personal Loan?",
      a: "A Personal Loan is an unsecured form of financing that helps you cover personal expenses — medical, wedding, education, or debt consolidation — repaid through a monthly EMI."
    },
    {
      q: "2. What is the Personal Loan Eligibility Criteria?",
      a: "Salaried applicants need to be 21–58 years old with a minimum income of ₹25,000/month and a Credit Score of 700+; self-employed applicants need 3+ years of business vintage, ₹10 Lakhs+ annual turnover, and 2 years of filed ITRs."
    },
    {
      q: "3. What documents are required?",
      a: "Aadhaar Card, PAN Card, salary slips or ITR, and bank statements from the last 6 months."
    },
    {
      q: "4. What is the Personal Loan interest rate?",
      a: "Rates range from 10.49% to 24% p.a., depending on your Credit Score, income, and financial profile."
    },
    {
      q: "5. What is the Personal Loan EMI, and how is it calculated?",
      a: "Your EMI depends on your loan amount, interest rate, and tenure — use our EMI Calculator to see an exact breakdown before applying."
    },
    {
      q: "6. What is the maximum Personal Loan tenure?",
      a: "Repayment tenure ranges from 12 to 60 months, depending on your loan amount and profile."
    },
    {
      q: "7. Is collateral required for a Personal Loan?",
      a: "No — Personal Loans are unsecured, so no property, gold, or asset pledge is required."
    },
    {
      q: "8. Is Waqt Money a registered lender?",
      a: "Yes — Waqt Money operates under the same registered NBFC as Waqt Finance, ensuring your loan is processed under regulated, compliant standards."
    }
  ];

  const schema = [
    {
      "@type": "LoanOrCredit",
      "name": "Waqt Money Personal Loan",
      "description": "Apply Personal Loan Online with Waqt Money. Access an Unsecured Personal Loan for medical emergency, wedding, home renovation, or debt consolidation.",
      "url": "https://waqtmoney.com/loans/personal-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "1. What is a Personal Loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Personal Loan is an unsecured form of financing that helps you cover personal expenses — medical, wedding, education, or debt consolidation — repaid through a monthly EMI."
          }
        },
        {
          "@type": "Question",
          "name": "2. What is the Personal Loan Eligibility Criteria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Salaried applicants need to be 21–58 years old with a minimum income of ₹25,000/month and a Credit Score of 700+; self-employed applicants need 3+ years of business vintage, ₹10 Lakhs+ annual turnover, and 2 years of filed ITRs."
          }
        },
        {
          "@type": "Question",
          "name": "3. What documents are required?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aadhaar Card, PAN Card, salary slips or ITR, and bank statements from the last 6 months."
          }
        },
        {
          "@type": "Question",
          "name": "4. What is the Personal Loan interest rate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rates range from 10.49% to 24% p.a., depending on your Credit Score, income, and financial profile."
          }
        },
        {
          "@type": "Question",
          "name": "5. What is the Personal Loan EMI, and how is it calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your EMI depends on your loan amount, interest rate, and tenure — use our EMI Calculator to see an exact breakdown before applying."
          }
        },
        {
          "@type": "Question",
          "name": "6. What is the maximum Personal Loan tenure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Repayment tenure ranges from 12 to 60 months, depending on your loan amount and profile."
          }
        },
        {
          "@type": "Question",
          "name": "7. Is collateral required for a Personal Loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No — Personal Loans are unsecured, so no property, gold, or asset pledge is required."
          }
        },
        {
          "@type": "Question",
          "name": "8. Is Waqt Money a registered lender?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — Waqt Money operates under the same registered NBFC as Waqt Finance, ensuring your loan is processed under regulated, compliant standards."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://waqtmoney.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Loans",
          "item": "https://waqtmoney.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Personal Loan",
          "item": "https://waqtmoney.com/loans/personal-loan"
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Personal Loan in India | Apply Online | Waqt Money"
        description="Apply Personal Loan Online with Waqt Money. An Unsecured Personal Loan for medical emergencies, weddings, home renovation, or debt consolidation — fast digital approval & transparent charges."
        keywords="Personal Loan in India, Apply Personal Loan Online, Unsecured Personal Loan, Instant Personal Loan, Personal loan eligibility, Low interest personal loan, Medical emergency loan, Debt consolidation loan"
        canonicalUrl="https://waqtmoney.com/loans/personal-loan"
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
              Personal Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
              <Sparkles className="h-3.5 w-3.5" /> Instant Unsecured Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Personal Loan in India
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Need funds for a medical emergency, wedding, or home renovation? Apply Personal Loan Online with Waqt Money and access an Unsecured Personal Loan through a simple, secure digital process — no collateral, minimal documentation, and a decision built around your actual repayment capacity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
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
              <User className="h-5 w-5 text-purple-600" /> Key Features at a Glance
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
                <p className="text-xl font-bold text-purple-700 mt-1">No Collateral Required</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Personal Loan? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-purple-600 shrink-0" />
                What is a Personal Loan?
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                A Personal Loan is an Unsecured Personal Loan that gives you access to funds for virtually any personal need — without requiring you to pledge property, gold, or any other asset as security. As a borrower, you can use the amount however your situation demands, and repay it through a Monthly EMI over a tenure you choose.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Personal finance needs rarely arrive on a convenient schedule. A medical emergency, a wedding, an unplanned repair, or a debt you want to consolidate can all show up without warning — and that's exactly where a Personal Loan in India fits in. It turns an urgent need into a structured, manageable repayment plan instead of a financial shock.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                At Waqt Money, the entire loan application — from submission to fund disbursement — is handled through a Personal Loan Online process. Waqt Money operates under the same registered NBFC as Waqt Finance, so every loan is processed under the same regulated, transparent lending standards. This is consumer finance built for real situations: emergency funds when you need them, without the long branch-based process traditional lenders often require.
              </p>
            </div>
          </div>
        </section>

        {/* Features & Benefits of Personal Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Features & Benefits of Personal Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Every feature of Waqt Money's Personal Loan is built around giving salaried and self-employed applicants fast, flexible access to funds.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Clock className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">An Instant Personal Loan Process</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Submit your details online, and once your income and identity are verified, your application moves toward Loan Approval without unnecessary delay.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <FileText className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Personal Loan Application</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A fully Digital Application means no branch visits, no long queues — just a simple online process from start to Loan Disbursement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <IndianRupee className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Loan Amount Matched to Your Profile</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your sanctioned Loan Amount reflects your income, credit profile, and repayment capacity, so you're borrowing an amount that genuinely fits your situation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Sparkles className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Transparent Interest Rate</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your Interest Rate is calculated and disclosed clearly upfront, so you understand your full repayment obligation before committing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <ShieldCheck className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Collateral Required</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  As an Unsecured Personal Loan, there's no need to pledge property, gold, or investments — eligibility rests on your credit score, income, and repayment ability.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <Scale className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Flexible Repayment</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Choose a tenure that fits your monthly budget, keeping your EMI manageable rather than a financial strain.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition md:col-span-2 lg:col-span-3">
                <UserCheck className="h-9 w-9 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Digital Lending</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every stage of the process runs through encrypted, secure systems that protect your personal and financial information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Uses of Personal Loan */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Common Uses of Personal Loan
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              A Personal Loan is one of the most versatile forms of consumer credit available today, which is why it's used across such a wide range of real situations:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
              <HeartPulse className="h-8 w-8 text-rose-500 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Personal Loan for Medical Emergency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cover hospital bills or unplanned medical expenses without depleting your emergency funds or waiting on insurance settlements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
              <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Personal Loan for Wedding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fund wedding expenses on your own timeline, without added pressure on family savings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
              <Home className="h-8 w-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Personal Loan for Home Renovation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Repair, renovate, or upgrade your home without disturbing long-term investments earmarked for other goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition">
              <GraduationCap className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Personal Loan for Education</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cover tuition, exam fees, or study-related costs as part of broader Financial Planning for yourself or a family member.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition md:col-span-2 lg:col-span-2">
              <Scale className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Personal Loan for Debt Consolidation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Combine multiple high-interest debts into a single, structured EMI, simplifying your monthly repayment and often reducing your overall interest burden.
              </p>
            </div>
          </div>

          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            Whatever the reason, a Personal Loan gives you the flexibility to act on a real need now and repay on your own terms — structured, predictable, and without pledging an asset to do it.
          </div>
        </section>

        {/* Who Should Consider a Personal Loan? */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Who Should Consider a Personal Loan?
              </h2>
              <p className="text-slate-600 text-base">
                A Personal Loan isn't the right fit for every situation, but it tends to genuinely help in a few common scenarios:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Salaried employees with a stable monthly income who need funds for a specific, time-bound expense
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Self-employed professionals with consistent business income looking for financing without pledging business assets
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Anyone facing a medical emergency that can't wait for savings or insurance to catch up
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Families planning wedding expenses who want funding structured around a clear repayment timeline
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Students or parents covering education costs not fully met by savings or scholarships
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Borrowers looking to simplify multiple high-interest debts through debt consolidation into one predictable EMI
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                If your need is specific, your income is stable enough to support a monthly EMI, and you'd rather not pledge an asset to access funds, a Personal Loan is generally a reasonable option to explore. If your income is highly irregular, or the amount needed is large relative to your monthly earnings, it's worth reviewing your eligibility carefully before applying — approval is always subject to eligibility and verification, not guaranteed by need alone.
              </div>
            </div>
          </div>
        </section>

        {/* Personal Loan Eligibility Criteria */}
        <section id="eligibility" className="container mx-auto px-4 py-16 max-w-5xl scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Personal Loan Eligibility Criteria
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Personal Loan Eligibility Criteria at Waqt Money depends on your employment type and overall financial profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Salaried Employees */}
            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                Personal Loan for Salaried Employees
              </h3>

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
                      <td className="py-3 px-3 text-slate-600">1+ year overall (6 months in current job)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-medium text-slate-700">Credit Score (CIBIL)</td>
                      <td className="py-3 px-3 text-slate-600">700 or above</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Self-Employed */}
            <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                Personal Loan for Self-Employed
              </h3>

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
                      <td className="py-3 px-3 font-medium text-slate-700">Minimum Turnover</td>
                      <td className="py-3 px-3 text-slate-600">₹10 Lakhs/year</td>
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
            Beyond these baseline numbers, Income Verification and a fair <strong>Credit Assessment</strong> play a central role in the final decision. A stronger Credit Score, stable income, and low existing debt generally support smoother approval and access to more competitive terms — though every application is evaluated individually, and approval is always subject to eligibility and verification.
          </div>

          <div className="text-center">
            <Link to="/user/apply">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                Check Your Eligibility →
              </button>
            </Link>
          </div>
        </section>

        {/* Documents Required for Personal Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Documents Required for Personal Loan
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Keeping your Personal Loan Documents ready in advance helps speed up Verification and approval.
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
                      <td className="py-4 px-6 text-slate-600">Aadhaar Card, PAN Card, Voter ID, Passport</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Address Proof</td>
                      <td className="py-4 px-6 text-slate-600">Utility bills (within 3 months), Rent Agreement, Aadhaar Card</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-semibold text-slate-800">Income Proof</td>
                      <td className="py-4 px-6 text-slate-600">Salary Slip (last 3 months), Bank Statement (last 6 months), ITR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 leading-relaxed">
              This Documentation process exists purely to confirm your identity, address, and income — so there's no unnecessary paperwork slowing down your application.
            </div>
          </div>
        </section>

        {/* Personal Loan Interest Rate, Charges & Fees */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Personal Loan Interest Rate, Charges & Fees
            </h2>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              Personal Loan Interest Rate at Waqt Money generally ranges from <strong>10.49% to 24% p.a.</strong>, determined by your Credit Score, employment type, income level, and existing debt. As part of the same registered NBFC as Waqt Finance, your exact rate is confirmed and disclosed as part of your Loan Agreement before you accept the offer.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-4 bg-purple-50 border-b border-purple-100 font-semibold text-purple-900 text-sm">
              Other charges typically disclosed upfront:
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
                    <td className="py-3.5 px-6 font-medium text-slate-800">Personal Loan Processing Fee</td>
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

          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Waqt Money follows a transparent-charges approach consistent with RBI guidelines applicable to NBFC lending — every rate and fee is disclosed before you commit, with nothing added beyond what's stated in your loan agreement.
          </div>
        </section>

        {/* Personal Loan Amount, EMI & Repayment */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Personal Loan Amount, EMI & Repayment
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <p className="text-slate-600 leading-relaxed text-base">
                Your Loan Amount is shaped by your income, Credit Score, and repayment capacity — sized to what genuinely fits your financial profile rather than a flat, one-size-fits-all figure.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Personal Loan Tenure ranges from 12 to 60 months, giving you room to pick a repayment schedule that fits your monthly budget. A shorter tenure reduces total interest paid; a longer tenure lowers your Monthly EMI.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Three factors decide your EMI — loan amount, interest rate, and tenure. Use our Personal Loan EMI Calculator to instantly see your monthly installment, along with a full breakdown of principal versus interest, before submitting your application.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Part-prepayment is available from ₹10,000 or one EMI, whichever is higher, and foreclosure requests should be submitted 15 days in advance — giving you the flexibility to close your loan early and support a stronger credit profile going forward.
              </p>

              <div className="pt-4 text-center sm:text-left">
                <Link to="/emi-calculator">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-100 text-purple-800 font-semibold text-sm hover:bg-purple-200 transition">
                    <Calculator className="h-4 w-4" />
                    Open Personal Loan EMI Calculator
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply for a Personal Loan Online? */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              How to Apply for a Personal Loan Online?
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Apply Personal Loan Online with Waqt Money through this simple, four-step Digital Application:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Submit Your Application</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete the Personal Loan Online Application with your basic details and required documents.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team verifies your submitted documents and evaluates your eligibility as part of the Verification Process.
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
            This entire Digital Application is designed to minimize Processing Time while maintaining proper verification — because a Personal Loan is only useful if it reaches you exactly when your need demands it.
          </div>

          <div className="text-center">
            <Link to="/user/apply">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-base font-semibold text-white transition hover:bg-purple-700 shadow-md">
                Apply Now →
              </button>
            </Link>
          </div>
        </section>

        {/* Things to Consider Before Applying for a Personal Loan */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
                <AlertTriangle className="h-7 w-7 text-amber-500" />
                Things to Consider Before Applying for a Personal Loan
              </h2>
              <p className="text-slate-600 text-base">
                A Personal Loan can genuinely help — but it's worth thinking through a few things before you apply, not just after:
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-base mb-1">EMI Affordability</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Before applying, calculate whether your monthly EMI comfortably fits your budget alongside existing expenses. A loan that strains your monthly cash flow defeats its own purpose.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Credit Score</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Your CIBIL score directly affects both approval odds and the interest rate you're offered. Checking your score before applying helps you know roughly what to expect.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Processing Fees</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Beyond the interest rate, factor in the processing fee and applicable GST when calculating your total cost of borrowing — not just the headline rate.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Repayment Tenure</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A longer tenure lowers your EMI but increases total interest paid over time. Choose the shortest tenure you can realistically manage, rather than defaulting to the longest available option.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Responsible Borrowing</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Borrow only what you genuinely need for your specific purpose, rather than the maximum amount you're eligible for. A Personal Loan is most useful when it solves a real, specific need — not as a routine way to supplement monthly income.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                Taking a few minutes to think through these points before applying tends to lead to a loan that actually works in your favor, rather than one that adds financial pressure down the line.
              </div>
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
              Choosing the right lender for your Personal Loan matters as much as choosing the right loan amount. Waqt Money operates under the same registered NBFC as Waqt Finance, which means your Personal Loan Online application is processed under consistent, regulated, and compliant lending standards — not through an informal or unlicensed channel.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">What makes Waqt Money a strong choice:</h3>

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
                  <p className="text-xs text-slate-600 mt-0.5">Only what's genuinely needed to verify your identity, address, and income.</p>
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
                  <p className="text-xs text-slate-600 mt-0.5">Your data protected through encrypted systems at every stage of Digital Lending.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">No Collateral Required</p>
                  <p className="text-xs text-slate-600 mt-0.5">A genuinely Unsecured Personal Loan, based on your credit and income profile.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Dedicated Customer Support</p>
                  <p className="text-xs text-slate-600 mt-0.5">Real assistance available through every stage of your loan journey.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Approval Subject to Eligibility & Verification</p>
                  <p className="text-xs text-slate-600 mt-0.5">Every application evaluated fairly, so your Loan Approval reflects your actual profile.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
              Whether you're covering a medical emergency, funding a wedding, or consolidating debt, Waqt Money is built to help you access a Personal Loan through a process rooted in transparency, not fine print.
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
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
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-purple-900 text-white py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold">
              Need funds for a medical emergency, wedding, or home renovation?
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Apply Personal Loan Online with Waqt Money today through a simple, secure digital process.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/user/apply" className="w-full sm:w-auto">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg w-full sm:w-auto">
                  Apply Now
                </button>
              </Link>
              <a href="#eligibility" className="w-full sm:w-auto">
                <button className="h-12 px-8 rounded-xl border border-purple-400 text-white font-bold text-base hover:bg-purple-800 transition w-full sm:w-auto">
                  Check Your Eligibility
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

