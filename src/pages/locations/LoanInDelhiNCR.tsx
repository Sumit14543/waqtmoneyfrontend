import React from "react";
import LocationLoanTemplate, { LocationPageData } from "./LocationLoanTemplate";

const delhiNcrData: LocationPageData = {
  city: "Delhi NCR",
  stateRegion: "Capital Region (Delhi, Gurugram, Noida, Ghaziabad, Faridabad)",
  title: "Personal Loan in Delhi NCR | Online Cash Loan Application - Waqt Money",
  metaDescription:
    "Apply for instant personal loan in Delhi NCR. Serving Delhi, Gurugram, Noida, Ghaziabad & Faridabad. 100% digital verification, quick bank disbursal.",
  keywords:
    "Personal Loan in Delhi NCR, Instant Loan Delhi NCR, Quick Cash Loan NCR, Online Salary Loan Noida Gurgaon Delhi, Fast Disbursal Loan Delhi NCR",
  canonicalUrl: "https://waqtmoney.com/loans/delhi-ncr",
  heroHeadline: "Personal Loan Across Delhi NCR",
  heroSubheadline:
    "Seamless digital financing across Delhi, Gurugram, Noida, Ghaziabad, and Faridabad with fast approval, paperless processing, and direct bank transfer.",
  aboutCityTitle: "Complete Financial Coverage Across Delhi NCR",
  aboutCityDescription:
    "The National Capital Region (Delhi NCR) is India's premier economic cluster, spanning Delhi, Gurugram, Noida, Greater Noida, Ghaziabad, and Faridabad. Commuters, tech workers, corporate managers, and small enterprise leaders across NCR need swift, transparent financial liquidity. Waqt Money offers a unified digital loan platform tailored for NCR residents.",
  localHubs: [
    {
      name: "Delhi (South, Central, North & West)",
      type: "Metropolitan Region",
      description: "Fast digital loans across all Delhi districts including Saket, CP, Dwarka, and Rohini."
    },
    {
      name: "Gurugram (Cyber City & Golf Course Road)",
      type: "IT & Corporate Capital",
      description: "Quick cash loans for MNC employees, IT professionals, and executives in Gurgaon."
    },
    {
      name: "Noida & Greater Noida",
      type: "Tech & Media Hub",
      description: "Instant personal loan approval for workforce in Sector 62, Sector 18, and Expressway."
    },
    {
      name: "Ghaziabad (Indirapuram & Vaishali)",
      type: "Residential Suburb",
      description: "Easy credit options for residents in Indirapuram, Vaishali, Vasundhara, and Raj Nagar Extension."
    },
    {
      name: "Faridabad & Ballabhgarh",
      type: "Industrial Corridor",
      description: "Reliable personal financing for industrial executives and salaried workers in Faridabad."
    },
    {
      name: "Manesar & Greater Noida Extension",
      type: "Manufacturing & Growth Hubs",
      description: "Digital personal loan disbursal for employees in IMT Manesar and Noida Extension."
    }
  ],
  eligibilityPoints: [
    "Resident of any district within Delhi NCR (Delhi, Gurugram, Noida, Ghaziabad, Faridabad)",
    "Age between 21 to 58 years",
    "Salaried employee with minimum monthly salary of ₹15,000",
    "Active Indian bank account with net banking or debit card",
    "Valid Aadhaar and PAN Card linked with mobile number for e-KYC"
  ],
  documentsRequired: {
    identity: ["PAN Card", "Aadhaar Card"],
    income: ["Latest 3 Months Bank Account Statement", "Recent Salary Slip"],
    address: ["Aadhaar Card", "Rent Agreement", "Utility Bill (Electricity/Water)"]
  },
  faqs: [
    {
      q: "1. How fast is disbursal for Delhi NCR applicants?",
      a: "With Waqt Money, once your online Aadhaar e-KYC and application are verified, disbursal is initiated directly to your account."
    },
    {
      q: "2. Can I apply for a Waqt Money loan if I live in Noida or Gurgaon and work in Delhi?",
      a: "Yes! As long as your residence or office is anywhere within the Delhi NCR region, you are fully eligible to apply online."
    },
    {
      q: "3. How does the digital verification work for NCR applicants?",
      a: "Verification is 100% paperless using Aadhaar OTP e-KYC and automated digital bank statement analysis."
    },
    {
      q: "4. What is the repayment tenure for Delhi NCR personal loans?",
      a: "Repayment tenures range flexibly from 3 months up to 24 months with affordable monthly EMIs."
    },
    {
      q: "5. Are there any hidden charges?",
      a: "No, all fees and loan terms are completely transparent and displayed before you sign your agreement."
    }
  ]
};

export default function LoanInDelhiNCR() {
  return <LocationLoanTemplate data={delhiNcrData} />;
}
