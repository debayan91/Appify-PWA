import { Mic, Sparkles, Loader2 } from 'lucide-react';

type GeminiState = 'idle' | 'listening' | 'processing' | 'speaking';

interface GeminiButtonProps {
  state: GeminiState;
  onClick: () => void;
}

const WaveformAnimation = () => (
  <div className="flex items-center justify-center gap-1 h-8">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 bg-foreground rounded-full animate-waveform"
        style={{ 
          animationDelay: `${i * 0.1}s`,
          height: '8px'
        }}
      />
    ))}
  </div>
);

const GeminiButton = ({ state, onClick }: GeminiButtonProps) => {
  const isDisabled = state !== 'idle';

  const renderContent = () => {
    switch (state) {
      case 'listening':
        return <WaveformAnimation />;
      case 'processing':
        return <Loader2 className="w-10 h-10 text-foreground animate-spin-slow" />;
      case 'speaking':
        return <Sparkles className="w-10 h-10 text-foreground animate-pulse" />;
      default:
        return <Mic className="w-10 h-10 text-foreground" />;
    }
  };

  const getStateLabel = () => {
    switch (state) {
      case 'listening':
        return 'Listening...';
      case 'processing':
        return 'Processing...';
      case 'speaking':
        return 'Speaking...';
      default:
        return 'ASK GEMINI';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`gemini-button ${isDisabled ? 'opacity-80' : ''}`}
        aria-label="Ask Gemini"
      >
        {renderContent()}
      </button>
      
      <span className="text-lg font-semibold text-foreground tracking-wide">
        {getStateLabel()}
      </span>
    </div>
  );
};

export default GeminiButton;
