export interface BackgroundLocationResult {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  capturedAt: string;
  locationPermission: "granted" | "denied" | "timeout" | "error" | "unsupported";
}

let cachedLocationResult: BackgroundLocationResult | null = null;
let capturePromise: Promise<BackgroundLocationResult> | null = null;

/**
 * Silently requests HTML5 Geolocation in the background.
 * Configuration: enableHighAccuracy = true, timeout = 10000, maximumAge = 0.
 * Never throws uncaught errors or blocks UI.
 */
export const captureBackgroundLocation = (): Promise<BackgroundLocationResult> => {
  if (cachedLocationResult && cachedLocationResult.locationPermission === "granted") {
    return Promise.resolve(cachedLocationResult);
  }

  if (capturePromise) {
    return capturePromise;
  }

  capturePromise = new Promise<BackgroundLocationResult>((resolve) => {
    if (typeof window === "undefined" || !navigator || !navigator.geolocation) {
      const result: BackgroundLocationResult = {
        latitude: null,
        longitude: null,
        accuracy: null,
        capturedAt: new Date().toISOString(),
        locationPermission: "unsupported",
      };
      cachedLocationResult = result;
      resolve(result);
      return;
    }

    let resolved = false;

    // Safety timeout in case browser getCurrentPosition hangs
    const safetyTimeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        const result: BackgroundLocationResult = {
          latitude: null,
          longitude: null,
          accuracy: null,
          capturedAt: new Date().toISOString(),
          locationPermission: "timeout",
        };
        cachedLocationResult = result;
        resolve(result);
      }
    }, 10500);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(safetyTimeout);

        const result: BackgroundLocationResult = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          capturedAt: new Date(position.timestamp || Date.now()).toISOString(),
          locationPermission: "granted",
        };
        cachedLocationResult = result;
        resolve(result);
      },
      (error) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(safetyTimeout);

        let permStatus: BackgroundLocationResult["locationPermission"] = "error";
        if (error.code === error.PERMISSION_DENIED) {
          permStatus = "denied";
        } else if (error.code === error.TIMEOUT) {
          permStatus = "timeout";
        }

        const result: BackgroundLocationResult = {
          latitude: null,
          longitude: null,
          accuracy: null,
          capturedAt: new Date().toISOString(),
          locationPermission: permStatus,
        };
        cachedLocationResult = result;
        resolve(result);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });

  return capturePromise;
};

/**
 * Initiates silent background location capture early (e.g. on page mount)
 */
export const initiateBackgroundLocationCapture = () => {
  void captureBackgroundLocation();
};
