import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, Clock, User, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-gradient-dark opacity-95 -z-10" />
      <div className="fixed inset-0 bg-gradient-glow -z-10" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-card/30 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-200 via-blue-300 to-blue-100 bg-clip-text text-transparent">
            Speechly
          </span>
        </div>
        
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-blue-900/20 rounded-lg transition-colors">
          {showMenu ? <X className="h-6 w-6 text-blue-100" /> : <Menu className="h-6 w-6 text-blue-100" />}
        </button>
      </header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-20"
            onClick={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 w-64 bg-card/95 backdrop-blur-xl z-40 border-l border-white/5 pt-16 pb-4 px-2"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-1 p-2">
                <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
                <NavItem to="/courses" icon={<BookOpen className="h-5 w-5" />} label="Courses" />
                <NavItem to="/history" icon={<Clock className="h-5 w-5" />} label="History" />
                <NavItem to="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
              </div>
              
              <div className="p-4">
                <NavLink to="/settings">
                  <div className="speeko-btn-ghost">Settings</div>
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="flex-1 pt-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-1 z-10">
        <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" showLabel={false} />
        <NavItem to="/courses" icon={<BookOpen className="h-5 w-5" />} label="Courses" showLabel={false} />
        <NavItem to="/history" icon={<Clock className="h-5 w-5" />} label="History" showLabel={false} />
        <NavItem to="/profile" icon={<User className="h-5 w-5" />} label="Profile" showLabel={false} />
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  showLabel?: boolean;
}

const NavItem = ({ to, icon, label, showLabel = true }: NavItemProps) => {
  return (
    <NavLink to={to} className={({ isActive }) => cn(
      "flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors",
      isActive ? "text-blue-100" : "text-blue-100/50 hover:text-blue-100/80"
    )}>
      <div className="relative">
        {icon}
        {/* Active indicator dot */}
        <NavLink to={to} className={({ isActive }) =>
          cn("absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full transition-all duration-200",
            isActive ? "bg-blue-400 scale-100" : "scale-0")
        } />
      </div>
      {showLabel && <span className="text-xs mt-1">{label}</span>}
    </NavLink>
  );
};

export default MainLayout;

