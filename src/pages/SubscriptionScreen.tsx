import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X, Star, Zap, Mic, Award, Clock } from "lucide-react";

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");
  
  const plans = {
    monthly: {
      price: "$9.99",
      period: "per month",
      discount: null
    },
    annual: {
      price: "$89.99",
      period: "per year",
      discount: "Save 25%"
    }
  };
  
  const featuresBasic = [
    "5 practice sessions per week",
    "Basic feedback and analysis",
    "Access to fundamental courses",
    "Email support"
  ];
  
  const featuresPro = [
    "Unlimited practice sessions",
    "Advanced AI feedback and analysis",
    "Full library of expert courses",
    "Detailed speech analytics",
    "Custom practice prompts",
    "Priority support",
    "Export and share your progress"
  ];
  
  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-50">Subscription</h1>
          <button className="p-2 text-blue-200 hover:text-blue-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Current Plan */}
        <div className="speeko-card bg-blue-900/20 backdrop-blur-sm mb-6 border border-blue-500/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-blue-50">Current Plan</h2>
            <div className="px-3 py-1 text-xs bg-blue-900/30 text-blue-200 rounded-full border border-blue-500/20">Basic</div>
          </div>
          <p className="text-sm text-blue-200/70 mb-4">
            You're currently on the Basic plan with limited features.
            Upgrade to Speeko Pro to unlock all features.
          </p>
          <div className="flex justify-end">
            <button className="text-sm text-blue-300 font-medium hover:text-blue-200 transition-colors">Manage Plan</button>
          </div>
        </div>
        
        {/* Plan Selection */}
        <h2 className="font-medium mb-3 text-blue-50">Upgrade to Pro</h2>
        <div className="speeko-card border-2 border-blue-500/50 bg-blue-900/20 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-center mb-4">
            <div 
              className={`px-4 py-2 text-sm rounded-l-lg border-y border-l border-blue-500/30 cursor-pointer
                ${selectedPlan === "monthly" ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white" : "bg-blue-900/30 text-blue-100"}`}
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </div>
            <div 
              className={`px-4 py-2 text-sm rounded-r-lg border border-blue-500/30 cursor-pointer
                ${selectedPlan === "annual" ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white" : "bg-blue-900/30 text-blue-100"}`}
              onClick={() => setSelectedPlan("annual")}
            >
              Annual
            </div>
          </div>
          
          {selectedPlan === "annual" && (
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-xs px-3 py-1 rounded-full mb-4 inline-block">
              Save 25% with annual billing
            </div>
          )}
          
          <div className="mb-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-blue-50">{plans[selectedPlan].price}</span>
              <span className="text-blue-200/70 ml-1">{plans[selectedPlan].period}</span>
            </div>
            <p className="text-sm text-blue-200/70">Full access to all Speeko Pro features</p>
          </div>
          
          <div className="space-y-2 mb-6">
            {featuresPro.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-sm text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
          
          <button className="speeko-btn-primary mb-2">
            <Star className="h-5 w-5 mr-2" />
            Upgrade to Pro
          </button>
          <p className="text-xs text-center text-blue-200/60">
            Cancel anytime. No commitment required.
          </p>
        </div>
        
        {/* Plan Comparison */}
        <h2 className="font-medium mb-3 text-blue-50">Plan Comparison</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[600px] mb-6">
            <thead>
              <tr className="border-b border-blue-500/20">
                <th className="py-3 text-left font-medium text-blue-50">Features</th>
                <th className="py-3 text-center font-medium text-blue-50">
                  <div className="flex flex-col items-center">
                    <span>Basic</span>
                    <span className="text-xs text-blue-200/70">Free</span>
                  </div>
                </th>
                <th className="py-3 text-center font-medium text-blue-50">
                  <div className="flex flex-col items-center">
                    <span>Pro</span>
                    <span className="text-xs text-blue-200/70">From $9.99/mo</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-500/20">
                <td className="py-3 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Mic className="h-4 w-4 mr-2 text-blue-300" />
                    Practice Sessions
                  </div>
                </td>
                <td className="py-3 text-center text-sm text-blue-200">5 per week</td>
                <td className="py-3 text-center text-sm text-blue-200">Unlimited</td>
              </tr>
              <tr className="border-b border-blue-500/20">
                <td className="py-3 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-blue-300" />
                    AI Feedback
                  </div>
                </td>
                <td className="py-3 text-center text-sm text-blue-200">Basic</td>
                <td className="py-3 text-center text-sm text-blue-200">Advanced</td>
              </tr>
              <tr className="border-b border-blue-500/20">
                <td className="py-3 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-blue-300" />
                    Courses
                  </div>
                </td>
                <td className="py-3 text-center text-sm text-blue-200">Fundamentals only</td>
                <td className="py-3 text-center text-sm text-blue-200">Full library</td>
              </tr>
              <tr className="border-b border-blue-500/20">
                <td className="py-3 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-300" />
                    History & Analytics
                  </div>
                </td>
                <td className="py-3 text-center text-sm text-blue-200">7 days</td>
                <td className="py-3 text-center text-sm text-blue-200">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* FAQ */}
        <h2 className="font-medium mb-3 text-blue-50">Frequently Asked Questions</h2>
        <div className="space-y-3 mb-6">
          <div className="speeko-card">
            <h3 className="font-medium mb-1 text-blue-50">Can I cancel anytime?</h3>
            <p className="text-sm text-blue-200/70">
              Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to Pro features until the end of your billing period.
            </p>
          </div>
          
          <div className="speeko-card">
            <h3 className="font-medium mb-1 text-blue-50">What payment methods are accepted?</h3>
            <p className="text-sm text-blue-200/70">
              We accept all major credit cards, PayPal, and Apple Pay for iOS users.
            </p>
          </div>
          
          <div className="speeko-card">
            <h3 className="font-medium mb-1 text-blue-50">Do you offer refunds?</h3>
            <p className="text-sm text-blue-200/70">
              If you're not satisfied with Speeko Pro, contact our support team within 14 days of purchase for a full refund.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionScreen;
