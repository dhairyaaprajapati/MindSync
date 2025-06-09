
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mic, Brain, Users, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat Analysis",
      description: "Advanced NLP detects emotional patterns in your conversations"
    },
    {
      icon: Mic,
      title: "Voice Emotion Detection",
      description: "Real-time analysis of speech patterns and vocal indicators"
    },
    {
      icon: Brain,
      title: "Early Detection",
      description: "Identify signs of stress, anxiety, and burnout before they escalate"
    },
    {
      icon: Users,
      title: "Professional Support",
      description: "Connect with therapists and mental health professionals"
    }
  ];

  const stats = [
    { label: "Accuracy Rate", value: "94%" },
    { label: "Users Helped", value: "10K+" },
    { label: "Early Detections", value: "85%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MindSync
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                About
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Contact
              </Button>
              <Button 
                onClick={() => navigate('/chat')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Early Mental Health Detection
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-green-700 bg-clip-text text-transparent leading-tight">
            Detect Mental Health
            <br />
            <span className="text-blue-600">Before It's Critical</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            MindSync uses AI-powered chat and voice analysis to detect early signs of stress, 
            anxiety, and burnout, providing personalized support and professional connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chat Analysis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/voice')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
            >
              <Mic className="mr-2 h-5 w-5" />
              Try Voice Detection
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/60 backdrop-blur-sm border-y border-blue-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            How MindSync <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced AI technology combined with human expertise to support your mental health journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take Control of Your Mental Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who trust MindSync for early detection and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3"
            >
              Start Your Assessment
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">MindSync</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <Shield className="h-4 w-4" />
              <span className="text-sm">HIPAA Compliant & Secure</span>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MindSync. Supporting mental health through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
