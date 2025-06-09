
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mic, Brain, Users, TrendingUp, Shield, Sparkles, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat Analysis",
      description: "Advanced NLP detects emotional patterns in your conversations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mic,
      title: "Voice Emotion Detection",
      description: "Real-time analysis of speech patterns and vocal indicators",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Early Detection",
      description: "Identify signs of stress, anxiety, and burnout before they escalate",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Professional Support",
      description: "Connect with therapists and mental health professionals",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Accuracy Rate", value: "94%", icon: Star },
    { label: "Users Helped", value: "10K+", icon: Users },
    { label: "Early Detections", value: "85%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                MindSync
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                About
              </Button>
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                Contact
              </Button>
              <Button 
                onClick={() => navigate('/chat')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 glow-effect"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 backdrop-blur-sm">
            <Zap className="mr-2 h-3 w-3" />
            Early Mental Health Detection
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Detect Mental Health
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent text-glow">
              Before It's Critical
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            MindSync uses AI-powered chat and voice analysis to detect early signs of stress, 
            anxiety, and burnout, providing personalized support and professional connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-4 h-auto glow-effect"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chat Analysis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/voice')}
              className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 text-lg px-8 py-4 h-auto backdrop-blur-sm"
            >
              <Mic className="mr-2 h-5 w-5" />
              Try Voice Detection
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="glass-effect border-y border-white/10 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">How MindSync </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Advanced AI technology combined with human expertise to support your mental health journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${feature.color} rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to Take Control of Your Mental Health?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands who trust MindSync for early detection and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto font-semibold"
            >
              Start Your Assessment
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MindSync</span>
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <Shield className="h-4 w-4" />
              <span className="text-sm">HIPAA Compliant & Secure</span>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 MindSync by Dhairya Prajapati. Supporting mental health through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
