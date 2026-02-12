import { useEffect, useState } from 'react';

interface SafetyHUDProps {
  isDanger: boolean;
  distance: string;
}

const SafetyHUD = ({ isDanger, distance }: SafetyHUDProps) => {
  const [radarKey, setRadarKey] = useState(0);

  // Reset radar animation when danger state changes
  useEffect(() => {
    setRadarKey(prev => prev + 1);
  }, [isDanger]);

  return (
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
      <div className="glass-card p-8 relative overflow-hidden min-w-[280px]">
        {/* Radar Sweep Animation */}
        <div 
          key={radarKey}
          className={`radar-sweep w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isDanger ? 'radar-sweep-danger' : ''
          }`}
        />
        <div 
          key={`${radarKey}-2`}
          className={`radar-sweep w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isDanger ? 'radar-sweep-danger' : ''
          }`}
          style={{ animationDelay: '0.5s' }}
        />
        <div 
          key={`${radarKey}-3`}
          className={`radar-sweep w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isDanger ? 'radar-sweep-danger' : ''
          }`}
          style={{ animationDelay: '1s' }}
        />
        
        {/* Status Text */}
        <div className="relative z-10 text-center">
          <h1 
            className={`text-3xl font-extrabold tracking-wider transition-colors duration-300 ${
              isDanger ? 'text-danger' : 'text-safe'
            }`}
          >
            {isDanger ? '🛑 STOP' : 'CLEAR PATH'}
          </h1>
          
          <p className="text-lg font-medium text-muted-foreground mt-3">
            Distance: {distance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyHUD;
