import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { CheckCircle2, ShieldCheck, Mail, Info, FileText } from "lucide-react";

export default function TermsConditions() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Waqt Money Terms & Conditions",
    "description": "Read the official Terms and Conditions of Waqt Money for instant personal and payday loans.",
    "url": "https://waqtmoney.com/terms-conditions"
  };

  return (
    <>
      <SEO
        title="Terms & Conditions - User Agreement"
        description="Review the official Terms and Conditions governing Waqt Money loan facilitation services. Learn about user eligibility, repayment structures, and defaults."
        keywords="terms and conditions, loan agreement terms, user agreement, Waqt Money credit rules"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              User Mandates
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Terms & <span className="text-purple-600">Conditions</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">Effective Date: 04 May 2026</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>
              Welcome to <strong>Waqt Money</strong> (operated under Waqt Finance Pvt Ltd). By accessing our website or applying for loan facilitation services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              1. Eligibility Criteria
            </h2>
            <p>
              To use our facilitation services, you must satisfy the following:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Must be a citizen and resident of India.</li>
              <li>Must be aged between 21 and 60 years at the time of application.</li>
              <li>Must have a stable monthly income credited directly to your bank account.</li>
              <li>Must hold valid KYC documents: PAN Card and Aadhaar Card.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-purple-600" />
              2. Facilitation & Sanctioning
            </h2>
            <p>
              Waqt Money acts as a technology intermediary matching borrowers with RBI-registered NBFC partners, including Waqt Finance Pvt Ltd. Loan approvals, principal amounts, interest rates, and disbursals are subject to verification check outcomes. The final loan terms will be provided to you in the official Sanction Letter and Loan Agreement.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              3. User Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide 100% accurate, complete, and truthful information during KYC and loan applications.</li>
              <li>Maintain full confidentiality of your OTPs, logins, and credentials.</li>
              <li>Use the credited loan amount strictly for lawful personal or business requirements.</li>
              <li>Repay the loan amount on or before the due date specified in the Loan Agreement.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-purple-600" />
              4. Default & Late Repayments
            </h2>
            <p>
              Failure to repay your loan on time may lead to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deductions of late fee charges as outlined in the loan agreement.</li>
              <li>Negative reporting to credit bureaus (CIBIL, Experian), lowering your future loan eligibility.</li>
              <li>Legal recovery procedures as authorized by RBI guidelines and Indian financial laws.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              5. Contact Us
            </h2>
            <p>
              For legal inquiries or clarifications regarding these terms, please contact us:
              <br />
              <strong className="text-slate-900">Email:</strong> support@waqtmoney.com
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}