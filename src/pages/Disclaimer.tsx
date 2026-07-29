import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Mail } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer - Terms of Facilitation Services"
        description="Read the Waqt Money official disclaimer. Learn about our relationship with NBFC partners, loan sanctioning terms, and platform representations."
        keywords="disclaimer, NBFC partner disclaimer, interest rate disclaimer, Waqt Money"
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Legal Declarations
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Website <span className="text-purple-600">Disclaimer</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">Last Updated: 19 July 2026</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl text-slate-700 space-y-6 text-sm leading-relaxed">
            <div className="flex gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 mb-6">
              <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600 mt-0.5" />
              <p className="text-xs">
                <strong>Attention Customers:</strong> Waqt Money is a digital platform facilitating instant loans. We do not directly issue loans or collect upfront advances. Review all credit terms carefully.
              </p>
            </div>

            <p>
              The information provided on the Waqt Money website (referred to as "Platform") is for informational and educational purposes only. It does not constitute formal financial counseling or credit guarantees.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">1. Credit Facilitation Services</h2>
            <p>
              Waqt Money operates as a technology facilitator and does not directly grant loans to customers. All loan sanctions, credit limits, interest rates, and loan disbursals are evaluated and approved solely at the discretion of our Reserve Bank of India (RBI) registered Non-Banking Financial Company (NBFC) partners:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>NBFC Partner:</strong> Waqt Finance Pvt Ltd</li>
              <li><strong>RBI License Registration No:</strong> B.10.00143</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2">2. Accuracy of Estimations</h2>
            <p>
              Any EMI calculations, APR charts, or interest estimates provided on the Platform are purely illustrative. Actual loan terms, applicable interest rates, processing fees, and payback dates are specified in the official Sanction Letter and Loan Agreement issued by the lending partner at the time of credit evaluation.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">3. Limitation of Liability</h2>
            <p>
              Waqt Money and its parent firm, Waqt Finance Pvt Ltd, shall not be held liable for any direct, indirect, incidental, or consequential losses arising out of the use of or inability to access the Platform or any delays in loan approvals resulting from server down-times, verification failures, or documentation mismatches.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">4. Contact Information</h2>
            <p>
              If you have any questions or require further clarifications regarding our services, please feel free to reach out to us:
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
