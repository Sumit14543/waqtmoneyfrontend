const envApiUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL =
  envApiUrl && !envApiUrl.includes("localhost")
    ? envApiUrl
    : import.meta.env.PROD
      ? "https://api.waqtmoney.com/api"
      : (envApiUrl || "http://localhost:5000/api");


export const ACTIVE_LOAN_APPLICATION_MESSAGE = "You have already applied for a loan.";

export const normalizeApiMessage = (message: unknown, fallback = "Something went wrong") => {
  const text = String(message || "").trim();

  if (
    text.toLowerCase().includes("with this number") ||
    text.toLowerCase().includes("with this email") ||
    text.toLowerCase().includes("with this mail")
  ) {
    return text;
  }

  if (
    /already\s+(?:registered|appl(?:y|ied)|have|exist)|different\s+number|active\s+application/i.test(text)
  ) {
    return ACTIVE_LOAN_APPLICATION_MESSAGE;
  }

  return text || fallback;
};

// In-Memory CSRF Token Cache
let cachedCsrfToken = "";

export const fetchCsrfToken = async () => {
  if (cachedCsrfToken) return cachedCsrfToken;
  try {
    const res = await fetch(`${API_BASE_URL}/csrf-token`);
    const data = await res.json();
    if (data.success && data.csrfToken) {
      cachedCsrfToken = data.csrfToken;
      return cachedCsrfToken;
    }
  } catch (e) {
    // Graceful fallback
  }
  return "";
};

export const getApiHeaders = (extraHeaders: Record<string, string> = {}) => {
  const headers: Record<string, string> = { ...extraHeaders };

  const id = sessionStorage.getItem("applicationId") || localStorage.getItem("applicationId");
  const phone = sessionStorage.getItem("applyPhone") || localStorage.getItem("applyPhone");
  const email = sessionStorage.getItem("applyEmail") || localStorage.getItem("applyEmail");
  const pan = sessionStorage.getItem("applyPan") || localStorage.getItem("applyPan");
  const token = sessionStorage.getItem("applicationUploadToken") || localStorage.getItem("applicationUploadToken");
  const adminToken = localStorage.getItem("admin_token");

  if (id) headers["X-Application-Id"] = id;
  if (phone) headers["X-Application-Mobile"] = phone;
  if (email) headers["X-Application-Email"] = email;
  if (pan) headers["X-Application-Pan"] = pan;
  if (token) headers["X-Application-Upload-Token"] = token;
  if (adminToken) headers["Authorization"] = `Bearer ${adminToken}`;
  if (cachedCsrfToken) headers["X-CSRF-Token"] = cachedCsrfToken;

  return headers;
};

export const getBlogImageUrl = (
  imgPath?: string,
  fallback = "/blog-assets/blog-1-personal-loan-guide.webp"
): string => {
  if (!imgPath || !imgPath.trim()) return fallback;
  const path = imgPath.trim();

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/uploads/") || path.startsWith("uploads/")) {
    const apiBase = API_BASE_URL.replace(/\/api\/?$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${apiBase}${cleanPath}`;
  }

  if (path.startsWith("/blog-assets/") || path.startsWith("blog-assets/")) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  if (path.startsWith("/blog/")) {
    return path.replace(/^\/blog\//, "/blog-assets/");
  }

  return `/blog-assets/${path}`;
};

