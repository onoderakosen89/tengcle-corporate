import { createRoot } from "react-dom/client";
import App from "../../client/src/App";
import "../../client/src/index.css";

const root = document.querySelector<HTMLElement>("#legacy-runtime-root");
if (root) {
  createRoot(root).render(<App />);
  document.documentElement.classList.add("legacy-runtime-ready");
}
