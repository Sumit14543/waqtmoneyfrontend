import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, IndianRupee, Clock, ArrowRight, CheckCircle2, AlertTriangle, BookOpen, Scale, HelpCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function BusinessLoan() {
  const faqs = [
    {
      q: "What is a business loan, and how is it structured?",
      a: "A business loan is a financial credit facility designed to cover business operations, inventory purchases, payroll, machinery acquisition, or corporate expansion. It can be secured (backed by collateral) or unsecured (granted based on business revenues and turnover). At Waqt Money, our partner NBFCs offer unsecured loans to small and medium enterprises (SMEs) to meet working capital requirements without pledging assets."
    },
    {
      q: "What is the maximum business loan amount available?",
      a: "Eligible businesses can apply for working capital and business expansion loans up to ₹10,00,000, depending on their business vintage, annual turnover verified through GST returns, and overall credit risk profile."
    },
    {
      q: "What are the interest rates for business credit?",
      a: "Interest rates start from 14% per annum. The final interest rate is customized for each business based on parameters like debt-to-equity ratio, monthly turnover stability, industry sector risk, and credit histories."
    },
    {
      q: "What is the minimum turnover required to qualify?",
      a: "To qualify for a business loan, the applicant's business should have a minimum annual turnover of ₹10,00,000 verified through GST filings or audited financial records over the last 12 months."
    },
    {
      q: "Is collateral required for a Waqt Money Business Loan?",
      a: "No, our business credit facilities are unsecured. You do not need to pledge property, equipment, or other commercial assets to secure funding."
    },
    {
      q: "What documents are required to apply for business credit?",
      a: "Key documents include business PAN card, GST registration certificate, 12 months corporate bank account statements, PAN/Aadhaar cards of the promoters, and previous year's GST returns."
    },
    {
      q: "Can startups apply for a business loan at Waqt Money?",
      a: "Our lending partners require a minimum business vintage of 1 year. Startups that have completed 12 months of active operations with continuous banking transactions are eligible to apply."
    },
    {
      q: "Are there any foreclosure or prepayment penalties?",
      a: "Prepayment and foreclosure rules are governed by the loan agreement signed with our partner NBFC. Most partners allow prepayment after a set lock-in period, with minimal processing fees or zero charges for MSMEs."
    },
    {
      q: "How does my personal credit score affect the business loan?",
      a: "For sole proprietorships and partnership firms, the personal credit scores of the owners are highly critical. A high personal CIBIL score (above 700) combined with strong business transactions significantly improves approval odds and interest rates."
    },
    {
      q: "How quickly are the funds disbursed after approval?",
      a: "Upon complete document verification and e-signing of the digital loan contract, business loan amounts are disbursed directly to your corporate current bank account within 24 to 72 business hours."
    },
    {
      q: "What can I use the business loan funds for?",
      a: "The funds can be used for any legitimate commercial purposes, such as buying stock, purchasing raw materials, hiring personnel, upgrading equipment, renting new retail premises, or launching promotional campaigns."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Business Loan",
      "description": "Unlock collateral-free business loans up to ₹10,00,000. Low interest rates, fast digital verification, and flexible repayment tenures for small businesses and MSMEs.",
      "url": "https://waqtmoney.com/loans/business-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "1000000"
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
        title="Unsecured Business Loans for MSMEs - Quick Capital Online"
        description="Expand your operations with unsecured business loans up to ₹10,00,000. Enjoy competitive rates starting at 14% p.a. and fast digital approval with no collateral required."
        keywords="business loan online, unsecured business credit, small business loan, MSME loans India, working capital loans, no collateral credit"
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
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-5">
              MSME Capital & Growth
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Unsecured Business Loans to Fuel <span className="text-purple-600">Your Corporate Growth</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Empower your enterprise with flexible working capital loans up to ₹10,00,000. Get quick disbursals, minimal documentation, and transparent interest rates with zero collateral requirements.
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
            <h2 className="text-xl font-bold text-slate-900 mb-6">Business Loan Terms</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Credit Limit</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to ₹10,00,000</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-lg font-bold text-purple-700 mt-1">From 14% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Min Vintage</p>
                <p className="text-lg font-bold text-purple-700 mt-1">1 Year Active</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Collateral</p>
                <p className="text-lg font-bold text-purple-700 mt-1">None Required</p>
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
                Unsecured Business Credit: The Engine of MSME Expansion
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                In a dynamic commercial landscape, timing is everything. Access to quick, unsecured business credit can make the difference between securing a lucrative contract or missing a critical growth window. Unsecured business credit is specifically designed to provide operating liquidity to registered businesses without requiring the pledge of expensive assets like industrial machinery, commercial property, or gold.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Unlike traditional commercial banking loans which demand extensive physical audits, balance sheet appraisals, and long approval cycles, digital business credit evaluates the health of your enterprise through transaction velocity, GST filings, and prompt credit histories. This ensures that micro, small, and medium enterprises (MSMEs) can navigate inventory cycles, client payout delays, and operational upgrades without friction.
              </p>
            </div>

            {/* Why Choose Waqt Money */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Why Partner with Waqt Money for Your Enterprise Capital?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Waqt Money coordinates with leading RBI-licensed NBFC partners, including <strong>Waqt Finance Pvt Ltd</strong>, to provide fast working capital access. We offer a streamlined application portal optimized for business promoters, eliminating the need to compile voluminous folders of files.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>GST-Integrated Validation:</strong> Secure digital integrations analyze your GST returns automatically for faster risk modeling.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>No Collateral Hurdles:</strong> We evaluate the cash flow potential of your operations rather than asset values, leaving your assets unencumbered.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Transparent Corporate Terms:</strong> Enjoy competitive rates starting at 14% p.a. with zero hidden fees. Processing parameters are detailed before final agreement execution.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Direct Current Account Disbursal:</strong> Loan values are pushed directly to your corporate current account to ensure immediate application of capital.</p>
                </div>
              </div>
            </div>

            {/* Interest Rates & Fees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Factual Interest Rates and Cost Structure</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Maintaining corporate cash flows requires strict monitoring of debt costs. Business loan interest rates start from <strong>14% per annum</strong>. The precise rate assigned is tailored based on factors like the business sector, annual turnover stability, company structure (proprietorship, partnership, or private limited), and the credit scores of the key promoters. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                A processing fee of 2% to 4% is applied to cover regulatory compliance checks, banking verification processes, and credit risk evaluations.
              </p>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Key Pitfalls to Avoid in Business Credit Management
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Managing corporate credit requires diligence. Keep these tips in mind to protect your credit profile:
              </p>
              <ul className="space-y-3 text-sm text-slate-600 pl-4 list-decimal">
                <li><strong>Mixing Personal and Business Expenses:</strong> Always route loan disbursements and repayments through your corporate current account rather than personal savings to maintain clear audit records.</li>
                <li><strong>Overestimating Cash Inflow Cycles:</strong> Align repayment EMI dates with your average receivables collection timelines rather than theoretical sales projections to prevent payment defaults.</li>
                <li><strong>Ignoring Debt-to-Revenue Thresholds:</strong> Your total monthly debt obligations should not exceed 30% of your average net operating cash flows.</li>
                <li><strong>Failing to Maintain Accurate GST Records:</strong> Frequent delays in GST filings reflect poorly on operational stability and may result in immediate credit rejections.</li>
              </ul>
            </div>

            {/* Responsible Borrowing */}
            <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                Responsible Commercial Lending
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Waqt Money advocate for clean corporate lending practices. Unsecured credit should always be channeled directly into growth-oriented business operations—such as inventory restocking, capital upgrades, or market expansions—which generate active returns. Avoid utilizing short-term commercial credit to pay off chronic operating losses. Set up automatic bank clearing (NACH mandates) to guarantee EMIs are debited automatically, building your corporate credit rating for larger credit lines.
              </p>
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Why MSMEs Choose Waqt Money</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Digital KYC Flow</h3>
                <p className="mt-2 text-sm text-slate-600">Complete verification online. No need to visit branches or present physical binders.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <IndianRupee className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Unencumbered Assets</h3>
                <p className="mt-2 text-sm text-slate-600">Keep your equipment, property, and inventory free of liens and security pledges.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Fast Approvals</h3>
                <p className="mt-2 text-sm text-slate-600">Keep inventory and supply chains moving with fast loan disbursals directly to your current account.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Eligibility and Documentation Criteria</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Minimum Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Active business vintage of at least 1 year.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Minimum annual turnover of ₹10,00,000.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Active GST registration (where applicable).
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Mandatory Verification Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Business Registration Proof (GST Certificate, MSME Udyam, or Partnership Deed).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Company and Promoter PAN Cards.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  12 months corporate bank account statements in PDF format.
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
              Business Loan Frequently Asked Questions
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
