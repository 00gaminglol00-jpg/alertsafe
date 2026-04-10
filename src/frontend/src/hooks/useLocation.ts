import { useEffect, useState } from "react";
import type { UserLocation } from "../types";

const DEFAULT_LOCATION: UserLocation = {
  lat: 28.6139,
  lng: 77.209,
  label: "New Delhi, India (default)",
};

interface UseLocationResult {
  location: UserLocation | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => void;
  hasPermission: boolean | null;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLocation(DEFAULT_LOCATION);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
        });
        setHasPermission(true);
        setIsLoading(false);
      },
      (err) => {
        setHasPermission(false);
        setIsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location permission denied. Using default location.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError("Location unavailable. Using default location.");
        } else {
          setError("Could not retrieve location. Using default location.");
        }
        setLocation(DEFAULT_LOCATION);
      },
      { timeout: 10000, enableHighAccuracy: false },
    );
  };

  useEffect(() => {
    // Check existing permission without triggering prompt
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            setHasPermission(true);
            if (!navigator.geolocation) {
              setError("Geolocation is not supported by your browser.");
              setLocation(DEFAULT_LOCATION);
              return;
            }
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  label: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
                });
                setHasPermission(true);
                setIsLoading(false);
              },
              () => {
                setIsLoading(false);
                setLocation(DEFAULT_LOCATION);
              },
              { timeout: 10000, enableHighAccuracy: false },
            );
          } else {
            setLocation(DEFAULT_LOCATION);
          }
        })
        .catch(() => {
          setLocation(DEFAULT_LOCATION);
        });
    } else {
      setLocation(DEFAULT_LOCATION);
    }
  }, []);

  return { location, isLoading, error, requestLocation, hasPermission };
}
