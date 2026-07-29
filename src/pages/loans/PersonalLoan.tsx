import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, IndianRupee, Clock, ArrowRight, CheckCircle2, AlertTriangle, BookOpen, Scale, HelpCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function PersonalLoan() {
  const faqs = [
    {
      q: "What is a personal loan, and how does it work?",
      a: "A personal loan is an unsecured installment credit facility offered by banks, NBFCs, or digital lending portals. Unlike a home or auto loan, it does not require you to pledge any security or assets. Once approved, the funds are disbursed directly to your bank account, and you repay the amount in fixed Monthly Installments (EMIs) consisting of principal and interest over an agreed term."
    },
    {
      q: "What is the maximum personal loan amount I can apply for?",
      a: "At Waqt Money, through our RBI-registered lending partners, salaried professionals can qualify for personal loans up to ₹5,00,000. The approved amount depends on your monthly income, debt-to-income ratio, employment history, and credit profile."
    },
    {
      q: "What are the typical interest rates for Waqt Money Personal Loans?",
      a: "Our partner lending institutions offer competitive interest rates starting from 12% per annum. The final rate depends on credit history, income levels, and overall credit risk assessments conducted by the NBFC partner."
    },
    {
      q: "Are there any hidden costs involved in the loan sanctioning?",
      a: "No, Waqt Money is committed to absolute transparency. All fees, including standard processing fees (typically 2% to 4% of the loan amount) and stamp duty, are deducted directly from the disbursed amount and clearly specified in your Sanction Letter."
    },
    {
      q: "Can self-employed individuals apply for personal loans?",
      a: "Currently, our personal loan facilities are optimized primarily for salaried professionals. However, self-employed individuals with audited financial statements and strong banking transactions can check eligibility for custom business credits."
    },
    {
      q: "How long does the loan approval and disbursal take?",
      a: "Once you submit your digital application and upload required KYC and income documents, initial approval can happen within minutes. Direct bank disbursal typically takes between 24 and 48 hours after e-signing the loan agreement."
    },
    {
      q: "Does applying for a personal loan affect my credit score?",
      a: "The initial eligibility check on Waqt Money is a soft inquiry and does not impact your credit score. However, once you submit a formal application, the lending partner performs a hard credit check, which may cause a minor, temporary dip in your score."
    },
    {
      q: "Can I pay off my personal loan early? Are there foreclosure charges?",
      a: "Yes, you can prepay or foreclose your loan before the end of the tenure. Foreclosure charges, if any, are governed by the specific terms of the lending partner and are clearly stated in your loan agreement. Many partners allow zero-fee foreclosure after a few successful EMI payments."
    },
    {
      q: "What happens if I miss an EMI payment?",
      a: "Missing an EMI will attract late payment penalties, additional bounce charges, and a negative mark on your credit report. This will lower your CIBIL score and make it difficult to secure loans or credit cards in the future."
    },
    {
      q: "Is a co-applicant required to secure a personal loan?",
      a: "No, co-applicants are not mandatory since this is an unsecured credit facility based on your personal income. However, having a co-applicant with a high credit score can improve approval chances if your credit history is limited."
    },
    {
      q: "What security do I need to pledge for a personal loan?",
      a: "None. Waqt Money personal loans are completely collateral-free. You do not need to pledge property, vehicles, jewelry, or financial assets to qualify."
    },
    {
      q: "What is the repayment tenure range?",
      a: "Repayment tenures are flexible and range from 3 months up to 36 months, allowing you to choose an EMI structure that aligns with your monthly financial budget."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money Personal Loan",
      "description": "Apply for instant personal loans online up to ₹5,00,000. Paperless KYC, low interest rates, and flexible repayment terms from 3 to 36 months.",
      "url": "https://waqtmoney.com/loans/personal-loan",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd",
        "logo": "https://waqtmoney.com/waqt-money-logo-img.png"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "500000"
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
        title="Instant Personal Loans Online - Fast Approval & Disbursal"
        description="Apply for an instant personal loan online up to ₹5,00,000. Get low-interest rates from 12% p.a. and flexible repayment tenures from 3 to 36 months. 100% paperless process."
        keywords="personal loan online, instant personal loan, low interest personal loan, quick loan approval, collateral free loan, salaried personal credit"
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
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-5">
              Unsecured Personal Credit
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Instant Personal Loans Tailored For <span className="text-purple-600">Your Financial Needs</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Unlock collateral-free personal loans of up to ₹5,00,000 to cover emergency bills, travel, weddings, home renovations, or other personal milestones. Experience a 100% digital process with immediate disbursals.
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
            <h2 className="text-xl font-bold text-slate-900 mb-6">Loan Features & Terms</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Max Loan Amount</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Up to ₹5,00,000</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Interest Rate</p>
                <p className="text-lg font-bold text-purple-700 mt-1">From 12% p.a.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Flexible Tenure</p>
                <p className="text-lg font-bold text-purple-700 mt-1">3 - 36 Months</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Disbursal Time</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Direct to Bank</p>
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
                Understanding Personal Loans: A Comprehensive Financial Resource
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                A personal loan is one of the most versatile financial tools available in the modern credit market. Because it is completely unsecured, you do not need to risk pledging personal assets like your home, vehicle, or gold investments to receive cash. Instead, banks and RBI-registered Non-Banking Financial Companies (NBFCs) evaluate your repayment capacity using income records, employment stability, and historical credit behavior (CIBIL score).
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Whether you are consolidate high-interest credit card debt, paying for an emergency medical procedure, funding higher education, or upgrading your home, a personal loan provides immediate liquidity. The repayment is structured over predictable Monthly Installments (EMIs), allowing you to plan your household budget without financial strain.
              </p>
            </div>

            {/* Why Choose Waqt Money */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Why Choose Waqt Money for Your Personal Credit needs?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Waqt Money operates as a premier digital loan facilitation platform in India, partnering exclusively with RBI-registered NBFCs such as <strong>Waqt Finance Pvt Ltd</strong>. We remove the operational bottlenecks traditionally associated with bank loans—no physical visits, no paper documentation, and no extensive follow-ups. Our platform uses state-of-the-art secure integrations to verify your credentials digitally, enabling initial approval decisions within minutes.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>100% Digital Process:</strong> Complete the application, verification, and e-signing of agreements from your smartphone.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Flexible EMIs:</strong> Choose repayment structures ranging from 3 to 36 months to match your pay cycle.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>No Hidden Charges:</strong> Every fee is disclosed upfront in your sanction letter. No prepayment penalties on verified terms.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Direct Disbursal:</strong> Once approved, the funds are instantly pushed to your validated bank account via secure gateways.</p>
                </div>
              </div>
            </div>

            {/* Interest Rates & Fees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Factual Interest Rates and Cost Structure</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Understanding the real cost of borrowing is essential to maintaining financial health. Personal loan interest rates are typically calculated as an Annual Percentage Rate (APR). At Waqt Money, interest rates start from <strong>12% per annum</strong>. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                The absolute rate assigned to your application depends on a risk assessment model. Salaried employees working in reputable corporate firms with a long history of prompt repayments and credit scores above 750 will secure the lowest interest tiers. In addition to interest, a one-time processing fee ranging between 2% and 4% is deducted from the loan amount to cover verification check operations.
              </p>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Common Mistakes to Avoid When Applying for a Personal Loan
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Borrowing responsibly requires awareness. To ensure a smooth approval and repayment cycle, avoid these common credit pitfalls:
              </p>
              <ul className="space-y-3 text-sm text-slate-600 pl-4 list-decimal">
                <li><strong>Applying at Multiple Platforms Simultaneously:</strong> Every loan application triggers a hard CIBIL inquiry. Multiple simultaneous checks suggest credit hunger and can lower your credit rating.</li>
                <li><strong>Falsifying Salary or Employment Records:</strong> Providing incorrect income documentation leads to immediate rejection and blacklisting across digital credit platforms.</li>
                <li><strong>Ignoring the Fine Print:</strong> Always review the loan agreement terms for bounce fees, prepayment conditions, and late payment interest rates before e-signing.</li>
                <li><strong>Over-Borrowing:</strong> Borrow only what you need. Calculate your monthly repayment EMIs using our calculator to ensure they do not exceed 40% of your net monthly take-home income.</li>
              </ul>
            </div>

            {/* Responsible Borrowing */}
            <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                Responsible Borrowing Advice
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Debt is an effective financial asset when managed with discipline. Always treat a personal loan as a firm commitment. Ensure you have a clear repayment plan in place before applying. Set up an Auto-Debit (NACH mandate) on your salary account to ensure EMIs are debited automatically on your salary date, protecting you from late payment penalties, CIBIL downgrades, and stressful recovery phone calls. Remember, a good credit record is your gateway to bigger financial opportunities in the future.
              </p>
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Why Choose Waqt Money Personal Loans?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">100% Secure Process</h3>
                <p className="mt-2 text-sm text-slate-600">Your details are protected using bank-grade encryption to ensure full confidentiality.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <IndianRupee className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Zero Collateral</h3>
                <p className="mt-2 text-sm text-slate-600">No security deposit or assets required to qualify for our personal loan options.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Instant Approvals</h3>
                <p className="mt-2 text-sm text-slate-600">Submit documents digitally and get approvals within minutes from our lending partners.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Loan Eligibility & Documentation</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Who Can Apply</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Salaried individuals residing in India.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Age limit: Between 21 and 58 years.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Stable monthly income credited directly to a bank account.
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
                  Address Proof: Aadhaar Card or utility bills.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Income Proof: 3 months salary slips & bank statements.
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
              Personal Loan Frequently Asked Questions
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
