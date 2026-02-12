import { useState, useCallback } from 'react';

type GeminiState = 'idle' | 'listening' | 'processing' | 'speaking';

const GEMINI_RESPONSE = "I see a staircase leading up. There is a wet floor sign on the right.";

export const useGeminiSimulation = () => {
  const [geminiState, setGeminiState] = useState<GeminiState>('idle');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setGeminiState('idle');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback if speech synthesis not available
      setTimeout(() => setGeminiState('idle'), 3000);
    }
  }, []);

  const startSimulation = useCallback(() => {
    if (geminiState !== 'idle') return;

    // State 1: Listening for 2 seconds
    setGeminiState('listening');
    
    setTimeout(() => {
      // State 2: Processing for 1 second
      setGeminiState('processing');
      
      setTimeout(() => {
        // State 3: Speaking and show toast
        setGeminiState('speaking');
        setToastMessage(GEMINI_RESPONSE);
        setShowToast(true);
        speakText(GEMINI_RESPONSE);
      }, 1000);
    }, 2000);
  }, [geminiState, speakText]);

  const closeToast = useCallback(() => {
    setShowToast(false);
    window.speechSynthesis?.cancel();
    setGeminiState('idle');
  }, []);

  return {
    geminiState,
    showToast,
    toastMessage,
    startSimulation,
    closeToast,
  };
};
