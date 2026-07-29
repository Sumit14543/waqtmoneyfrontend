import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Info, FileText } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Refund & Cancellation Policy"
        description="Read the Refund and Cancellation Policy of Waqt Money. Understand terms regarding loan processing fees, transaction cancellations, and refunds."
        keywords="refund policy, cancellation policy, processing fees refund, Waqt Money policies"
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Company Guidelines
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Refund & Cancellation <span className="text-purple-600">Policy</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">Effective Date: 04 May 2026</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>
              At <strong>Waqt Money</strong> (operated under Waqt Finance Pvt Ltd), we value transparency and trust. This Refund & Cancellation Policy outlines the guidelines regarding cancellations of loan requests and refunds of any processing fees or repayments.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              1. Loan Application Cancellations
            </h2>
            <p>
              Borrowers can cancel their payday or personal loan request at any time prior to the e-signing of the final Loan Agreement and receipt of the Sanction Letter. Once the Loan Agreement is e-signed and the disbursal process is initiated by our NBFC lending partners, the application cannot be cancelled, and the borrower is bound to repay the principal amount along with interest as agreed.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-purple-600" />
              2. Processing Fees Terms
            </h2>
            <p>
              Waqt Money facilitates loan sanctioning services. Standard loan processing fees are charged by lending partners to cover administrative, verification, and KYC costs.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing fees are deducted directly from the disbursed loan amount.</li>
              <li>No upfront charges are demanded from customers before loan approvals.</li>
              <li>If a loan application is rejected by our NBFC partners during verification checks, no fees will be charged to the applicant.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              3. Duplicate or Erroneous Transactions
            </h2>
            <p>
              In the event that you make a duplicate repayment payment or pay an excess amount due to a technical glitch, please contact us immediately. Any excess payments verified by our accounts team will be refunded back to your source bank account within 5–7 working days.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              4. Contact Support
            </h2>
            <p>
              For refund status or queries, please email us with your transaction details and Loan Application ID at:
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
