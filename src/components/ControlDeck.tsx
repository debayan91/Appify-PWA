import GeminiButton from './GeminiButton';

type GeminiState = 'idle' | 'listening' | 'processing' | 'speaking';

interface ControlDeckProps {
  geminiState: GeminiState;
  onGeminiClick: () => void;
}

const ControlDeck = ({ geminiState, onGeminiClick }: ControlDeckProps) => {
  return (
    <div className="control-deck flex items-center justify-center">
      <GeminiButton state={geminiState} onClick={onGeminiClick} />
    </div>
  );
};

export default ControlDeck;
