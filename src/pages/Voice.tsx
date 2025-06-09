
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, ArrowLeft, Brain, Play, Pause, RotateCcw, AlertTriangle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VoiceAnalysisResult } from "@/types/voice";

const Voice = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VoiceAnalysisResult | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsRecording(true);
      setRecordingTime(0);
      setAnalysisResult(null);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to use voice analysis.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const analyzeVoice = () => {
    setIsAnalyzing(true);
    
    // Simulate voice analysis
    setTimeout(() => {
      const mockResult = {
        emotions: {
          stress: Math.floor(Math.random() * 40) + 30,
          anxiety: Math.floor(Math.random() * 35) + 25,
          sadness: Math.floor(Math.random() * 30) + 20,
          anger: Math.floor(Math.random() * 25) + 10,
          happiness: Math.floor(Math.random() * 40) + 30,
          neutral: Math.floor(Math.random() * 50) + 30
        },
        voiceMetrics: {
          pitch_variation: Math.floor(Math.random() * 30) + 50,
          speech_rate: Math.floor(Math.random() * 40) + 120,
          voice_energy: Math.floor(Math.random() * 35) + 45,
          pause_frequency: Math.floor(Math.random() * 20) + 15
        },
        indicators: [
          'Irregular speech patterns detected',
          'Voice tension indicators present',
          'Emotional stress markers found',
          'Breathing pattern variations'
        ],
        recommendation: 'Consider stress management techniques',
        riskLevel: 'moderate'
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    setAnalysisResult(null);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500/80';
      case 'moderate': return 'bg-yellow-500/80';
      case 'high': return 'bg-red-500/80';
      default: return 'bg-gray-500/80';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-slate-300 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Voice Analysis</span>
              </div>
            </div>
            {analysisResult && (
              <Badge className={`${getRiskLevelColor(analysisResult.riskLevel)} text-white capitalize border-0`}>
                {analysisResult.riskLevel} Risk
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recording Interface */}
          <div className="space-y-6">
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Mic className="h-5 w-5 text-purple-400" />
                  <span>Voice Recording</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* Recording Button */}
                <div className="relative">
                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isAnalyzing}
                    className={`w-32 h-32 rounded-full text-white border-0 ${
                      isRecording 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse glow-effect' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="h-12 w-12" />
                    ) : (
                      <Mic className="h-12 w-12" />
                    )}
                  </Button>
                  
                  {isRecording && (
                    <div className="absolute -inset-2 rounded-full border-4 border-red-300/50 animate-ping"></div>
                  )}
                </div>

                {/* Recording Status */}
                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">
                    {isRecording ? 'Recording...' : hasRecording ? 'Recording Complete' : 'Ready to Record'}
                  </p>
                  <p className="text-2xl font-mono bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {formatTime(recordingTime)}
                  </p>
                  {isRecording && (
                    <p className="text-sm text-slate-400">
                      Speak naturally about how you're feeling today
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  {hasRecording && !isAnalyzing && (
                    <>
                      <Button 
                        onClick={analyzeVoice}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Analyze Voice
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetRecording}
                        className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </>
                  )}
                </div>

                {isAnalyzing && (
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Sparkles className="animate-pulse h-5 w-5 text-purple-400" />
                      <span className="font-medium text-purple-200">Analyzing voice patterns...</span>
                    </div>
                    <p className="text-sm text-purple-300">
                      Processing speech patterns, tone, and emotional indicators
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <p className="text-sm text-slate-300">Click the microphone to start recording</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <p className="text-sm text-slate-300">Speak for 30-60 seconds about your feelings</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <p className="text-sm text-slate-300">Our AI analyzes vocal patterns and emotions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <p className="text-sm text-slate-300">Receive personalized insights and recommendations</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Emotion Analysis */}
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Emotion Detection Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analysisResult.emotions).map(([emotion, value]) => (
                      <div key={emotion}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium capitalize text-slate-300">{emotion.replace('_', ' ')}</span>
                          <span className="text-sm text-slate-400">{value as number}%</span>
                        </div>
                        <Progress value={value as number} className="h-2 bg-slate-700" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Voice Metrics */}
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Voice Pattern Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {analysisResult.voiceMetrics.pitch_variation}%
                        </div>
                        <div className="text-sm text-slate-400">Pitch Variation</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {analysisResult.voiceMetrics.speech_rate}
                        </div>
                        <div className="text-sm text-slate-400">Words/Min</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {analysisResult.voiceMetrics.voice_energy}%
                        </div>
                        <div className="text-sm text-slate-400">Voice Energy</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {analysisResult.voiceMetrics.pause_frequency}%
                        </div>
                        <div className="text-sm text-slate-400">Pause Frequency</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indicators and Recommendations */}
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Key Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {analysisResult.indicators.map((indicator: string, index: number) => (
                        <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-white/10 text-slate-300 border-white/20">
                          {indicator}
                        </Badge>
                      ))}
                    </div>
                    
                    {analysisResult.riskLevel === 'high' && (
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="font-medium text-red-300">Professional Support Recommended</span>
                        </div>
                        <p className="text-sm text-red-200">
                          {analysisResult.recommendation}
                        </p>
                      </div>
                    )}
                    
                    {analysisResult.riskLevel === 'moderate' && (
                      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium text-yellow-300">Monitor & Self-Care</span>
                        </div>
                        <p className="text-sm text-yellow-200">
                          {analysisResult.recommendation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="glass-effect border-white/10 h-full flex items-center justify-center">
                <CardContent className="text-center text-slate-400">
                  <Mic className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2 text-white">Ready for Voice Analysis</p>
                  <p className="text-sm">
                    Record your voice to get detailed emotional insights and recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voice;
