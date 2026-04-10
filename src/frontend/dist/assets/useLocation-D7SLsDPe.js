import { r as reactExports } from "./index-Bhx4ae-j.js";
const DEFAULT_LOCATION = {
  lat: 28.6139,
  lng: 77.209,
  label: "New Delhi, India (default)"
};
function useLocation() {
  const [location, setLocation] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [hasPermission, setHasPermission] = reactExports.useState(null);
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
          label: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
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
      { timeout: 1e4, enableHighAccuracy: false }
    );
  };
  reactExports.useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
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
                label: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
              });
              setHasPermission(true);
              setIsLoading(false);
            },
            () => {
              setIsLoading(false);
              setLocation(DEFAULT_LOCATION);
            },
            { timeout: 1e4, enableHighAccuracy: false }
          );
        } else {
          setLocation(DEFAULT_LOCATION);
        }
      }).catch(() => {
        setLocation(DEFAULT_LOCATION);
      });
    } else {
      setLocation(DEFAULT_LOCATION);
    }
  }, []);
  return { location, isLoading, error, requestLocation, hasPermission };
}
export {
  useLocation as u
};
