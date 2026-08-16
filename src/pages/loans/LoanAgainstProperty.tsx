import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  IndianRupee,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  HelpCircle,
  ChevronDown,
  Check,
  Home,
  Building2,
  ArrowRightLeft,
  UserCheck
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function LoanAgainstProperty() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Loan Against Property?",
      a: "A secured loan where you pledge a residential, commercial, or industrial property as collateral, while retaining ownership and use of the property throughout repayment."
    },
    {
      q: "2. What is the Loan Against Property Eligibility Criteria?",
      a: "Salaried applicants need to be 21–58 years old with a minimum income of ₹25,000/month and a Credit Score of 700+; self-employed applicants need 3+ years of business vintage and ₹10 Lakhs+ annual turnover."
    },
    {
      q: "3. What documents are required?",
      a: "Identity proof, address proof, income documents, and property documents such as the Sale Deed and Property Tax Receipt."
    },
    {
      q: "4. What is the Loan Against Property interest rate?",
      a: "Rates generally range from 10.49% to 24% p.a., depending on your credit profile, loan amount, and tenure."
    },
    {
      q: "5. What is the Loan Against Property EMI, and how is it calculated?",
      a: "Your EMI depends on loan amount, interest rate, and tenure — use our EMI Calculator for an instant breakdown."
    },
    {
      q: "6. What is the maximum Loan Against Property tenure?",
      a: "Repayment tenure ranges from 5 to 20 years."
    },
    {
      q: "7. How much can I borrow against my property?",
      a: "Typically between 60% and 75% of your property's current market value, based on the Loan-to-Value ratio and your overall financial profile."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "@id": "https://waqtmoney.com/#organization",
      "name": "Waqt Money",
      "alternateName": "Waqt Finance Pvt Ltd",
      "url": "https://waqtmoney.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://waqtmoney.com/waqt-money-logo-imgg.png",
        "width": 180,
        "height": 50
      },
      "description": "Waqt Money is an RBI-compliant digital lending platform facilitating personal loans, payday loans, short term loans, business loans, and loan against property through registered NBFC partners.",
      "telephone": "+91-9217086608",
      "email": "support@waqtmoney.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H-15, Sector 63",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9217086608",
        "email": "support@waqtmoney.in",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Hindi"]
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LoanOrCredit",
      "@id": "https://waqtmoney.com/loans/loan-against-property#product",
      "name": "Waqt Money Loan Against Property",
      "alternateName": ["Mortgage Loan", "Property Loan", "Secured Loan Against Property"],
      "loanType": "Loan Against Property",
      "description": "A secured Loan Against Property (LAP) in India that lets you unlock funds against your residential, commercial, or industrial property without selling it. Apply online with Waqt Money for high loan-to-value, transparent charges, and flexible tenure of up to 20 years.",
      "url": "https://waqtmoney.com/loans/loan-against-property",
      "currency": "INR",
      "loanTerm": {
        "@type": "QuantitativeValue",
        "minValue": 60,
        "maxValue": 240,
        "unitCode": "MON",
        "description": "5 to 20 years repayment tenure"
      },
      "annualPercentageRate": {
        "@type": "QuantitativeValue",
        "minValue": 10.49,
        "maxValue": 24,
        "unitCode": "P1",
        "unitText": "% per annum"
      },
      "loanToValue": {
        "@type": "QuantitativeValue",
        "minValue": 60,
        "maxValue": 75,
        "unitText": "% of property's current market value"
      },
      "feesAndCommissionsSpecification": "Processing fee of 1%–2% of loan amount plus applicable taxes. All charges are disclosed before acceptance of the loan offer.",
      "requiredCollateral": "Residential, commercial, or industrial property pledged as collateral. Borrower retains ownership and use of the property throughout repayment.",
      "provider": {
        "@type": "Organization",
        "@id": "https://waqtmoney.com/#organization",
        "name": "Waqt Money",
        "url": "https://waqtmoney.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Salaried individuals (age 21–58, income ₹25,000+/month, credit score 700+) and self-employed/business owners (age 25–65, 3+ years vintage, ₹10L+ annual turnover)"
      },
      "eligibilityToApply": "Salaried: Age 21–58 years, minimum ₹25,000/month income, credit score 700+, 2–3 years work experience. Self-employed: Age 25–65 years, minimum 3 years business vintage, ₹10 Lakhs+ annual turnover, credit score 700+. Property documents required: Title Deed, Sale Deed, Approved Building Plan, Property Tax Receipts, Encumbrance Certificate."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://waqtmoney.com/loans/loan-against-property#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Loan Against Property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Loan Against Property (LAP) is a secured loan where you pledge a residential, commercial, or industrial property as collateral to a financial institution. You retain full ownership and use of the property throughout the repayment period. It is also known as a Mortgage Loan or Property Loan."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Loan Against Property eligibility criteria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For salaried applicants: Age 21–58 years, minimum monthly income of ₹25,000, credit score of 700+, and 2–3 years of work experience. For self-employed applicants: Age 25–65 years, minimum 3 years of continuous business operations, annual turnover of ₹10 Lakhs or more, and a credit score of 700+."
          }
        },
        {
          "@type": "Question",
          "name": "What documents are required for a Loan Against Property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Personal KYC: Aadhaar Card, PAN Card, Passport or Voter ID, and address proof. Income documents: Salaried applicants need 3 months salary slips, 6 months bank statement, and Form 16. Self-employed applicants need 2–3 years ITR with computation and audited financials. Property documents: Title Deed or Sale Deed, Approved Building Plan, latest Property Tax Receipts, and Encumbrance Certificate."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Loan Against Property interest rate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Loan Against Property interest rate generally ranges from 10.49% to 24% per annum, depending on your credit profile, loan amount, tenure, and the lending NBFC partner's assessment."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Loan Against Property EMI, and how is it calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your EMI (Equated Monthly Instalment) depends on three factors: loan amount, interest rate, and repayment tenure. Use the Waqt Money EMI Calculator at https://waqtmoney.com/emi-calculator for an instant, accurate breakdown of your monthly repayment."
          }
        },
        {
          "@type": "Question",
          "name": "What is the maximum Loan Against Property tenure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The repayment tenure for a Loan Against Property ranges from 5 years to 20 years, offering flexibility to manage EMIs according to your repayment capacity."
          }
        },
        {
          "@type": "Question",
          "name": "How much can I borrow against my property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can typically borrow between 60% and 75% of your property's current market value, based on the Loan-to-Value (LTV) ratio. The final amount also depends on your financial profile, income, credit score, and the lending partner's assessment."
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
          "item": "https://waqtmoney.com"
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
          "name": "Loan Against Property",
          "item": "https://waqtmoney.com/loans/loan-against-property"
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Loan Against Property in India | Waqt Money"
        description="Apply Loan Against Property Online with Waqt Money — a secured Mortgage Loan and Property Loan with high loan-to-value, transparent charges, and flexible tenure."
        keywords="Loan Against Property in India, Loan Against Property Online, Mortgage Loan, Property Loan, Secured Loan Against Property, Business Loan Against Property, Residential Property Loan, Commercial Property Loan"
        canonicalUrl="https://waqtmoney.com/loans/loan-against-property"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen text-slate-800">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-4 py-3 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            </li>
            <li className="before:content-['/'] before:mr-2">
              <Link to="/services" className="hover:text-purple-600 transition-colors">Loans</Link>
            </li>
            <li className="before:content-['/'] before:mr-2 text-slate-800 font-medium" aria-current="page">
              Loan Against Property
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
            <Home className="h-3.5 w-3.5" /> High LTV Secured Finance
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Loan Against Property in India
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A Loan Against Property in India lets you unlock funds against your residential or commercial property without selling it. Apply Loan Against Property Online with Waqt Money and access a Secured Loan Against Property with transparent charges, a straightforward digital process, and repayment terms structured around your actual capacity to repay.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
        </section>

        {/* Snapshot Cards */}
        <section className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Loan-to-Value (LTV)</p>
              <p className="text-xl font-bold text-slate-900 mt-1">60% - 75%</p>
              <p className="text-[11px] text-purple-600 font-medium mt-0.5">Of property market value</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Interest Rate</p>
              <p className="text-xl font-bold text-purple-600 mt-1">10.49% - 24% p.a.</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Based on credit profile</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tenure</p>
              <p className="text-xl font-bold text-slate-900 mt-1">5 - 20 Years</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Flexible repayment</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Processing Fee</p>
              <p className="text-xl font-bold text-slate-900 mt-1">1% - 2%</p>
              <p className="text-[11px] text-slate-500 mt-0.5">+ Applicable taxes</p>
            </div>
          </div>
        </section>

        {/* What is a Loan Against Property? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What is a Loan Against Property?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              A Loan Against Property is a secured loan where a Property Owner pledges a residential, commercial, or industrial property to a bank or financial institution as security for a loan. As a form of Mortgage Loan, it allows you to raise significant capital without giving up ownership or occupancy of the property.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Unlike unsecured loans where borrowing power is limited strictly to your monthly income, a Property Loan considers both your property's value and your financial profile. This combination typically enables a higher Loan Amount, lower Interest Rates, and a longer Repayment Tenure than an unsecured Personal Loan can offer.
            </p>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="bg-slate-50 py-16 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Loan Against Property Eligibility Criteria
              </h2>
              <p className="text-slate-600 text-base">
                Eligibility is evaluated across two main categories: the applicant's financial profile and the property being pledged.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Salaried */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-purple-600" /> Salaried Individuals
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Age:</strong> 21 to 58 years (or retirement age).
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Income:</strong> Minimum ₹25,000 per month.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Credit Score:</strong> 700+ for optimal interest rates.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Work Experience:</strong> At least 2 to 3 years of total experience.
                  </li>
                </ul>
              </div>

              {/* Self-Employed */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" /> Self-Employed / Business Owners
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Age:</strong> 25 to 65 years.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Business Vintage:</strong> Minimum 3 years of continuous operations.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Turnover:</strong> Minimum ₹10 Lakhs annual turnover.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Credit Score:</strong> 700+ with audited financials.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Required Documents
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-bold text-slate-900 text-sm">Personal & KYC Documents:</p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Aadhaar Card, PAN Card, Passport, or Voter ID
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Current Address Proof (Utility Bill / Driving License)
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-900 text-sm">Income & Financial Proof:</p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Salaried: 3 months salary slips + 6 months bank statement + Form 16
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Self-Employed: 2-3 years ITR with computation + Audited Financials
                  </li>
                </ul>
              </div>

              <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-sm">Property Documents:</p>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Title Deed / Sale Deed / Conveyance Deed
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Approved Building Plan & Clearance Certificates
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Latest Property Tax Receipts
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    Encumbrance Certificate (EC)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-purple-600" />
              Loan Against Property vs Personal Loan
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-purple-900 text-white font-semibold">
                    <th className="py-3.5 px-5 w-1/4">Factor</th>
                    <th className="py-3.5 px-5 w-3/8">Loan Against Property</th>
                    <th className="py-3.5 px-5 w-3/8">Personal Loan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Collateral</td>
                    <td className="py-3.5 px-5 text-slate-600">Required (Residential/Commercial)</td>
                    <td className="py-3.5 px-5 text-slate-600">None (Unsecured)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Loan Amount</td>
                    <td className="py-3.5 px-5 text-slate-600">Higher — up to 60-75% property value</td>
                    <td className="py-3.5 px-5 text-slate-600">Lower — based on salary/income</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Interest Rate</td>
                    <td className="py-3.5 px-5 text-slate-600">Lower (10.49% - 24% p.a.)</td>
                    <td className="py-3.5 px-5 text-slate-600">Higher (12% - 36% p.a.)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Tenure</td>
                    <td className="py-3.5 px-5 text-slate-600">Longer (5 to 20 years)</td>
                    <td className="py-3.5 px-5 text-slate-600">Shorter (1 to 5 years)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="h-7 w-7 text-purple-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm transition overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 font-semibold text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50/80 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-purple-600" : ""}`} />
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
              Unlock the value of your property without selling it.
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Apply Loan Against Property Online with Waqt Money today for business expansion, education, or any major expense.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link to="/user/apply">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg">
                  Apply Now
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
