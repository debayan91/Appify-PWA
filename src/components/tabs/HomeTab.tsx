import { motion } from 'framer-motion';
import { Bluetooth, Wifi, Box, ShieldAlert, Timer, Database, ScanText, Palette, Key, AlertCircle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const quickActions = [
  { icon: ScanText, label: 'Read Text' },
  { icon: Palette, label: 'Identify Color' },
  { icon: Key, label: 'Find Keys' },
  { icon: AlertCircle, label: 'SOS Config' },
];

const HomeTab = () => {
  const { isConnected, isDemoMode } = useAppContext();

  const stats = [
    { 
      icon: Box, 
      label: 'Objects', 
      value: isDemoMode ? 42 : 0,
    },
    { 
      icon: ShieldAlert, 
      label: 'Alerts', 
      value: isDemoMode ? 3 : 0,
    },
    { 
      icon: Timer, 
      label: 'Walk Time', 
      value: isDemoMode ? '12m' : '0m',
    },
    { 
      icon: Database, 
      label: 'Data', 
      value: '0mb',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6 p-6 pt-20 pb-28 overflow-y-auto h-full"
    >
      {/* Status Card */}
      <div className="surface-card">
        {isConnected ? (
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl border border-foreground/10 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-light tracking-wide text-foreground mb-2">System Ready</h2>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  <span className="text-xs font-light text-foreground/60 tracking-wide">Signal: Strong</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                  <span className="text-xs font-light text-foreground/60 tracking-wide">Firmware: v2.1</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl border border-foreground/10 flex items-center justify-center">
              <Bluetooth className="w-5 h-5 text-foreground/40" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-light tracking-wide text-foreground mb-3">Device Not Found</h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full border border-foreground/20 text-foreground/80 font-light text-sm tracking-wide"
              >
                Pair Device
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="surface-elevated flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <stat.icon className="w-3.5 h-3.5 text-foreground/40" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest text-foreground/40">{stat.label}</span>
            </div>
            <span className="text-2xl font-mono font-light text-foreground">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3 px-1">Quick Actions</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickActions.map((action) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.95 }}
              className="pill-button flex-shrink-0"
            >
              <action.icon className="w-3.5 h-3.5 text-foreground/60" strokeWidth={1.5} />
              <span className="text-foreground/80 font-light text-xs tracking-wide whitespace-nowrap">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeTab;
