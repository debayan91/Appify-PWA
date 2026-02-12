import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, X } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

type AskState = 'idle' | 'listening' | 'processing' | 'response';

const VisionTab = () => {
  const { isDemoMode, isConnected, autoReadEnabled, hapticEnabled } = useAppContext();
  const [askState, setAskState] = useState<AskState>('idle');
  const [showResponse, setShowResponse] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const responseText = "I see a staircase leading up. Caution sign on right.";

  // Try to access camera
  useEffect(() => {
    if (isDemoMode) {
      setCameraError(true);
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log('Camera access denied or unavailable');
        setCameraError(true);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isDemoMode]);

  const handleAsk = () => {
    if (askState !== 'idle') return;

    if (hapticEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }

    setAskState('listening');

    setTimeout(() => {
      setAskState('processing');
      
      setTimeout(() => {
        setAskState('response');
        setShowResponse(true);

        if (autoReadEnabled && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(responseText);
          utterance.rate = 0.9;
          utterance.pitch = 1;
          window.speechSynthesis.speak(utterance);
        }

        setTimeout(() => {
          setAskState('idle');
        }, 500);
      }, 1000);
    }, 2000);
  };

  const closeResponse = () => {
    setShowResponse(false);
    window.speechSynthesis?.cancel();
  };

  return (
    <div className="fixed inset-0 bg-background">
      {/* Camera/Video Background */}
      <div className="absolute inset-0">
        {cameraError || isDemoMode ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-pov-of-walking-on-a-busy-street-4357-large.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
        )}
        
        {/* Overlay - themed */}
        <div className="absolute inset-0 bg-background/50" />
        
        {/* Lidar Grid */}
        <div className="lidar-grid" />
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* AI Confidence Pill */}
        {(isDemoMode || isConnected) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-card"
          >
            <span className="text-[10px] font-light tracking-widest uppercase text-foreground/60">Confidence: 98%</span>
          </motion.div>
        )}

        {/* Center Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 border border-foreground/30 rounded-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/40" />
        </div>

        {/* Path Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-[35vh] left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full glass-card"
        >
          <span className="text-sm font-light tracking-wide text-foreground">Clear Path &gt; 5.0m</span>
        </motion.div>
      </div>

      {/* Control Panel */}
      <div className="control-deck flex flex-col items-center justify-center gap-4 pointer-events-auto">
        {/* State Indicator */}
        <AnimatePresence mode="wait">
          {askState === 'listening' && (
            <motion.div
              key="listening"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-foreground/60 rounded-full"
                    animate={{ height: [8, 28, 8] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-light tracking-wide text-foreground/50">Listening...</span>
            </motion.div>
          )}

          {askState === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 text-foreground/50 animate-spin" strokeWidth={1.5} />
              <span className="text-xs font-light tracking-wide text-foreground/50">Processing...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ask Button */}
        <motion.button
          onClick={handleAsk}
          disabled={askState !== 'idle'}
          className={`w-20 h-20 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${askState === 'idle' ? 'hover:bg-foreground/10 hover:border-foreground/30' : 'opacity-50'}`}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
        </motion.button>

        <span className="text-[10px] font-light tracking-[0.3em] uppercase text-foreground/40">Ask</span>
      </div>

      {/* Response Card */}
      <AnimatePresence>
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-4 right-4 z-50"
          >
            <div className="rounded-2xl glass-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3 h-3 text-foreground/40" strokeWidth={1.5} />
                    <span className="text-[10px] font-light tracking-widest uppercase text-foreground/40">Response</span>
                  </div>
                  <p className="text-base font-light text-foreground leading-relaxed tracking-wide">
                    {responseText}
                  </p>
                </div>
                <motion.button
                  onClick={closeResponse}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full border border-foreground/10"
                >
                  <X className="w-3 h-3 text-foreground/50" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisionTab;
