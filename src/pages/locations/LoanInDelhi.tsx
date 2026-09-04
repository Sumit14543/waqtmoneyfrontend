import React from "react";
import LocationLoanTemplate, { LocationPageData } from "./LocationLoanTemplate";

const delhiData: LocationPageData = {
  city: "Delhi",
  stateRegion: "National Capital Territory",
  title: "Personal Loan in Delhi | Instant Cash Loan Online - Waqt Money",
  metaDescription:
    "Apply for instant personal loan in Delhi with Waqt Money. 100% digital process, quick bank disbursal, zero collateral for salaried professionals.",
  keywords:
    "Personal Loan in Delhi, Instant Loan Delhi, Cash Loan in Delhi, Quick Loan South Delhi, Loan in Connaught Place, Salaried Personal Loan Delhi, Urgent Cash Loan Delhi",
  canonicalUrl: "https://waqtmoney.com/loans/delhi",
  heroHeadline: "Personal Loan in Delhi",
  heroSubheadline:
    "Get rapid digital loan approval and direct bank disbursal across Delhi with zero physical documentation and flexible repayment options.",
  aboutCityTitle: "Fast Personal Loans for Salaried Professionals in Delhi",
  aboutCityDescription:
    "Delhi is a fast-paced metropolis housing thousands of corporate offices, IT parks, government centers, and commercial hubs. From South Delhi to North Delhi, working professionals often face unexpected financial obligations like rent deposits, medical emergencies, gadget purchases, or travel needs. Waqt Money brings instant loans directly to your smartphone.",
  localHubs: [
    {
      name: "South Delhi & Saket",
      type: "Commercial & Residential Hub",
      description: "Fast loan approval for working professionals in Saket, Hauz Khas, Greater Kailash, and Nehru Place."
    },
    {
      name: "Connaught Place (CP) & Central Delhi",
      type: "Corporate Headquarters",
      description: "Quick cash loans for executives in CP, Barakhamba Road, ITO, and Janpath."
    },
    {
      name: "Dwarka & West Delhi",
      type: "Residential Hub",
      description: "Hassle-free digital personal loans for residents in Dwarka, Janakpuri, Rajouri Garden, and Uttam Nagar."
    },
    {
      name: "Rohini & Pitampura (North West Delhi)",
      type: "Commercial & Business Hub",
      description: "Easy credit access for salaried employees in Rohini Sectors, Netaji Subhash Place (NSP), and Pitampura."
    },
    {
      name: "Laxmi Nagar & Preet Vihar (East Delhi)",
      type: "Finance & Education Center",
      description: "Instant cash loans for young professionals in Laxmi Nagar, Nirman Vihar, and Mayur Vihar."
    },
    {
      name: "Okhla & Jasola (South East Delhi)",
      type: "Industrial & IT District",
      description: "Specialized loan disbursals for employees working in Okhla Industrial Area Phases 1, 2, 3 & Jasola."
    }
  ],
  eligibilityPoints: [
    "Resident of Delhi NCT or Delhi NCR region",
    "Age between 21 to 58 years",
    "Salaried professional with min. monthly income of ₹15,000 to ₹25,000",
    "Active Indian bank account with net banking / debit card",
    "Valid Aadhaar and PAN Card registered with active mobile number"
  ],
  documentsRequired: {
    identity: ["PAN Card", "Aadhaar Card"],
    income: ["Latest 3 Months Bank Account Statement", "Recent Salary Slip"],
    address: ["Aadhaar Card", "Utility Bill", "Rent Agreement"]
  },
  faqs: [
    {
      q: "1. How fast can I get a personal loan in Delhi from Waqt Money?",
      a: "Our entire process is 100% digital. Once you fill in your details and complete online Aadhaar KYC, evaluation takes place automatically and disbursal is initiated directly into your bank account."
    },
    {
      q: "2. Is collateral or property security required for a loan in Delhi?",
      a: "No, Waqt Money personal loans are completely unsecured. You do not need to pledge gold, property, or any asset."
    },
    {
      q: "3. What is the minimum monthly salary needed for a loan in Delhi?",
      a: "Salaried individuals with a minimum monthly salary of ₹15,000 can apply for a quick instant cash loan with Waqt Money."
    },
    {
      q: "4. Can I apply for a loan if I live in rented accommodation in Delhi?",
      a: "Yes! A valid rent agreement along with your Aadhaar or utility bill serves as acceptable address proof for loan sanction in Delhi."
    },
    {
      q: "5. How do I repay my loan?",
      a: "Repayment can be done easily via auto-debit (NACH) or online net banking/UPI EMI options."
    }
  ]
};

export default function LoanInDelhi() {
  return <LocationLoanTemplate data={delhiData} />;
}
