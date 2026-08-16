import { useState } from "react";
import { ArrowRight, Shield, Clock, CheckCircle2, PhoneCall, X, Zap, Wallet, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL, normalizeApiMessage } from "@/config/api";

const stats = [
  { value: "4.9/5", label: "Average Rating" },
  { value: "50K+", label: "Happy Customers" },
  { value: "\u20b9100Cr+", label: "Loans Disbursed" },
  { value: "99.2%", label: "Satisfaction Rate" },
];

const HeroSection = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedMobile, setSubmittedMobile] = useState("");

  const digitsOnly = (value: string) => value.replace(/\D/g, "");

  const readJsonResponse = async (res: Response) => {
    const text = await res.text();
    if (!text) return {};

    try {
      return JSON.parse(text);
    } catch {
      return { message: "Server returned an invalid response" };
    }
  };

  const handleLeadSubmit = async () => {
    if (loading) return;

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/application/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
        }),
      });

      const result = await readJsonResponse(response);

      if (!response.ok) {
        setError(normalizeApiMessage(result.message, "Unable to submit your request"));
        return;
      }

      setSubmittedMobile(mobile);
      setSubmitted(true);
      setMobile("");
    } catch (submitError) {
      console.error("Hero lead submit error:", submitError);
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero pb-0 pt-16 lg:pb-0 lg:pt-20 xl:pb-0 xl:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-6">
          <div className="animate-fade-up text-center xl:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary sm:mb-5">
              <Shield className="w-4 h-4" />
              RBI Registered NBFC
            </div>
            <h1 className="mx-auto mb-4 max-w-2xl font-heading text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl xl:mx-0">
              Fast Approvals{" "}
              <span className="text-gradient">Money in Minutes.</span>
            </h1>
            <p className="mx-auto mb-4 sm:mb-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg xl:mx-0 xl:max-w-lg">
              Quick personal loans with simple documentation, transparent charges, and fast disbursal. Apply in minutes and get funds quickly.
            </p>
            <div className="mx-auto mb-4 flex flex-wrap items-center justify-center gap-4 xl:justify-start">
              <Link
                to="/user/apply"
                className="group inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#8048e2] to-[#bd56e4] px-8 text-base font-bold text-white shadow-[0_9px_18px_rgba(128,72,226,0.22)] transition-all hover:scale-105 hover:shadow-[0_12px_24px_rgba(128,72,226,0.32)]"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <span className="flex items-center gap-1.5 rounded-full bg-purple-50/80 px-3.5 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-purple-100">
                <Lock className="h-3.5 w-3.5 text-[#8048e2]" />
                100% Safe & Secure | Instant Check
              </span>
            </div>

            <div className="mx-auto mt-3 sm:mt-6 grid w-full max-w-xl gap-3 sm:gap-4 sm:grid-cols-2 xl:mx-0">
              {[
                {
                  title: "Funds in Minutes*",
                  description: "Quick disbursals",
                  icon: Zap,
                  bg: "bg-amber-50 text-amber-600 ring-amber-200/60",
                },
                {
                  title: "Money When You Need It",
                  description: "Fast approvals, quick transfers",
                  icon: Wallet,
                  bg: "bg-purple-50 text-purple-600 ring-purple-200/60",
                },
                {
                  title: "Instant Payday Support",
                  description: "No delays, just funds",
                  icon: ShieldCheck,
                  bg: "bg-emerald-50 text-emerald-600 ring-emerald-200/60",
                },
                {
                  title: "Get Paid Faster",
                  description: "Hassle-free quick credit",
                  icon: Sparkles,
                  bg: "bg-indigo-50 text-indigo-600 ring-indigo-200/60",
                },
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3 text-left">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ${item.bg}`}>
                      <ItemIcon className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-base font-bold leading-5 text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-500">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-full justify-self-center animate-slide-right xl:max-w-none">
            <div className="mx-auto w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-[700px] xl:max-w-3xl lg:-translate-x-14 xl:-translate-x-20">
              <div className="relative w-full text-center">
                <div className="absolute -inset-4 rounded-full bg-primary/10 blur-3xl sm:-inset-12" />
                <img
                  src="/hero_banner_custom.png"
                  alt="Waqt Money instant loan features with up to 50000, flexible repayment, instant approval and low interest rates"
                  width={604}
                  height={511}
                  style={{ aspectRatio: "604 / 511" }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="relative mx-auto w-[138%] sm:w-full max-w-none -ml-[40%] sm:ml-0 pr-1 sm:pr-0 object-contain mix-blend-multiply scale-105 sm:scale-110 lg:scale-125 xl:scale-130 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center animate-count" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-white/20">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              aria-label="Close thank you popup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 px-8 pb-10 pt-9 text-center text-white">
              <div className="absolute left-6 top-6 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-4 right-8 h-16 w-16 rounded-full bg-white/10 blur-xl" />
              <div className="relative mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/20">
                Waqt Money
              </div>
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ring-8 ring-white/10">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="relative font-heading text-3xl font-extrabold">Thank You!</h2>
              <p className="mt-2 text-sm font-medium text-white/90">
                Your Waqt Money loan request has been received successfully.
              </p>
            </div>

            <div className="-mt-8 px-6 pb-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 ring-8 ring-green-50/70">
                  <PhoneCall className="h-6  w-6" />
                </div>
                <p className="text-base font-bold text-slate-900">Waqt Money team will contact you shortly</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We have saved your mobile number
                  {submittedMobile ? <span className="font-semibold text-slate-900"> {submittedMobile}</span> : null}
                  . Please keep your phone reachable.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-left">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Status</p>
                    <p className="mt-1 text-sm font-bold text-green-600">Request received</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Next step</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">Callback soon</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-[1.02]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
