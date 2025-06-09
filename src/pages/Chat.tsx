
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Send, Brain, ArrowLeft, AlertTriangle, TrendingUp, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: {
    primary: string;
    confidence: number;
    indicators: string[];
  };
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to help analyze your emotional well-being through our conversation. Feel free to share what's on your mind today.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emotionSummary, setEmotionSummary] = useState({
    stress: 0,
    anxiety: 0,
    mood: 0,
    overall: 'stable'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeEmotion = (text: string) => {
    // Simulate AI emotion analysis
    const emotions = ['stress', 'anxiety', 'sadness', 'happiness', 'neutral', 'concern'];
    const indicators = [
      'negative sentiment detected',
      'high stress keywords',
      'anxiety patterns',
      'positive outlook',
      'seeking support',
      'emotional vulnerability'
    ];
    
    const primary = emotions[Math.floor(Math.random() * emotions.length)];
    const confidence = Math.floor(Math.random() * 40) + 60;
    const selectedIndicators = indicators.slice(0, Math.floor(Math.random() * 3) + 1);
    
    return {
      primary,
      confidence,
      indicators: selectedIndicators
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const emotion = analyzeEmotion(inputText);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(emotion),
        sender: 'ai',
        timestamp: new Date(),
        emotion
      };

      setMessages(prev => [...prev, aiResponse]);
      updateEmotionSummary(emotion);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getAIResponse = (emotion: any) => {
    const responses = {
      stress: "I notice some signs of stress in your message. It's completely normal to feel this way. Would you like to explore what might be contributing to these feelings?",
      anxiety: "I can sense some anxiety in your words. Thank you for sharing this with me. Can you tell me more about what's been causing you concern?",
      sadness: "I hear that you might be going through a difficult time. Your feelings are valid, and it's brave of you to express them. How long have you been feeling this way?",
      happiness: "It's wonderful to hear positivity in your message! Maintaining good mental health is just as important as addressing concerns. What's been going well for you?",
      neutral: "Thank you for sharing. I'd like to understand more about your current situation. How would you describe your overall mood lately?",
      concern: "I appreciate your openness. It sounds like there might be some underlying concerns. Would you feel comfortable exploring these feelings further?"
    };
    
    return responses[emotion.primary as keyof typeof responses] || responses.neutral;
  };

  const updateEmotionSummary = (emotion: any) => {
    setEmotionSummary(prev => {
      const newSummary = { ...prev };
      
      if (emotion.primary === 'stress') {
        newSummary.stress = Math.min(100, prev.stress + 15);
      }
      if (emotion.primary === 'anxiety') {
        newSummary.anxiety = Math.min(100, prev.anxiety + 12);
      }
      if (['happiness', 'neutral'].includes(emotion.primary)) {
        newSummary.mood = Math.min(100, prev.mood + 10);
      } else {
        newSummary.mood = Math.max(0, prev.mood - 5);
      }
      
      // Calculate overall status
      const avgScore = (newSummary.stress + newSummary.anxiety) / 2;
      if (avgScore > 60) {
        newSummary.overall = 'attention_needed';
      } else if (avgScore > 30) {
        newSummary.overall = 'monitoring';
      } else {
        newSummary.overall = 'stable';
      }
      
      return newSummary;
    });
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'attention_needed': return 'bg-red-500';
      case 'monitoring': return 'bg-yellow-500';
      case 'stable': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getOverallStatusText = (status: string) => {
    switch (status) {
      case 'attention_needed': return 'Attention Needed';
      case 'monitoring': return 'Monitoring';
      case 'stable': return 'Stable';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-blue-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Chat Analysis</span>
              </div>
            </div>
            <Badge className={`${getOverallStatusColor(emotionSummary.overall)} text-white`}>
              {getOverallStatusText(emotionSummary.overall)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Emotion Dashboard */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Emotion Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Stress Level</span>
                    <span className="text-sm text-gray-600">{emotionSummary.stress}%</span>
                  </div>
                  <Progress value={emotionSummary.stress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Anxiety Level</span>
                    <span className="text-sm text-gray-600">{emotionSummary.anxiety}%</span>
                  </div>
                  <Progress value={emotionSummary.anxiety} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Mood Stability</span>
                    <span className="text-sm text-gray-600">{emotionSummary.mood}%</span>
                  </div>
                  <Progress value={emotionSummary.mood} className="h-2" />
                </div>

                {emotionSummary.overall === 'attention_needed' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Support Recommended</span>
                    </div>
                    <p className="text-xs text-red-700">
                      Consider speaking with a mental health professional.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Mental Health Chat Assistant</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.emotion && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium">
                                {message.emotion.primary} ({message.emotion.confidence}%)
                              </span>
                            </div>
                            <div className="mt-1">
                              {message.emotion.indicators.map((indicator, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs mr-1">
                                  {indicator}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                          <span className="text-sm">Analyzing emotion...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Share what's on your mind..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                    disabled={isAnalyzing}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
