import { motion } from "framer-motion";
import { ArrowRight, Wallet, GraduationCap, Briefcase, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
const products = [
  {
    icon: Wallet,
    title: "Personal Loan",
    amount: "Up to ₹5,00,000",
    rate: "From 12% p.a.",
    tenure: "3 - 36 months",
    desc: "For your personal needs — travel, wedding, home renovation or any emergency expense.",
    color: "bg-primary/10 text-primary",
    path: "/loans/personal-loan",
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    amount: "Up to ₹10,00,000",
    rate: "From 14% p.a.",
    tenure: "6 - 48 months",
    desc: "Fuel your business growth with quick capital for inventory, equipment, or expansion.",
    color: "bg-accent/10 text-accent",
    path: "/loans/business-loan",
  },
  {
    icon: Zap,
    title: "Payday Loan",
    amount: "Up to ₹2,00,000",
    rate: "From 1% flat/mo.",
    tenure: "15 - 90 days",
    desc: "Instant salary cash advance before payday to cover urgent emergency expenses.",
    color: "bg-purple-100 text-purple-700",
    path: "/loans/payday-loan",
  },
  {
    icon: Heart,
    title: "Medical Loan",
    amount: "Up to ₹5,00,000",
    rate: "From 11% p.a.",
    tenure: "3 - 36 months",
    desc: "Don't let finances come in the way of health. Get instant funds for medical emergencies.",
    color: "bg-accent/10 text-accent",
    path: "/loans/medical-loan",
  },
];

const LoanProductsSection = () => {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">Our Products</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Loan Solutions for <span className="text-gradient">Every Need</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Whether it's personal, business, education, or medical — we have a tailored loan product just for you.
          </p>
        </motion.div>
 
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow group"
            >
              <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center mb-4`}>
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
 
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-xs font-semibold text-foreground">{p.amount}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-xs text-muted-foreground">Interest</p>
                  <p className="text-xs font-semibold text-foreground">{p.rate}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2.5 text-center">
                  <p className="text-xs text-muted-foreground">Tenure</p>
                  <p className="text-xs font-semibold text-foreground">{p.tenure}</p>
                </div>
              </div>
              <Link
                to={p.path}
                aria-label={`Explore ${p.title} options`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-purple-700 bg-purple-100/70 hover:bg-purple-600 hover:text-white transition-all duration-200 group/btn shadow-xs hover:shadow-md"
              >
                <span>Explore {p.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LoanProductsSection;
