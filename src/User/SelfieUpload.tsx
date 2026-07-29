import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, RefreshCcw, Video, ShieldAlert, Lock, RefreshCw } from "lucide-react";

type SelfieUploadProps = {
  file: File | null;
  error?: string;
  onCapture: (file: File | null) => void;
};

const SelfieUpload = ({ file, error, onCapture }: SelfieUploadProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [previewUrl, setPreviewUrl] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [errorType, setErrorType] = useState<"denied" | "in_use" | "not_found" | "http" | "unknown" | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    stopCamera();
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file, stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = useCallback(async () => {
    setCameraError("");
    setErrorType(null);
    setIsStarting(true);
    setPreviewUrl("");

    // 1. Check HTTPS / Secure Context
    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      setIsStarting(false);
      setErrorType("http");
      setCameraError("Camera requires a secure HTTPS connection. Please use https://");
      return;
    }

    // 2. Check Browser API support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsStarting(false);
      setErrorType("unknown");
      setCameraError("Camera is not supported in this browser.");
      return;
    }

    try {
      // Use universal, robust video constraint
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
        },
        audio: false,
      });

      stopCamera();
      streamRef.current = stream;

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play().catch((playErr) => console.warn("Video play error:", playErr));
      }

      setCameraActive(true);
      setIsStarting(false);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setIsStarting(false);
      setCameraActive(false);

      const errName = err?.name || "";

      if (errName === "NotAllowedError" || errName === "PermissionDeniedError") {
        setErrorType("denied");
        setCameraError("Camera permission is blocked in your browser.");
      } else if (errName === "NotReadableError" || errName === "TrackStartError") {
        setErrorType("in_use");
        setCameraError("Camera is currently in use by another app (Zoom/Teams/Camera app). Please close it and retry.");
      } else if (errName === "NotFoundError" || errName === "DevicesNotFoundError") {
        setErrorType("not_found");
        setCameraError("No camera device was found on this system.");
      } else {
        setErrorType("unknown");
        setCameraError("Unable to open camera. Please check permissions and try again.");
      }
    }
  }, [stopCamera]);

  // Auto-start camera on mount if no file uploaded
  useEffect(() => {
    if (file) return;
    void startCamera();
  }, [file, startCamera]);

  const captureSelfie = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      setCameraError("Camera preview is loading, please wait a moment...");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      setCameraError("Unable to capture selfie image.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError("Failed to save selfie photo.");
          return;
        }

        const selfieFile = new File([blob], `selfie-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        onCapture(selfieFile);
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  const retakeSelfie = () => {
    onCapture(null);
    setPreviewUrl("");
    void startCamera();
  };

  return (
    <div className="rounded-2xl border border-[#dfe7f2] bg-[#fbfdff] p-4">
      <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#d8c5ff] bg-white text-center p-2">
        {previewUrl ? (
          <img src={previewUrl} alt="Selfie preview" className="h-[280px] w-full rounded-xl object-cover" />
        ) : (
          <>
            {/* Always keep video element in DOM so ref is connected */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`h-[280px] w-full rounded-xl bg-black object-cover ${cameraActive ? "block" : "hidden"}`}
            />

            {!cameraActive && (
              <div className="px-4 py-8">
                {errorType === "denied" ? (
                  <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
                ) : (
                  <Video className="mx-auto h-12 w-12 text-[#8048e2]" />
                )}
                <p className="mt-3 text-base font-bold text-[#071d3a]">Live Camera Selfie</p>
                <p className="mt-1 text-xs font-medium text-[#718096]">
                  {isStarting
                    ? "Opening camera..."
                    : errorType === "denied"
                    ? "Camera permission is blocked in browser"
                    : errorType === "in_use"
                    ? "Camera is being used by another application"
                    : "Allow camera access to capture selfie"}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Clear Unblock Instructions if Denied */}
      {errorType === "denied" && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-left text-xs text-amber-900 shadow-sm">
          <p className="font-bold flex items-center gap-1.5 text-amber-800 text-sm">
            <Lock className="h-4 w-4 text-amber-700" /> Camera Permission Blocked in Browser:
          </p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-4 font-medium text-[#3a2e20]">
            <li>
              Look at the <strong>address bar</strong> at the top of Chrome (next to <strong>waqtmoney.com</strong>).
            </li>
            <li>
              Click the <strong>Sliders / Tune (⚙️ / 🔒)</strong> icon.
            </li>
            <li>
              Toggle <strong>Camera</strong> to <strong>Allow</strong>.
            </li>
            <li>
              Click <strong>"Try Camera Again"</strong> below or refresh the page.
            </li>
          </ol>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4">
        {!cameraActive && !file && (
          <button
            type="button"
            onClick={startCamera}
            disabled={isStarting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#8048e2] text-sm font-bold text-white shadow-[0_9px_18px_rgba(128,72,226,0.18)] hover:bg-[#6c39c4] disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isStarting ? "animate-spin" : ""}`} />
            {isStarting ? "Accessing Camera..." : errorType ? "Try Camera Again" : "Start Camera"}
          </button>
        )}

        {cameraActive && (
          <button
            type="button"
            onClick={captureSelfie}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#8048e2] text-base font-bold text-white shadow-[0_9px_18px_rgba(128,72,226,0.22)] hover:bg-[#6c39c4]"
          >
            <Camera className="h-5 w-5" />
            Capture Selfie Now
          </button>
        )}

        {file && (
          <button
            type="button"
            onClick={retakeSelfie}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#d8c5ff] bg-white text-sm font-bold text-[#8048e2] hover:bg-[#f8f5ff]"
          >
            <RefreshCcw className="h-4 w-4" />
            Retake Selfie Photo
          </button>
        )}
      </div>

      {file && (
        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#0c8f53]">
          <CheckCircle2 className="h-4 w-4" />
          Selfie captured successfully!
        </p>
      )}

      {cameraError && <p className="mt-2 text-center text-xs font-medium text-red-500">{cameraError}</p>}
      {error && <p className="mt-2 text-center text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default SelfieUpload;
