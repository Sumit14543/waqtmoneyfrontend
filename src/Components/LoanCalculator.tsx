import { useState, useMemo } from "react";
import { Slider } from "@/Components/ui/slider";
import { Button } from "@/Components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LoanCalculator = () => {
  const [amount, setAmount] = useState(20000);
  const [tenure, setTenure] = useState(30);

  const dailyRate = 1;

  const { totalPayable, totalInterest, apr, pPct, iPct } = useMemo(() => {
    const interest = amount * (dailyRate / 100) * tenure;
    const total = amount + interest;
    const aprVal = (dailyRate * 365).toFixed(1);
    const principalRatio = total > 0 ? amount / total : 1;
    const interestRatio = total > 0 ? interest / total : 0;

    return {
      totalPayable: Math.round(total),
      totalInterest: Math.round(interest),
      apr: aprVal,
      pPct: principalRatio,
      iPct: interestRatio,
    };
  }, [amount, tenure]);

  const COLORS = ["#7c3aed", "#c4b5fd"];

  const features = [
    "Loan Amount: ₹5,000 to ₹1,00,000",
    "Tenure: 7 to 45 Days",
    "Daily Interest Rate: 1%",
    "No Pre-closure Charges",
    "No Foreclosure Charges",
    "No Hidden Charges",
    "Min Monthly Salary > ₹25,000",
  ];

  return (
    <section
      id="calculator"
      className="py-10 lg:py-28 bg-[linear-gradient(135deg,#ede9fe,#ffffff)]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Smart <span className="text-purple-600">Loan Calculator</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Plan your finances with our smart loan planner. Transparent and easy to understand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* LEFT SIDE */}
          <div className="bg-white rounded-2xl shadow-lg p-9 lg:p-8 space-y-8">

            {/* AMOUNT */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">
                  Estimated Amount Required
                </label>
                <span className="text-sm font-semibold text-purple-600">
                  ₹{amount.toLocaleString()}
                </span>
              </div>
              <Slider
                aria-label="Estimated Amount Required"
                value={[amount]}
                onValueChange={(v) => setAmount(v[0])}
                min={5000}
                max={100000}
                step={1000}
              />
            </div>

            {/* TENURE */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">
                  Loan Term (Days)
                </label>
                <span className="text-sm font-semibold text-purple-600">
                  {tenure} Days
                </span>
              </div>
              <Slider
                aria-label="Loan Term in Days"
                value={[tenure]}
                onValueChange={(v) => setTenure(v[0])}
                min={7}
                max={45}
                step={1}
              />
            </div>

            {/* RATE */}
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Daily Interest Rate
                </label>
                <span className="text-sm font-bold text-purple-600">
                  1% / day
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Fixed daily rate applied on principal amount
              </p>
            </div>

            {/* PIE CHART BELOW RATE */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative flex h-52 w-52 items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full -rotate-90 transform transition-all duration-300"
                  role="img"
                  aria-label={`Principal ₹${amount.toLocaleString()} (${Math.round(pPct * 100)}%), Interest ₹${totalInterest.toLocaleString()} (${Math.round(iPct * 100)}%)`}
                >
                  <title>Loan Principal and Interest Breakdown</title>
                  {/* Background Track */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="26"
                  />
                  {/* Principal Slice */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#7c3aed"
                    strokeWidth="26"
                    strokeDasharray={`${(pPct * 439.82).toFixed(2)} 439.82`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                  {/* Interest Slice */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#c4b5fd"
                    strokeWidth="26"
                    strokeDasharray={`${(iPct * 439.82).toFixed(2)} 439.82`}
                    strokeDashoffset={`-${(pPct * 439.82).toFixed(2)}`}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                {/* Center Value */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total</span>
                  <span className="text-lg font-extrabold text-slate-900">₹{totalPayable.toLocaleString()}</span>
                  <span className="text-[11px] font-medium text-purple-600">{tenure} Days</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 bg-[#7c3aed] rounded-full"></span>
                  Principal ({Math.round(pPct * 100)}%)
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 bg-[#c4b5fd] rounded-full"></span>
                  Interest ({Math.round(iPct * 100)}%)
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h3 className="font-semibold text-lg mb-4">Loan Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Loan Amount</span>
                  <span>₹{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure</span>
                  <span>{tenure} Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest</span>
                  <span>₹{totalInterest.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500">Total Payable</p>
                <p className="text-3xl font-bold">
                  ₹{totalPayable.toLocaleString()}
                </p>
              </div>

              <Link to="/user/apply">
                <Button className="w-full mt-4 bg-purple-600 text-white rounded-xl font-semibold hover:opacity-90">
                  Get Started{" "}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-semibold text-sm mb-3">Rate & Charges</h4>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
