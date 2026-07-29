import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, IndianRupee, Clock, ArrowRight, CheckCircle2, AlertTriangle, BookOpen, Scale, HelpCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function VehicleLoan() {
  const faqs = [
    {
      q: "What is a vehicle loan, and how is it structured?",
      a: "A vehicle loan is a secured credit facility designed to purchase new or pre-owned vehicles. The vehicle itself serves as collateral. The lender places a hypothecation mark on the vehicle registration card (RC) in their favor, which is removed once the loan is fully repaid."
    },
    {
      q: "What is the maximum vehicle loan amount I can apply for?",
      a: "At Waqt Money, through our RBI-registered lending partners, eligible borrowers can qualify for vehicle loans up to ₹8,00,000, covering up to 90% of the vehicle's on-road price (for new cars) or valuation amount (for pre-owned cars)."
    },
    {
      q: "What are the interest rates for vehicle loans?",
      a: "Interest rates start from 10.5% per annum. The final rate depends on credit history, income levels, vehicle model, and whether the vehicle is new or pre-owned."
    },
    {
      q: "Can I secure a loan for a pre-owned/used car?",
      a: "Yes, our partner NBFCs offer financing options for pre-owned cars. The vehicle must undergo a formal valuation by certified appraisers, and its age should typically not exceed 8 years at the end of the loan tenure."
    },
    {
      q: "What is the maximum tenure for auto financing?",
      a: "The repayment tenure is flexible, ranging from 1 year up to 5 years (60 months), allowing you to choose an EMI plan that fits your monthly budget."
    },
    {
      q: "What documents are required to apply for a vehicle loan?",
      a: "Key documents include your PAN Card, Aadhaar Card, driving license, last 3 months' salary slips or business tax filings, 6 months' bank statements, and the vehicle's proforma invoice or valuation report."
    },
    {
      q: "Is a driving license mandatory to apply for a vehicle loan?",
      a: "Yes, a valid driving license is a mandatory regulatory requirement for vehicle loans in India. It serves as proof of qualification to operate the asset being financed."
    },
    {
      q: "Are there any foreclosure or prepayment charges?",
      a: "Individual borrowers with floating-rate vehicle loans are exempt from foreclosure or prepayment charges under RBI guidelines. Corporate entities or fixed-rate loans may attract minimal fees."
    },
    {
      q: "How does hypothecation work, and how is it removed?",
      a: "Hypothecation means the vehicle remains in your possession, but the lender holds a legal claim on it. Once the loan is fully repaid, the lender issues a No Objection Certificate (NOC) and Form 35, which you submit to the RTO to remove the hypothecation from the RC."
    },
    {
      q: "Can I buy a vehicle from any dealer of my choice?",
      a: "Yes, you can purchase the vehicle from any authorized dealership in India. The disbursement is made directly to the dealer's bank account upon completion of the documentation."
    },
    {
      q: "What happens if a borrower defaults on a vehicle loan?",
      a: "Since the vehicle is pledged as collateral, persistent default on repayments may lead to the repossession of the vehicle by the lender to recover outstanding dues, in accordance with the loan agreement."
    },
    {
      q: "Is auto insurance mandatory during the loan tenure?",
      a: "Yes, comprehensive motor insurance with the lender's hypothecation clause is mandatory throughout the loan tenure to protect the asset against physical damage or theft."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Vehicle Loan",
      "description": "Finance your new or pre-owned car with vehicle loans up to ₹8,00,000. Low interest rates starting from 10.5% p.a., flexible tenures, and 90% funding.",
      "url": "https://waqtmoney.com/loans/vehicle-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "800000"
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
        title="Vehicle & Auto Loans Online - New & Used Car Finance"
        description="Get vehicle loans online up to ₹8,00,000. Low rates from 10.5% p.a., up to 90% funding, and flexible tenures. Finance new or pre-owned cars with a digital process."
        keywords="vehicle loan online, car finance, auto loan rates, pre owned car loan, new car loan, vehicle funding India"
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
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-5">
              Secure Auto Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Finance Your Journey with <span className="text-purple-600">Flexible Vehicle Loans</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Drive home your dream car or pre-owned vehicle with auto loans up to ₹8,00,000. Enjoy competitive interest rates starting at 10.5% p.a., up to 90% on-road funding, and flexible tenures.
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
            <h2 className="text-xl font-bold text-slate-900 mb-6">Vehicle Loan Terms</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Loan Value</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to ₹8,00,000</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-lg font-bold text-purple-700 mt-1">From 10.5% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Tenure</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to 5 Years</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Funding</p>
                <p className="text-lg font-bold text-purple-700 mt-1">90% of On-Road</p>
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
                Vehicle Finance: Navigating Auto Loans and Hypothecation
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                A vehicle loan is a secured installment credit product designed to facilitate the purchase of personal transportation, including new cars, pre-owned cars, or utility vehicles. The vehicle itself serves as collateral for the loan. The lender registers a hypothecation mark with the Regional Transport Office (RTO) on your registration card, which is removed once the loan is fully repaid.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                With options for up to 90% on-road funding, vehicle loans allow you to purchase a vehicle without depleting your savings. The repayment is structured over predictable Monthly Installments (EMIs), allowing you to plan your household budget without financial strain.
              </p>
            </div>

            {/* Why Choose Waqt Money */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Why Use Waqt Money for Your Auto Financing Needs?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Waqt Money coordinates with RBI-registered lending partners, including <strong>Waqt Finance Pvt Ltd</strong>, to provide transparent and efficient auto loan options. Our platform simplifies the verification and approval process, ensuring a smooth path to vehicle ownership.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Flexible Car Financing:</strong> Apply for financing options for new or pre-owned vehicles.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Valuation Services:</strong> Enjoy fair property assessments for pre-owned vehicles conducted by certified inspectors.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Low Interest Rates:</strong> Access competitive interest rates starting at 10.5% p.a., significantly lower than unsecured personal credit.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Direct Dealership Disbursal:</strong> Funds are sent directly to the dealership to ensure immediate vehicle delivery.</p>
                </div>
              </div>
            </div>

            {/* Interest Rates & Fees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Interest Rate Structures and Costs</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Auto credit costs depend on the vehicle model and the borrower's risk profile. Vehicle loan interest rates start from <strong>10.5% per annum</strong>. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                The final rate is customized based on parameters like the vehicle's market value, type (new or pre-owned), and the borrower's CIBIL score. Additionally, one-time fees (for processing, legal audits, and technical inspections) are detailed in the sanction letter.
              </p>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Key Pitfalls to Avoid in Vehicle Borrowing
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Managing auto credit demands high discipline. Keep these tips in mind to protect your vehicle ownership:
              </p>
              <ul className="space-y-3 text-sm text-slate-600 pl-4 list-decimal">
                <li><strong>Neglecting Pre-Owned Car Age Limits:</strong> Lenders typically do not finance vehicles that will be older than 8 years at the end of the loan tenure. Verify the vehicle's age before applying.</li>
                <li><strong>Ignoring Hypothecation Removal:</strong> Ensure you complete the hypothecation removal process with the RTO once the loan is fully repaid to secure unencumbered ownership.</li>
                <li><strong>Overlooking Insurance Requirements:</strong> Comprehensive motor insurance with the lender's hypothecation clause is mandatory throughout the loan tenure to protect the asset.</li>
                <li><strong>Failing to Maintain Accurate Records:</strong> Keep track of all payment receipts, NOC documents, and RTO filings to prevent issues during ownership transfers.</li>
              </ul>
            </div>

            {/* Responsible Borrowing */}
            <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                Responsible Auto Lending Practices
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Waqt Money supports transparent and responsible borrowing. Secured auto credit should always be backed by a long-term repayment plan. Set up automated clearing (NACH mandates) to process payments automatically, safeguarding your vehicle ownership and helping you build a strong credit history.
              </p>
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Advantages of Vehicle Financing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Protected Documents</h3>
                <p className="mt-2 text-sm text-slate-600">Your registration and insurance details are managed with absolute confidentiality.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <IndianRupee className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">High Funding LTV</h3>
                <p className="mt-2 text-sm text-slate-600">Secure up to 90% of the vehicle's on-road price to minimize downpayment strain.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Flexible Payback Terms</h3>
                <p className="mt-2 text-sm text-slate-600">Choose tenures up to 5 years (60 months) to optimize your monthly expenses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Eligibility & Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Minimum Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Indian citizen residing in India.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Age range: 21 to 60 years.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Valid Indian driving license is mandatory.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Required Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  PAN Card (Mandatory ID proof).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Driving License and Aadhaar Card (Address proof).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Income records: Last 3 months slips/ITR, and 6 months bank statement.
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
              Vehicle Loan Frequently Asked Questions
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
