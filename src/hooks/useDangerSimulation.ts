import { useState, useCallback, useRef, useEffect } from 'react';

// Simple beep sound using Web Audio API
const playBeep = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log('Audio not available');
  }
};

export const useDangerSimulation = () => {
  const [isDanger, setIsDanger] = useState(false);
  const hasTriggeredRef = useRef(false);

  const toggleDanger = useCallback((value: boolean) => {
    setIsDanger(value);
    
    if (value && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      
      // Trigger haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      
      // Play beep sound
      playBeep();
    } else if (!value) {
      hasTriggeredRef.current = false;
    }
  }, []);

  // Trigger effects when danger is toggled on
  useEffect(() => {
    if (isDanger && hasTriggeredRef.current) {
      // Additional haptic on state change
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      playBeep();
    }
  }, [isDanger]);

  const distance = isDanger ? '0.5m' : '> 5.0m';

  return {
    isDanger,
    distance,
    toggleDanger,
  };
};
