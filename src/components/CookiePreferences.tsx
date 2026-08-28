import { useEffect, useState } from "react";

const STORAGE_KEY = "tengcle-cookie-consent";

export default function CookiePreferences() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(STORAGE_KEY) === null);
  }, []);

  function choose(value: "accepted-all" | "accepted-necessary") {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent("tengcle:cookie-consent", { detail: value })
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section
      className="cookie-panel"
      aria-label="Cookie preferences"
      aria-live="polite"
    >
      <p>
        We use necessary storage for your preference. Optional analytics stays
        off unless you choose Accept all. <a href="/privacy/">Privacy policy</a>
      </p>
      <div className="cookie-panel__actions">
        <button type="button" onClick={() => choose("accepted-necessary")}>
          Necessary only
        </button>
        <button type="button" onClick={() => choose("accepted-all")}>
          Accept all
        </button>
      </div>
    </section>
  );
}
