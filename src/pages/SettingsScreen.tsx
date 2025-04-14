
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Sun, Volume2, HelpCircle, Mail, Globe, ChevronRight } from "lucide-react";

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(80);
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        {/* App Preferences */}
        <h2 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2">App Preferences</h2>
        <div className="speeko-card space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3 text-gray-600" />
              <span>Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <span>Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
            </label>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 mr-3 text-gray-600" />
                <span>Volume</span>
              </div>
              <span className="text-sm text-gray-600">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        {/* Account */}
        <h2 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2">Account</h2>
        <div className="speeko-card space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">Email Address</h3>
              <p className="text-sm text-gray-600">alex@example.com</p>
            </div>
            <button className="text-sm text-gray-800 font-medium">Change</button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">Password</h3>
              <p className="text-sm text-gray-600">Last changed 30 days ago</p>
            </div>
            <button className="text-sm text-gray-800 font-medium">Change</button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">Language</h3>
              <p className="text-sm text-gray-600">English (US)</p>
            </div>
            <button className="flex items-center text-sm text-gray-800 font-medium">
              <Globe className="h-4 w-4 mr-1" />
              Change
            </button>
          </div>
        </div>
        
        {/* Practice Preferences */}
        <h2 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2">Practice Preferences</h2>
        <div className="speeko-card space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Default Practice Duration</h3>
              <p className="text-sm text-gray-600">2 minutes</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Feedback Detail Level</h3>
              <p className="text-sm text-gray-600">Detailed</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Reminders</h3>
              <p className="text-sm text-gray-600">Daily at 9:00 AM</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Support */}
        <h2 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2">Support</h2>
        <div className="speeko-card space-y-4 mb-6">
          <button className="flex items-center justify-between w-full text-left">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-3 text-gray-600" />
              <span>Help Center</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between w-full text-left">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-gray-600" />
              <span>Contact Support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-1">About</h3>
            <p className="text-xs text-gray-600">Speeko v1.0.0</p>
            <p className="text-xs text-gray-600">© 2025 Speeko, Inc.</p>
          </div>
        </div>
        
        {/* Data & Privacy */}
        <h2 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2">Data & Privacy</h2>
        <div className="speeko-card space-y-4">
          <button className="text-left w-full">
            <h3 className="font-medium">Privacy Policy</h3>
            <p className="text-sm text-gray-600">Read about how we handle your data</p>
          </button>
          
          <button className="text-left w-full">
            <h3 className="font-medium">Terms of Service</h3>
            <p className="text-sm text-gray-600">Read our terms and conditions</p>
          </button>
          
          <button className="text-left w-full">
            <h3 className="font-medium text-gray-600">Delete Account</h3>
            <p className="text-sm text-gray-600">Permanently delete your account and data</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsScreen;
