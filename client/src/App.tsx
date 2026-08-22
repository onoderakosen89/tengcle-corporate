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

// Japan Pages
const JpHome = lazy(() => import("./pages/jp/Home"));
const JpServices = lazy(() => import("./pages/jp/Services"));
const JpAbout = lazy(() => import("./pages/jp/About"));
const JpCareers = lazy(() => import("./pages/jp/Careers"));
const JpContact = lazy(() => import("./pages/jp/Contact"));
const JpFAQ = lazy(() => import("./pages/jp/FAQ"));
const JpNews = lazy(() => import("./pages/jp/News"));
const JpNewsArticle = lazy(() => import("./pages/jp/NewsArticle"));

// US Pages
const UsHome = lazy(() => import("./pages/us/Home"));
const UsServices = lazy(() => import("./pages/us/Services"));
const UsAbout = lazy(() => import("./pages/us/About"));
const UsContact = lazy(() => import("./pages/us/Contact"));
const UsFAQ = lazy(() => import("./pages/us/FAQ"));
const UsNews = lazy(() => import("./pages/us/News"));
const UsNewsArticle = lazy(() => import("./pages/us/NewsArticle"));
const UsPropertyDevelopment = lazy(() => import("./pages/us/services/PropertyDevelopment"));
const UsPropertyManagement = lazy(() => import("./pages/us/services/PropertyManagement"));
const UsVacationRentals = lazy(() => import("./pages/us/services/VacationRentals"));

// Shared Pages
const Privacy = lazy(() => import("./pages/Privacy"));

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
            {/* Hong Kong Routes - English */}
            <Route path="/hk/en" component={Home} />
            <Route path="/hk/en/services" component={Services} />
            <Route path="/hk/en/portfolio" component={Portfolio} />
            <Route path="/hk/en/about" component={About} />
            <Route path="/hk/en/contact" component={Contact} />

            {/* Hong Kong Routes - Japanese */}
            <Route path="/hk/ja" component={Home} />
            <Route path="/hk/ja/services" component={Services} />
            <Route path="/hk/ja/portfolio" component={Portfolio} />
            <Route path="/hk/ja/about" component={About} />
            <Route path="/hk/ja/contact" component={Contact} />

            {/* Hong Kong Routes - Chinese */}
            <Route path="/hk/zh" component={Home} />
            <Route path="/hk/zh/services" component={Services} />
            <Route path="/hk/zh/portfolio" component={Portfolio} />
            <Route path="/hk/zh/about" component={About} />
            <Route path="/hk/zh/contact" component={Contact} />

            {/* FAQ */}
            <Route path="/hk/en/faq" component={FAQ} />
            <Route path="/hk/ja/faq" component={FAQ} />
            <Route path="/hk/zh/faq" component={FAQ} />

            {/* News */}
            <Route path="/hk/en/news" component={News} />
            <Route path="/hk/ja/news" component={News} />
            <Route path="/hk/zh/news" component={News} />
            <Route path="/hk/en/news/:slug" component={NewsArticle} />
            <Route path="/hk/ja/news/:slug" component={NewsArticle} />
            <Route path="/hk/zh/news/:slug" component={NewsArticle} />

            {/* Privacy Policy */}
            <Route path="/hk/en/privacy" component={Privacy} />
            <Route path="/hk/ja/privacy" component={Privacy} />
            <Route path="/hk/zh/privacy" component={Privacy} />

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
            {/* Japan Routes - Japanese */}
            <Route path="/jp/ja" component={JpHome} />
            <Route path="/jp/ja/services" component={JpServices} />
            <Route path="/jp/ja/about" component={JpAbout} />
            <Route path="/jp/ja/careers" component={JpCareers} />
            <Route path="/jp/ja/contact" component={JpContact} />
            <Route path="/jp/ja/faq" component={JpFAQ} />
            <Route path="/jp/ja/news" component={JpNews} />
            <Route path="/jp/ja/news/:id" component={JpNewsArticle} />

            {/* Japan Routes - English */}
            <Route path="/jp/en" component={JpHome} />
            <Route path="/jp/en/services" component={JpServices} />
            <Route path="/jp/en/about" component={JpAbout} />
            <Route path="/jp/en/careers" component={JpCareers} />
            <Route path="/jp/en/contact" component={JpContact} />
            <Route path="/jp/en/faq" component={JpFAQ} />
            <Route path="/jp/en/news" component={JpNews} />
            <Route path="/jp/en/news/:id" component={JpNewsArticle} />

            {/* Japan Routes - Chinese */}
            <Route path="/jp/zh" component={JpHome} />
            <Route path="/jp/zh/services" component={JpServices} />
            <Route path="/jp/zh/about" component={JpAbout} />
            <Route path="/jp/zh/careers" component={JpCareers} />
            <Route path="/jp/zh/contact" component={JpContact} />
            <Route path="/jp/zh/faq" component={JpFAQ} />
            <Route path="/jp/zh/news" component={JpNews} />
            <Route path="/jp/zh/news/:id" component={JpNewsArticle} />

            {/* Privacy Policy */}
            <Route path="/jp/ja/privacy" component={Privacy} />
            <Route path="/jp/en/privacy" component={Privacy} />
            <Route path="/jp/zh/privacy" component={Privacy} />

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
            {/* US Routes - English */}
            <Route path="/us/en" component={UsHome} />
            <Route path="/us/en/services" component={UsServices} />
            <Route path="/us/en/services/property-development" component={UsPropertyDevelopment} />
            <Route path="/us/en/services/property-management" component={UsPropertyManagement} />
            <Route path="/us/en/services/vacation-rentals" component={UsVacationRentals} />
            <Route path="/us/en/about" component={UsAbout} />
            <Route path="/us/en/contact" component={UsContact} />
            <Route path="/us/en/faq" component={UsFAQ} />
            <Route path="/us/en/news" component={UsNews} />
            <Route path="/us/en/news/:id" component={UsNewsArticle} />

            {/* US Routes - Japanese */}
            <Route path="/us/ja" component={UsHome} />
            <Route path="/us/ja/services" component={UsServices} />
            <Route path="/us/ja/services/property-development" component={UsPropertyDevelopment} />
            <Route path="/us/ja/services/property-management" component={UsPropertyManagement} />
            <Route path="/us/ja/services/vacation-rentals" component={UsVacationRentals} />
            <Route path="/us/ja/about" component={UsAbout} />
            <Route path="/us/ja/contact" component={UsContact} />
            <Route path="/us/ja/faq" component={UsFAQ} />
            <Route path="/us/ja/news" component={UsNews} />
            <Route path="/us/ja/news/:id" component={UsNewsArticle} />

            {/* US Routes - Chinese */}
            <Route path="/us/zh" component={UsHome} />
            <Route path="/us/zh/services" component={UsServices} />
            <Route path="/us/zh/services/property-development" component={UsPropertyDevelopment} />
            <Route path="/us/zh/services/property-management" component={UsPropertyManagement} />
            <Route path="/us/zh/services/vacation-rentals" component={UsVacationRentals} />
            <Route path="/us/zh/about" component={UsAbout} />
            <Route path="/us/zh/contact" component={UsContact} />
            <Route path="/us/zh/faq" component={UsFAQ} />
            <Route path="/us/zh/news" component={UsNews} />
            <Route path="/us/zh/news/:id" component={UsNewsArticle} />

            {/* Privacy Policy */}
            <Route path="/us/en/privacy" component={Privacy} />
            <Route path="/us/ja/privacy" component={Privacy} />
            <Route path="/us/zh/privacy" component={Privacy} />

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
  const isPrivacy = location === "/privacy";

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
  const consentLanguage = requestedLanguage === "ja" || requestedLanguage === "zh" ? requestedLanguage : "en";
  const privacyPolicyPath = region === "hk" || region === "jp" || region === "us"
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
