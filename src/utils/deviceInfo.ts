export interface ExtendedDeviceInfo {
  deviceType: string;
  browser: string;
  operatingSystem: string;
  userAgent: string;
  screenResolution: string;
  devicePixelRatio: number;
  language: string;
  timezone: string;
  networkType: string;
  batteryStatus: string;
}

export const getDeviceInfo = async (): Promise<ExtendedDeviceInfo> => {
  const ua = navigator.userAgent || "";

  // Device Type Detection
  let deviceType = "Desktop";
  if (/mobile/i.test(ua)) {
    deviceType = "Mobile";
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = "Tablet";
  } else if (window.innerWidth <= 768) {
    deviceType = "Mobile";
  }

  // OS Detection
  let operatingSystem = "Unknown OS";
  if (/android/i.test(ua)) {
    operatingSystem = "Android";
  } else if (/ipad|iphone|ipod/i.test(ua)) {
    operatingSystem = "iOS";
  } else if (/windows/i.test(ua)) {
    operatingSystem = "Windows";
  } else if (/mac os/i.test(ua)) {
    operatingSystem = "macOS";
  } else if (/linux/i.test(ua)) {
    operatingSystem = "Linux";
  }

  // Browser Detection
  let browser = "Unknown Browser";
  if (/edg/i.test(ua)) {
    browser = "Edge";
  } else if (/chrome|crios/i.test(ua)) {
    browser = "Chrome";
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = "Safari";
  } else if (/firefox|fxios/i.test(ua)) {
    browser = "Firefox";
  } else if (/opr\//i.test(ua)) {
    browser = "Opera";
  }

  // Screen resolution
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const devicePixelRatio = window.devicePixelRatio || 1;

  // Language & Timezone
  const language = navigator.language || "en-US";
  let timezone = "Unknown";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    // Ignore error
  }

  // Network connection type if available
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const networkType = connection?.effectiveType || connection?.type || "unknown";

  // Battery status if supported
  let batteryStatus = "unknown";
  try {
    if (typeof (navigator as any).getBattery === "function") {
      const battery = await (navigator as any).getBattery();
      const level = Math.round((battery.level || 0) * 100);
      const charging = battery.charging ? "Charging" : "Discharging";
      batteryStatus = `${level}% (${charging})`;
    }
  } catch {
    // Ignore battery error if not allowed/supported
  }

  return {
    deviceType,
    browser,
    operatingSystem,
    userAgent: ua,
    screenResolution,
    devicePixelRatio,
    language,
    timezone,
    networkType,
    batteryStatus,
  };
};
