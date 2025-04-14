import { motion } from "framer-motion";
import { User, Award, Clock, Settings, LogOut, ChevronRight, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen = ({ onLogout }: ProfileScreenProps) => {
  // Sample user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "March 2025",
    stats: {
      speechesCompleted: 15,
      coursesCompleted: 2,
      practiceDays: 12,
      totalTime: "4h 25m",
      streak: 5
    },
    badges: [
      { id: "streak-7", name: "7-Day Streak", icon: <Clock className="h-5 w-5" />, earned: true },
      { id: "first-speech", name: "First Speech", icon: <Mic className="h-5 w-5" />, earned: true },
      { id: "course-complete", name: "Course Graduate", icon: <Award className="h-5 w-5" />, earned: true },
      { id: "perfect-score", name: "Perfect Score", icon: <Star className="h-5 w-5" />, earned: false },
      { id: "ten-speeches", name: "10 Speeches", icon: <Mic className="h-5 w-5" />, earned: true },
      { id: "improvement", name: "Fast Improver", icon: <TrendingUp className="h-5 w-5" />, earned: false }
    ],
    level: {
      current: 5,
      title: "Confident Speaker",
      progress: 65,
      nextTitle: "Persuasive Speaker"
    }
  };
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-blue-50">Profile</h1>
        
        {/* User Info */}
        <div className="speeko-card mb-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-blue-900/30 border border-blue-500/20 flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-blue-300" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-blue-50">{user.name}</h2>
              <p className="text-blue-200/70 text-sm">{user.email}</p>
              <p className="text-blue-200/50 text-xs">Member since {user.joinDate}</p>
            </div>
          </div>
        </div>
        
        {/* Level */}
        <div className="speeko-card mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-medium text-blue-50">Level {user.level.current}</h3>
              <p className="text-sm text-blue-200/70">{user.level.title}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-800 to-blue-600 text-white flex items-center justify-center font-bold shadow-glow">
              {user.level.current}
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-xs text-blue-200/70">{user.level.progress}% to next level</span>
              </div>
              <div>
                <span className="text-xs text-blue-200/70">Level {user.level.current + 1}: {user.level.nextTitle}</span>
              </div>
            </div>
            <div className="h-2 bg-blue-900/30 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full" 
                style={{ width: `${user.level.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="speeko-card mb-6">
          <h3 className="font-medium mb-3 text-blue-50">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="speeko-card bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/10 hover:border-blue-500/30 transition-all">
              <h4 className="text-sm text-blue-200/70 mb-1">Speeches Completed</h4>
              <div className="text-2xl font-bold text-blue-50">{user.stats.speechesCompleted}</div>
            </div>
            <div className="speeko-card bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/10 hover:border-blue-500/30 transition-all">
              <h4 className="text-sm text-blue-200/70 mb-1">Courses Completed</h4>
              <div className="text-2xl font-bold text-blue-50">{user.stats.coursesCompleted}</div>
            </div>
            <div className="speeko-card bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/10 hover:border-blue-500/30 transition-all">
              <h4 className="text-sm text-blue-200/70 mb-1">Current Streak</h4>
              <div className="text-2xl font-bold text-blue-50">{user.stats.streak} days</div>
            </div>
            <div className="speeko-card bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/10 hover:border-blue-500/30 transition-all">
              <h4 className="text-sm text-blue-200/70 mb-1">Total Practice Time</h4>
              <div className="text-2xl font-bold text-blue-50">{user.stats.totalTime}</div>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-blue-50">Your Badges</h3>
            <Link to="#" className="text-sm text-blue-200/70 hover:text-blue-200">
              See All
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {user.badges.slice(0, 6).map(badge => (
              <div 
                key={badge.id}
                className={`speeko-card p-3 flex flex-col items-center text-center ${!badge.earned ? "opacity-50" : ""}`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                  badge.earned 
                    ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white" 
                    : "bg-blue-900/20 text-blue-300/50"
                }`}>
                  {badge.icon}
                </div>
                <span className="text-xs text-blue-200">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Settings and Logout */}
        <div className="space-y-3">
          <Link to="/settings">
            <div className="speeko-card flex items-center justify-between hover:bg-blue-900/20 transition-colors">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-blue-300" />
                <span className="text-blue-50">Settings</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-300/70" />
            </div>
          </Link>
          
          <Link to="/subscription">
            <div className="speeko-card flex items-center justify-between hover:bg-blue-900/20 transition-colors">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-3 text-blue-300" />
                <span className="text-blue-50">Subscription</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-300/70" />
            </div>
          </Link>
          
          <button 
            onClick={onLogout}
            className="speeko-card flex items-center justify-between w-full text-left hover:bg-blue-900/20 transition-colors"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 mr-3 text-blue-300" />
              <span className="text-blue-50">Logout</span>
            </div>
            <ChevronRight className="h-5 w-5 text-blue-300/70" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Mic = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

export default ProfileScreen;
