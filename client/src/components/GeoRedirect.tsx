import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const regionalHomes = new Set(["/hk/en", "/jp/ja", "/us/en"]);

export default function GeoRedirect() {
  const [location, setLocation] = useLocation();
  const handled = useRef(false);

  useEffect(() => {
    const markHandled = () => {
      handled.current = true;
      try {
        sessionStorage.setItem("tengcle_geo_redirected", "true");
      } catch {
        // The in-memory guard still respects navigation when storage is blocked.
      }
    };

    // A chosen page or explicit Global visit wins over automatic selection.
    // Returning to Global must not override that choice.
    if (
      location !== "/" ||
      new URLSearchParams(window.location.search).get("view") === "global"
    ) {
      markHandled();
      return;
    }
    if (handled.current) return;
    try {
      if (sessionStorage.getItem("tengcle_geo_redirected")) return;
    } catch {
      // Automatic selection can run without browser storage.
    }

    const controller = new AbortController();
    let active = true;
    let timeout: ReturnType<typeof setTimeout>;
    const detectRegion = async () => {
      timeout = setTimeout(() => controller.abort(), 2_500);
      try {
        const response = await fetch("/api/region", {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Region selection unavailable");
        const data = await response.json();
        if (!active || window.location.pathname !== "/") return;
        markHandled();
        if (regionalHomes.has(data?.route)) setLocation(data.route);
      } catch {
        // An unavailable/slow endpoint leaves the manual gateway usable.
        if (active) markHandled();
      } finally {
        clearTimeout(timeout);
      }
    };
    const timer = setTimeout(detectRegion, 100);

    return () => {
      active = false;
      clearTimeout(timer);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [location, setLocation]);

  return null;
}
