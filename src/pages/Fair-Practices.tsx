import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { Scale, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function FairPracticesCode() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Waqt Money Fair Practices Code",
    "description": "Read the Fair Practices Code followed by Waqt Money in coordination with NBFC partner Waqt Finance Pvt Ltd.",
    "url": "https://waqtmoney.com/fair-practices-code"
  };

  return (
    <>
      <SEO
        title="Fair Practices Code - Ethical Lending Standards"
        description="Read the Waqt Money Fair Practices Code. Understand our commitment to transparent interest rates, fair collection guidelines, and ethical operations."
        keywords="fair practices code, ethical lending, customer rights India, NBFC recovery rules"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Regulatory Standards
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Fair Practices <span className="text-purple-600">Code</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">RBI Compliance & Borrower Rights Guidelines</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>
              At <strong>Waqt Money</strong> (operated under Waqt Finance Pvt Ltd), we follow a strict <strong>Fair Practices Code (FPC)</strong>. This code outlines our commitment to transparency, honesty, and ethical guidelines during customer loan evaluations, sanctioning, repayments, and collection procedures.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              1. Transparent Loan Assessment
            </h2>
            <p>
              All loan applications submitted online are assessed digitally. We ensure that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All interest rates, administrative processing fees, and terms are explained upfront.</li>
              <li>Official Sanction Letters are issued by our partner NBFC, outlining details of the credit facility.</li>
              <li>No changes in loan conditions can be applied retroactively without prior notice.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Scale className="h-5 w-5 text-purple-600" />
              2. Fair Recovery & Collection Practices
            </h2>
            <p>
              In alignment with RBI guidelines, Waqt Money is committed to ensuring that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>No physical threats, intimidation, or privacy violations are used during loan recovery.</li>
              <li>Recoveries are handled strictly by trained professionals between 9:00 AM and 6:00 PM.</li>
              <li>Reminders and notifications regarding payment delays are communicated respectfully.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              3. Equal Opportunity & Fair Valuation
            </h2>
            <p>
              We do not discriminate against applicants based on gender, race, caste, religion, or community. All applications are evaluated purely on financial stability, salary parameters, credit health, and eligibility scores.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">4. Grievances and escalation</h2>
            <p>
              For concerns regarding the Fair Practices Code compliance, please escalate directly to our Grievance Officer at <strong className="text-slate-900">support@waqtmoney.in</strong>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}