import { lazy, Suspense } from "react";
import Navbar from "@/Components/Navbar";
import HeroSection from "@/Components/HeroSection";
import Footer from "@/Components/Footer";
import SEO from "@/Components/SEO";

const FeaturesSection = lazy(() => import("@/Components/FeaturesSection"));
const LoanProductsSection = lazy(() => import("@/Components/LoanProductsSection"));
const StorySection = lazy(() => import("@/Components/StorySection"));
const StepsSection = lazy(() => import("@/Components/StepsSection"));
const EligibilitySection = lazy(() => import("@/Components/EligibilitySection"));
const TestimonialsSection = lazy(() => import("@/Components/TestimonialsSection"));
const TrustSection = lazy(() => import("@/Components/TrustSection"));
const FAQSection = lazy(() => import("@/Components/FAQSection"));
const LoanCalculator = lazy(() => import("@/Components/LoanCalculator"));
const BorrowSection = lazy(() => import("@/Components/BorrowSection"));

const Index = () => {
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
        "email": "support@waqtmoney.com",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Waqt Money - Instant Personal & Business Loans Online"
        description="Apply for quick, paperless personal loans, payday advances, business loans, and secured property credits. Instant approvals from licensed NBFC partner Waqt Finance Pvt Ltd."
        keywords="instant loans online, personal loans India, business loans MSME, payday loans, home equity loans, credit services Noida"
        schema={schema}
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <Suspense fallback={null}>
          <StepsSection />
          <EligibilitySection />
          <LoanCalculator/>
          <BorrowSection/>
          <FeaturesSection />
          <LoanProductsSection />
          <StorySection />
          <TestimonialsSection />
          <TrustSection />
          <FAQSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

