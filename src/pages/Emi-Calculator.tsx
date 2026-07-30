import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AlertTriangle,
  Calculator,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  Percent,
  ShieldCheck,
  BookOpen,
  Scale,
  HelpCircle
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function EmiCalculator() {
  const [amount, setAmount] = useState(20000);
  const [tenure, setTenure] = useState(30);
  const [rate, setRate] = useState(1);

  const interest = useMemo(
    () => Math.round((amount * rate * tenure) / 100),
    [amount, rate, tenure]
  );

  const totalPayable = amount + interest;
  const apr = rate * 365;

  // ✅ Dynamic Pie Chart
  const interestPercent =
    totalPayable > 0 ? (interest / totalPayable) * 100 : 0;

  const amountPercent = 100 - interestPercent;

  const chartBg = `conic-gradient(
    #6d28d9 0% ${amountPercent}%,
    #f59e0b ${amountPercent}% 100%
  )`;

  const faqs = [
    {
      q: "What is an EMI, and how is it calculated?",
      a: "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both interest and principal components. The standard formula used to calculate EMIs is: E = P * r * (1 + r)^n / ((1 + r)^n - 1), where E is the EMI, P is the principal loan amount, r is the monthly interest rate, and n is the loan tenure in months."
    },
    {
      q: "What is the difference between simple interest and reducing balance EMI calculations?",
      a: "Under flat simple interest, the interest is calculated on the initial principal throughout the tenure. In reducing balance calculations, the interest is calculated only on the remaining outstanding principal at the end of each payment cycle, making it more cost-effective as the principal is repaid."
    },
    {
      q: "What is Annual Percentage Rate (APR)?",
      a: "Annual Percentage Rate (APR) represents the true annual cost of borrowing, including both the interest rate and any upfront fees (such as processing and documentation fees). It is expressed as a percentage to help you compare the real costs of different loan products."
    },
    {
      q: "How does pre-paying my loan affect the EMI?",
      a: "Pre-paying a part of your outstanding loan reduces the remaining principal balance. You can choose to either lower your monthly EMI amount (keeping the tenure same) or reduce your loan tenure (keeping the EMI amount same), saving on overall interest costs."
    },
    {
      q: "How do floating interest rates impact EMIs?",
      a: "Floating interest rates are linked to market benchmarks (like Repo rates). If the benchmark rate increases, the interest rate on your loan increases. Lenders typically adjust this by extending the loan tenure while keeping the monthly EMI constant, or by increasing the EMI amount."
    },
    {
      q: "Can I choose my own EMI payment due date?",
      a: "Due dates are typically set by the lending partner and aligned with your monthly salary credit date (usually between the 1st and 7th of the month) to ensure prompt repayments and prevent bounce incidents."
    },
    {
      q: "What charges are applied if an EMI payment bounces?",
      a: "An EMI bounce triggers both bank ECS/NACH bounce charges (charged by your bank) and late payment penalties (charged by the lender), and negatively impacts your credit score."
    },
    {
      q: "Does using an EMI calculator guarantee loan approval?",
      a: "No, the EMI calculator is an illustrative tool to help you estimate costs. Loan approvals are subject to credit evaluations, KYC verification, and risk assessments conducted by the lending partners."
    },
    {
      q: "What is an amortization schedule?",
      a: "An amortization schedule is a detailed table showing each periodic payment on a loan. It breaks down each payment into the amount going toward interest and the amount going toward the principal balance."
    },
    {
      q: "How does the loan tenure affect the total interest payout?",
      a: "A longer tenure reduces your monthly EMI amount, but increases the total interest paid over the life of the loan. A shorter tenure increases the monthly EMI but minimizes overall interest costs."
    },
    {
      q: "Are processing fees included in the EMI?",
      a: "No, processing fees are typically one-time charges deducted upfront from the disbursed loan amount. They are not added to your monthly EMIs but are factored into the loan's APR."
    }
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Waqt Money EMI Calculator",
      "description": "Calculate loan EMIs, interest details, and APR values using our interactive online calculator.",
      "url": "https://waqtmoney.com/emi-calculator"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ];

  return (
    <>
      <SEO
        title="EMI Calculator - Instant Loan Cost Estimator"
        description="Estimate your monthly EMIs, total interest payouts, and Annual Percentage Rate (APR) instantly with our easy-to-use Waqt Money Loan Calculator."
        keywords="loan EMI calculator, salary loan interest, calculate loan APR, credit cost calculator"
        schema={schema}
      />
      <Navbar />


      <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc,#eef2ff_48%,#fff7ed)] pt-24">
        <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-orange-400 text-white shadow-lg shadow-purple-200">
                <Calculator size={26} />
              </div>

              <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl md:text-5xl">
                EMI <span className="text-purple-600">Calculator</span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Plan your Waqt Money salary loan with a simple estimate of
                interest, APR, and total repayment before applying.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-xl shadow-purple-100/70 sm:p-6 lg:p-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Loan Amount */}
                  <InputCard
                    icon={<IndianRupee size={18} />}
                    title="Loan Amount"
                    value={formatINR(amount)}
                    tone="purple"
                  >
                    <input
                      type="range"
                      min={5000}
                      max={200000}
                      step={1000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />

                    <input
                      type="number"
                      min={5000}
                      max={200000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="mt-3 h-11 w-full rounded-lg border border-purple-100 bg-purple-50/50 px-3 text-center text-sm font-semibold text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                    />
                  </InputCard>

                  {/* Tenure */}
                  <InputCard
                    icon={<CalendarDays size={18} />}
                    title="Tenure"
                    value={`${tenure} Days`}
                    tone="purple"
                  >
                    <input
                      type="range"
                      min={7}
                      max={45}
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />

                    <input
                      type="number"
                      min={7}
                      max={45}
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="mt-3 h-11 w-full rounded-lg border border-purple-100 bg-purple-50/50 px-3 text-center text-sm font-semibold text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                    />
                  </InputCard>

                  {/* Interest Rate */}
                  <InputCard
                    icon={<Percent size={18} />}
                    title="Interest Rate"
                    value={`${rate}% / day`}
                    tone="purple"
                  >
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />

                    <input
                      type="number"
                      min={1}
                      max={3}
                      step={0.1}
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="mt-3 h-11 w-full rounded-lg border border-purple-100 bg-purple-50/50 px-3 text-center text-sm font-semibold text-slate-900 outline-none transition focus:border-purple-500 focus:bg-white"
                    />
                  </InputCard>
                </div>

                {/* Chart Section */}
                <div className="mt-6 grid gap-6 rounded-2xl border border-purple-100 bg-[linear-gradient(135deg,#f5f3ff,#fff7ed)] p-4 sm:p-5 md:grid-cols-[270px_1fr]">
                  <div className="flex min-w-0 flex-col items-center justify-center gap-4">
                    <div
                      className="relative flex aspect-square w-full max-w-[188px] items-center justify-center rounded-full p-4 transition-all duration-500 sm:max-w-[208px]"
                      style={{
                        background: chartBg,
                        boxShadow:
                          "inset 0 8px 22px rgba(15,23,42,0.08), 0 16px 36px rgba(124,58,237,0.14)",
                      }}
                    >
                      <div className="flex h-[70%] w-[70%] min-w-0 flex-col items-center justify-center rounded-full bg-white px-2 text-center shadow-lg">
                        <p className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-tight text-slate-950 sm:text-lg md:text-xl">
                          {formatINR(totalPayable)}
                        </p>

                        <p className="mt-1 px-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
                          Total Payable
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-purple-600" />
                        Loan
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-500" />
                        Interest
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="rounded-xl border border-white bg-white/90 p-4 shadow-sm sm:p-5">
                    <Summary label="Loan Amount" value={formatINR(amount)} />

                    <Summary label="Tenure" value={`${tenure} Days`} />

                    <Summary
                      label="Interest Amount"
                      value={formatINR(interest)}
                    />

                    <Summary label="APR" value={`${apr.toFixed(1)}%`} />

                    <div className="mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-orange-400 p-5 text-white shadow-lg shadow-orange-100">
                      <p className="text-sm font-medium text-white/85">
                        Total Repayment
                      </p>

                      <p className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                        {formatINR(totalPayable)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link to="/user/apply" className="w-full">
                  <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700">
                    Apply Now
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-orange-100/60">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <ShieldCheck className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                        Transparent Estimate
                      </p>

                      <h2 className="text-xl font-bold text-slate-950">
                        Rates & Charges
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      `Loan Amount: ${formatINR(
                        5000
                      )} to ${formatINR(200000)}`,
                      "Tenure: 7 to 45 Days",
                      "Fast approval process",
                      "No hidden charges",
                      "Flexible repayment options",
                      "Minimum salary eligibility applies",
                    ].map((item) => (
                      <div key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />

                        <p className="text-sm leading-6 text-slate-600">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-orange-400 p-6 text-white shadow-xl shadow-purple-200">
                  <p className="text-sm font-medium text-white/85">
                    Quick Personal Loan
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Money in Minutes.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/90">
                    Apply online with Waqt Money and get fast loan approval with
                    a simple digital process.
                  </p>
                </div>
              </aside>
            </div>

            <div className="mt-8 rounded-2xl border border-purple-100 bg-white/90 p-5 text-left shadow-lg shadow-purple-100/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <AlertTriangle className="h-5 w-5" />
                </span>

                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-950">
                    Disclaimer
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The loan calculator is provided solely for illustrative and informational purposes. The results are based on the inputs provided and may not reflect actual loan terms or approval outcomes. Waqt Money makes no guarantees as to the accuracy, completeness, or suitability of the results. Loan approval, terms, and conditions are at the sole discretion of Waqt Money and are subject to change without notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Comprehensive Calculator Guide Content */}
            <div className="mt-16 text-left space-y-12 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xl">
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  Understanding Loan EMIs: A Complete Financial Guide
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  An Equated Monthly Installment (EMI) is the foundation of personal and business debt management. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs allow borrowers to repay their loans in predictable cycles, dividing the principal and interest charges evenly across the loan tenure.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Before applying for any credit product, calculating your estimated monthly EMIs is critical to maintaining financial health. Over-leveraging by selecting EMIs that exceed your repayment capacity can lower your credit rating and trigger default penalties.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">The Mathematical Formula for EMI Calculation</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lenders use a standard mathematical formula to determine the monthly EMI amount for reducing balance loans:
                </p>
                <div className="bg-purple-50/50 p-4 rounded-xl text-center border border-purple-100 my-4">
                  <span className="text-lg font-bold text-purple-700">
                    {"\\(E = P \\cdot \\frac{r \\cdot (1+r)^n}{(1+r)^n - 1}\\)"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Where the variables represent:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                  <li><strong>E</strong> is the Equated Monthly Installment (EMI).</li>
                  <li><strong>P</strong> is the Principal loan amount borrowed.</li>
                  <li><strong>r</strong> is the monthly interest rate (annual interest rate divided by 12, then divided by 100).</li>
                  <li><strong>n</strong> is the loan tenure in months.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Short-Term Interest Calculations vs. Reducing Balance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For short-term cash advances like payday loans, interest rates may be calculated on a flat daily or monthly basis rather than a reducing balance. A flat daily interest rate means interest is calculated on the initial principal amount for each day of the loan tenure. For example, if you borrow ₹10,000 at a daily rate of 0.1% for 30 days, the daily interest is ₹10, and the total interest accrued over 30 days is ₹300.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  It is essential to understand the calculation method used for your specific loan product to estimate the true cost of borrowing. Reducing balance calculations are typically more cost-effective for long-term loans, while flat rates are common for short-term liquidity bridges.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">What is Annual Percentage Rate (APR)?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The Annual Percentage Rate (APR) represents the total annual cost of borrowing, expressing both the nominal interest rate and any upfront fees (such as processing and documentation fees) as a percentage. Expressing costs as an APR allows you to compare the real costs of different loan products accurately.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For example, a loan with a lower nominal interest rate but high processing fees might have a higher APR than a loan with a slightly higher interest rate but no processing fees. Always review the APR in your loan agreement to understand the true cost of credit.
                </p>
              </div>

              <div className="space-y-4 bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
                <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-purple-600" />
                  Tips for Managing Your Loan EMIs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To maintain a healthy credit profile, ensure your total monthly EMI obligations do not exceed 40% of your net monthly take-home salary. Setting up an Auto-Debit (NACH mandate) on your salary account ensures EMIs are processed automatically on time, protecting you from late payment fees and safeguarding your credit rating.
                </p>
              </div>

            </div>

            {/* FAQs Section */}
            <div className="mt-16 text-left space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-purple-600" />
                EMI Calculator Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <h3 className="text-base font-semibold text-slate-900">{faq.q}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InputCard({
  icon,
  title,
  value,
  tone,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  tone: "purple" | "orange";
  children: React.ReactNode;
}) {
  const isPurple = tone === "purple";

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white ${isPurple ? "bg-purple-600" : "bg-orange-500"
          }`}
      >
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p
        className={`mb-4 mt-1 text-xl font-bold ${isPurple ? "text-purple-600" : "text-orange-500"
          }`}
      >
        {value}
      </p>

      {children}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 text-sm">
      <span className="text-slate-500">{label}</span>

      <span className="font-bold text-slate-950">{value}</span>
    </div>
  );
}
