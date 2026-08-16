import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  IndianRupee,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  HelpCircle,
  ChevronRight,
  Check,
  Building2,
  UserCheck,
  ArrowRightLeft,
  Info,
  XCircle
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function PaydayLoan() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [tenureDays, setTenureDays] = useState(30);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Daily interest 1% per day
  const dailyRate = 0.01;
  const totalInterest = Math.round(loanAmount * dailyRate * tenureDays);
  // Processing fee: 8% + 18% GST on processing fee
  const processingFee = Math.round(loanAmount * 0.08);
  const gstOnFee = Math.round(processingFee * 0.18);
  const totalRepayment = loanAmount + totalInterest + processingFee + gstOnFee;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "1. What is a Payday Loan?",
      a: "A Payday Loan is a short-term, unsecured Salary Advance Loan meant to help salaried individuals cover urgent expenses until their next salary is credited."
    },
    {
      q: "2. How much can I borrow with a Payday Loan?",
      a: "Waqt Money offers Payday Loans up to ₹1,00,000 (with ranges up to ₹2,00,000 for eligible profiles), depending on your monthly income and repayment capacity."
    },
    {
      q: "3. What is the repayment tenure for a Payday Loan?",
      a: "Tenures typically range from 15 to 45 days, aligned with your upcoming salary date."
    },
    {
      q: "4. What is the Payday Loan interest rate and fee structure?",
      a: "Interest is 1% per day, with a processing fee of 7% to 10% plus 18% GST on the fee."
    },
    {
      q: "5. What documents are required for a Payday Loan Online application?",
      a: "Aadhaar Card, PAN Card, recent salary slips, and 3 to 6 months of bank statements showing salary credits."
    },
    {
      q: "6. Can I get a Payday Loan with a low credit score?",
      a: "While credit history is evaluated, your regular salary credit and current repayment capacity play a significant role in approval."
    },
    {
      q: "7. How fast are Payday Loan funds disbursed?",
      a: "Once your application and verification are complete and you accept the agreement, funds are disbursed directly to your bank account."
    },
    {
      q: "8. Is a Payday Loan suitable for long-term borrowing?",
      a: "No. A Payday Loan is designed strictly for short-term financial gaps before payday. For multi-year needs, consider a Personal Loan or Business Loan."
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
      "description": "Waqt Money is an RBI-compliant digital lending platform facilitating instant personal loans, payday loans (salary advances), and business loans through registered NBFC partners.",
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
      },
      "knowsAbout": ["Payday Loans", "Personal Loans", "Business Loans", "Digital Lending", "MSME Financing"]
    },
    {
      "@context": "https://schema.org",
      "@type": "LoanOrCredit",
      "@id": "https://waqtmoney.com/loans/payday-loan#product",
      "name": "Waqt Money Payday Loan",
      "alternateName": "Salary Advance Loan",
      "loanType": "Payday Loan",
      "description": "Urgent cash before your next salary. Get a Payday Loan of up to ₹1,00,000 with minimal documents, fast digital verification, and direct bank disbursal. Designed for salaried employees.",
      "url": "https://waqtmoney.com/loans/payday-loan",
      "currency": "INR",
      "amount": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "minValue": 5000,
        "maxValue": 100000
      },
      "loanTerm": {
        "@type": "QuantitativeValue",
        "minValue": 15,
        "maxValue": 45,
        "unitCode": "DAY"
      },
      "annualPercentageRate": {
        "@type": "QuantitativeValue",
        "value": 1,
        "unitText": "% per day (flat daily charge)"
      },
      "feesAndCommissionsSpecification": "Processing fee of 7%–10% plus 18% GST on the processing fee. All charges are disclosed before loan offer acceptance.",
      "requiredCollateral": "None — Unsecured Loan",
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
        "audienceType": "Salaried employees aged 21–58 years with regular monthly salary"
      },
      "eligibilityToApply": "Indian resident aged 21–58 years. Regular monthly salary credited to a bank account. Requires Aadhaar Card, PAN Card, salary slips, and 3–6 months bank statements."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://waqtmoney.com/loans/payday-loan#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Payday Loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Payday Loan is a short-term, unsecured Salary Advance Loan meant to help salaried individuals cover urgent expenses until their next salary is credited."
          }
        },
        {
          "@type": "Question",
          "name": "How much can I borrow with a Payday Loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Waqt Money offers Payday Loans up to ₹1,00,000 (with ranges up to ₹2,00,000 for eligible profiles), depending on your monthly income and repayment capacity."
          }
        },
        {
          "@type": "Question",
          "name": "What is the repayment tenure for a Payday Loan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tenures typically range from 15 to 45 days, aligned with your upcoming salary date."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Payday Loan interest rate and fee structure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interest is 1% per day (flat daily charge), with a processing fee of 7% to 10% plus 18% GST on the fee. All charges are disclosed before you accept the loan offer."
          }
        },
        {
          "@type": "Question",
          "name": "What documents are required for a Payday Loan Online application?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aadhaar Card, PAN Card, recent salary slips, and 3 to 6 months of bank statements showing salary credits."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get a Payday Loan with a low credit score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While credit history is evaluated, your regular salary credit and current repayment capacity play a significant role in approval."
          }
        },
        {
          "@type": "Question",
          "name": "How fast are Payday Loan funds disbursed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Once your application and verification are complete and you accept the loan agreement, funds are disbursed directly to your bank account."
          }
        },
        {
          "@type": "Question",
          "name": "Is a Payday Loan suitable for long-term borrowing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. A Payday Loan is designed strictly for short-term financial gaps before payday. For multi-year needs, consider a Personal Loan or Business Loan."
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
          "name": "Payday Loan",
          "item": "https://waqtmoney.com/loans/payday-loan"
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Payday Loan Online – Quick Salary Advance Loan | Waqt Money"
        description="Need cash before your next salary? Apply Payday Loan Online with Waqt Money. Quick eligibility check, minimal documents, and a fast salary advance loan process."
        keywords="Payday Loan, Payday Loan Online, Payday Loan India, Salary Advance Loan, Instant Payday Loan, Payday Loan Apply Online, Payday Loan Eligibility, Payday Loan Interest Rate, Emergency Salary Loan"
        canonicalUrl="https://waqtmoney.com/loans/payday-loan"
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
              Payday Loan
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
            <Zap className="h-3.5 w-3.5" /> Instant Salary Advance
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Payday Loan Online
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Urgent cash before your next salary? Get a Payday Loan of up to ₹1,00,000, minimal documents, quick digital verification, and funds credited straight to your bank account.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/user/apply">
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#8048e2] px-7 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:bg-[#6d28d9] shadow-[0_4px_14px_rgba(128,72,226,0.35)] hover:shadow-[0_6px_20px_rgba(128,72,226,0.45)] hover:scale-[1.02] cursor-pointer">
                Apply Now
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Link>
            <a href="#estimator">
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
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Loan Amount</p>
              <p className="text-xl font-bold text-slate-900 mt-1">₹5,000 - ₹1,00,000</p>
              <p className="text-[11px] text-purple-600 font-medium mt-0.5">Based on salary profile</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Interest Rate</p>
              <p className="text-xl font-bold text-purple-600 mt-1">1.0% / day</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Flat daily charge</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tenure</p>
              <p className="text-xl font-bold text-slate-900 mt-1">15 - 45 Days</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Tied to payday</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Processing Fee</p>
              <p className="text-xl font-bold text-slate-900 mt-1">7% - 10%</p>
              <p className="text-[11px] text-slate-500 mt-0.5">+18% GST on fee</p>
            </div>
          </div>
        </section>

        {/* Repayment Estimator Slider */}
        <section id="estimator" className="container mx-auto px-4 py-12 max-w-4xl scroll-mt-24">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">Payday Loan Cost Estimator</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Estimate your single-payment total cost based on 1% per day interest rate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center pt-2">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-700">Loan Amount:</span>
                    <span className="text-purple-600 font-bold text-base">₹{loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={100000}
                    step={5000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹5,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-700">Tenure (Days):</span>
                    <span className="text-purple-600 font-bold text-base">{tenureDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={45}
                    step={1}
                    value={tenureDays}
                    onChange={(e) => setTenureDays(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>15 Days</span>
                    <span>45 Days</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 space-y-3">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Principal Amount:</span>
                  <span className="font-semibold text-slate-900">₹{loanAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Interest ({tenureDays} days @ 1%/day):</span>
                  <span className="font-semibold text-purple-700">₹{totalInterest.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Estimated Processing Fee (8% + GST):</span>
                  <span className="font-semibold text-slate-900">₹{(processingFee + gstOnFee).toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-3 border-t border-purple-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Total Due on Payday:</span>
                  <span className="text-xl font-extrabold text-purple-800">₹{totalRepayment.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[10px] text-slate-500 text-center pt-1">
                  *Estimates are for illustration. Final terms depend on verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Payday Loan? */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What is a Payday Loan?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              A Payday Loan is a short-term, unsecured loan meant to help salaried individuals manage expenses that come up before their next paycheck. Unlike a traditional personal loan that may run for years, a Payday Loan India product is designed for a much shorter window — typically a matter of weeks — and is repaid once your salary is credited.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Also referred to as a Salary Advance Loan, it works on a simple principle: you access cash now against the income you know is arriving soon. Because it is an Unsecured Payday Loan, you do not need to pledge assets or collateral. Instead, eligibility is linked to your regular employment and monthly salary credit.
            </p>
          </div>
        </section>

        {/* Key Features of Waqt Money Payday Loan */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Key Features of Waqt Money Payday Loan
            </h2>
            <p className="text-slate-600 text-base">
              Designed around your salary cycle for maximum transparency and speed:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <IndianRupee className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Loan Amount</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Borrow between ₹5,000 and ₹1,00,000 (up to ₹2,00,000 for top profiles), tailored to bridge short-term cash flow gaps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Short Tenure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Repayment window generally spans 15 to 45 days, matching your upcoming salary date.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Transparent Charges</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Processing fee between 7% and 10% plus 18% GST. Daily interest calculated transparently at 1% per day.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Minimal Documents</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Requires standard identity proof, address proof, salary slips, and recent bank statements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Fully Digital</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From Payday Loan Apply Online to verification and disbursal, the process is completed digitally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Payday Advance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Repaid in one lump sum when your salary is credited, avoiding multi-year EMI commitments.
              </p>
            </div>
          </div>
        </section>

        {/* Common Uses & Who Can Apply */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Common Uses */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" /> Common Uses for a Payday Loan
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Salary Advance Before Payday:</strong> Cover daily expenses when month-end funds run low.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Emergency Cash Requirements:</strong> Unplanned medical bills or household repair costs.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <strong>Covering Bills:</strong> Pay utility bills, credit card dues, or rent due before your salary arrives.
                  </li>
                </ul>
              </div>

              {/* Who Can Apply */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-purple-600" /> Who Can Apply?
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900">Salaried Employees</p>
                    <p className="text-xs text-slate-600">Working in corporate, public, or private companies with salary credited directly into a bank account.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900">Working Professionals</p>
                    <p className="text-xs text-slate-600">Anyone in stable employment looking for a short-term cash bridge before their next payday.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eligibility */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Payday Loan Eligibility</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Indian resident, generally between 21 and 58 years of age.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Regular monthly salary credited directly to a bank account.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Minimum monthly salary meeting lender requirements.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Standard credit check and income evaluation.
                </li>
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Required Documents</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Identity Proof:</strong> Aadhaar Card, PAN Card, Passport, or Voter ID.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Address Proof:</strong> Aadhaar Card, utility bills, or rental agreement.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Income Proof:</strong> Recent salary slips (1 to 3 months).
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  <strong>Bank Statement:</strong> 3 to 6 months showing salary credits.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="container mx-auto px-4 py-16 max-w-5xl space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-purple-600" />
              Payday Loan vs Personal Loan
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-purple-900 text-white font-semibold">
                    <th className="py-3.5 px-5 w-1/4">Feature</th>
                    <th className="py-3.5 px-5 w-3/8">Payday Loan</th>
                    <th className="py-3.5 px-5 w-3/8">Personal Loan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Loan Amount</td>
                    <td className="py-3.5 px-5 text-slate-600">₹5,000 to ₹1,00,000</td>
                    <td className="py-3.5 px-5 text-slate-600">₹50,000 to ₹5,00,000+</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Tenure</td>
                    <td className="py-3.5 px-5 text-slate-600">15 to 45 Days</td>
                    <td className="py-3.5 px-5 text-slate-600">12 to 60 Months</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Repayment Structure</td>
                    <td className="py-3.5 px-5 text-slate-600">Single payment on payday</td>
                    <td className="py-3.5 px-5 text-slate-600">Monthly EMIs over years</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-semibold text-slate-800">Best For</td>
                    <td className="py-3.5 px-5 text-slate-600">Urgent cash gap before salary</td>
                    <td className="py-3.5 px-5 text-slate-600">Large, planned expenses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                How to Apply for a Payday Loan Online
              </h2>
              <p className="text-slate-600 text-base">5 simple digital steps:</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">1</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Check Eligibility</h3>
                <p className="text-xs text-slate-600">Fill in basic personal and employment details.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">2</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Upload Documents</h3>
                <p className="text-xs text-slate-600">Provide Aadhaar, PAN, salary slips, and bank statements.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">3</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Digital Verification</h3>
                <p className="text-xs text-slate-600">Our system quickly verifies income and details.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">4</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Review Offer</h3>
                <p className="text-xs text-slate-600">Check loan amount, daily interest, fee, and due date.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-sm">5</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Disbursal</h3>
                <p className="text-xs text-slate-600">Funds transferred directly to your bank account.</p>
              </div>
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
                    <ChevronRight className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90 text-purple-600" : ""}`} />
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
              Apply for Your Payday Loan Today
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              Don't let a few days before salary hold you back. Apply Payday Loan Online with Waqt Money and get a transparent, quick Salary Advance Loan when you need it most.
            </p>
            <div className="pt-4 flex justify-center">
              <Link to="/user/apply">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg">
                  Apply Payday Loan Online
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
