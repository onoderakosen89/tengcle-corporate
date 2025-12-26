import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { JpLanguageProvider } from "./contexts/JpLanguageContext";
import SplashScreen from "./components/SplashScreen";

// Global Gateway
import GlobalGateway from "./pages/GlobalGateway";

// Hong Kong Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Japan Pages
import JpHome from "./pages/jp/Home";
import JpServices from "./pages/jp/Services";
import JpAbout from "./pages/jp/About";
import JpCareers from "./pages/jp/Careers";
import JpContact from "./pages/jp/Contact";

// Hong Kong Router with Language Provider
function HkRouter() {
  return (
    <LanguageProvider>
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
        
        <Route component={NotFound} />
      </Switch>
    </LanguageProvider>
  );
}

// Japan Router with Japan Language Provider
function JpRouter() {
  return (
    <JpLanguageProvider>
      <Switch>
        {/* Japan Routes - Japanese */}
        <Route path="/jp/ja" component={JpHome} />
        <Route path="/jp/ja/services" component={JpServices} />
        <Route path="/jp/ja/about" component={JpAbout} />
        <Route path="/jp/ja/careers" component={JpCareers} />
        <Route path="/jp/ja/contact" component={JpContact} />
        
        {/* Japan Routes - English */}
        <Route path="/jp/en" component={JpHome} />
        <Route path="/jp/en/services" component={JpServices} />
        <Route path="/jp/en/about" component={JpAbout} />
        <Route path="/jp/en/careers" component={JpCareers} />
        <Route path="/jp/en/contact" component={JpContact} />
        
        {/* Japan Routes - Chinese */}
        <Route path="/jp/zh" component={JpHome} />
        <Route path="/jp/zh/services" component={JpServices} />
        <Route path="/jp/zh/about" component={JpAbout} />
        <Route path="/jp/zh/careers" component={JpCareers} />
        <Route path="/jp/zh/contact" component={JpContact} />
        
        <Route component={NotFound} />
      </Switch>
    </JpLanguageProvider>
  );
}

function MainRouter() {
  const [location] = useLocation();
  
  // Determine which region we're in
  const isHk = location.startsWith("/hk");
  const isJp = location.startsWith("/jp");
  const isGateway = location === "/";
  
  if (isGateway) {
    return <GlobalGateway />;
  }
  
  if (isHk) {
    return <HkRouter />;
  }
  
  if (isJp) {
    return <JpRouter />;
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
          <Toaster />
          {isGateway && showSplash && !hasSeenSplash && (
            <SplashScreen onComplete={handleSplashComplete} />
          )}
          <MainRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
