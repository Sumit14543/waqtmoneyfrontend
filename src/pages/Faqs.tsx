import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import SEO from "@/Components/SEO";
import React from "react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How much loan amount can I get?",
      answer:
        "Loan amounts depend on the product: Personal Loans go up to ₹5,00,000, Business Loans up to ₹10,00,000, Payday Loans up to ₹2,00,000, and Medical Loans up to ₹5,00,000. Your exact eligible amount depends on your income, credit profile, and repayment capacity, confirmed instantly during the application process.",
    },
    {
      question: "Who is eligible to apply for a personal loan?",
      answer:
        "You're eligible if you're an Indian citizen aged 21-58 years, salaried or self-employed, earning a minimum monthly income of ₹15,000, with a valid PAN and Aadhaar card and an active bank account with at least 3 months of transaction history.",
    },
    {
      question: "What is the loan tenure?",
      answer:
        "Tenure varies by product. Personal and Medical Loans run from 3 to 36 months, Business Loans from 6 to 48 months, and Payday Loans from 15 to 90 days (short-term advances can be as short as 7 days). You can choose the tenure that best fits your repayment plan during application.",
    },
    {
      question: "What interest rate will be charged?",
      answer:
        "Interest rates start from 11% p.a. on Medical Loans, 12% p.a. on Personal Loans, and 14% p.a. on Business Loans. Payday Loans carry a flat rate starting from 1% per month (or 1% per day for short-term advances under 45 days). Your final rate depends on your credit profile and loan tenure.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No. Waqt Money follows a fully transparent pricing model with no hidden charges. There are no pre-closure or foreclosure penalties if you repay early, and all applicable fees are disclosed upfront before you accept the loan offer.",
    },
    {
      question: "How long does loan approval take?",
      answer:
        "Approval is typically instant once your details are verified. Funds are disbursed directly to your account within minutes to a few hours after approval, and always within 24 hours.",
    },
    {
      question: "Is the entire process online, or do I need to visit a branch?",
      answer:
        "The entire process is 100% digital — from application to document upload to disbursement. No branch visit or physical paperwork is required.",
    },
    {
      question: "What documents are required to apply?",
      answer:
        "You'll need your PAN card, Aadhaar card (front and back), your last 3 months' salary slips, bank statements for the last 6 months, and a passport-size photograph.",
    },
    {
      question: "Is Waqt Money RBI registered?",
      answer:
        "Yes. Waqt Money facilitates loans in partnership with Waqt Finance Pvt Ltd, an RBI-registered NBFC (RBI Licence No. B.10.00143).",
    },
    {
      question: "Can self-employed individuals apply?",
      answer:
        "Yes. Both salaried and self-employed individuals aged 21-58 with a minimum monthly income of ₹15,000 can apply.",
    },
    {
      question: "What is the difference between a personal loan and a payday loan?",
      answer:
        "A Personal Loan is meant for larger, planned expenses — up to ₹5,00,000 over 3-36 months. A Payday Loan is a short-term cash advance for urgent needs — up to ₹2,00,000 with tenures as short as 7-90 days, designed to bridge you until your next salary.",
    },
    {
      question: "Can I prepay or foreclose my loan early?",
      answer:
        "Yes. There are no pre-closure or foreclosure charges — you can repay your loan early at no extra cost.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Waqt Money",
      "description": "Waqt Money provides quick, paperless personal loans, payday cash advances, MSME business credit, and secured loans in partnership with licensed NBFC Waqt Finance Pvt Ltd.",
      "url": "https://waqtmoney.com",
      "telephone": "+91-9217086608",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H-15 BSI Business Park, H Block, Sector 63",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      "priceRange": "₹5,000 - ₹50,000,000"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Waqt Finance Pvt Ltd",
      "alternateName": "Waqt Money",
      "url": "https://waqtmoney.com",
      "logo": "https://waqtmoney.com/waqt-money-logo-img.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9217086608",
        "contactType": "customer service",
        "email": "support@waqtmoney.in",
        "availableLanguage": [
          "English",
          "Hindi"
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
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
          "name": "FAQs",
          "item": "https://waqtmoney.com/faqs"
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQs) - Instant Loan Help"
        description="Have questions about instant payday loans, eligibility criteria, required documents, or payback tenures? Find answers in our comprehensive FAQs guide."
        keywords="loan FAQs, payday loan questions, credit help, Waqt Money FAQ"
        canonicalUrl="https://waqtmoney.com/faqs"
        schema={schema}
      />
      <Navbar />

      <main>
        <section className="flex w-full flex-col items-center justify-center px-4 py-16">
          <div className="my-24 w-full max-w-5xl">
            <div className="mb-10">
              <h1 className="mb-4 text-center text-3xl font-semibold text-neutral-900 md:text-start">
                Frequently Asked Questions (FAQs)
              </h1>

            <p className="mx-auto max-w-[416px] text-center text-sm text-neutral-800 md:mx-0 md:text-start">
              We&apos;re here to help you and solve doubts. Find answers to the most common questions below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                onClick={() => toggleFAQ(index)}
                className={`cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-3.5 transition-all duration-300 hover:bg-slate-100 ${
                  openIndex === index ? "row-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-neutral-800">{faq.question}</span>
                  <div
                    className={`rounded p-1 text-slate-400 transition-colors ${
                      openIndex === index ? "bg-slate-200 text-slate-500" : "hover:bg-slate-300 hover:text-slate-500"
                    }`}
                  >
                    {openIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
};

export default Faqs;
