import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, ArrowLeft, Brain, Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Voice = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
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
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
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
                <span className="text-xl font-bold text-gray-900">Voice Analysis</span>
              </div>
            </div>
            {analysisResult && (
              <Badge className={`${getRiskLevelColor(analysisResult.riskLevel)} text-white capitalize`}>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="h-5 w-5 text-blue-600" />
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
                    className={`w-32 h-32 rounded-full text-white ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="h-12 w-12" />
                    ) : (
                      <Mic className="h-12 w-12" />
                    )}
                  </Button>
                  
                  {isRecording && (
                    <div className="absolute -inset-2 rounded-full border-4 border-red-300 animate-ping"></div>
                  )}
                </div>

                {/* Recording Status */}
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {isRecording ? 'Recording...' : hasRecording ? 'Recording Complete' : 'Ready to Record'}
                  </p>
                  <p className="text-2xl font-mono text-blue-600">
                    {formatTime(recordingTime)}
                  </p>
                  {isRecording && (
                    <p className="text-sm text-gray-600">
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
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Analyze Voice
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetRecording}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </>
                  )}
                </div>

                {isAnalyzing && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="font-medium text-blue-800">Analyzing voice patterns...</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Processing speech patterns, tone, and emotional indicators
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <p className="text-sm">Click the microphone to start recording</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <p className="text-sm">Speak for 30-60 seconds about your feelings</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <p className="text-sm">Our AI analyzes vocal patterns and emotions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <p className="text-sm">Receive personalized insights and recommendations</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Emotion Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Emotion Detection Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analysisResult.emotions).map(([emotion, value]) => (
                      <div key={emotion}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium capitalize">{emotion.replace('_', ' ')}</span>
                          <span className="text-sm text-gray-600">{value as number}%</span>
                        </div>
                        <Progress value={value as number} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Voice Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Pattern Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analysisResult.voiceMetrics.pitch_variation}%
                        </div>
                        <div className="text-sm text-gray-600">Pitch Variation</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analysisResult.voiceMetrics.speech_rate}
                        </div>
                        <div className="text-sm text-gray-600">Words/Min</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analysisResult.voiceMetrics.voice_energy}%
                        </div>
                        <div className="text-sm text-gray-600">Voice Energy</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analysisResult.voiceMetrics.pause_frequency}%
                        </div>
                        <div className="text-sm text-gray-600">Pause Frequency</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indicators and Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {analysisResult.indicators.map((indicator: string, index: number) => (
                        <Badge key={index} variant="secondary" className="mr-2 mb-2">
                          {indicator}
                        </Badge>
                      ))}
                    </div>
                    
                    {analysisResult.riskLevel === 'high' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-800">Professional Support Recommended</span>
                        </div>
                        <p className="text-sm text-red-700">
                          {analysisResult.recommendation}
                        </p>
                      </div>
                    )}
                    
                    {analysisResult.riskLevel === 'moderate' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium text-yellow-800">Monitor & Self-Care</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          {analysisResult.recommendation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center text-gray-500">
                  <Mic className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Ready for Voice Analysis</p>
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
