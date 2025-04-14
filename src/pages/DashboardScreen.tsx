
import { motion } from "framer-motion";
import { Play, Calendar, Clock, Award, Volume2, Mic, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardScreen = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-600 mb-6">{today}</p>
        
        {/* Daily Streak */}
        <div className="speeko-card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Weekly Streak</h2>
            <span className="text-sm text-gray-500">5 days</span>
          </div>
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-1 
                  ${day <= 5 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-400"}`}>
                  {day}
                </div>
                <span className="text-xs text-gray-500">
                  {["M", "T", "W", "T", "F", "S", "S"][day - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Practice Button */}
        <Link to="/practice">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="speeko-card bg-gray-800 text-white p-6 mb-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-medium mb-1">Start Practice</h2>
              <p className="text-gray-300 text-sm">Improve your speaking skills</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </Link>
        
        {/* Stats Cards */}
        <h2 className="font-medium mb-3">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatsCard 
            title="Hours Practiced" 
            value="2.5" 
            icon={<Clock className="h-5 w-5" />} 
            change="+0.5 this week" 
            changeType="positive" 
          />
          <StatsCard 
            title="Filler Words" 
            value="12%" 
            icon={<Volume2 className="h-5 w-5" />} 
            change="-5% from last time" 
            changeType="positive" 
          />
          <StatsCard 
            title="Pace" 
            value="148" 
            icon={<TrendingUp className="h-5 w-5" />} 
            change="wpm (good range)" 
            changeType="neutral" 
          />
          <StatsCard 
            title="Confidence" 
            value="8.2" 
            icon={<Award className="h-5 w-5" />} 
            change="+1.2 this month" 
            changeType="positive" 
          />
        </div>
        
        {/* Upcoming Sessions */}
        <h2 className="font-medium mb-3">Upcoming Sessions</h2>
        <div className="speeko-card mb-6">
          <div className="border-l-4 border-gray-800 pl-3 py-1 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Team Presentation</h3>
              <span className="text-sm text-gray-500">In 2 days</span>
            </div>
            <p className="text-sm text-gray-600">Prepare for quarterly review</p>
          </div>
          
          <div className="border-l-4 border-gray-400 pl-3 py-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Interview Prep</h3>
              <span className="text-sm text-gray-500">In 5 days</span>
            </div>
            <p className="text-sm text-gray-600">Practice common questions</p>
          </div>
        </div>
        
        {/* Recent Lessons */}
        <h2 className="font-medium mb-3">Continue Learning</h2>
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4">
          <div className="speeko-card min-w-[280px] flex-shrink-0">
            <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
              <Mic className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="font-medium mb-1">Mastering Vocal Variety</h3>
            <p className="text-sm text-gray-600">50% completed</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div className="h-1 bg-gray-800 rounded-full w-1/2"></div>
            </div>
          </div>
          
          <div className="speeko-card min-w-[280px] flex-shrink-0">
            <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
              <Award className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="font-medium mb-1">Building Confidence</h3>
            <p className="text-sm text-gray-600">25% completed</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div className="h-1 bg-gray-800 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

const StatsCard = ({ title, value, icon, change, changeType }: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-gray-800";
      case "negative":
        return "text-gray-600";
      default:
        return "text-gray-500";
    }
  };
  
  return (
    <div className="speeko-card">
      <div className="flex items-center mb-1">
        <div className="mr-2 text-gray-600">{icon}</div>
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{value}</span>
        <span className={`text-xs ${getChangeColor()}`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default DashboardScreen;
