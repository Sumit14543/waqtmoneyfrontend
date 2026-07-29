import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, IndianRupee, Clock, ArrowRight, CheckCircle2, AlertTriangle, BookOpen, Scale, HelpCircle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function CreditServices() {
  const faqs = [
    {
      q: "What is a credit score, and why is it important?",
      a: "A credit score (such as CIBIL, Experian, or Equifax) is a 3-digit numeric summary ranging from 300 to 900 that represents your creditworthiness. Lenders use this score to evaluate the risk of lending to you. A high score (above 750) increases your approval chances and helps you secure lower interest rates."
    },
    {
      q: "What services does Waqt Money offer for credit health?",
      a: "Waqt Money offers credit report analysis, soft credit score checks, and credit counseling services. We help you identify errors in your credit reports, understand the factors impacting your score, and design a personalized plan to improve your credit health."
    },
    {
      q: "Does checking my credit score on Waqt Money lower it?",
      a: "No, checking your score on our platform triggers a 'soft inquiry,' which has zero impact on your credit score. Hard inquiries, performed by lenders when you apply for credit, can temporarily lower your score."
    },
    {
      q: "How long does it take to improve my credit score?",
      a: "Improving a credit score is a gradual process. Depending on the complexity of your credit history, it typically takes between 3 to 6 months of consistent, positive credit behavior (such as timely EMI payments and low credit utilization) to see a significant improvement."
    },
    {
      q: "What are the main factors that determine my credit score?",
      a: "The main factors include payment history (timely repayments have the highest weight), credit utilization ratio (percentage of available credit used), credit history length, credit mix (secured vs. unsecured), and the frequency of hard inquiries."
    },
    {
      q: "How can I dispute errors on my CIBIL credit report?",
      a: "You can file a dispute directly through the official CIBIL online portal. If you utilize Waqt Money's counseling services, our experts can guide you through the documentation process to identify and flag incorrect entries."
    },
    {
      q: "Can settling a loan improve my credit score?",
      a: "No, settling a loan (paying less than the outstanding amount to close the account) leaves a 'Settled' remark on your credit report. This negatively impacts your CIBIL score. The best practice is to fully close accounts with a 'Closed' status."
    },
    {
      q: "What is a credit utilization ratio (CUR), and what is the ideal limit?",
      a: "The credit utilization ratio is the percentage of your total available credit limit that you utilize. It is recommended to keep your CUR below 30% to demonstrate responsible credit utilization."
    },
    {
      q: "Will closing old credit card accounts improve my score?",
      a: "Closing old credit cards can shorten your credit history length and reduce your total available credit limit, potentially increasing your credit utilization ratio. It is often beneficial to keep old accounts active if they have clean repayment histories."
    },
    {
      q: "How often are credit reports updated by credit bureaus?",
      a: "Credit bureaus typically receive updates from banks and financial institutions every 30 to 45 days. Any changes in your loan status or payments will reflect on your report after the next reporting cycle."
    },
    {
      q: "Can Waqt Money guarantee a specific score increase?",
      a: "No, score updates depend entirely on your credit behavior and the criteria set by credit bureaus. Waqt Money provides expert guidance, report analysis, and actionable steps, but the final outcome depends on your financial discipline."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Waqt Money Credit Advisory Services",
      "description": "Unlock credit score insights and expert advisory services. Access soft inquiries, dispute guidance, and credit counseling plans.",
      "url": "https://waqtmoney.com/loans/credit-services",
      "image": "https://waqtmoney.com/waqt-money-logo-img.png",
      "provider": {
        "@type": "Organization",
        "name": "Waqt Finance Pvt Ltd"
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
        title="Credit Counseling & Score Improvement Services"
        description="Monitor your credit health with Waqt Money. Check your soft CIBIL score with zero impact, analyze reports, and get expert guidance to improve your creditworthiness."
        keywords="credit score check, improve CIBIL score, credit counseling online, soft inquiry score, CIBIL dispute help, credit advisory services"
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
              Credit Services
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-5">
              Advisory & Credit Health
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Optimize Your Credit Profile with <span className="text-purple-600">Expert Advisory Services</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Understand the factors impacting your credit score. Check your CIBIL rating with zero impact, identify and resolve credit report errors, and implement actionable plans to secure credit options.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/user/apply">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition hover:bg-purple-700 w-full sm:w-auto">
                  Get Score Report
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/emi-calculator">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 w-full sm:w-auto">
                  Check Calculator
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Credit Advisory Elements</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Report Check</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Soft Inquiry (Free)</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Impact on Score</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Zero Score Impact</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Dispute Assistance</p>
                <p className="text-lg font-bold text-purple-700 mt-1">Full Documentation</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/50">
                <p className="text-xs text-slate-500 uppercase font-semibold">Target Score</p>
                <p className="text-lg font-bold text-purple-700 mt-1">CIBIL 750+</p>
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
                Credit Health Management: Navigating Scoring Models & CIBIL Bureau Reporting
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Your credit score is your primary financial identity. It is a 3-digit summary ranging from 300 to 900 that highlights your creditworthiness. A high score (above 750) increases your approval chances and helps you secure lower interest rates.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Maintaining credit health requires understanding how reporting systems work. Credit bureaus receive monthly updates from lending institutions, evaluating parameters like payment history, credit utilization, and hard inquiries. Implementing active, positive credit behavior is essential to securing financing options.
              </p>
            </div>

            {/* Why Choose Waqt Money */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Why Use Waqt Money for Your Credit Health Management?</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Waqt Money offers comprehensive credit advisory services. We help you identify errors in your credit reports, understand the factors impacting your score, and design a personalized plan to improve your credit health.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Soft Inquiry Checks:</strong> Check your credit rating on our platform with zero impact on your score.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Dispute Support:</strong> Access expert guidance to flag and resolve incorrect credit entries.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Comprehensive Auditing:</strong> Identify issues like duplicate accounts, wrong status remarks, and out-of-date records.</p>
                </div>
                <div className="flex gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-1">✓</span>
                  <p className="text-xs text-slate-600"><strong>Personalized Counseling:</strong> Work with loan experts to draft a long-term scoring optimization map.</p>
                </div>
              </div>
            </div>

            {/* Interest Rates & Fees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">The Financial Impact of Credit Scores</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Your credit rating directly impacts the cost of your loans. Lenders custom-price interest rates based on credit risk. Borrowers with CIBIL scores above 750 typically secure the lowest interest rates, whereas lower scores lead to higher rates or loan rejections. Maintaining a clean credit history is key to minimizing borrowing costs.
              </p>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Key Pitfalls to Avoid in Credit Management
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Managing credit requires discipline. Keep these tips in mind to protect your financial profile:
              </p>
              <ul className="space-y-3 text-sm text-slate-600 pl-4 list-decimal">
                <li><strong>Paying Only the Minimum Balance:</strong> Carrying outstanding credit card balances increases your credit utilization ratio and accrues high finance charges.</li>
                <li><strong>Filing Multiple Credit Applications:</strong> Multiple hard inquiries in a short period suggest credit hunger and can lower your credit rating.</li>
                <li><strong>Overlooking Co-Signed Loan Defaults:</strong> Co-signing a loan makes you equally responsible for repayments. Any default by the primary borrower will impact your credit rating.</li>
                <li><strong>Ignoring Credit Report Disputes:</strong> Check your credit reports regularly to ensure any errors are identified and resolved promptly.</li>
              </ul>
            </div>

            {/* Responsible Borrowing */}
            <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-600" />
                Responsible Credit Optimization
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Waqt Money supports transparent and responsible credit practices. Credit score improvement is a gradual process that depends on consistent, positive credit behavior. Set up automated clearing (NACH mandates) to process payments automatically, safeguarding your credit rating and building a healthy credit profile.
              </p>
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Advantages of Credit Monitoring</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Protected Reports</h3>
                <p className="mt-2 text-sm text-slate-600">Your credit reports and personal details are protected using secure encryption systems.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <IndianRupee className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Minimize Borrowing Costs</h3>
                <p className="mt-2 text-sm text-slate-600">A higher score helps you qualify for lower interest rates and reduced fee options.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Actionable Counseling</h3>
                <p className="mt-2 text-sm text-slate-600">Implement personalized optimization schedules designed by our credit experts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Eligibility & Required Information</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Minimum Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Must be an Indian citizen with active credit accounts.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Must have a valid PAN card.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Active mobile number registered with credit bureaus.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Required Details</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Full legal name and date of birth as on PAN.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  PAN Card number and registered mobile number.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                  Previous credit or loan accounts history details (for verification).
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
              Credit Services Frequently Asked Questions
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
