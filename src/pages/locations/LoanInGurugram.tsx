import React from "react";
import LocationLoanTemplate, { LocationPageData } from "./LocationLoanTemplate";

const gurugramData: LocationPageData = {
  city: "Gurugram",
  stateRegion: "Haryana (Gurgaon / Delhi NCR)",
  title: "Personal Loan in Gurugram (Gurgaon) | Fast Approval - Waqt Money",
  metaDescription:
    "Get instant personal loan in Gurugram (Gurgaon) with Waqt Money. Quick disbursal for IT & MNC professionals in Cyber City, Golf Course Road & Udyog Vihar.",
  keywords:
    "Personal Loan in Gurugram, Personal Loan in Gurgaon, Instant Loan Cyber City Gurgaon, Salary Loan Golf Course Road, Quick Cash Loan Gurugram, Emergency Loan Gurgaon",
  canonicalUrl: "https://waqtmoney.com/loans/gurugram",
  heroHeadline: "Personal Loan in Gurugram",
  heroSubheadline:
    "Tailored instant financing for IT, corporate & MNC professionals in Cyber City, Golf Course Road, Udyog Vihar, and Sohna Road.",
  aboutCityTitle: "Fast Personal Credit for Corporate Workforce in Gurugram",
  aboutCityDescription:
    "Gurugram (Gurgaon) is India's Millennium City, hosting headquarters of global Fortune 500 companies, technology hubs, and luxury corporate towers. High living standards in Cyber City, Golf Course Extension, and DLF Phases mean financial needs can arise unexpectedly — whether for rent deposits, gadget purchases, family emergencies, or travel. Waqt Money offers rapid digital personal loans.",
  localHubs: [
    {
      name: "DLF Cyber City & Cyber Hub",
      type: "IT & Corporate Hub",
      description: "Fast loan sanction for software engineers, consultants, and MNC executives in Cyber City."
    },
    {
      name: "Golf Course Road & Extension",
      type: "Premium Commercial Corridor",
      description: "Quick digital personal loans for professionals working in Horizon Center, Sector 53, 54 & 56."
    },
    {
      name: "Udyog Vihar (Phases 1 - 5)",
      type: "Industrial & Tech Park",
      description: "Instant cash disbursals for employees in tech parks and corporate complexes across Udyog Vihar."
    },
    {
      name: "Sohna Road & Sector 48 / 49",
      type: "Corporate & Residential Sector",
      description: "Paperless personal loans for IT professionals in Spaze iTech Park, Bestech Park, and Vatika Business Park."
    },
    {
      name: "MG Road & IFFCO Chowk",
      type: "Commercial Center",
      description: "Rapid credit access for retail managers, corporate staff, and business executives."
    },
    {
      name: "Sector 57, 62 & Southern Peripheral Road",
      type: "Residential & Commercial Corridor",
      description: "Direct bank transfer personal loans for modern condominium residents and working professionals."
    }
  ],
  eligibilityPoints: [
    "Resident or employed in Gurugram (Gurgaon) or surrounding NCR",
    "Age between 21 to 58 years",
    "Salaried employee at an MNC, IT firm, private enterprise, or PSU with min. income ₹15,000 to ₹25,000",
    "Active Indian bank account with net banking capabilities",
    "Valid PAN and Aadhaar registered with active mobile number"
  ],
  documentsRequired: {
    identity: ["PAN Card", "Aadhaar Card"],
    income: ["3 Months Bank Account Statement", "Recent Salary Slip / Offer Letter"],
    address: ["Aadhaar Card", "Gurugram Utility Bill", "Company Lease / Rent Agreement"]
  },
  faqs: [
    {
      q: "1. How quickly is the money credited to my bank account in Gurugram?",
      a: "Disbursal happens quickly once your online Aadhaar e-KYC and digital application are verified."
    },
    {
      q: "2. Is there any physical document verification required in Gurugram?",
      a: "No, Waqt Money operates a 100% digital process. All document uploads, video KYC, and agreement sign-offs happen on your mobile phone."
    },
    {
      q: "3. What if I recently moved to Gurgaon for a job?",
      a: "If you have your appointment letter/salary slip and valid rent agreement for Gurgaon, you can apply for an instant personal loan."
    },
    {
      q: "4. What is the maximum tenure for a loan in Gurugram?",
      a: "Tenures range from 3 months up to 24 months, allowing flexible EMI payments aligned with your monthly salary cycle."
    },
    {
      q: "5. Is Waqt Money a regulated lending platform?",
      a: "Yes, Waqt Money partners with RBI-registered Non-Banking Financial Companies (NBFCs) like Waqt Finance Pvt Ltd."
    }
  ]
};

export default function LoanInGurugram() {
  return <LocationLoanTemplate data={gurugramData} />;
}
