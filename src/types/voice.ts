
export interface VoiceAnalysisResult {
  emotions: {
    stress: number;
    anxiety: number;
    sadness: number;
    anger: number;
    happiness: number;
    neutral: number;
  };
  voiceMetrics: {
    pitch_variation: number;
    speech_rate: number;
    voice_energy: number;
    pause_frequency: number;
  };
  indicators: string[];
  recommendation: string;
  riskLevel: 'low' | 'moderate' | 'high';
}
