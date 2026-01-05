import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * GeoRedirect Component
 * Redirects users to region-specific homepage based on their geographic location
 * Uses IP geolocation to determine user's country
 */
export default function GeoRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Only redirect on the root path
    if (window.location.pathname !== "/") {
      return;
    }

    // Check if user has already been redirected in this session
    const redirected = sessionStorage.getItem("tengcle_geo_redirected");
    if (redirected) {
      return;
    }

    // Fetch user's country from IP geolocation service
    const detectCountry = async () => {
      try {
        // Using ip-api.com (free tier, no API key required)
        const response = await fetch("https://ipapi.co/json/", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch geolocation");
        }

        const data = await response.json();
        const countryCode = data.country_code?.toUpperCase();

        // Determine redirect target based on country
        let redirectTarget = "/"; // Default to global gateway

        if (countryCode === "HK" || countryCode === "SG") {
          redirectTarget = "/hk/en";
        } else if (countryCode === "JP") {
          redirectTarget = "/jp/ja";
        } else if (countryCode === "US" || countryCode === "CA") {
          redirectTarget = "/us/en";
        }

        // Mark as redirected to avoid infinite loops
        sessionStorage.setItem("tengcle_geo_redirected", "true");

        // Only redirect if target is different from current path
        if (redirectTarget !== "/") {
          setLocation(redirectTarget);
        }
      } catch (error) {
        // If geolocation fails, just keep user on gateway
        console.debug("Geolocation detection failed, keeping user on gateway");
        sessionStorage.setItem("tengcle_geo_redirected", "true");
      }
    };

    // Add a small delay to ensure smooth UX
    const timer = setTimeout(detectCountry, 100);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return null; // This component doesn't render anything
}
