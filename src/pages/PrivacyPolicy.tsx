import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";
import { ShieldCheck, Mail, Lock, Database, Users, Cookie, FileText, CheckCircle2 } from "lucide-react";

const sections = [
  {
    id: "information",
    icon: Database,
    title: "1. Information We Collect",
    points: [
      "Personal details like name, mobile number, email, PAN, Aadhaar, address, and date of birth.",
      "Financial details like monthly salary, employment record, bank account details, and requested loan size.",
      "Device data: IP address, device model, operating system, and website cookies for security."
    ],
  },
  {
    id: "usage",
    icon: Users,
    title: "2. How We Use Your Data",
    points: [
      "To verify your identity, evaluate loan eligibility, and process payday credit requests.",
      "To disburse loan amounts safely and communicate monthly payment schedules.",
      "To improve website systems, prevent fraud, and run security scans."
    ],
  },
  {
    id: "sharing",
    icon: ShieldCheck,
    title: "3. Data Sharing",
    points: [
      "We do not sell your personal data to advertising firms under any circumstances.",
      "Information is shared strictly with RBI-registered NBFC partner Waqt Finance Pvt Ltd, credit bureaus, and payment gateways for loan servicing.",
      "Only essential details required to complete your transactions are shared."
    ],
  },
  {
    id: "security",
    icon: Lock,
    title: "4. Data Security",
    points: [
      "We use industry-standard 256-bit SSL encryption to protect user data transfer.",
      "Information is stored securely with access control safeguards.",
      "While no platform is 100% secure, we continuously monitor systems to reduce risk."
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "5. Cookies & Tracking",
    points: [
      "We use cookies to save user settings and track website usage trends.",
      "You can configure your browser settings to block or manage cookies."
    ],
  },
  {
    id: "rights",
    icon: FileText,
    title: "6. Your Rights",
    points: [
      "You can request corrections or updates to your registered information.",
      "You have the right to withdraw your consent, subject to outstanding loan repayments."
    ],
  }
];

export default function PrivacyPolicy() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Waqt Money Privacy Policy",
    "description": "Understand how Waqt Money collects, uses, and secures your personal and financial information.",
    "url": "https://waqtmoney.com/privacy-policy"
  };

  return (
    <>
      <SEO
        title="Privacy Policy & Data Security"
        description="Read the Privacy Policy of Waqt Money. Learn how we handle your personal details, financial records, and keep your data safe using 256-bit encryption."
        keywords="privacy policy, data security, personal data protection, Waqt Money privacy"
        schema={schema}
      />
      <Navbar />

      <main className="bg-gradient-to-b from-white via-[#fbf9ff] to-white pt-24 min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-purple-700 mb-3">
              Data Security Commitment
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Privacy <span className="text-purple-600">Policy</span>
            </h1>
            <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
              We are committed to securing your financial data. Learn how we collect, process, and protect your information.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">On This Page</h2>
                <nav className="mt-3 space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-slate-600 hover:text-purple-700 transition"
                    >
                      {section.title.split(". ")[1]}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">Key Assurances</h2>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    No sale of user data
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    256-bit SSL encryption
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    RBI-NBFC aligned sharing
                  </li>
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {section.points.map((p, idx) => (
                        <li key={idx} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                          <span className="h-2 w-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">Have Privacy Concerns?</h3>
                  <p className="text-sm text-purple-100 mt-1">Get in touch with our team for account or data questions.</p>
                </div>
                <a
                  href="mailto:support@waqtmoney.com"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-purple-700 hover:bg-purple-50 transition"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
