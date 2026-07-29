import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, IndianRupee, Clock, ArrowRight, CheckCircle2, AlertTriangle, BookOpen, Scale, HelpCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function MedicalLoan() {
  const faqs = [
    {
      q: "What is a medical loan, and how does it work?",
      a: "A medical loan is an unsecured personal loan designed specifically to cover healthcare and medical emergency expenses. Because medical situations demand immediate attention, medical loans are structured with simplified digital verification procedures to ensure fast approvals and disbursals, either to the hospital or the borrower's bank account."
    },
    {
      q: "What is the maximum medical loan amount I can apply for?",
      a: "At Waqt Money, through our RBI-registered lending partners, eligible borrowers can qualify for medical emergency loans up to ₹6,00,000, depending on income levels and credit profile."
    },
    {
      q: "What are the interest rates for Waqt Money Medical Loans?",
      a: "Interest rates start from 11.0% per annum. The final rate depends on the applicant's credit score, income stability, and overall credit risk assessment conducted by the partner NBFC."
    },
    {
      q: "Can I apply for a medical loan if I have health insurance?",
      a: "Yes, you can apply for a medical loan to cover expenses not paid by your health insurance, such as insurance co-payments, pre-existing conditions clauses, cosmetic surgery costs, diagnostic tests, or critical pharmacy bills."
    },
    {
      q: "What procedures and medical expenses are covered?",
      a: "Medical loans can finance a wide range of procedures: major surgeries, critical care admissions, cancer treatments, dental implants, cosmetic surgeries, maternity packages, fertility treatments, and physical rehabilitation."
    },
    {
      q: "What documents are required to apply for a medical loan?",
      a: "Key documents include your PAN Card, Aadhaar Card, doctor's treatment estimate or hospital billing slip, last 3 months' salary slips or business tax filings, and 3 months' bank statements."
    },
    {
      q: "How quickly are medical loan funds disbursed?",
      a: "Medical emergencies require fast action. Once your digital application and hospital estimate are submitted, approvals can be granted in minutes, and disbursals to the hospital or your bank account are processed within 24 hours."
    },
    {
      q: "Is co-applicant signature required for emergency credit?",
      a: "For large loan amounts or if the primary applicant has a limited credit history, adding a family member with a stable income as a co-applicant can improve approval odds and speed up the process."
    },
    {
      q: "Are there foreclosure or prepayment fees for early repayment?",
      a: "No, individual borrowers holding floating-rate medical loans are exempt from prepayment or foreclosure charges. You can repay the outstanding balance as soon as you receive insurance reimbursements or personal funds."
    },
    {
      q: "Can I pay the hospital directly using the loan?",
      a: "Yes, our partner NBFCs can arrange direct bank transfers to the hospital's corporate account upon verification of the treatment estimate, ensuring a seamless transaction."
    },
    {
      q: "What happens if a borrower defaults on a medical loan?",
      a: "Since this is an unsecured credit facility, defaults will lower your CIBIL score, incur late payment penalties, and impact your future eligibility for credit. It is essential to choose a manageable EMI plan."
    },
    {
      q: "Can self-employed individuals apply for medical credit?",
      a: "Yes, self-employed individuals with stable business turnover and clean banking transactions can check eligibility and secure medical emergency credit lines."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Medical Loan",
      "description": "Secure emergency medical loans online up to ₹6,00,000. Fast approval, competitive interest rates starting at 11.0% p.a., and direct hospital disbursals.",
      "url": "https://waqtmoney.com/loans/medical-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "600000"
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
        title="Emergency Medical Loans Online - Fast Healthcare Finance"
        description="Cover emergency healthcare bills with medical loans up to ₹6,00,000. Low interest rates from 11.0% p.a., fast digital approvals, and direct-to-hospital payouts."
        keywords="medical loan online, emergency medical credit, healthcare loans India, hospital bill finance, surgery loans, paperless medical credit"
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
            <li>
              <Link to="/services" className="hover:text-purple-600 transition-colors">Loans</Link>
            </li>
            <li className="text-slate-800 font-medium" aria-current="page">
              Medical Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-5">
              Emergency Health Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Emergency Medical Loans to Fund <span className="text-purple-600">Your Healthcare Needs</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Cover emergency hospital bills, surgeries, or diagnostic procedures with medical loans up to ₹6,00,000. Get rapid approvals, flexible repayment options, and direct-to-hospital disbursals.
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
            <h2 className="text-xl font-bold text-slate-900 mb-6">Medical Loan Terms</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Credit Limit</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to ₹6,00,000</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-lg font-bold text-purple-700 mt-1">From 11.0% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Disbursal Speed</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Within 24 Hours</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Disbursal Type</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Direct to Hospital</p>
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
                Medical Credit: Financing Urgent Healthcare Needs
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                A medical loan is a specialized unsecured financial product designed to cover urgent medical expenses, hospital bills, surgeries, or diagnostic tests. Because healthcare situations demand immediate attention, medical loans are structured with simplified digital verification procedures to ensure fast approvals and disbursals.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Medical loans can be used to finance expenses not fully covered by your health insurance, such as co-payments, pre-existing conditions treatments, pharmacy bills, diagnostic procedures, or critical care hospital stays.
              </p>
            </div>

            {/* Why Choose Waqt Money */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Why Use Waqt Money for Your Emergency Medical Credit?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Waqt Money coordinates with RBI-registered lending partners, including <strong>Waqt Finance Pvt Ltd</strong>, to provide rapid, secure, and transparent medical credit approvals. Our platform simplifies the application and verification process to ensure prompt funding when you need it most.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Direct Hospital Payments:</strong> Funds can be disbursed directly to the hospital's corporate account to streamline transactions.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Rapid Approvals:</strong> Emergency situations demand immediate action. Check eligibility and get approvals in minutes.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Competitive Interest Rates:</strong> Access rates starting at 11.0% p.a. to manage emergency healthcare costs.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Flexible Repayment:</strong> Structure your EMIs across tenures to align with your monthly household budget.</p>
                </div>
              </div>
            </div>

            {/* Interest Rates & Fees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Interest Rate Structures and Costs</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Medical credit costs depend on the borrower's risk profile and income stability. Medical loan interest rates start from <strong>11.0% per annum</strong>. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                The final rate is customized based on parameters like the applicant's credit score, monthly salary, and repayment record. Additionally, one-time fees (for processing and documentation checks) are detailed in the sanction letter.
              </p>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Key Pitfalls to Avoid in Emergency Borrowing
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Managing emergency credit demands discipline. Keep these tips in mind to protect your financial profile:
              </p>
              <ul className="space-y-3 text-sm text-slate-600 pl-4 list-decimal">
                <li><strong>Borrowing Without Checking Insurance Approvals:</strong> Confirm the coverage details with your health insurance provider before applying for credit to secure only the required amount.</li>
                <li><strong>Ignoring Hospital Bill Estimates:</strong> Obtain a detailed treatment estimate from the hospital billing desk to apply for the correct loan size.</li>
                <li><strong>Excluding Co-Applicants:</strong> For large-ticket treatments, adding a family member with a stable income as a co-applicant can speed up approvals.</li>
                <li><strong>Overlooking Moratorium Terms:</strong> Review the payment due dates and terms to ensure payments are processed on time.</li>
              </ul>
            </div>

            {/* Responsible Borrowing */}
            <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                Responsible Healthcare Borrowing
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Waqt Money supports transparent and responsible borrowing. Medical credit should always be backed by a clear repayment plan. Set up automated clearing (NACH mandates) to process payments automatically, safeguarding your credit history and helping you build a healthy credit profile.
              </p>
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Advantages of Emergency Credit</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Protected Information</h3>
                <p className="mt-2 text-sm text-slate-600">Your health records and financial details are protected using secure encryption systems.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <IndianRupee className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Unsecured Process</h3>
                <p className="mt-2 text-sm text-slate-600">Get access to emergency credit lines without pledging collateral or personal assets.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Disbursal in 24 Hours</h3>
                <p className="mt-2 text-sm text-slate-600">Get approved online and secure funds in your account or hospital ledger within 24 hours.</p>
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
                  Stable income source with direct bank account deposits.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Required Documents</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Identity Proof: PAN Card (Mandatory).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Hospital Treatment Estimate or Billing Slip.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Last 3 months' salary slips/ITR and bank statement.
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
              Medical Loan Frequently Asked Questions
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
