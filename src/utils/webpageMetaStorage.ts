import { API_BASE_URL } from "@/config/api";

export interface WebpageFAQ {
  question: string;
  answer: string;
}

export interface WebpageMeta {
  path: string;
  pageName: string;
  category: "Core" | "Loans" | "Locations" | "Legal" | "Tools";
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  robots?: string;
  faqs?: WebpageFAQ[];
  customSchemaJson?: string;
  isCustomized?: boolean;
  updatedAt?: string;
}

// Preset master list of all website pages with their production defaults
export const DEFAULT_WEBPAGES: WebpageMeta[] = [
  // CORE & MARKETING
  {
    path: "/",
    pageName: "Home Page",
    category: "Core",
    metaTitle: "Waqt Money - Quick Online Personal Loans with Instant Approval",
    metaDescription: "Get instant personal loans, payday loans, and business loans online with Waqt Money. Quick approvals, paperless documentation, and direct disbursal within minutes.",
    keywords: "instant loan, online personal loan, quick cash, payday loan India, emergency loan",
    canonicalUrl: "https://waqtmoney.com/",
    ogImage: "/landing_banner_img.webp",
    robots: "index, follow",
    faqs: [
      {
        question: "How fast does Waqt Money disburse approved loans?",
        answer: "Once your digital KYC and bank statements are verified, loan funds are transferred directly to your bank account via IMPS/NEFT typically within 30 minutes to 2 hours."
      },
      {
        question: "What is the minimum eligibility criteria to apply?",
        answer: "Applicants must be Indian citizens aged 21+, earning a minimum monthly in-hand income of ₹15,000 for salaried employees, with a valid PAN and Aadhaar linked to their mobile."
      }
    ]
  },
  {
    path: "/about",
    pageName: "About Us",
    category: "Core",
    metaTitle: "About Us - Instant Payday & Personal Loans Fast Disbursal | Waqt Money",
    metaDescription: "Learn about Waqt Money and Waqt Finance Pvt Ltd. Our mission is to provide fast, transparent, and fair digital lending to underserved salaried professionals across India.",
    keywords: "about waqt money, waqt finance, fintech India, digital lending mission",
    canonicalUrl: "https://waqtmoney.com/about",
    ogImage: "/about-img.jpg",
    robots: "index, follow"
  },
  {
    path: "/services",
    pageName: "Our Loan Services",
    category: "Core",
    metaTitle: "Our Loan Products & Credit Services | Waqt Money",
    metaDescription: "Explore our range of digital lending products including personal loans, business loans, payday advance loans, vehicle loans, and property-backed credit.",
    keywords: "loan products, credit services, loan against property, unsecured personal loans",
    canonicalUrl: "https://waqtmoney.com/services",
    robots: "index, follow"
  },
  {
    path: "/contact",
    pageName: "Contact Us",
    category: "Core",
    metaTitle: "Contact Us - Customer Support & Office Location | Waqt Money",
    metaDescription: "Get in touch with Waqt Money customer support. Reach out via email, phone, or visit our office at BSI Business Park, Sector 63, Noida.",
    keywords: "waqt money customer care, loan support, contact waqt finance, noida office",
    canonicalUrl: "https://waqtmoney.com/contact",
    robots: "index, follow"
  },
  {
    path: "/faqs",
    pageName: "Frequently Asked Questions",
    category: "Core",
    metaTitle: "Frequently Asked Questions (FAQs) - Instant Loans | Waqt Money",
    metaDescription: "Find clear answers to common questions about eligibility, documentation, CIBIL scores, loan tenures, interest rates, and loan repayment with Waqt Money.",
    keywords: "loan faqs, instant loan questions, eligibility criteria, repayment rules",
    canonicalUrl: "https://waqtmoney.com/faqs",
    robots: "index, follow"
  },
  {
    path: "/emi-calculator",
    pageName: "EMI Calculator",
    category: "Tools",
    metaTitle: "Personal Loan EMI Calculator - Plan Your Monthly Payments | Waqt Money",
    metaDescription: "Calculate your monthly loan EMI, total interest payable, and repayment schedule instantly with Waqt Money's free interactive loan calculator.",
    keywords: "emi calculator, loan emi calculation, monthly installment, interest calculator",
    canonicalUrl: "https://waqtmoney.com/emi-calculator",
    robots: "index, follow"
  },
  {
    path: "/repayment",
    pageName: "Loan Repayment",
    category: "Tools",
    metaTitle: "Loan Repayment Portal - Pay EMIs Online Safely | Waqt Money",
    metaDescription: "Make hassle-free online loan repayments, check outstanding balances, and access re-loan offers securely through the Waqt Money repayment gateway.",
    keywords: "loan repayment, pay emi online, waqt money payment gateway, reloan offer",
    canonicalUrl: "https://waqtmoney.com/repayment",
    robots: "index, follow"
  },
  {
    path: "/policies",
    pageName: "Policies Hub",
    category: "Legal",
    metaTitle: "Company Policies & Regulatory Compliance | Waqt Money",
    metaDescription: "Review Waqt Money's compliance framework, customer protection rules, data privacy commitments, and responsible lending guidelines.",
    keywords: "lending policies, compliance, nbfc rules, customer protection",
    canonicalUrl: "https://waqtmoney.com/policies",
    robots: "index, follow"
  },

  // LOAN PRODUCT PAGES
  {
    path: "/loans/personal-loan",
    pageName: "Personal Loan",
    category: "Loans",
    metaTitle: "Instant Personal Loan Online in India | Fast Approval | Waqt Money",
    metaDescription: "Apply for unsecured personal loans up to ₹5,00,000 online with Waqt Money. Paperless e-KYC, competitive interest rates, and disbursal within minutes.",
    keywords: "personal loan, instant personal loan, emergency cash loan, unsecured credit",
    canonicalUrl: "https://waqtmoney.com/loans/personal-loan",
    ogImage: "/blog-assets/blog-1-personal-loan-guide.webp",
    robots: "index, follow",
    faqs: [
      {
        question: "Can I get a personal loan without collateral?",
        answer: "Yes, Waqt Money personal loans are 100% unsecured. You do not need to pledge any property, gold, or assets."
      },
      {
        question: "What is the loan tenure available?",
        answer: "We offer flexible repayment tenures ranging from 12 to 60 months based on your borrowing profile and preference."
      }
    ]
  },
  {
    path: "/loans/business-loan",
    pageName: "Business Loan",
    category: "Loans",
    metaTitle: "Business Loan up to ₹25 Lakhs | 10.49% p.a. | Waqt Money",
    metaDescription: "Fuel your business growth with collateral-free business loans up to ₹25 Lakhs. Quick online processing, transparent terms, and minimal documentation.",
    keywords: "business loan, msme loan, working capital loan, business credit line",
    canonicalUrl: "https://waqtmoney.com/loans/business-loan",
    ogImage: "/blog-assets/blog-3-small-business-owner.webp",
    robots: "index, follow"
  },
  {
    path: "/loans/payday-loan",
    pageName: "Payday Loan",
    category: "Loans",
    metaTitle: "Instant Payday Loans Online in India | Salary Advance | Waqt Money",
    metaDescription: "Short on cash before payday? Get an instant salary advance loan from ₹5,000 to ₹1,00,000. 100% confidential, quick 30-minute disbursal.",
    keywords: "payday loan, salary advance loan, emergency salary loan, month end cash",
    canonicalUrl: "https://waqtmoney.com/loans/payday-loan",
    ogImage: "/blog-assets/blog-5-payday-cash-advance.webp",
    robots: "index, follow"
  },
  {
    path: "/loans/short-term-loan",
    pageName: "Short Term Loan",
    category: "Loans",
    metaTitle: "Short Term Loans Online - Fast Approval for Emergencies | Waqt Money",
    metaDescription: "Access instant short-term personal credit with flexible repayment periods from 15 days to 12 months. Quick digital processing with minimal documents.",
    keywords: "short term loan, quick cash loan, urgent cash loan, short duration credit",
    canonicalUrl: "https://waqtmoney.com/loans/short-term-loan",
    robots: "index, follow"
  },
  {
    path: "/loans/loan-against-property",
    pageName: "Loan Against Property",
    category: "Loans",
    metaTitle: "Loan Against Property (LAP) in India | Low Interest Rates | Waqt Money",
    metaDescription: "Unlock the value of your residential or commercial property with a low-interest secured Loan Against Property up to ₹1 Crore.",
    keywords: "loan against property, lap, mortgage loan, secured loan against house",
    canonicalUrl: "https://waqtmoney.com/loans/loan-against-property",
    robots: "index, follow"
  },
  {
    path: "/loans/vehicle-loan",
    pageName: "Vehicle Loan",
    category: "Loans",
    metaTitle: "Vehicle Loan in India | Car & Two-Wheeler Loans | Waqt Money",
    metaDescription: "Drive your dream vehicle with affordable car and two-wheeler loans from Waqt Money. Up to 100% on-road financing and instant approvals.",
    keywords: "vehicle loan, car loan, two wheeler loan, bike loan online",
    canonicalUrl: "https://waqtmoney.com/loans/vehicle-loan",
    robots: "index, follow"
  },
  {
    path: "/loans/education-loan",
    pageName: "Education Loan",
    category: "Loans",
    metaTitle: "Education Loans for Higher Studies in India & Abroad | Waqt Money",
    metaDescription: "Finance college tuition, university fees, and living costs with student-friendly education loans with moratorium periods.",
    keywords: "education loan, student loan, higher studies funding, university loan",
    canonicalUrl: "https://waqtmoney.com/loans/education-loan",
    robots: "index, follow"
  },
  {
    path: "/loans/medical-loan",
    pageName: "Medical Loan",
    category: "Loans",
    metaTitle: "Medical Emergency Loan - Instant Healthcare Financing | Waqt Money",
    metaDescription: "Zero-stress medical loans for hospitalisation, surgeries, treatments, and urgent medicines. Priority approvals within 1 hour.",
    keywords: "medical loan, hospital expense loan, medical emergency loan, healthcare credit",
    canonicalUrl: "https://waqtmoney.com/loans/medical-loan",
    robots: "index, follow"
  },

  // LOCATION LANDING PAGES
  {
    path: "/loans/delhi",
    pageName: "Loan in Delhi",
    category: "Locations",
    metaTitle: "Personal Loan in Delhi | Instant Cash Loan Online | Waqt Money",
    metaDescription: "Fast personal loans for salaried employees and business owners residing across North, South, East, and West Delhi. Same-day disbursal.",
    keywords: "personal loan delhi, cash loan delhi, urgent loan delhi, nbfc loan delhi",
    canonicalUrl: "https://waqtmoney.com/loans/delhi",
    robots: "index, follow"
  },
  {
    path: "/loans/delhi-ncr",
    pageName: "Loan in Delhi NCR",
    category: "Locations",
    metaTitle: "Personal Loan in Delhi NCR | Online Cash Loans | Waqt Money",
    metaDescription: "Get instant personal and business loans across the entire National Capital Region (NCR). 100% digital verification and quick approval.",
    keywords: "personal loan delhi ncr, quick loan ncr, salary advance delhi ncr",
    canonicalUrl: "https://waqtmoney.com/loans/delhi-ncr",
    robots: "index, follow"
  },
  {
    path: "/loans/gurugram",
    pageName: "Loan in Gurugram (Gurgaon)",
    category: "Locations",
    metaTitle: "Personal Loan in Gurugram (Gurgaon) | Cyber City Instant Loans | Waqt Money",
    metaDescription: "Exclusive instant credit for corporate tech employees and professionals in Gurugram. Fast paperless approvals and low interest rates.",
    keywords: "personal loan gurugram, loan in gurgaon, cyber city personal loan",
    canonicalUrl: "https://waqtmoney.com/loans/gurugram",
    robots: "index, follow"
  },
  {
    path: "/loans/noida-greater-noida",
    pageName: "Loan in Noida & Greater Noida",
    category: "Locations",
    metaTitle: "Personal Loan in Noida & Greater Noida | Fast Disbursal | Waqt Money",
    metaDescription: "Instant personal and payday loans for residents and workers across Noida sectors and Greater Noida. Quick verification with instant cash payout.",
    keywords: "personal loan noida, loan greater noida, salary loan noida express",
    canonicalUrl: "https://waqtmoney.com/loans/noida-greater-noida",
    robots: "index, follow"
  },
  {
    path: "/loans/ghaziabad",
    pageName: "Loan in Ghaziabad",
    category: "Locations",
    metaTitle: "Personal Loan in Ghaziabad | Instant Digital Approval | Waqt Money",
    metaDescription: "Quick, hassle-free personal loans for salaried individuals and local businesses across Indirapuram, Vaishali, Raj Nagar, and Ghaziabad.",
    keywords: "personal loan ghaziabad, cash loan indirapuram, urgent loan vaishali",
    canonicalUrl: "https://waqtmoney.com/loans/ghaziabad",
    robots: "index, follow"
  },

  // LEGAL & COMPLIANCE
  {
    path: "/privacy-policy",
    pageName: "Privacy Policy",
    category: "Legal",
    metaTitle: "Privacy Policy & Data Security | Waqt Money",
    metaDescription: "Understand how Waqt Money collects, encrypts, protects, and handles your personal financial data under RBI guidelines and Indian IT Acts.",
    canonicalUrl: "https://waqtmoney.com/privacy-policy",
    robots: "index, follow"
  },
  {
    path: "/terms-conditions",
    pageName: "Terms & Conditions",
    category: "Legal",
    metaTitle: "Terms and Conditions of Use | Waqt Money",
    metaDescription: "Read the official user terms, borrower obligations, and lending service conditions governing use of the Waqt Money platform.",
    canonicalUrl: "https://waqtmoney.com/terms-conditions",
    robots: "index, follow"
  },
  {
    path: "/refund-policy",
    pageName: "Refund & Cancellation Policy",
    category: "Legal",
    metaTitle: "Refund & Cancellation Policy | Waqt Money",
    metaDescription: "Our policy regarding processing charges, cancellation rights, and fee reversals in case of loan cancellation or duplicate repayments.",
    canonicalUrl: "https://waqtmoney.com/refund-policy",
    robots: "index, follow"
  },
  {
    path: "/disclaimer",
    pageName: "Disclaimer",
    category: "Legal",
    metaTitle: "Legal & Regulatory Disclaimer | Waqt Money",
    metaDescription: "Official legal disclaimer on loan interest calculations, credit bureau reporting, and partner lending institution disclosures.",
    canonicalUrl: "https://waqtmoney.com/disclaimer",
    robots: "index, follow"
  },
  {
    path: "/grievance-redressal",
    pageName: "Grievance Redressal",
    category: "Legal",
    metaTitle: "Grievance Redressal & Customer Escalation Matrix | Waqt Money",
    metaDescription: "Details of our Grievance Redressal Officer, customer complaint escalation tiers, and RBI Ombudsman details for swift dispute resolution.",
    canonicalUrl: "https://waqtmoney.com/grievance-redressal",
    robots: "index, follow"
  },
  {
    path: "/responsible-lending",
    pageName: "Responsible Lending Practices",
    category: "Legal",
    metaTitle: "Responsible Lending Practices - NBFC Code of Conduct | Waqt Money",
    metaDescription: "Learn how Waqt Money practices transparent interest disclosures, fair debt recovery, and ethical lending without hidden penalties.",
    canonicalUrl: "https://waqtmoney.com/responsible-lending",
    robots: "index, follow"
  },

  // BLOG HUB
  {
    path: "/blog",
    pageName: "Financial Knowledge Hub (Blogs)",
    category: "Core",
    metaTitle: "Financial Knowledge Hub - Personal Finance & Credit Tips | Waqt Money",
    metaDescription: "Explore master guides, budgeting strategies, CIBIL improvement guides, and loan comparison insights written by financial analysts at Waqt Money.",
    keywords: "finance blog, cibil score guide, loan tips, financial planning India",
    canonicalUrl: "https://waqtmoney.com/blog",
    robots: "index, follow"
  }
];

const LOCAL_STORAGE_KEY = "waqt_custom_webpages_meta";

// In-memory runtime cache
let memoryCache: Record<string, WebpageMeta> | null = null;

// Read custom overrides from LocalStorage
export const getCustomWebpagesMetaFromStorage = (): Record<string, Partial<WebpageMeta>> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to read webpage metadata from localStorage:", err);
    return {};
  }
};

// Sync metadata from backend API
export const syncWebpagesMetaWithApi = async (): Promise<Record<string, WebpageMeta>> => {
  const customLocal = getCustomWebpagesMetaFromStorage();
  const merged: Record<string, WebpageMeta> = {};

  // Seed with defaults
  for (const page of DEFAULT_WEBPAGES) {
    merged[page.path] = { ...page };
    if (customLocal[page.path]) {
      merged[page.path] = {
        ...merged[page.path],
        ...customLocal[page.path],
        isCustomized: true,
      };
    }
  }

  // Try fetching backend records
  try {
    const res = await fetch(`${API_BASE_URL}/webpages-meta`, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.metaMap) {
        for (const [pathKey, apiRow] of Object.entries(data.metaMap as Record<string, any>)) {
          if (merged[pathKey]) {
            merged[pathKey] = {
              ...merged[pathKey],
              metaTitle: apiRow.meta_title || merged[pathKey].metaTitle,
              metaDescription: apiRow.meta_description || merged[pathKey].metaDescription,
              keywords: apiRow.meta_keywords || merged[pathKey].keywords,
              canonicalUrl: apiRow.canonical_url || merged[pathKey].canonicalUrl,
              ogImage: apiRow.og_image || merged[pathKey].ogImage,
              robots: apiRow.robots || merged[pathKey].robots,
              faqs: apiRow.faqs || merged[pathKey].faqs,
              customSchemaJson: apiRow.custom_schema || merged[pathKey].customSchemaJson,
              updatedAt: apiRow.updated_at,
              isCustomized: true,
            };
          }
        }
      }
    }
  } catch {
    // Fail gracefully and use local/preset data
  }

  memoryCache = merged;
  return merged;
};

// Synchronously get metadata for a specific route path
export const getWebpageMeta = (currentPath: string): WebpageMeta => {
  const normalized = currentPath.toLowerCase().replace(/\/+$/, "") || "/";

  // Check memory cache
  if (memoryCache && memoryCache[normalized]) {
    return memoryCache[normalized];
  }

  const customLocal = getCustomWebpagesMetaFromStorage();
  const defaultPage = DEFAULT_WEBPAGES.find(
    (p) => p.path.toLowerCase() === normalized
  );

  if (defaultPage) {
    const custom = customLocal[normalized];
    if (custom) {
      return { ...defaultPage, ...custom, isCustomized: true };
    }
    return { ...defaultPage };
  }

  // Generic fallback if unknown route
  return {
    path: currentPath,
    pageName: "Page",
    category: "Core",
    metaTitle: "Waqt Money - Quick Online Personal Loans with Instant Approval",
    metaDescription: "Instant online credit lines and personal loans from Waqt Money. 100% digital approvals and quick disbursal.",
    canonicalUrl: `https://waqtmoney.com${currentPath}`,
    robots: "index, follow"
  };
};

// Save metadata changes (syncs to LocalStorage AND Backend API)
export const saveWebpageMeta = async (
  path: string,
  updatedMeta: Partial<WebpageMeta>
): Promise<boolean> => {
  const normalized = path.toLowerCase().replace(/\/+$/, "") || "/";
  const customLocal = getCustomWebpagesMetaFromStorage();

  const recordToSave: Partial<WebpageMeta> = {
    ...customLocal[normalized],
    ...updatedMeta,
    path: normalized,
    isCustomized: true,
    updatedAt: new Date().toISOString()
  };

  customLocal[normalized] = recordToSave;

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customLocal));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }

  // Update memory cache
  if (memoryCache && memoryCache[normalized]) {
    memoryCache[normalized] = {
      ...memoryCache[normalized],
      ...recordToSave,
    };
  }

  // Sync with backend API
  try {
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`${API_BASE_URL}/webpages-meta`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        page_path: normalized,
        page_name: updatedMeta.pageName,
        meta_title: updatedMeta.metaTitle,
        meta_description: updatedMeta.metaDescription,
        meta_keywords: updatedMeta.keywords,
        canonical_url: updatedMeta.canonicalUrl,
        og_image: updatedMeta.ogImage,
        robots: updatedMeta.robots,
        faqs: updatedMeta.faqs,
        custom_schema: updatedMeta.customSchemaJson,
      }),
    });
    return res.ok;
  } catch {
    return true; // Successfully saved locally
  }
};

// Reset custom metadata back to default
export const resetWebpageMeta = async (path: string): Promise<boolean> => {
  const normalized = path.toLowerCase().replace(/\/+$/, "") || "/";
  const customLocal = getCustomWebpagesMetaFromStorage();
  delete customLocal[normalized];

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customLocal));
  } catch (err) {}

  const defaultPage = DEFAULT_WEBPAGES.find((p) => p.path === normalized);
  if (defaultPage && memoryCache) {
    memoryCache[normalized] = { ...defaultPage, isCustomized: false };
  }

  return true;
};
