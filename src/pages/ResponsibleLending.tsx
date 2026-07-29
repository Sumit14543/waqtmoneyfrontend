import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Info, FileText, Landmark } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function ResponsibleLending() {
  return (
    <>
      <SEO
        title="Responsible Lending Practices - NBFC Code of Conduct"
        description="Learn about Waqt Money's commitment to responsible lending. Read about our RBI compliance, fair collection practices, APR transparency, and customer rights."
        keywords="responsible lending, fair recovery practices, CIBIL score details, NBFC code of conduct, RBI lending rules"
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Ethical Credit Code
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Responsible <span className="text-purple-600">Lending Practices</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">Committed to Ethical Financial Services</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>
              At <strong>Waqt Money</strong>, we strictly advocate for and follow <strong>Responsible Lending Practices</strong> in partnership with RBI-regulated Non-Banking Financial Companies (NBFCs), including our primary partner <strong className="text-slate-900">Waqt Finance Pvt Ltd (RBI Registration: B.10.00143)</strong>. We ensure that our customers are treated fairly, transparently, and respectfully at all stages of their borrowing journey.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-purple-600" />
              1. Full Transparency on Rates & Fees
            </h2>
            <p>
              We believe in complete transparency. Before you sign your loan agreement, we ensure you receive a clear breakdown of:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Annual Percentage Rate (APR):</strong> The complete annual cost of credit, including interest and processing fees.</li>
              <li><strong>Processing Fees:</strong> A one-time administrative fee deducted from the disbursal, with no hidden pre-payment demands.</li>
              <li><strong>Late Payment Charges:</strong> Specified clearly in the agreement with no hidden charges.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              2. Eligibility-Based Lending
            </h2>
            <p>
              We conduct thorough financial checks to ensure we do not over-extend credit. We analyze income stability, debt-to-income ratios, and credit histories before sanctioning. This protects borrowers from falling into debt traps.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-purple-600" />
              3. Fair Collection Practices
            </h2>
            <p>
              We treat our borrowers with dignity. Waqt Money and its partner institutions follow a strict Code of Conduct for loan recoveries:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>No threat, harassment, physical coercion, or abusive language is permitted.</li>
              <li>Recoveries are only carried out during standard working hours (9:00 AM to 6:00 PM).</li>
              <li>Repayment reminders are sent via verified digital channels (SMS, email, calls) in a polite manner.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              4. Credit Score Reporting
            </h2>
            <p>
              All active loans and repayments are reported directly to major credit bureaus (CIBIL, Experian, Equifax). Repaying your loans on time will actively build your credit score, while defaults will be reported and can negatively affect your future credit eligibility.
            </p>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-purple-900">
              <h3 className="font-bold text-sm">Customer Grievance Escalation</h3>
              <p className="mt-1 text-xs text-purple-950">
                If you encounter any unfair practices during the recovery or repayment process, please report it immediately to our Grievance Officer at <strong className="text-purple-700">grievance@waqtmoney.com</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
