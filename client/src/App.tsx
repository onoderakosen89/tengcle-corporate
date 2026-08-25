import { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { JpLanguageProvider } from "./contexts/JpLanguageContext";
import { UsLanguageProvider } from "./contexts/UsLanguageContext";
import SplashScreen from "./components/SplashScreen";
import CookieConsent from "./components/CookieConsent";
import ScrollRestoration from "./components/ScrollRestoration";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import GeoRedirect from "./components/GeoRedirect";
import {
  regionPageDefinitions,
  supportedLanguages,
} from "@shared/seoRouteManifest";
// Lazy load pages for better performance
// Global Gateway
const GlobalGateway = lazy(() => import("./pages/GlobalGateway"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Hong Kong Pages
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const News = lazy(() => import("./pages/News"));
const NewsArticle = lazy(() => import("./pages/NewsArticle"));
const HotelFfeProcurement = lazy(
  () => import("./pages/services/HotelFfeProcurement")
);

// Japan Pages
const JpHome = lazy(() => import("./pages/jp/Home"));
const JpServices = lazy(() => import("./pages/jp/Services"));
const JpAbout = lazy(() => import("./pages/jp/About"));
const JpCareers = lazy(() => import("./pages/jp/Careers"));
const JpContact = lazy(() => import("./pages/jp/Contact"));
const JpFAQ = lazy(() => import("./pages/jp/FAQ"));
const JpNews = lazy(() => import("./pages/jp/News"));
const JpNewsArticle = lazy(() => import("./pages/jp/NewsArticle"));
const JpPropertyManagement = lazy(
  () => import("./pages/jp/services/PropertyManagement")
);

// US Pages
const UsHome = lazy(() => import("./pages/us/Home"));
const UsServices = lazy(() => import("./pages/us/Services"));
const UsAbout = lazy(() => import("./pages/us/About"));
const UsContact = lazy(() => import("./pages/us/Contact"));
const UsFAQ = lazy(() => import("./pages/us/FAQ"));
const UsNews = lazy(() => import("./pages/us/News"));
const UsNewsArticle = lazy(() => import("./pages/us/NewsArticle"));
const UsPropertyDevelopment = lazy(
  () => import("./pages/us/services/PropertyDevelopment")
);
const UsPropertyManagement = lazy(
  () => import("./pages/us/services/PropertyManagement")
);
const UsVacationRentals = lazy(
  () => import("./pages/us/services/VacationRentals")
);

// Shared Pages
const Privacy = lazy(() => import("./pages/Privacy"));

const hkPageComponents = {
  home: Home,
  services: Services,
  hotelFfe: HotelFfeProcurement,
  portfolio: Portfolio,
  about: About,
  contact: Contact,
  faq: FAQ,
  news: News,
  privacy: Privacy,
};

const jpPageComponents = {
  home: JpHome,
  services: JpServices,
  propertyManagement: JpPropertyManagement,
  about: JpAbout,
  careers: JpCareers,
  contact: JpContact,
  faq: JpFAQ,
  news: JpNews,
  privacy: Privacy,
};

const usPageComponents = {
  home: UsHome,
  services: UsServices,
  propertyDevelopment: UsPropertyDevelopment,
  propertyManagement: UsPropertyManagement,
  vacationRentals: UsVacationRentals,
  about: UsAbout,
  contact: UsContact,
  faq: UsFAQ,
  news: UsNews,
  privacy: Privacy,
};

// Page transition variants for each region
const pageTransitions = {
  hk: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as Easing },
  },
  jp: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing },
  },
  us: {
    // Use vertical motion so route entry never creates horizontal overflow on mobile.
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as Easing },
  },
  gateway: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
  },
};

// Hong Kong Router with Language Provider
function HkRouter() {
  const [location] = useLocation();
  const transition = pageTransitions.hk;

  return (
    <LanguageProvider>
      <ScrollToTop region="hk" />
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <Switch>
            {supportedLanguages.flatMap(language =>
              regionPageDefinitions.hk.map(page => (
                <Route
                  key={`hk-${language}-${page.key}`}
                  path={`/hk/${language}${page.suffix}`}
                  component={hkPageComponents[page.key]}
                />
              ))
            )}
            {supportedLanguages.map(language => (
              <Route
                key={`hk-${language}-article`}
                path={`/hk/${language}/news/:slug`}
                component={NewsArticle}
              />
            ))}

            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </LanguageProvider>
  );
}

// Japan Router with Japan Language Provider
function JpRouter() {
  const [location] = useLocation();
  const transition = pageTransitions.jp;

  return (
    <JpLanguageProvider>
      <ScrollToTop region="jp" />
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <Switch>
            {supportedLanguages.flatMap(language =>
              regionPageDefinitions.jp.map(page => (
                <Route
                  key={`jp-${language}-${page.key}`}
                  path={`/jp/${language}${page.suffix}`}
                  component={jpPageComponents[page.key]}
                />
              ))
            )}
            {supportedLanguages.map(language => (
              <Route
                key={`jp-${language}-article`}
                path={`/jp/${language}/news/:id`}
                component={JpNewsArticle}
              />
            ))}

            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </JpLanguageProvider>
  );
}

// US Router with US Language Provider
function UsRouter() {
  const [location] = useLocation();
  const transition = pageTransitions.us;

  return (
    <UsLanguageProvider>
      <ScrollToTop region="us" />
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <Switch>
            {supportedLanguages.flatMap(language =>
              regionPageDefinitions.us.map(page => (
                <Route
                  key={`us-${language}-${page.key}`}
                  path={`/us/${language}${page.suffix}`}
                  component={usPageComponents[page.key]}
                />
              ))
            )}
            {supportedLanguages.map(language => (
              <Route
                key={`us-${language}-article`}
                path={`/us/${language}/news/:id`}
                component={UsNewsArticle}
              />
            ))}

            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </UsLanguageProvider>
  );
}

function MainRouter() {
  const [location] = useLocation();
  const transition = pageTransitions.gateway;

  // Determine which region we're in
  const isHk = location.startsWith("/hk");
  const isJp = location.startsWith("/jp");
  const isUs = location.startsWith("/us");
  const isGateway = location === "/";
  const isPrivacy = location === "/privacy" || location === "/privacy/";

  if (isGateway) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="gateway"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <GlobalGateway />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isPrivacy) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="privacy"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <Privacy />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isHk) {
    return <HkRouter />;
  }

  if (isJp) {
    return <JpRouter />;
  }

  if (isUs) {
    return <UsRouter />;
  }

  return <NotFound />;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);
  const [location] = useLocation();

  // Only show splash on gateway page
  const isGateway = location === "/";
  const [, region, requestedLanguage] = location.split("/");
  const consentLanguage =
    requestedLanguage === "ja" || requestedLanguage === "zh"
      ? requestedLanguage
      : "en";
  const privacyPolicyPath =
    region === "hk" || region === "jp" || region === "us"
      ? `/${region}/${consentLanguage}/privacy`
      : "/privacy";

  useEffect(() => {
    // Check if user has already seen splash screen in this session
    const seen = sessionStorage.getItem("tengcle_splash_seen");
    if (seen) {
      setShowSplash(false);
      setHasSeenSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasSeenSplash(true);
    sessionStorage.setItem("tengcle_splash_seen", "true");
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ScrollRestoration />
          <GeoRedirect />
          <Toaster />
          {isGateway && showSplash && !hasSeenSplash && (
            <SplashScreen onComplete={handleSplashComplete} />
          )}
          <Suspense fallback={<PageLoader />}>
            <MainRouter />
          </Suspense>
          <CookieConsent
            lang={consentLanguage}
            privacyPolicyPath={privacyPolicyPath}
          />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
