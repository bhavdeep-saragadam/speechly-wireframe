
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WelcomeScreen from "./pages/WelcomeScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import DashboardScreen from "./pages/DashboardScreen";
import PracticeScreen from "./pages/PracticeScreen";
import AnalysisScreen from "./pages/AnalysisScreen";
import CoursesScreen from "./pages/CoursesScreen";
import HistoryScreen from "./pages/HistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";
import SubscriptionScreen from "./pages/SubscriptionScreen";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  // Simulating auth state
  useEffect(() => {
    const checkAuth = setTimeout(() => {
      const auth = localStorage.getItem('speeko-auth');
      const onboarded = localStorage.getItem('speeko-onboarded');
      if (auth) setIsAuthenticated(true);
      if (onboarded) setIsOnboarded(true);
    }, 500);
    
    return () => clearTimeout(checkAuth);
  }, []);
  
  const handleLogin = () => {
    localStorage.setItem('speeko-auth', 'true');
    setIsAuthenticated(true);
  };
  
  const handleOnboardingComplete = () => {
    localStorage.setItem('speeko-onboarded', 'true');
    setIsOnboarded(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('speeko-auth');
    localStorage.removeItem('speeko-onboarded');
    setIsAuthenticated(false);
    setIsOnboarded(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {!isAuthenticated ? (
              <Route path="*" element={<WelcomeScreen onLogin={handleLogin} />} />
            ) : !isOnboarded ? (
              <Route path="*" element={<OnboardingScreen onComplete={handleOnboardingComplete} />} />
            ) : (
              <>
                <Route path="/" element={<MainLayout><DashboardScreen /></MainLayout>} />
                <Route path="/practice" element={<PracticeScreen />} />
                <Route path="/analysis/:id" element={<MainLayout><AnalysisScreen /></MainLayout>} />
                <Route path="/courses" element={<MainLayout><CoursesScreen /></MainLayout>} />
                <Route path="/history" element={<MainLayout><HistoryScreen /></MainLayout>} />
                <Route path="/profile" element={<MainLayout><ProfileScreen onLogout={handleLogout} /></MainLayout>} />
                <Route path="/settings" element={<MainLayout><SettingsScreen /></MainLayout>} />
                <Route path="/subscription" element={<MainLayout><SubscriptionScreen /></MainLayout>} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
