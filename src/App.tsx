import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "./Components/ui/sonner";
import {
  HomeFallback,
  ContentPageFallback,
  AuthPageFallback,
  KycPageFallback,
  DashboardPageFallback,
} from "./Components/PageSkeletons";
import { Toaster } from "./Components/ui/toaster";
import { TooltipProvider } from "@/Components/ui/tooltip";
import EnterKeyFocusHandler from "./Components/EnterKeyFocusHandler.tsx";
import ScrollToTop from "./Components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const About = lazy(() => import("./pages/About-us.tsx"));
const Faqs = lazy(() => import("./pages/Faqs.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Policies = lazy(() => import("./pages/Policies.tsx"));
const EmiCalculator = lazy(() => import("./pages/Emi-Calculator.tsx"));
const Login = lazy(() => import("./User/Login.tsx"));
const LoanDashboard = lazy(() => import("./User/LoanDashboard.tsx"));
const Apply = lazy(() => import("./User/Apply.tsx"));
const MobileOtp = lazy(() => import("./User/MobileOtp.tsx"));
const LoanForm = lazy(() => import("./User/LoanForm.tsx"));
const BasicDetailsForm = lazy(() => import("./User/BasicDetailsForm.tsx"));
const PanVerification = lazy(() => import("./User/PanVerification.tsx"));
const KycAadhaar = lazy(() => import("./User/KycAadhaar.tsx"));
const CompanyDetails = lazy(() => import("./User/CompanyDetails.tsx"));
const BankDetails = lazy(() => import("./User/BankDetails.tsx"));
const References = lazy(() => import("./User/References.tsx"));
const SalarySlip = lazy(() => import("./User/SalarySlip.tsx"));
const CustomerVideoKYC = lazy(() => import("./User/CustomerVideoKYC.tsx"));
const LoanStatus = lazy(() => import("./User/LoanStatus.tsx"));

// ADMIN PANEL ROUTES
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads.tsx"));
const AdminLeadDetail = lazy(() => import("./pages/admin/AdminLeadDetail.tsx"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts.tsx"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs.tsx"));
const AdminBlogForm = lazy(() => import("./pages/admin/AdminBlogForm.tsx"));

// PUBLIC BLOG ROUTES
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsConditions = lazy(() => import("./pages/Term-Conditions.tsx"));
const GrievanceRedressal = lazy(() => import("./pages/Grievance-Redressal.tsx"));
const FairPracticesCode = lazy(() => import("./pages/Fair-Practices.tsx"));
const Repayment = lazy(() => import("./pages/Repayment.tsx"));
const MakePayment = lazy(() => import("./pages/MakePayment.tsx"));
const ReloanOffer = lazy(() => import("./pages/ReloanOffer.tsx"));

// New YMYL Pages
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.tsx"));
const Disclaimer = lazy(() => import("./pages/Disclaimer.tsx"));
const ResponsibleLending = lazy(() => import("./pages/ResponsibleLending.tsx"));

// New Loan Product Pages
const PersonalLoan = lazy(() => import("./pages/loans/PersonalLoan.tsx"));
const BusinessLoan = lazy(() => import("./pages/loans/BusinessLoan.tsx"));
const PaydayLoan = lazy(() => import("./pages/loans/PaydayLoan.tsx"));
const LoanAgainstProperty = lazy(() => import("./pages/loans/LoanAgainstProperty.tsx"));
const VehicleLoan = lazy(() => import("./pages/loans/VehicleLoan.tsx"));
const CreditServices = lazy(() => import("./pages/loans/CreditServices.tsx"));
const EducationLoan = lazy(() => import("./pages/loans/EducationLoan.tsx"));
const MedicalLoan = lazy(() => import("./pages/loans/MedicalLoan.tsx"));

const withSuspense = (
  Component: React.ComponentType,
  fallback: React.ReactNode
) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <EnterKeyFocusHandler />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={withSuspense(Index, <HomeFallback />)} />
          <Route path="/services" element={withSuspense(Services, <ContentPageFallback />)} />
          <Route path="/about" element={withSuspense(About, <ContentPageFallback />)} />
          <Route path="/faqs" element={withSuspense(Faqs, <ContentPageFallback />)} />
          <Route path="/emi-calculator" element={withSuspense(EmiCalculator, <ContentPageFallback />)} />
          <Route path="/contact" element={withSuspense(Contact, <ContentPageFallback />)} />
          <Route path="/policies" element={withSuspense(Policies, <ContentPageFallback />)} />
          <Route path="/repayment" element={withSuspense(Repayment, <ContentPageFallback />)} />
          <Route path="/repayment/make-payment" element={withSuspense(MakePayment, <ContentPageFallback />)} />
          <Route path="/repayment/reloan-offer" element={withSuspense(ReloanOffer, <ContentPageFallback />)} />
          
          {/* Privacy & Legal Policies */}
          <Route path="/privacy-policy" element={withSuspense(PrivacyPolicy, <ContentPageFallback />)} />
          <Route path="/privacy-policies" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms-conditions" element={withSuspense(TermsConditions, <ContentPageFallback />)} />
          <Route path="/grievance-redressal" element={withSuspense(GrievanceRedressal, <ContentPageFallback />)} />
          <Route path="/fair-practices-code" element={withSuspense(FairPracticesCode, <ContentPageFallback />)} />
          <Route path="/refund-policy" element={withSuspense(RefundPolicy, <ContentPageFallback />)} />
          <Route path="/disclaimer" element={withSuspense(Disclaimer, <ContentPageFallback />)} />
          <Route path="/responsible-lending" element={withSuspense(ResponsibleLending, <ContentPageFallback />)} />

          {/* Loan Landing Pages */}
          <Route path="/loans/personal-loan" element={withSuspense(PersonalLoan, <ContentPageFallback />)} />
          <Route path="/loans/business-loan" element={withSuspense(BusinessLoan, <ContentPageFallback />)} />
          <Route path="/loans/payday-loan" element={withSuspense(PaydayLoan, <ContentPageFallback />)} />
          <Route path="/pay-day-loan" element={withSuspense(PaydayLoan, <ContentPageFallback />)} />
          <Route path="/loans/loan-against-property" element={withSuspense(LoanAgainstProperty, <ContentPageFallback />)} />
          <Route path="/loans/vehicle-loan" element={withSuspense(VehicleLoan, <ContentPageFallback />)} />
          <Route path="/loans/credit-services" element={withSuspense(CreditServices, <ContentPageFallback />)} />
          <Route path="/loans/education-loan" element={withSuspense(EducationLoan, <ContentPageFallback />)} />
          <Route path="/loans/medical-loan" element={withSuspense(MedicalLoan, <ContentPageFallback />)} />

          <Route path="/login" element={withSuspense(Login, <AuthPageFallback />)} />
          <Route path="/user/dashboard" element={withSuspense(LoanDashboard, <DashboardPageFallback />)} />

          {/* USER FLOW */}
          <Route path="/user/apply" element={withSuspense(Apply, <KycPageFallback />)} />
          <Route path="/user/otp" element={withSuspense(MobileOtp, <AuthPageFallback />)} />
          <Route path="/user/loan" element={withSuspense(LoanForm, <KycPageFallback />)} />
          <Route path="/user/basic-details" element={withSuspense(BasicDetailsForm, <KycPageFallback />)} />

          {/* KYC FLOW */}
          <Route path="/user/pan-verification" element={withSuspense(PanVerification, <KycPageFallback />)} />
          <Route path="/user/kyc-aadhaar" element={withSuspense(KycAadhaar, <KycPageFallback />)} />
          <Route path="/user/work-details" element={withSuspense(CompanyDetails, <KycPageFallback />)} />
          <Route path="/user/company-details" element={withSuspense(CompanyDetails, <KycPageFallback />)} />
          <Route path="/user/bank-details" element={withSuspense(BankDetails, <KycPageFallback />)} />
          <Route path="/user/references" element={withSuspense(References, <KycPageFallback />)} />
          <Route path="/user/salary-slip" element={withSuspense(SalarySlip, <KycPageFallback />)} />
          <Route path="/user/customer-video-kyc" element={withSuspense(CustomerVideoKYC, <KycPageFallback />)} />

          {/* FINAL STATUS */}
          <Route path="/user/loan-status" element={withSuspense(LoanStatus, <KycPageFallback />)} />

          {/* PUBLIC BLOGS */}
          <Route path="/blog" element={withSuspense(Blog, <ContentPageFallback />)} />
          <Route path="/blog/:slug" element={withSuspense(BlogDetail, <ContentPageFallback />)} />

          {/* ADMIN PORTALS */}
          <Route path="/admin" element={withSuspense(AdminLogin, <AuthPageFallback />)} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/dashboard" element={withSuspense(AdminDashboard, <DashboardPageFallback />)} />
          <Route path="/admin/leads" element={withSuspense(AdminLeads, <DashboardPageFallback />)} />
          <Route path="/admin/leads/:id" element={withSuspense(AdminLeadDetail, <DashboardPageFallback />)} />
          <Route path="/admin/contacts" element={withSuspense(AdminContacts, <DashboardPageFallback />)} />
          <Route path="/admin/blogs" element={withSuspense(AdminBlogs, <DashboardPageFallback />)} />
          <Route path="/admin/blogs/new" element={withSuspense(AdminBlogForm, <DashboardPageFallback />)} />
          <Route path="/admin/blogs/edit/:id" element={withSuspense(AdminBlogForm, <DashboardPageFallback />)} />

          <Route path="*" element={withSuspense(NotFound, <ContentPageFallback />)} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
