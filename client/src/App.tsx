import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
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

// Global Gateway
import GlobalGateway from "./pages/GlobalGateway";

// Hong Kong Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import News from "./pages/News";

// Japan Pages
import JpHome from "./pages/jp/Home";
import JpServices from "./pages/jp/Services";
import JpAbout from "./pages/jp/About";
import JpCareers from "./pages/jp/Careers";
import JpContact from "./pages/jp/Contact";
import JpFAQ from "./pages/jp/FAQ";

// US Pages
import UsHome from "./pages/us/Home";
import UsServices from "./pages/us/Services";
import UsAbout from "./pages/us/About";
import UsContact from "./pages/us/Contact";
import UsFAQ from "./pages/us/FAQ";

// Shared Pages
import Privacy from "./pages/Privacy";

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
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
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
            
            {/* Japan Routes - English */}
            <Route path="/jp/en" component={JpHome} />
            <Route path="/jp/en/services" component={JpServices} />
            <Route path="/jp/en/about" component={JpAbout} />
            <Route path="/jp/en/careers" component={JpCareers} />
            <Route path="/jp/en/contact" component={JpContact} />
            <Route path="/jp/en/faq" component={JpFAQ} />
            
            {/* Japan Routes - Chinese */}
            <Route path="/jp/zh" component={JpHome} />
            <Route path="/jp/zh/services" component={JpServices} />
            <Route path="/jp/zh/about" component={JpAbout} />
            <Route path="/jp/zh/careers" component={JpCareers} />
            <Route path="/jp/zh/contact" component={JpContact} />
            <Route path="/jp/zh/faq" component={JpFAQ} />
            
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
            <Route path="/us/en/about" component={UsAbout} />
            <Route path="/us/en/contact" component={UsContact} />
            <Route path="/us/en/faq" component={UsFAQ} />
            
            {/* US Routes - Japanese */}
            <Route path="/us/ja" component={UsHome} />
            <Route path="/us/ja/services" component={UsServices} />
            <Route path="/us/ja/about" component={UsAbout} />
            <Route path="/us/ja/contact" component={UsContact} />
            <Route path="/us/ja/faq" component={UsFAQ} />
            
            {/* US Routes - Chinese */}
            <Route path="/us/zh" component={UsHome} />
            <Route path="/us/zh/services" component={UsServices} />
            <Route path="/us/zh/about" component={UsAbout} />
            <Route path="/us/zh/contact" component={UsContact} />
            <Route path="/us/zh/faq" component={UsFAQ} />
            
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
          <Toaster />
          {isGateway && showSplash && !hasSeenSplash && (
            <SplashScreen onComplete={handleSplashComplete} />
          )}
          <MainRouter />
          <CookieConsent lang="en" position="bottom" />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
