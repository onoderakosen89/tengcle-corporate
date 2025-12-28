/**
 * Scroll Restoration Component
 * 
 * Automatically scrolls to the top of the page when the route changes.
 * This fixes the issue where navigating to a new page keeps the scroll position
 * from the previous page.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top immediately when location changes
    window.scrollTo(0, 0);
    
    // Also reset any scroll containers if needed
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);

  return null;
}
