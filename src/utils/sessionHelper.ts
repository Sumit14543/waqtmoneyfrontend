import { API_BASE_URL, getApiHeaders } from "@/config/api";

/**
 * Retrieves the stored application ID from sessionStorage, localStorage,
 * aadhaarPendingApplicationId, or URL query parameters.
 * Automatically synchronizes the ID across sessionStorage and localStorage.
 */
export const getStoredApplicationId = (): string => {
  if (typeof window === "undefined") return "";

  try {
    // 1. Check URL query parameters (e.g. ?applicationId=123 or ?appId=123)
    const urlParams = new URLSearchParams(window.location.search);
    const urlAppId =
      urlParams.get("applicationId") || urlParams.get("appId") || urlParams.get("id");
    if (urlAppId && urlAppId.trim()) {
      persistApplicationId(urlAppId.trim());
      return urlAppId.trim();
    }

    // 2. Check sessionStorage
    const sessionAppId = sessionStorage.getItem("applicationId");
    if (sessionAppId && sessionAppId.trim()) {
      try {
        localStorage.setItem("applicationId", sessionAppId.trim());
      } catch {
        // Ignore storage quota errors
      }
      return sessionAppId.trim();
    }

    // 3. Check localStorage
    const localAppId = localStorage.getItem("applicationId");
    if (localAppId && localAppId.trim()) {
      try {
        sessionStorage.setItem("applicationId", localAppId.trim());
      } catch {
        // Ignore storage quota errors
      }
      return localAppId.trim();
    }

    // 4. Check aadhaarPendingApplicationId (saved before DigiLocker redirect)
    const pendingAadhaarAppId = localStorage.getItem("aadhaarPendingApplicationId");
    if (pendingAadhaarAppId && pendingAadhaarAppId.trim()) {
      persistApplicationId(pendingAadhaarAppId.trim());
      return pendingAadhaarAppId.trim();
    }
  } catch (err) {
    console.error("Error reading stored applicationId:", err);
  }

  return "";
};

/**
 * Persists the application ID to both sessionStorage and localStorage.
 */
export const persistApplicationId = (id: string): void => {
  if (!id || typeof window === "undefined") return;
  const cleanId = String(id).trim();
  if (!cleanId) return;

  try {
    sessionStorage.setItem("applicationId", cleanId);
  } catch {
    // Ignore storage errors
  }

  try {
    localStorage.setItem("applicationId", cleanId);
  } catch {
    // Ignore storage errors
  }
};

/**
 * Gets stored contact proof fields (phone, email, pan, upload token) from storage.
 */
export const getStoredContactProof = () => {
  if (typeof window === "undefined") {
    return { phone: "", email: "", pan: "", uploadToken: "" };
  }

  return {
    phone: sessionStorage.getItem("applyPhone") || localStorage.getItem("applyPhone") || "",
    email: sessionStorage.getItem("applyEmail") || localStorage.getItem("applyEmail") || "",
    pan: sessionStorage.getItem("applyPan") || localStorage.getItem("applyPan") || "",
    uploadToken:
      sessionStorage.getItem("applicationUploadToken") ||
      localStorage.getItem("applicationUploadToken") ||
      "",
  };
};

/**
 * Attempts to retrieve stored applicationId. If missing, attempts to recover session
 * from backend using stored contact proof / session cookie.
 */
export const recoverOrGetApplicationId = async (): Promise<string> => {
  const existingId = getStoredApplicationId();
  if (existingId) return existingId;

  try {
    const contact = getStoredContactProof();
    const response = await fetch(`${API_BASE_URL}/application/recover-session`, {
      method: "POST",
      credentials: "include",
      headers: getApiHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        mobile: contact.phone,
        email: contact.email,
        pan: contact.pan,
        applicationUploadToken: contact.uploadToken,
      }),
    });

    const result = await response.json().catch(() => ({}));
    const recoveredId =
      result.applicationId ||
      result.data?.id ||
      result.data?.applicationId ||
      result.id;

    if (response.ok && recoveredId) {
      persistApplicationId(String(recoveredId));
      return String(recoveredId);
    }
  } catch (err) {
    console.error("Application session recovery failed:", err);
  }

  return "";
};
