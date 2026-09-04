import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  IndianRupee,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Calculator,
  ChevronDown,
  Building2,
  MapPin,
  Sparkles,
  UserCheck,
  Zap,
  Lock,
  Check,
  User,
  CreditCard,
  Building
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export interface LocalArea {
  name: string;
  type?: string;
  description?: string;
}

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationPageData {
  city: string;
  stateRegion: string;
  title: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutCityTitle: string;
  aboutCityDescription: string;
  localHubs: LocalArea[];
  eligibilityPoints: string[];
  documentsRequired: {
    identity: string[];
    income: string[];
    address: string[];
  };
  faqs: LocationFaq[];
}

export default function LocationLoanTemplate({ data }: { data: LocationPageData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const schema = [
    {
      "@type": "FinancialService",
      "name": `Waqt Money Personal Loan in ${data.city}`,
      "description": data.metaDescription,
      "url": data.canonicalUrl,
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "telephone": "+91 9217086608",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": data.city
      },
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      }
    },
    {
      "@type": "LoanOrCredit",
      "name": `Personal Loan in ${data.city}`,
      "description": `Fast online personal loan for salaried professionals in ${data.city} with instant digital approval.`,
      "url": data.canonicalUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    },
    {
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
          "name": `Personal Loan in ${data.city}`,
          "item": data.canonicalUrl
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-[#8048e2] selection:text-white">
      <SEO
        title={data.title}
        description={data.metaDescription}
        canonicalUrl={data.canonicalUrl}
        keywords={data.keywords}
        schema={schema}
      />

      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-20 min-h-screen text-slate-800">
        
        {/* BACKGROUND AMBIENT BLOBS & WATERMARK EFFECTS */}
        <div className="pointer-events-none absolute -left-28 top-20 h-96 w-96 rounded-full bg-purple-300/30 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-200/35 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-orange-200/25 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-[130px]" />

        {/* Subtle Background Dot Grid Watermark */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c084fc_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-[0.18] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_70%,transparent_100%)]" />

        {/* Breadcrumb Navigation */}
        <nav className="container relative z-10 mx-auto px-4 py-3 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            </li>
            <li className="before:content-['/'] before:mr-2">
              <Link to="/services" className="hover:text-purple-600 transition-colors">Loans</Link>
            </li>
            <li className="before:content-['/'] before:mr-2 text-slate-800 font-medium" aria-current="page">
              Personal Loan in {data.city}
            </li>
          </ol>
        </nav>

        {/* HERO SECTION WITH ENHANCED BLOB & WATERMARK STYLING */}
        <section className="container relative z-10 mx-auto px-4 py-10 md:py-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100/90 border border-purple-200/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5 shadow-2xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" /> Instant Unsecured Credit in {data.city}
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {data.heroHeadline}
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              {data.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/user/apply">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#8048e2] px-7 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:bg-[#6d28d9] shadow-[0_4px_14px_rgba(128,72,226,0.35)] hover:shadow-[0_6px_20px_rgba(128,72,226,0.45)] hover:scale-[1.02] cursor-pointer">
                  Apply Now
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </Link>

              <Link to="/emi-calculator">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-purple-200/90 bg-white/90 px-7 text-sm sm:text-base font-semibold text-slate-800 backdrop-blur-xs transition-all duration-200 hover:bg-purple-50/70 hover:border-purple-300 hover:text-purple-700 cursor-pointer shadow-2xs">
                  <Calculator className="h-4 w-4 text-purple-600" />
                  Calculate EMI
                </button>
              </Link>
            </div>
          </div>

          {/* Right Card Container with Decorative Backdrop Glow & Watermark Icon */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-400/30 to-orange-300/30 blur-xl opacity-70"></div>
            
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-purple-100/90 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-purple-100/70 via-purple-50/40 to-transparent rounded-bl-full -z-0 pointer-events-none"></div>
              
              {/* Subtle Decorative Watermark Icon in Card Background */}
              <Building className="absolute -bottom-6 -right-6 h-40 w-40 text-purple-600/[0.04] pointer-events-none -rotate-12" />

              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
                <User className="h-5 w-5 text-purple-600" /> Key Features at a Glance
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 relative z-10">
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/60 backdrop-blur-xs transition hover:border-purple-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Application Process</p>
                  <p className="text-xl font-bold text-purple-700 mt-1">100% Digital</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/60 backdrop-blur-xs transition hover:border-purple-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Disbursal</p>
                  <p className="text-xl font-bold text-purple-700 mt-1">Direct Bank Credit</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/60 backdrop-blur-xs transition hover:border-purple-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Collateral</p>
                  <p className="text-xl font-bold text-purple-700 mt-1">No Collateral Required</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100/60 backdrop-blur-xs transition hover:border-purple-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Documentation</p>
                  <p className="text-xl font-bold text-purple-700 mt-1">Minimal Paperless</p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-purple-100/80 flex items-center justify-between relative z-10">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-purple-600" /> RBI Regulated Lender
                </span>

                <Link
                  to="/user/apply"
                  className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
                >
                  Apply Online →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK HIGHLIGHTS GRID WITH BLOB SHADOWS */}
        <section className="relative z-10 border-y border-purple-100/80 bg-white/80 backdrop-blur-md py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
              
              <div className="relative overflow-hidden p-5 rounded-2xl border border-purple-100 bg-gradient-to-b from-[#ffffff] to-[#fbf8ff] text-center shadow-2xs hover:shadow-md transition">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-purple-200/30 blur-lg" />
                <p className="text-xl sm:text-2xl font-bold text-purple-700 relative z-10">Instant Sanction</p>
                <p className="text-xs text-slate-500 mt-1 font-medium relative z-10">For Salaried Applicants</p>
              </div>

              <div className="relative overflow-hidden p-5 rounded-2xl border border-purple-100 bg-gradient-to-b from-[#ffffff] to-[#fbf8ff] text-center shadow-2xs hover:shadow-md transition">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-200/30 blur-lg" />
                <p className="text-xl sm:text-2xl font-bold text-purple-700 relative z-10">Fast Disbursal</p>
                <p className="text-xs text-slate-500 mt-1 font-medium relative z-10">Direct Bank Transfer</p>
              </div>

              <div className="relative overflow-hidden p-5 rounded-2xl border border-purple-100 bg-gradient-to-b from-[#ffffff] to-[#fbf8ff] text-center shadow-2xs hover:shadow-md transition">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-200/30 blur-lg" />
                <p className="text-xl sm:text-2xl font-bold text-purple-700 relative z-10">3 - 24 Months</p>
                <p className="text-xs text-slate-500 mt-1 font-medium relative z-10">Flexible EMI Tenures</p>
              </div>

              <div className="relative overflow-hidden p-5 rounded-2xl border border-purple-100 bg-gradient-to-b from-[#ffffff] to-[#fbf8ff] text-center shadow-2xs hover:shadow-md transition">
                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-sky-200/30 blur-lg" />
                <p className="text-xl sm:text-2xl font-bold text-purple-700 relative z-10">100% Digital</p>
                <p className="text-xs text-slate-500 mt-1 font-medium relative z-10">Paperless Video KYC</p>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT LOAN IN THIS CITY */}
        <section className="relative z-10 py-16 bg-slate-50/70 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-4">
                  <Building2 className="h-3.5 w-3.5 text-purple-700" /> Local Financial Assistance
                </span>

                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {data.aboutCityTitle}
                </h2>

                <div className="mt-4 text-slate-600 leading-relaxed space-y-4 text-sm md:text-base">
                  <p>{data.aboutCityDescription}</p>
                  <p>
                    Whether you need immediate funds for rent deposit, medical emergency, higher education, mobile/laptop purchase, or debt consolidation, Waqt Money offers rapid digital loan processing in <strong>{data.city}</strong> directly through your smartphone.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-purple-100 bg-white p-4 shadow-2xs">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Direct Bank Credit</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Approved funds transferred directly to your bank account.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-purple-100 bg-white p-4 shadow-2xs">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Regulated & Safe</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Compliant with RBI digital lending guidelines.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout Highlight Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl relative overflow-hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 mb-4">
                    <Zap className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">Need Urgent Cash in {data.city}?</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Get rapid digital loan sanction on your phone with zero physical documentation.
                  </p>

                  <ul className="mt-6 space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Instant Digital Qualification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Video KYC & Online Aadhaar Verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Direct Account Transfer</span>
                    </li>
                  </ul>

                  <Link to="/user/apply">
                    <button className="mt-8 w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#8048e2] text-sm font-bold text-white transition-all duration-200 hover:bg-[#6d28d9] shadow-[0_4px_14px_rgba(128,72,226,0.35)] cursor-pointer">
                      Apply Online Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* LOCAL AREAS COVERED */}
        <section className="relative z-10 bg-gradient-to-b from-[#fbf9ff] to-white py-16 border-y border-purple-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-purple-800 border border-purple-100 shadow-2xs mb-3">
                <MapPin className="h-3.5 w-3.5 text-purple-600" /> Coverage Map
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Serving All Major Areas in {data.city}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We extend quick digital personal loans to salaried professionals across every major commercial and residential sector in {data.city}.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.localHubs.map((hub) => (
                <div
                  key={hub.name}
                  className="relative overflow-hidden rounded-2xl border border-purple-100 bg-white/95 p-5 shadow-2xs backdrop-blur-xs transition-all hover:border-purple-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{hub.name}</h3>
                      {hub.type && (
                        <span className="text-xs font-semibold text-purple-600 block mt-0.5">
                          {hub.type}
                        </span>
                      )}
                    </div>
                  </div>
                  {hub.description && (
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {hub.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY & DOCUMENTS */}
        <section className="relative z-10 py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Eligibility Criteria & Required Documents
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Simple checklist for personal loan approval in {data.city}.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* Eligibility Box */}
              <div className="rounded-3xl border border-purple-100 bg-purple-50/40 p-6 sm:p-8 relative overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-purple-200/30 blur-2xl" />

                <div className="flex items-center gap-3 border-b border-purple-100 pb-4 relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">Eligibility Criteria</h3>
                    <p className="text-xs text-purple-700 font-medium">Simple parameters for fast approval</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-4 relative z-10">
                  {data.eligibilityPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Box */}
              <div className="rounded-3xl border border-purple-100 bg-purple-50/40 p-6 sm:p-8 relative overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-orange-200/30 blur-2xl" />

                <div className="flex items-center gap-3 border-b border-purple-100 pb-4 relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8048e2] text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">Documents Required</h3>
                    <p className="text-xs text-purple-700 font-medium">100% paperless digital upload</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 relative z-10">
                  <div className="rounded-2xl border border-purple-100 bg-white/90 p-4 backdrop-blur-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      1. Identity Proof
                    </h4>
                    <p className="mt-1 text-sm text-slate-600">
                      {data.documentsRequired.identity.join(" / ")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-100 bg-white/90 p-4 backdrop-blur-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      2. Income Verification
                    </h4>
                    <p className="mt-1 text-sm text-slate-600">
                      {data.documentsRequired.income.join(" / ")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-100 bg-white/90 p-4 backdrop-blur-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      3. Residence Proof in {data.city}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600">
                      {data.documentsRequired.address.join(" / ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 STEPS APPLICATION JOURNEY */}
        <section className="relative z-10 bg-slate-900 text-white py-16 overflow-hidden">
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-purple-600/20 blur-[100px]" />
          
          <div className="container relative z-10 mx-auto px-4 max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3.5 py-1 text-xs font-bold uppercase text-purple-300 mb-3">
                Digital Process
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Apply in 3 Simple Steps
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8048e2] text-lg font-bold text-white mb-4 shadow-md">
                  1
                </div>
                <h3 className="font-bold text-base text-white">Fill Application Form</h3>
                <p className="mt-2 text-xs text-purple-100/80 leading-relaxed">
                  Enter basic personal, mobile, and employment details in under 2 minutes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8048e2] text-lg font-bold text-white mb-4 shadow-md">
                  2
                </div>
                <h3 className="font-bold text-base text-white">Instant Verification</h3>
                <p className="mt-2 text-xs text-purple-100/80 leading-relaxed">
                  Complete online Aadhaar OTP e-KYC and upload bank statement for automated evaluation.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8048e2] text-lg font-bold text-white mb-4 shadow-md">
                  3
                </div>
                <h3 className="font-bold text-base text-white">Direct Bank Disbursal</h3>
                <p className="mt-2 text-xs text-purple-100/80 leading-relaxed">
                  Sign digital loan agreement and receive loan funds directly in your bank account.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link to="/user/apply">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#8048e2] px-8 text-sm font-bold text-white transition-all duration-200 hover:bg-[#6d28d9] shadow-[0_4px_14px_rgba(128,72,226,0.35)] cursor-pointer">
                  Start Application Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="relative z-10 bg-white py-16 text-slate-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions ({data.city})
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Got questions about personal loans in {data.city}? We have answers.
              </p>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white transition overflow-hidden shadow-2xs"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 text-sm md:text-base focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-purple-600 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM BANNER */}
        <section className="relative z-10 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 py-12 text-white overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Get Personal Loan Sanctioned in {data.city} Today
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-purple-100 text-sm md:text-base">
              Fast, transparent, and secure online loan application for salaried professionals.
            </p>
            <div className="mt-6">
              <Link to="/user/apply">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-9 text-base font-bold text-purple-900 transition-all duration-200 hover:bg-purple-50 shadow-lg cursor-pointer">
                  Apply Online Now
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
