import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Mic, Award, TrendingUp } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  const goals = [
    { id: "presentations", label: "Deliver better presentations", icon: <Award /> },
    { id: "meetings", label: "Lead meetings effectively", icon: <TrendingUp /> },
    { id: "interviews", label: "Ace job interviews", icon: <Mic /> },
    { id: "confidence", label: "Build speaking confidence", icon: <Award /> },
    { id: "fillers", label: "Reduce filler words", icon: <Mic /> },
    { id: "pace", label: "Improve speaking pace", icon: <TrendingUp /> },
  ];
  
  const screens = [
    {
      title: "Welcome to Speeko",
      subtitle: "Let's get to know you better",
      content: (
        <div className="text-center px-6">
          <p className="text-blue-200/70 mb-6">
            Speeko is your AI-powered speaking coach. We'll help you become a confident and effective speaker.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="speeko-card px-4 py-6 w-20 flex flex-col items-center">
              <Mic className="h-8 w-8 text-blue-100 mb-2" />
              <span className="text-xs text-blue-200/70">Practice</span>
            </div>
            <div className="speeko-card px-4 py-6 w-20 flex flex-col items-center">
              <TrendingUp className="h-8 w-8 text-blue-100 mb-2" />
              <span className="text-xs text-blue-200/70">Analyze</span>
            </div>
            <div className="speeko-card px-4 py-6 w-20 flex flex-col items-center">
              <Award className="h-8 w-8 text-blue-100 mb-2" />
              <span className="text-xs text-blue-200/70">Improve</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Select Your Goals",
      subtitle: "What would you like to improve?",
      content: (
        <div className="space-y-3 px-6">
          {goals.map((goal) => (
            <button
              key={goal.id}
              className={`speeko-card w-full flex items-center justify-between px-4 py-3 ${
                selectedGoals.includes(goal.id) ? "border-blue-500/50 bg-blue-900/20" : ""
              }`}
              onClick={() => {
                if (selectedGoals.includes(goal.id)) {
                  setSelectedGoals(selectedGoals.filter((g) => g !== goal.id));
                } else {
                  setSelectedGoals([...selectedGoals, goal.id]);
                }
              }}
            >
              <div className="flex items-center">
                <div className="mr-3 text-blue-100">{goal.icon}</div>
                <span className="text-blue-50">{goal.label}</span>
              </div>
              {selectedGoals.includes(goal.id) && (
                <Check className="h-5 w-5 text-blue-400" />
              )}
            </button>
          ))}
          <p className="text-xs text-blue-200/60 text-center pt-2">
            Select at least one goal to continue
          </p>
        </div>
      ),
    },
    {
      title: "You're All Set!",
      subtitle: "Ready to improve your speaking skills",
      content: (
        <div className="text-center px-6">
          <div className="speeko-card mx-auto mb-6 p-6 max-w-xs">
            <div className="rounded-full bg-blue-900/30 h-20 w-20 mx-auto flex items-center justify-center mb-4 border border-blue-500/20">
              <Check className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="font-medium mb-2 text-blue-50">Profile Created</h3>
            <p className="text-sm text-blue-200/70">
              We've customized your experience based on your goals.
            </p>
          </div>
          <p className="text-blue-200/80">
            You're ready to start practicing and improving your speaking skills with Speeko!
          </p>
        </div>
      ),
    },
  ];
  
  const handleNext = () => {
    if (step === 1 && selectedGoals.length === 0) {
      return;
    }
    
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const screen = screens[step];
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-gradient-dark opacity-95 -z-10" />
      <div className="fixed inset-0 bg-gradient-glow -z-10" />
      
      <div className="fixed top-0 left-0 right-0 z-10 bg-card/30 backdrop-blur-xl pt-6 pb-4 border-b border-white/5">
        <div className="flex justify-between items-center px-6">
          {step > 0 ? (
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-blue-900/20 text-blue-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            <div className="w-9"></div>
          )}
          
          <div className="flex space-x-1">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full ${
                  i === step
                    ? "w-6 bg-blue-500"
                    : i < step
                    ? "w-6 bg-blue-500"
                    : "w-2 bg-blue-500/30"
                } transition-all duration-300`}
              />
            ))}
          </div>
          
          <div className="w-9"></div>
        </div>
      </div>
      
      <div className="flex-1 pt-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-1 text-blue-50">{screen.title}</h1>
              <p className="text-blue-200/70">{screen.subtitle}</p>
            </div>
            
            <div className="flex-1">
              {screen.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="p-6">
        <button
          onClick={handleNext}
          disabled={step === 1 && selectedGoals.length === 0}
          className={`speeko-btn-primary ${
            step === 1 && selectedGoals.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {step === screens.length - 1 ? (
            "Get Started"
          ) : (
            <>
              Continue
              <ChevronRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
