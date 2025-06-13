
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const assessmentQuestions = [
  {
    id: 1,
    question: "How would you describe your overall mood lately?",
    options: ["Very positive", "Mostly positive", "Neutral", "Somewhat negative", "Very negative"]
  },
  {
    id: 2,
    question: "How often do you feel stressed or overwhelmed?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 3,
    question: "How well are you sleeping?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very poor"]
  },
  {
    id: 4,
    question: "How satisfied are you with your current life situation?",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
  },
  {
    id: 5,
    question: "How often do you feel anxious or worried?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  }
];

const GetStarted = () => {
  const [step, setStep] = useState("signup"); // "signup", "assessment", "complete"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<string[]>([]);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await signup(email, password, name);
    
    if (success) {
      toast.success("Account created successfully!");
      setStep("assessment");
    } else {
      toast.error("Email already exists. Please use a different email.");
    }
    
    setLoading(false);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...assessmentAnswers];
    newAnswers[currentQuestion] = answer;
    setAssessmentAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment(newAnswers);
    }
  };

  const completeAssessment = (answers: string[]) => {
    // Calculate basic assessment score
    const scoreMap = { "Never": 1, "Rarely": 2, "Sometimes": 3, "Often": 4, "Always": 5,
                     "Very positive": 1, "Mostly positive": 2, "Neutral": 3, "Somewhat negative": 4, "Very negative": 5,
                     "Excellent": 1, "Good": 2, "Fair": 3, "Poor": 4, "Very poor": 5,
                     "Very satisfied": 1, "Satisfied": 2, "Dissatisfied": 4, "Very dissatisfied": 5 };
    
    const totalScore = answers.reduce((sum, answer) => sum + (scoreMap[answer as keyof typeof scoreMap] || 3), 0);
    const averageScore = totalScore / answers.length;
    
    let riskLevel = "Low";
    if (averageScore > 3.5) riskLevel = "High";
    else if (averageScore > 2.5) riskLevel = "Moderate";

    toast.success(`Assessment completed! Risk level: ${riskLevel}`);
    setStep("complete");
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (step === "assessment") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl glass-effect border-white/10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                MindSync
              </span>
            </div>
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-green-400" />
              Mental Health Assessment
            </CardTitle>
            <CardDescription className="text-slate-300">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </CardDescription>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <h3 className="text-xl text-white mb-6">
                {assessmentQuestions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {assessmentQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full text-left justify-start bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-green-400/50 transition-all"
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {currentQuestion > 0 && (
                <Button
                  onClick={goToPreviousQuestion}
                  variant="ghost"
                  className="mt-6 text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-effect border-white/10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                MindSync
              </span>
            </div>
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-green-400" />
              Assessment Complete!
            </CardTitle>
            <CardDescription className="text-slate-300">
              You're all set to start your mental health analysis journey
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-300 mb-6">
              Your initial assessment has been recorded. You can now access the chat analysis feature to continue monitoring your mental health.
            </p>
            <Button
              onClick={() => navigate("/chat")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white mb-4"
            >
              Start Chat Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-effect border-white/10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              MindSync
            </span>
          </div>
          <CardTitle className="text-white flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-green-400" />
            Get Started
          </CardTitle>
          <CardDescription className="text-slate-300">
            Create your account to start your mental health analysis journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account & Start Assessment"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:text-green-300 underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetStarted;
