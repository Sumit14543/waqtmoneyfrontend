import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Navigation, ShieldAlert, CheckCircle2, RefreshCw, AlertTriangle, Lock } from "lucide-react";
import { API_BASE_URL, getApiHeaders } from "@/config/api";
import { getDeviceInfo } from "@/utils/deviceInfo";

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  capturedAt: string;
}

interface LocationCaptureModalProps {
  isOpen: boolean;
  applicationId: string;
  onSuccess: (data: LocationData) => void;
  onCancel?: () => void;
}

export const LocationCaptureModal: React.FC<LocationCaptureModalProps> = ({
  isOpen,
  applicationId,
  onSuccess,
  onCancel,
}) => {
  const [status, setStatus] = useState<"idle" | "requesting" | "retrying" | "success" | "denied" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [lowAccuracyWarning, setLowAccuracyWarning] = useState(false);
  const [isSubmittingLocation, setIsSubmittingLocation] = useState(false);

  const saveLocationToBackend = useCallback(
    async (coords: GeolocationCoordinates, isLowAcc: boolean) => {
      setIsSubmittingLocation(true);
      try {
        const capturedAt = new Date().toISOString();
        const deviceInfo = await getDeviceInfo();

        const payload = {
          applicationId,
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          capturedAt,
          device: deviceInfo.deviceType,
          deviceType: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          operatingSystem: deviceInfo.operatingSystem,
          userAgent: deviceInfo.userAgent,
          locationStatus: isLowAcc ? "low_accuracy" : "captured",
          batteryStatus: deviceInfo.batteryStatus,
          networkType: deviceInfo.networkType,
        };

        const response = await fetch(`${API_BASE_URL}/location/save`, {
          method: "POST",
          headers: getApiHeaders({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.success) {
          console.warn("Backend location save response warning:", result);
        }

        const data: LocationData = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          capturedAt,
        };

        setLocationData(data);
        setStatus("success");

        setTimeout(() => {
          onSuccess(data);
        }, 1200);
      } catch (err) {
        console.error("Failed to post location to backend:", err);
        // Even if network fails briefly, local coords are captured; proceed with success callback
        const data: LocationData = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          capturedAt: new Date().toISOString(),
        };
        setLocationData(data);
        setStatus("success");
        setTimeout(() => {
          onSuccess(data);
        }, 1200);
      } finally {
        setIsSubmittingLocation(false);
      }
    },
    [applicationId, onSuccess]
  );

  const requestGPSLocation = useCallback(
    (isRetryAttempt = false) => {
      if (!navigator.geolocation) {
        setStatus("error");
        setErrorMessage("Geolocation is not supported by your browser. Please try another browser.");
        return;
      }

      setStatus(isRetryAttempt ? "retrying" : "requesting");
      setErrorMessage("");
      setLowAccuracyWarning(false);

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          const isLowAcc = coords.accuracy > 100;

          if (isLowAcc && !isRetryAttempt) {
            setLowAccuracyWarning(true);
            // Attempt automatic high accuracy retry once
            setTimeout(() => {
              requestGPSLocation(true);
            }, 1000);
            return;
          }

          void saveLocationToBackend(coords, isLowAcc);
        },
        (error) => {
          console.error("Geolocation error code:", error.code, error.message);
          setStatus("denied");

          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Location access is required to continue your loan application. Please allow location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("GPS signal unavailable. Please ensure Location / GPS services are enabled on your device.");
              break;
            case error.TIMEOUT:
              setErrorMessage("Location request timed out. Please click Retry Location.");
              break;
            default:
              setErrorMessage("Unable to capture your live GPS location. Please try again.");
              break;
          }
        },
        options
      );
    },
    [saveLocationToBackend]
  );

  useEffect(() => {
    if (isOpen && status === "idle") {
      requestGPSLocation();
    }
  }, [isOpen, status, requestGPSLocation]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/80 bg-white p-6 sm:p-8 text-center shadow-2xl">
        
        {/* REQUESTING / LOADING STATE */}
        {(status === "requesting" || status === "retrying" || isSubmittingLocation) && (
          <div className="py-6 flex flex-col items-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400/40 opacity-75"></span>
              <span className="absolute inline-flex h-20 w-20 animate-pulse rounded-full bg-purple-100"></span>
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#8048e2] to-[#b356e4] text-white shadow-lg">
                <Navigation className="h-7 w-7 animate-spin text-white" style={{ animationDuration: "3s" }} />
              </div>
            </div>

            <h3 className="mt-6 text-xl font-extrabold text-[#071d3a]">
              {status === "retrying" ? "Refining GPS Location..." : "Location Permission Requested"}
            </h3>

            <div className="mt-3 rounded-2xl border border-purple-100 bg-purple-50/70 p-3.5 text-xs font-semibold text-purple-900 leading-relaxed max-w-[340px]">
              {lowAccuracyWarning ? (
                "Low GPS accuracy detected. Retrying automatically for higher precision..."
              ) : (
                <span className="flex flex-col items-center gap-1">
                  <span>📍 Please click <strong>ALLOW</strong> on your browser popup at top-left to continue.</span>
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
              <MapPin className="h-4 w-4 animate-bounce text-purple-600" />
              <span>HTML5 High Accuracy GPS Mode Active</span>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="py-6 flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-in zoom-in-75 duration-300">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#071d3a]">
              Location Captured!
            </h3>

            <p className="mt-1 text-sm text-slate-500 font-medium">
              Live GPS coordinates verified successfully.
            </p>

            {locationData && (
              <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs font-mono font-semibold text-emerald-800 flex items-center justify-center gap-3">
                <span>Lat: {locationData.latitude.toFixed(6)}</span>
                <span>•</span>
                <span>Lng: {locationData.longitude.toFixed(6)}</span>
              </div>
            )}
          </div>
        )}

        {/* DENIED / ERROR STATE */}
        {(status === "denied" || status === "error") && (
          <div className="py-4 flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm">
              <ShieldAlert className="h-10 w-10" />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#071d3a]">
              Location Access Required
            </h3>

            <div className="mt-3 rounded-2xl border border-rose-100 bg-rose-50/80 p-4 text-left">
              <p className="text-xs font-semibold leading-relaxed text-rose-700">
                {errorMessage || "Location access is required to continue your loan application."}
              </p>

              <div className="mt-3 border-t border-rose-100 pt-3 text-[11px] font-medium text-slate-600 space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-rose-600 inline" />
                  Browser Popup Disabled / Blocked?
                </p>
                <p>1. Click the 🔒 <strong>Lock / Info icon</strong> in your browser address bar (top left).</p>
                <p>2. Change <strong>Location</strong> setting to <strong>Allow</strong>.</p>
                <p>3. Click the <strong>Allow Location & Retry</strong> button below to open popup.</p>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={() => requestGPSLocation(true)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8048e2] to-[#bd56e4] text-sm font-bold text-white shadow-lg hover:opacity-95 transition"
              >
                <RefreshCw className="h-4 w-4" />
                Allow Location & Retry
              </button>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LocationCaptureModal;
