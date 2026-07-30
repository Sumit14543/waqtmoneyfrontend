import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { Mail, Clock, ShieldAlert, Award, FileText } from "lucide-react";

export default function GrievanceRedressal() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Waqt Money Grievance Redressal",
    "description": "Information about customer grievance redressal policy, grievance officer contacts, and escalation matrices at Waqt Money.",
    "url": "https://waqtmoney.com/grievance-redressal"
  };

  return (
    <>
      <SEO
        title="Grievance Redressal - Customer Complaints Policy"
        description="Read Waqt Money's Grievance Redressal Policy. Find contact details for our Grievance Redressal Officer and details on the escalation matrix."
        keywords="grievance officer, customer support complaints, NBFC grievance escalation, CIBIL dispute resolution"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Customer Protection
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Grievance <span className="text-purple-600">Redressal Policy</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500">Fast, transparent customer complaint resolutions</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>
              At <strong>Waqt Money</strong>, customer satisfaction is our top priority. We have established a structured Grievance Redressal Mechanism to ensure all complaints regarding loan facilitation, interest rates, repayments, or collections are resolved quickly and fairly.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Level 1 – Customer Support
            </h2>
            <p>
              For general queries, loan updates, or minor discrepancies, please contact our customer support team. Most issues are successfully resolved at this stage.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Support Email:</strong> support@waqtmoney.in</li>
              <li><strong>Operational Hours:</strong> 9:00 AM to 6:00 PM (Monday to Saturday, excluding public holidays)</li>
              <li><strong>Expected Resolution Time:</strong> 24 to 48 business hours</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-purple-600" />
              Level 2 – Grievance Redressal Officer
            </h2>
            <p>
              If your complaint is not resolved within 7 business days at Level 1, or if you are not satisfied with the resolution, you may escalate the issue to our dedicated Grievance Officer:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Officer Name:</strong> Grievance Officer – Waqt Money</li>
              <li><strong>Contact Email:</strong> support@waqtmoney.in</li>
              <li><strong>Address:</strong> Waqt Finance Pvt Ltd, H-15 BSI Business Park, H Block, Sector 63, Noida, Uttar Pradesh, India</li>
              <li><strong>Expected Resolution Time:</strong> Within 7 working days</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900 pt-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Level 3 – Escalation to NBFC Partners & RBI
            </h2>
            <p>
              If your grievance is not resolved within 30 days or if you disagree with the final outcome, you may approach the Principal Officer of our RBI-registered NBFC partner, <strong className="text-slate-900">Waqt Finance Pvt Ltd</strong>, or file a complaint with the RBI Ombudsman under the Integrated Ombudsman Scheme:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Partner NBFC Email:</strong> support@waqtfinance.com</li>
              <li><strong>RBI Ombudsman Portal:</strong> <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">https://cms.rbi.org.in</a></li>
            </ul>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-purple-900">
              <h3 className="font-bold text-sm">Tracking Complaints</h3>
              <p className="mt-1 text-xs text-purple-950">
                A unique Complaint Ticket ID will be shared with you via email when registering a complaint. Please quote this ticket number in all future correspondences.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}