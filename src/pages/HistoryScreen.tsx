
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Play, ChevronRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const HistoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "interview" | "presentation" | "practice">("all");
  
  // Sample history data
  const speechHistory = [
    {
      id: "123",
      title: "Interview Practice",
      prompt: "Tell me about yourself and your background.",
      date: "April 14, 2025",
      duration: "1:45",
      type: "interview",
      score: 8.2
    },
    {
      id: "122",
      title: "Team Presentation",
      prompt: "Present the quarterly results to stakeholders.",
      date: "April 12, 2025",
      duration: "3:20",
      type: "presentation",
      score: 7.8
    },
    {
      id: "121",
      title: "Impromptu Practice",
      prompt: "Describe your ideal vacation destination.",
      date: "April 10, 2025",
      duration: "1:15",
      type: "practice",
      score: 7.5
    },
    {
      id: "120",
      title: "Interview Practice",
      prompt: "What are your greatest strengths and weaknesses?",
      date: "April 8, 2025",
      duration: "2:10",
      type: "interview",
      score: 7.2
    },
    {
      id: "119",
      title: "Sales Pitch",
      prompt: "Pitch our new product to potential clients.",
      date: "April 5, 2025",
      duration: "2:45",
      type: "presentation",
      score: 8.0
    }
  ];
  
  // Filter speeches based on active filter
  const filteredSpeeches = speechHistory.filter(speech => 
    activeFilter === "all" || speech.type === activeFilter
  );
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">History</h1>
          
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Filter className="h-5 w-5" />
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 mb-6 gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === "all"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === "interview"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setActiveFilter("interview")}
          >
            Interviews
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === "presentation"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setActiveFilter("presentation")}
          >
            Presentations
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === "practice"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setActiveFilter("practice")}
          >
            Practice
          </button>
        </div>
        
        {/* Stats */}
        <div className="speeko-card mb-6">
          <h2 className="font-medium mb-3">Your Stats</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-gray-600">Total Speeches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">7.9</div>
              <div className="text-xs text-gray-600">Avg. Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4h</div>
              <div className="text-xs text-gray-600">Practice Time</div>
            </div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="speeko-card mb-6">
          <h2 className="font-medium mb-2">Monthly Progress</h2>
          <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">Progress Chart Placeholder</span>
          </div>
        </div>
        
        {/* Speech List */}
        <h2 className="font-medium mb-3">Your Recordings</h2>
        {filteredSpeeches.length > 0 ? (
          <div className="space-y-4">
            {filteredSpeeches.map(speech => (
              <motion.div
                key={speech.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="speeko-card"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{speech.title}</h3>
                  <div className="h-7 w-7 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center font-bold">
                    {speech.score}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {speech.prompt}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-3">{speech.date}</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{speech.duration}</span>
                </div>
                
                <div className="flex justify-between">
                  <button className="flex items-center text-gray-600 text-sm">
                    <Play className="h-4 w-4 mr-1" />
                    Play
                  </button>
                  
                  <Link to={`/analysis/${speech.id}`} className="flex items-center text-gray-800 text-sm font-medium">
                    View Analysis
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="speeko-card text-center py-6">
            <p className="text-gray-600">No recordings match your filter.</p>
            <button 
              className="text-gray-800 font-medium mt-2"
              onClick={() => setActiveFilter("all")}
            >
              Show all recordings
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HistoryScreen;
