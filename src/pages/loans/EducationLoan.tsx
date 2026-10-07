import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Award,
  Wallet
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function EducationLoan() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is an Instant Education & Upskilling Loan?",
      a: "An Education Loan from Waqt Money is a short-term, paperless personal credit designed to cover college tuition, certification fees, vocational courses, exam fees, or study materials without waiting for salary day."
    },
    {
      q: "2. Who is eligible for an Education Loan?",
      a: "Salaried professionals, working students, and parents with a stable monthly income of ₹15,000+ and valid identity documents (PAN & Aadhaar) can apply."
    },
    {
      q: "3. What documents are required?",
      a: "Only your PAN Card, Aadhaar Card, course admission / fee slip (if applicable), and recent bank statements showing regular income."
    },
    {
      q: "4. What is the loan amount and tenure?",
      a: "You can borrow from ₹5,000 up to ₹1,00,000 with flexible repayment tenures from 30 days to 12 months based on your cash flow."
    },
    {
      q: "5. How quickly is the loan disbursed?",
      a: "Upon completing online digital KYC and verification, approved funds are transferred directly into your bank account within minutes."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LoanOrCredit",
      name: "Education & Skill Development Loan - Waqt Money",
      description: "Short-term education, course fee, and skill development loans for students and working professionals in India.",
      loanType: "Education Loan",
      currency: "INR",
      amount: {
        "@type": "MonetaryAmount",
        minValue: 5000,
        maxValue: 100000,
        currency: "INR",
      },
      provider: {
        "@type": "FinancialService",
        name: "Waqt Money",
        url: "https://waqtmoney.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://waqtmoney.com/" },
        { "@type": "ListItem", position: 2, name: "Loan Services", item: "https://waqtmoney.com/services" },
        { "@type": "ListItem", position: 3, name: "Education Loan", item: "https://waqtmoney.com/loans/education-loan" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9ff] font-sans text-slate-900">
      <SEO
        title="Instant Education Loan Online for Course Fees & Upskilling | Waqt Money"
        description="Cover semester fees, coaching classes, certification courses, or laptop expenses with an instant short-term education loan up to ₹1,00,000 from Waqt Money."
        canonicalUrl="https://waqtmoney.com/loans/education-loan"
        keywords="instant education loan, short term course fee loan, upskilling loan india, student emergency loan, waqt money education loan"
        schema={schema}
      />
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-3 text-sm text-slate-500 max-w-6xl" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="hover:text-purple-600 transition">Home</Link></li>
            <li><span>/</span></li>
            <li><Link to="/services" className="hover:text-purple-600 transition">Services</Link></li>
            <li><span>/</span></li>
            <li className="text-purple-600 font-semibold">Education Loan</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 max-w-6xl py-8 md:py-12">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-purple-100 shadow-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
              <GraduationCap className="h-4 w-4" />
              Career & Skill Growth Financing
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Instant Short-Term Education & Upskilling Loans in India
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Never let a fee deadline hold back your career growth. Whether you need funds for semester tuition, professional certifications, coaching institutes, or study equipment, Waqt Money provides fast, 100% paperless credit from ₹5,000 to ₹1,00,000.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link
                to="/user/apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:scale-105 transition shadow-lg shadow-purple-200"
              >
                Apply for Education Loan Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                RBI Registered NBFC Partner
              </span>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="container mx-auto px-4 lg:px-8 max-w-6xl py-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-purple-100">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Course & Tuition Fees</h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Pay college semester fees, exam registration charges, or online professional certification costs on time without waiting for salary day.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-purple-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">100% Digital KYC</h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Zero physical paperwork. Complete PAN, Aadhaar, and bank statement verification online in minutes with transparent RBI-compliant Key Fact Statements.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-purple-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Wallet className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Flexible Repayments</h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Choose convenient repayment tenures aligned with your monthly cash flow with zero hidden foreclosure penalties and clear schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="container mx-auto px-4 lg:px-8 max-w-6xl py-8">
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl p-8 border border-purple-100 shadow-md">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
                Eligibility Criteria
              </h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600 mt-2 shrink-0" />
                  <span>Indian citizen aged 21 to 58 years.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600 mt-2 shrink-0" />
                  <span>Salaried employee or working professional with regular monthly income of ₹15,000+.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600 mt-2 shrink-0" />
                  <span>Active bank account in India with Net Banking or UPI access.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-indigo-600" />
                Required Documents
              </h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  <span>PAN Card for identity verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  <span>Aadhaar Card linked with mobile number for paperless e-KYC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  <span>Last 3 months' bank statements showing regular salary credit.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 lg:px-8 max-w-6xl py-8">
          <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-purple-50 pb-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left font-semibold text-slate-900 hover:text-purple-600 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFaqIndex === index && (
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
