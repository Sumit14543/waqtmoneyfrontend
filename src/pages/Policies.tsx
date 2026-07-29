import React from "react";
import { Link } from "react-router-dom";
import { Lock, FileText, BadgeHelp, Scale, ShieldCheck, AlertTriangle } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

const policyDirectory = [
  {
    title: "Privacy Policy",
    desc: "Understand how we protect, process, and encrypt your personal and financial details.",
    link: "/privacy-policy",
    icon: Lock,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    title: "Terms & Conditions",
    desc: "Review rules, user agreements, and borrowing mandates for our credit services.",
    link: "/terms-conditions",
    icon: FileText,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    title: "Grievance Redressal",
    desc: "Check our structured resolution paths, officer details, and regulatory escalations.",
    link: "/grievance-redressal",
    icon: BadgeHelp,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    title: "Fair Practices Code",
    desc: "Learn about Waqt Money's ethical lending commitment and RBI partner compliances.",
    link: "/fair-practices-code",
    icon: Scale,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    title: "Responsible Lending",
    desc: "Read our borrower protection mandates, credit education guides, and code of conduct.",
    link: "/responsible-lending",
    icon: ShieldCheck,
    color: "text-orange-600 bg-orange-50 border-orange-100",
  },
  {
    title: "Disclaimer Policy",
    desc: "Read key declarations regarding our loan facilitation services and NBFC integrations.",
    link: "/disclaimer",
    icon: AlertTriangle,
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    title: "Refund & Cancellation",
    desc: "Review terms governing processing fees deductions and repayment return timelines.",
    link: "/refund-policy",
    icon: FileText,
    color: "text-rose-600 bg-rose-50 border-rose-100",
  }
];

export default function Policies() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Waqt Money Policies Directory Hub",
    "description": "Access all legal agreements, policies, grievance redressal paths, and disclaimers for Waqt Money services.",
    "url": "https://waqtmoney.com/policies"
  };

  return (
    <>
      <SEO
        title="Waqt Money Policies Hub - Legal & Compliance Documents"
        description="Access all official legal documents, privacy guidelines, customer grievance redressal procedures, refund policies, and lending terms for Waqt Money."
        keywords="loan policies, privacy guidelines, terms and conditions, fair practices, grievance officer, refund policy"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Corporate Governance
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Legal & <span className="text-purple-600">Compliance Hub</span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Waqt Money values transparency and compliance. Review our consumer terms, privacy parameters, grievance officers, and responsible lending guidelines.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {policyDirectory.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.title}
                  to={p.link}
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${p.color} mb-5`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-purple-600 group-hover:gap-1.5 transition-all">
                    Read Document
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
