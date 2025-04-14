import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Mic, X, Clock, ArrowLeft, ChevronRight, Volume2 } from "lucide-react";

const PracticeScreen = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<"setup" | "practice" | "feedback">("setup");
  const [promptType, setPromptType] = useState<string>("interview");
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isRecording, setIsRecording] = useState(false);
  const [feedbacks, setFeedbacks] = useState<{type: string, message: string}[]>([]);
  
  // Sample prompts
  const prompts = {
    interview: [
      "Tell me about yourself and your background.",
      "What are your greatest strengths and weaknesses?",
      "Why are you interested in this position?"
    ],
    presentation: [
      "Introduce the new product to the team.",
      "Present the quarterly results to stakeholders.",
      "Explain your project's impact and benefits."
    ],
    impromptu: [
      "Describe your ideal vacation destination.",
      "If you could have dinner with anyone, who would it be and why?",
      "What skill would you like to master and why?"
    ]
  };
  
  const [selectedPrompt, setSelectedPrompt] = useState(prompts.interview[0]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state === "practice" && isRecording && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRecording(false);
      setState("feedback");
      
      // Mock AI-generated feedback
      setFeedbacks([
        { type: "pace", message: "Your speaking pace was good at 145 wpm, within the ideal range." },
        { type: "fillers", message: "You used filler words like 'um' and 'uh' 12 times." },
        { type: "tone", message: "Your tone was confident but could use more vocal variety." },
        { type: "content", message: "Strong points but could improve structure with clearer transitions." }
      ]);
    }
    
    return () => clearInterval(interval);
  }, [state, isRecording, timer]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    setState("feedback");
    
    // Mock AI-generated feedback
    setFeedbacks([
      { type: "pace", message: "Your speaking pace was good at 145 wpm, within the ideal range." },
      { type: "fillers", message: "You used filler words like 'um' and 'uh' 12 times." },
      { type: "tone", message: "Your tone was confident but could use more vocal variety." },
      { type: "content", message: "Strong points but could improve structure with clearer transitions." }
    ]);
  };
  
  const handleSelectPromptType = (type: string) => {
    setPromptType(type);
    setSelectedPrompt(prompts[type as keyof typeof prompts][0]);
  };
  
  const handleExit = () => {
    navigate("/");
  };
  
  const handleFinish = () => {
    navigate("/analysis/123");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 bg-gradient-dark opacity-95 -z-10" />
      <div className="fixed inset-0 bg-gradient-glow -z-10" />
      
      <header className="bg-card/30 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <button onClick={handleExit} className="p-2 -ml-2 text-blue-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <h1 className="font-bold text-blue-50">Practice Session</h1>
        
        <div className="w-9"></div>
      </header>
      
      <AnimatePresence mode="wait">
        {state === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-4"
          >
            <h2 className="text-xl font-medium mb-4 text-blue-50">Choose a Prompt</h2>
            
            <div className="space-y-3 mb-6">
              <button
                className={`speeko-card w-full text-left ${promptType === "interview" ? "border-blue-500/50" : ""}`}
                onClick={() => handleSelectPromptType("interview")}
              >
                <h3 className="font-medium mb-1 text-blue-50">Interview Practice</h3>
                <p className="text-sm text-blue-200/70">Common job interview questions</p>
              </button>
              
              <button
                className={`speeko-card w-full text-left ${promptType === "presentation" ? "border-blue-500/50" : ""}`}
                onClick={() => handleSelectPromptType("presentation")}
              >
                <h3 className="font-medium mb-1 text-blue-50">Presentation Practice</h3>
                <p className="text-sm text-blue-200/70">Business and public speaking scenarios</p>
              </button>
              
              <button
                className={`speeko-card w-full text-left ${promptType === "impromptu" ? "border-blue-500/50" : ""}`}
                onClick={() => handleSelectPromptType("impromptu")}
              >
                <h3 className="font-medium mb-1 text-blue-50">Impromptu Speaking</h3>
                <p className="text-sm text-blue-200/70">Off-the-cuff speaking practice</p>
              </button>
            </div>
            
            <h2 className="text-xl font-medium mb-3 text-blue-50">Your Prompt</h2>
            <div className="speeko-card mb-6">
              <p className="text-blue-50 mb-3">{selectedPrompt}</p>
              
              <div className="flex flex-wrap gap-2">
                {prompts[promptType as keyof typeof prompts].map((prompt, index) => (
                  <button 
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full border 
                      ${selectedPrompt === prompt 
                        ? "bg-blue-600 text-white border-blue-500" 
                        : "border-blue-500/30 text-blue-300"}`}
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    Prompt {index + 1}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="speeko-btn-primary"
              onClick={() => setState("practice")}
            >
              Start Practice Session
            </button>
          </motion.div>
        )}
        
        {state === "practice" && (
          <motion.div
            key="practice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-4 flex flex-col"
          >
            <div className="speeko-card mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(timer)}</span>
                </div>
                
                {isRecording && (
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-gray-800 mr-1 animate-pulse"></div>
                    <span>Recording</span>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-gray-800 text-lg leading-relaxed">{selectedPrompt}</p>
              </div>
              
              {isRecording && (
                <div className="border-t border-gray-200 pt-3">
                  <h3 className="text-sm font-medium mb-2">Real-time Feedback</h3>
                  <div className="text-sm text-gray-600 space-y-3">
                    <div className="flex items-start">
                      <Volume2 className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-800">Speaking pace: 145 wpm (good)</p>
                        <p>You're speaking at a good pace. Keep it up!</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mic className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-800">Filler words detected: um, uh</p>
                        <p>Try to reduce filler words for clearer delivery.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1"></div>
            
            <div className="flex justify-center items-center mb-6">
              {!isRecording ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartRecording}
                  className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center"
                >
                  <Play className="h-8 w-8 text-white" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStopRecording}
                  className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center"
                >
                  <Pause className="h-8 w-8 text-white" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
        
        {state === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-4 flex flex-col"
          >
            <div className="speeko-card mb-6">
              <h2 className="text-xl font-medium mb-2">Practice Complete!</h2>
              <p className="text-gray-600 mb-4">
                Here's a quick summary of your performance. View the detailed analysis for more insights.
              </p>
              
              <div className="space-y-4">
                {feedbacks.map((feedback, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-gray-800 pl-3 py-1"
                  >
                    <h3 className="font-medium capitalize">{feedback.type}</h3>
                    <p className="text-sm text-gray-600">{feedback.message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="speeko-card mb-6">
              <h3 className="font-medium mb-2">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Pace</div>
                  <div className="text-2xl font-bold">145 <span className="text-sm font-normal text-gray-600">wpm</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Filler Words</div>
                  <div className="text-2xl font-bold">12 <span className="text-sm font-normal text-gray-600">total</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Clarity</div>
                  <div className="text-2xl font-bold">7.5<span className="text-sm font-normal text-gray-600">/10</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Confidence</div>
                  <div className="text-2xl font-bold">8.2<span className="text-sm font-normal text-gray-600">/10</span></div>
                </div>
              </div>
            </div>
            
            <div className="flex-1"></div>
            
            <div className="space-y-3">
              <button onClick={handleFinish} className="speeko-btn-primary">
                View Detailed Analysis
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <button onClick={handleExit} className="speeko-btn-ghost">
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeScreen;
