
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, Mic, LogOut, User } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/10">
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
              <span className="text-slate-300">Welcome, {user.name}</span>
              <Button variant="ghost" onClick={handleLogout} className="text-slate-300 hover:text-white hover:bg-white/10">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* User Profile Section */}
        <Card className="glass-effect border-white/10 mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-slate-300">{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Analysis Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-effect border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Start Chat Analysis</CardTitle>
              <CardDescription className="text-slate-300">
                Begin a new mental health assessment through conversation
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/chat')}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Voice Analysis</CardTitle>
              <CardDescription className="text-slate-300">
                Analyze emotional patterns through voice detection
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/voice')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
              >
                Start Voice Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis History */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Analysis History</CardTitle>
            <CardDescription className="text-slate-300">
              View your previous mental health assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.chatAnalyses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">No analyses yet. Start your first assessment!</p>
                <Button 
                  onClick={() => navigate('/chat')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  Start Your First Analysis
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {user.chatAnalyses.map((analysis, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getRiskLevelColor(analysis.riskLevel)}>
                        Risk Level: {analysis.riskLevel}
                      </Badge>
                      <span className="text-slate-400 text-sm">
                        {new Date(analysis.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white font-medium">{analysis.summary}</p>
                    <p className="text-slate-300 text-sm mt-2">{analysis.recommendation}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
