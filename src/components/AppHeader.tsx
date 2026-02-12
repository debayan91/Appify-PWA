import { Battery, WifiOff } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const AppHeader = () => {
  const { isConnected, batteryLevel } = useAppContext();

  return (
    <header className="app-header flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg border border-foreground/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 5C7 5 2.73 8.11 1 12.5c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
          </svg>
        </div>
        <span className="text-base font-light tracking-widest uppercase text-foreground">Omni</span>
      </div>

      <div className="flex items-center gap-3">
        {isConnected ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-xs font-light tracking-wide text-foreground/80">Connected</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground/60">
              <Battery className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-xs font-mono font-light">{batteryLevel}%</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
            <WifiOff className="w-3 h-3 text-foreground/40" strokeWidth={1.5} />
            <span className="text-xs font-light tracking-wide text-foreground/40">Offline</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
