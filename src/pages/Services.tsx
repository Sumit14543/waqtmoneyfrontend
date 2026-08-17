import React from "react";
import { Link } from "react-router-dom";
import {
  UserCheck,
  Building2,
  Zap,
  Clock,
  Home,
  Car,
  Heart,
  ArrowRight,
  ShieldCheck,
  FileText,
  Sparkles,
  CheckCircle2,
  Layers
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

export default function Services() {
  const schema = [
    {
      "@type": "CollectionPage",
      "@id": "https://waqtmoney.com/services#page",
      "name": "Loan Services | Waqt Money",
      "description": "Explore Waqt Money's complete range of loan services: Personal Loans, Business Loans, Payday Loans, Short Term Loans, Loan Against Property, Vehicle Loans, and Medical Loans. Apply online with minimal documentation and quick digital approval.",
      "url": "https://waqtmoney.com/services",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://waqtmoney.com/#website",
        "name": "Waqt Money",
        "url": "https://waqtmoney.com"
      },
      "provider": {
        "@type": "FinancialService",
        "@id": "https://waqtmoney.com/#organization",
        "name": "Waqt Money"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://waqtmoney.com/services#list",
      "name": "Waqt Money Loan Products",
      "description": "Complete list of loan services offered by Waqt Money through its registered NBFC partners.",
      "url": "https://waqtmoney.com/services",
      "numberOfItems": 7,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Personal Loan",
          "description": "Flexible, unsecured personal loan for any purpose — medical emergencies, education, travel, wedding, or home renovation. Apply online with minimal documentation.",
          "url": "https://waqtmoney.com/loans/personal-loan"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Business Loan",
          "description": "Business financing for MSMEs and growing businesses. Covers working capital, inventory purchase, equipment financing, and expansion needs.",
          "url": "https://waqtmoney.com/loans/business-loan"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Payday Loan",
          "description": "Short-term salary advance loan (15–45 days) to bridge the gap before your next payday. Quick digital process with fast approval.",
          "url": "https://waqtmoney.com/loans/payday-loan"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Short Term Loan",
          "description": "Emergency loan for temporary financial needs where waiting isn't an option. Fast approval, short repayment tenure.",
          "url": "https://waqtmoney.com/loans/short-term-loan"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Loan Against Property",
          "description": "Secured mortgage loan against residential, commercial, or industrial property. High LTV (60–75%), tenure up to 20 years, interest from 10.49% p.a.",
          "url": "https://waqtmoney.com/loans/loan-against-property"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Vehicle Loan",
          "description": "Car Loan and Bike Loan for new and used vehicles. Up to 90–100% of on-road price for new vehicles. Interest from 10.49% p.a.",
          "url": "https://waqtmoney.com/loans/vehicle-loan"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Medical Loan",
          "description": "Emergency medical loan for hospitalisation, surgery, and healthcare expenses. Credit limit up to ₹6,00,000 with interest rates starting from 11.0% p.a.",
          "url": "https://waqtmoney.com/loans/medical-loan"
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
          "name": "Loan Services",
          "item": "https://waqtmoney.com/services"
        }
      ]
    }
  ];

  const loanProducts = [
    {
      id: "personal-loan",
      title: "Personal Loan",
      icon: UserCheck,
      link: "/loans/personal-loan",
      badge: "Unsecured & Flexible",
      summary: "A Personal Loan from Waqt Money is a flexible, unsecured loan for virtually any personal need. Apply for a Personal Loan Online and use the funds for whatever matters most to you — there's no restriction on purpose.",
      uses: [
        "Medical emergencies",
        "Education expenses",
        "Travel",
        "Wedding costs",
        "Home renovation"
      ],
      detailText: "An Instant Personal Loan application is fully digital — from filling out your details to uploading documents and receiving your decision — so you can access funds without visiting a branch or waiting in long queues."
    },
    {
      id: "business-loan",
      title: "Business Loan",
      icon: Building2,
      link: "/loans/business-loan",
      badge: "MSME & Startup Growth",
      summary: "A Business Loan helps you fund the day-to-day and long-term needs of running a business, without disrupting cash flow. As an MSME Loan option, it's designed with small and growing businesses in mind, offering Business Finance that adapts to your specific requirement.",
      uses: [
        "Working capital",
        "Business expansion",
        "Inventory purchase",
        "Equipment financing"
      ],
      detailText: "Whether you need funds to manage a temporary cash crunch or to invest in growth, a Business Loan gives you the flexibility to keep operations running smoothly while repaying on terms suited to your business cycle."
    },
    {
      id: "payday-loan",
      title: "Payday Loan",
      icon: Zap,
      link: "/loans/payday-loan",
      badge: "15–45 Days Salary Bridge",
      summary: "A Payday Loan is a short-term Salary Advance Loan designed to bridge the gap before your next paycheck arrives. Apply for a Payday Loan Online in minutes, and get access to a small amount of funds for a short period, repaid once your salary is credited.",
      uses: [
        "Salary advance before payday",
        "Emergency cash requirements",
        "Covering bills with a short repayment cycle"
      ],
      detailText: "Because the tenure is short and the process fully digital, a Payday Loan is one of the fastest ways to cover a temporary shortfall without committing to a long repayment schedule."
    },
    {
      id: "short-term-loan",
      title: "Short Term Loan",
      icon: Clock,
      link: "/loans/short-term-loan",
      badge: "Fast Emergency Funds",
      summary: "A Short Term Loan works much like an Emergency Loan — designed for temporary financial needs where waiting isn't an option. Apply for a Short Term Loan Online and get funds for a defined, short-term purpose.",
      uses: [
        "Temporary financial needs",
        "Unexpected expenses",
        "Situations requiring a short repayment tenure"
      ],
      detailText: "Whether it's a medical bill, a utility payment, or an unplanned cost, a Short Term Loan is built to resolve the gap quickly, without the longer commitment of a standard personal loan."
    },
    {
      id: "loan-against-property",
      title: "Loan Against Property",
      icon: Home,
      link: "/loans/loan-against-property",
      badge: "High LTV Secured Finance",
      summary: "A Loan Against Property lets you unlock funds by leveraging an asset you already own, typically at more favourable terms than an unsecured loan. As a form of Mortgage Loan, it's suited for larger funding needs where secured borrowing makes sense.",
      uses: [
        "Residential property as collateral",
        "Commercial property as collateral",
        "Larger secured borrowing needs"
      ],
      detailText: "Because a Property Loan is secured, it often comes with a higher loan amount and longer repayment tenure — a good fit when your requirement goes beyond what an unsecured loan typically offers."
    },
    {
      id: "vehicle-loan",
      title: "Vehicle Loan",
      icon: Car,
      link: "/loans/vehicle-loan",
      badge: "New & Used Finance",
      summary: "A Vehicle Loan helps you finance the purchase of a vehicle, whether for personal use or for your business. As a form of Car Loan or broader Vehicle Finance, it's structured around the value of the vehicle and your repayment capacity.",
      uses: [
        "New vehicle purchases",
        "Used vehicles, where offered",
        "Personal and business vehicle financing"
      ],
      detailText: "A Vehicle Loan is designed to make owning a vehicle more accessible, with repayment terms structured to fit comfortably within your monthly budget."
    },
    {
      id: "medical-loan",
      title: "Medical Loan",
      icon: Heart,
      link: "/loans/medical-loan",
      badge: "Up to ₹6 Lakhs @ 11.0% p.a.",
      summary: "A Medical Loan is built specifically to help you manage healthcare costs without delay. As an Emergency Medical Loan, it exists for exactly the moments when a health situation can't wait on funds. Waqt Money's Medical Loan offers a credit limit of up to ₹6,00,000, with interest rates starting from 11.0% p.a.",
      uses: [
        "Hospitalisation",
        "Surgery",
        "Medical treatment",
        "General healthcare expenses"
      ],
      detailText: "As a dedicated Healthcare Loan, it's positioned around urgency — quick approval and disbursal so you can focus on treatment and recovery rather than arranging funds."
    }
  ];

  return (
    <>
      <SEO
        title="Loan Services | Personal, Business, Payday & More | Waqt Money"
        description="Explore Waqt Money's loan services, including Personal Loans, Business Loans, Payday Loans, Short Term Loans, Loan Against Property, Vehicle Loans, and Medical Loans. Learn about eligibility, documents, and the online application process."
        keywords="Loan Services, Personal Loan Online, Business Loan, Payday Loan, Short Term Loan, Loan Against Property, Vehicle Loan, Medical Loan, Waqt Money"
        canonicalUrl="https://waqtmoney.com/services"
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
            <li className="before:content-['/'] before:mr-2 text-slate-800 font-medium" aria-current="page">
              Services
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-800 mb-5">
            <Layers className="h-3.5 w-3.5" /> All-in-One Loan Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Loan Services by Waqt Money
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            One platform, every kind of loan. Personal, Business, Payday, Medical, and more — apply online, minimal documents, quick digital verification.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/user/apply">
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#8048e2] px-7 text-sm sm:text-base font-bold text-white transition-all duration-200 hover:bg-[#6d28d9] shadow-[0_4px_14px_rgba(128,72,226,0.35)] hover:shadow-[0_6px_20px_rgba(128,72,226,0.45)] hover:scale-[1.02] cursor-pointer">
                Apply Now
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Link>
            <a href="#loans-overview">
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300/90 bg-white px-7 text-sm sm:text-base font-semibold text-slate-800 transition-all duration-200 hover:bg-purple-50/60 hover:border-purple-300 hover:text-purple-700 cursor-pointer shadow-2xs">
                Check Your Eligibility →
              </button>
            </a>
          </div>
        </section>

        {/* Financial Solutions for Every Borrowing Need */}
        <section className="bg-white py-16 border-t border-purple-50">
          <div className="container mx-auto px-4 max-w-4xl space-y-6 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Financial Solutions for Every Borrowing Need
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Not every borrowing need looks the same, and that's exactly why Waqt Money offers a full suite of Loan Services rather than a single product. Whether you're covering a medical bill, growing a business, bridging a gap before your next salary, or financing a vehicle, our range of Financial Services is built to match the specific shape of your need — in amount, tenure, and purpose.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Every Online Loan on this page shares the same foundation: a fully digital application, minimal documentation, and transparent charges disclosed before you accept any offer. Behind the scenes, our Digital Lending process handles eligibility checks and verification quickly, so you're not stuck waiting on paperwork when you need funds. Below, you'll find a short overview of each loan service we offer, along with a link to the dedicated page for full details on eligibility, documents, rates, and how to apply.
            </p>
          </div>
        </section>

        {/* Loan Services Overview Grid */}
        <section id="loans-overview" className="bg-slate-50 py-16 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-6xl space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Explore Our Loan Services
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Click on any loan product to view full details on eligibility, documents, interest rates, and apply online.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {loanProducts.map((product) => {
                const IconComponent = product.icon;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                          {product.badge}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {product.summary}
                      </p>

                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Common Uses Include:</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {product.uses.map((use, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                        {product.detailText}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100">
                      <Link to={product.link}>
                        <button className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-50 text-purple-700 font-semibold text-sm hover:bg-purple-600 hover:text-white transition group">
                          Explore {product.title}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compare and Apply Today CTA */}
        <section className="bg-purple-900 text-white py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold">
              Compare and Apply Today
            </h2>
            <p className="text-purple-100 text-base md:text-lg leading-relaxed">
              With so many Loan Services to choose from, take a moment to compare your options, review eligibility, and pick the loan that fits your need. Once you're ready, starting your Online Loan Application takes just a few minutes.
            </p>
            <div className="pt-4 flex justify-center">
              <Link to="/user/apply">
                <button className="h-12 px-8 rounded-xl bg-white text-purple-900 font-bold text-base hover:bg-purple-50 transition shadow-lg">
                  Apply Loan Online
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
