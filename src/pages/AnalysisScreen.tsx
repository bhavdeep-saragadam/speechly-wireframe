
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2, Smile, PieChart, BarChart2, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Sample analysis data
const analysisData = {
  date: "April 14, 2025",
  duration: "1:45",
  prompt: "Tell me about yourself and your background.",
  overallScore: 8.2,
  metrics: {
    pace: { score: 8.5, value: "145 wpm", feedback: "Good pace, within the ideal range of 140-160 wpm." },
    fillerWords: { score: 7.2, value: "12 fillers", feedback: "Used 'um' and 'uh' somewhat frequently. Try to be more conscious of these." },
    tone: { score: 8.7, value: "Confident", feedback: "Your tone conveyed confidence and authority. Good vocal variety." },
    clarity: { score: 8.4, value: "Very clear", feedback: "Good articulation and pronunciation throughout." },
    sentiment: { score: 8.2, value: "Positive", feedback: "Your language was positive and engaging." }
  },
  transcript: "Hi, I'm Alex, and I have over five years of experience in product development. I started my career at a small startup where I learned to wear many hats and develop solutions quickly. After that, I moved to a larger company where I had the opportunity to lead a team and work on more complex problems. I'm passionate about creating intuitive user experiences and solving challenging technical problems."
};

const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "transcript">("overview");
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-1">Speech Analysis</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{analysisData.date}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{analysisData.duration}</span>
        </div>
        
        {/* Score Card */}
        <div className="speeko-card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Overall Score</h2>
            <div className="h-10 w-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
              {analysisData.overallScore}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {analysisData.prompt}
          </p>
          <div className="grid grid-cols-5 gap-2">
            <MetricPill 
              icon={<Volume2 className="h-3 w-3" />} 
              label="Pace" 
              score={analysisData.metrics.pace.score} 
            />
            <MetricPill 
              icon={<Mic className="h-3 w-3" />} 
              label="Fillers" 
              score={analysisData.metrics.fillerWords.score} 
            />
            <MetricPill 
              icon={<Smile className="h-3 w-3" />} 
              label="Tone" 
              score={analysisData.metrics.tone.score} 
            />
            <MetricPill 
              icon={<PieChart className="h-3 w-3" />} 
              label="Clarity" 
              score={analysisData.metrics.clarity.score} 
            />
            <MetricPill 
              icon={<BarChart2 className="h-3 w-3" />} 
              label="Sentiment" 
              score={analysisData.metrics.sentiment.score} 
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === "overview" ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === "metrics" ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("metrics")}
          >
            Detailed Metrics
          </button>
          <button 
            className={`py-3 px-4 text-sm font-medium ${activeTab === "transcript" ? "border-b-2 border-gray-800 text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("transcript")}
          >
            Transcript
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-medium mb-3">Strengths</h2>
                <ul className="space-y-2">
                  <li className="speeko-card flex">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <Volume2 className="h-4 w-4 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-medium">Excellent Pace</h3>
                      <p className="text-sm text-gray-600">Your speaking pace was consistent and easy to follow.</p>
                    </div>
                  </li>
                  <li className="speeko-card flex">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <Smile className="h-4 w-4 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-medium">Confident Tone</h3>
                      <p className="text-sm text-gray-600">You spoke with authority and conviction.</p>
                    </div>
                  </li>
                </ul>
                
                <h2 className="font-medium mb-3 mt-6">Areas to Improve</h2>
                <ul className="space-y-2">
                  <li className="speeko-card flex">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <Mic className="h-4 w-4 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-medium">Reduce Filler Words</h3>
                      <p className="text-sm text-gray-600">Work on reducing "um" and "uh" for more polished delivery.</p>
                    </div>
                  </li>
                  <li className="speeko-card flex">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <PieChart className="h-4 w-4 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-medium">Structure Your Points</h3>
                      <p className="text-sm text-gray-600">Try to organize your thoughts more clearly with transitions.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          )}
          
          {activeTab === "metrics" && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(analysisData.metrics).map(([key, metric], index) => (
                  <div key={key} className="speeko-card mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                      <div className="flex items-center">
                        <span className="font-bold mr-2">{metric.score}</span>
                        <div className="h-2 w-16 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-gray-800 rounded-full" 
                            style={{ width: `${(metric.score / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-900 mb-1">{metric.value}</div>
                    <p className="text-sm text-gray-600">{metric.feedback}</p>
                  </div>
                ))}
                
                <div className="speeko-card">
                  <h3 className="font-medium mb-3">Pace Over Time</h3>
                  <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Pace Graph Placeholder</span>
                  </div>
                </div>
                
                <div className="speeko-card">
                  <h3 className="font-medium mb-3">Filler Word Usage</h3>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="speeko-card bg-gray-50">
                      <div className="text-sm text-gray-600 mb-1">Most Common</div>
                      <div className="text-lg font-bold">"um" (7x)</div>
                    </div>
                    <div className="speeko-card bg-gray-50">
                      <div className="text-sm text-gray-600 mb-1">Total Count</div>
                      <div className="text-lg font-bold">12 fillers</div>
                    </div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Fillers Chart Placeholder</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {activeTab === "transcript" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="speeko-card"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Full Transcript</h3>
                <button className="text-sm text-gray-600 underline">Download</button>
              </div>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {analysisData.transcript}
              </p>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium mb-2">Highlighted Issues</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-600">
                    "um" x7
                  </div>
                  <div className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-600">
                    "uh" x5
                  </div>
                  <div className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-600">
                    Repeated: "and" x8
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Link to="/practice" className="speeko-btn-primary flex-1">
            Practice Again
          </Link>
          <Link to="/history" className="speeko-btn-outline flex-1">
            View History
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

interface MetricPillProps {
  icon: React.ReactNode;
  label: string;
  score: number;
}

const MetricPill = ({ icon, label, score }: MetricPillProps) => {
  const getColor = () => {
    if (score >= 8) return "bg-gray-800 text-white";
    if (score >= 6) return "bg-gray-400 text-white";
    return "bg-gray-200 text-gray-800";
  };
  
  return (
    <div className={`text-center px-1 py-1 rounded-full text-xs flex flex-col items-center ${getColor()}`}>
      {icon}
      <span className="text-[10px] mt-0.5">{label}</span>
    </div>
  );
};

export default AnalysisScreen;
