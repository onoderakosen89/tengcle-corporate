import { createRoot } from "react-dom/client";
import CookiePreferences from "../components/CookiePreferences";

const root = document.querySelector<HTMLElement>("#cookie-preferences-root");
if (root) createRoot(root).render(<CookiePreferences />);
