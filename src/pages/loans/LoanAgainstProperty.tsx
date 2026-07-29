import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, IndianRupee, Clock, ArrowRight, CheckCircle2, AlertTriangle, BookOpen, Scale, HelpCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function LoanAgainstProperty() {
  const faqs = [
    {
      q: "What is a Loan Against Property (LAP), and how does it work?",
      a: "A Loan Against Property (LAP) is a secured credit facility where you pledge your residential, commercial, or industrial real estate asset as collateral. In exchange, the lending institution provides a loan equivalent to a percentage of the property's market value. You retain full ownership and usage rights of the property while repaying the loan."
    },
    {
      q: "What is the maximum loan amount I can obtain under LAP?",
      a: "At Waqt Money, through our RBI-registered lending partners, borrowers can access LAP facilities up to ₹50,00,000, depending on property valuations, title clearances, and verified repayment capacities."
    },
    {
      q: "What properties are accepted as collateral?",
      a: "Accepted properties include self-occupied residential houses, commercial offices, leased shops, open residential plots, and industrial buildings with clear, unencumbered titles. Agricultural land is generally not accepted."
    },
    {
      q: "What are the interest rates for a Loan Against Property?",
      a: "Because LAP is a secured credit facility, interest rates are significantly lower than unsecured personal loans. Our partner NBFCs offer interest rates starting from 9.5% per annum. The final rate depends on property parameters and the borrower's credit score."
    },
    {
      q: "What is the typical Loan-to-Value (LTV) ratio offered?",
      a: "The Loan-to-Value (LTV) ratio typically ranges from 50% to 70% of the property's verified market value, determined through a formal valuation conducted by the lending institution's certified appraisers."
    },
    {
      q: "What is the repayment tenure range for LAP?",
      a: "Repayment tenures are flexible and structured for long-term comfort, ranging from 1 year up to 10 years (120 months) depending on the loan size and the borrower's age profile."
    },
    {
      q: "Can self-employed professionals apply for LAP?",
      a: "Yes, LAP is highly optimized for self-employed professionals and business owners. It provides large-ticket credit based on business tax filings, audited financial sheets, and property valuations."
    },
    {
      q: "Are co-applicants mandatory for a Loan Against Property?",
      a: "Yes, all co-owners of the property must join the loan application as co-applicants. This ensures complete legal consent for asset pledging."
    },
    {
      q: "What documents are required to apply for LAP?",
      a: "Key documents include property ownership records (sale deed, chain deeds, mutation certificate, tax receipts), approved building layouts, KYC documents of all applicants, and 3 years IT returns or audited financial reports."
    },
    {
      q: "What happens if a borrower defaults on a Loan Against Property?",
      a: "LAP is a secured credit facility. In the event of persistent default and failure to repay, the lending institution holds the legal right to take possession of the pledged property and auction it to recover outstanding dues, in accordance with the SARFAESI Act."
    },
    {
      q: "How long does the loan approval and disbursal take?",
      a: "Because LAP requires physical property inspection, valuation, and legal title checks, the processing time is longer than unsecured loans, typically taking between 7 to 15 business days."
    },
    {
      q: "Can I apply for LAP if the property has an active loan?",
      a: "Yes, this is called a loan balance transfer. Our partner NBFCs can take over your existing loan and provide top-up funds, subject to property evaluations and repayment histories."
    },
    {
      q: "Are there prepayment or foreclosure charges for LAP?",
      a: "In compliance with RBI guidelines, zero prepayment or foreclosure fees apply to individual borrowers holding floating rate loans against property. Commercial or corporate entities may attract minimal charges."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Loan Against Property",
      "description": "Unlock secured loans up to ₹50,00,000 by pledging residential or commercial property. Competitive interest rates starting from 9.5% p.a., long tenures, and transparent approvals.",
      "url": "https://waqtmoney.com/loans/loan-against-property",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "5000000"
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
        title="Secured Loan Against Property (LAP) - Low Interest Rates"
        description="Unlock maximum value from your residential or commercial real estate. Apply for a Loan Against Property up to ₹50,00,000. Low rates from 9.5% p.a., flexible tenures up to 10 years."
        keywords="loan against property, LAP online, secured property loan, residential property loan, commercial property credit, mortgage loans India"
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
              Loan Against Property
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-5">
              Secured Asset Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Unlock Capital Against Your <span className="text-purple-600">Property's Value</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Pledge your residential or commercial property to secure long-term funding up to ₹50,00,000. Enjoy competitive interest rates starting at 9.5% p.a., flexible tenures, and expert legal valuations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/user/apply">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-700 w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/emi-calculator">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 w-full sm:w-auto">
                  Calculate EMIs
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Secured Loan Terms</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Loan Value</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to ₹50,00,000</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-lg font-bold text-purple-700 mt-1">From 9.5% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Tenure</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to 10 Years</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">LTV Ratio</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to 70% of Value</p>
              </div>
            </div>
          </div>
        </section>

        {/* In-depth Editorial Content Section */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-12">
            
            {/* Intro block */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Secured Property Credit: Unlocking Long-Term Asset Values
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                A Loan Against Property (LAP) is one of the most reliable secured financial instruments in the Indian banking landscape. It allows property owners to unlock long-term liquidity by pledging real estate assets as collateral. Because the loan is secured by real estate, lending institutions face lower credit risk, which translates to competitive interest rates and long repayment tenures.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                LAP is an optimal choice for large-ticket requirements—such as business expansions, financing international higher education, covering major medical procedures, or managing weddings. While the asset remains pledged, you retain full ownership and usage rights of the property throughout the loan tenure.
              </p>
            </div>

            {/* Why Choose Waqt Money */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Why Use Waqt Money for Your Mortgage Credit Requirements?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Waqt Money coordinates with RBI-registered lending partners, including <strong>Waqt Finance Pvt Ltd</strong>, to provide transparent, secured credit approvals. Our platform streamlines the complex legal and technical verification processes associated with property-backed loans.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Valuation Expertise:</strong> Enjoy fair property assessments conducted by certified real estate appraisers.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Flexible Long-Term Repayment:</strong> Structure your EMIs across tenures up to 10 years to fit your monthly budget.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Low Secured Rates:</strong> Access competitive interest rates starting at 9.5% p.a., significantly lower than unsecured personal credit.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Diverse Asset Acceptance:</strong> Pledge residential houses, commercial offices, leased retail shops, or open plots.</p>
                </div>
              </div>
            </div>

            {/* Interest Rates & Fees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Interest Rate Structures and Costs</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Secured credit costs depend on asset quality and the borrower's risk profile. Loan Against Property interest rates start from <strong>9.5% per annum</strong>. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                The final rate is customized based on parameters like property type, market demand, location, title clearance reports, and the CIBIL score of all co-owners. Additionally, one-time fees (for processing, legal audits, and technical inspections) are detailed in the sanction letter.
              </p>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Key Pitfalls to Avoid in Secured Borrowing
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Managing secured credit demands high discipline. Keep these tips in mind to protect your property:
              </p>
              <ul className="space-y-3 text-sm text-slate-600 pl-4 list-decimal">
                <li><strong>Borrowing Beyond Repayment Capacities:</strong> Secure only the amount you need. Pledging a high-value property does not justify borrowing an amount that stretches your monthly income.</li>
                <li><strong>Ignoring Title Encumbrances:</strong> Ensure your property has a clear, marketable title, free of legal disputes, family claims, or tax liabilities, before applying.</li>
                <li><strong>Excluding Co-Owners:</strong> All legal co-owners must be part of the loan application to prevent approvals delays.</li>
                <li><strong>Overlooking Default Consequences:</strong> Defaulting on a secured loan can result in legal recovery actions, potentially leading to the foreclosure and auction of your property.</li>
              </ul>
            </div>

            {/* Responsible Borrowing */}
            <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                Responsible Secured Lending Practices
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Waqt Money supports transparent and responsible borrowing. Secured credit should always be backed by a long-term repayment plan. Set up automated clearing (NACH mandates) to process payments automatically, safeguarding your property ownership and building a strong credit history.
              </p>
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Advantages of Secured Borrowing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Legal Security</h3>
                <p className="mt-2 text-sm text-slate-600">Your documents are handled with absolute confidentiality by legal experts.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <IndianRupee className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Higher Sanction Values</h3>
                <p className="mt-2 text-sm text-slate-600">Secure high loan amounts up to ₹50,00,000 based on property valuations.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Lower Interest Rates</h3>
                <p className="mt-2 text-sm text-slate-600">Enjoy lower interest rates by pledging property as collateral.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Eligibility & Required Property Documents</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Minimum Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Salaried or self-employed individuals with stable income.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Age range: 21 to 65 years.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Property ownership with clear, marketable title.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Required Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Property ownership documents: Sale Deed, Chain deeds, Tax receipts.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  ID and Address Proof of all owners and co-applicants.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Financial Records: Last 3 years ITR or corporate statements.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
              <HelpCircle className="h-6 w-6 text-purple-600" />
              LAP Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <h3 className="text-base font-semibold text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
