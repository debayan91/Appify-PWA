import { motion } from 'framer-motion';
import { Clock, Car, AlertTriangle, FileText, Inbox } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface HistoryEntry {
  time: string;
  icon: React.ElementType;
  label: string;
}

const demoEntries: HistoryEntry[] = [
  { time: '10:42 AM', icon: Car, label: 'Red Car' },
  { time: '10:40 AM', icon: AlertTriangle, label: 'Pothole' },
  { time: '10:38 AM', icon: FileText, label: 'Text: Bakery' },
];

const HistoryTab = () => {
  const { isDemoMode } = useAppContext();

  const entries = isDemoMode ? demoEntries : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-4 p-6 pt-20 pb-28 h-full"
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
        <h2 className="text-[10px] uppercase tracking-widest text-foreground/40">Recent Scans</h2>
      </div>

      {entries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="w-20 h-20 rounded-full border border-foreground/10 flex items-center justify-center">
            <Inbox className="w-8 h-8 text-foreground/20" strokeWidth={1} />
          </div>
          <div className="text-center">
            <h3 className="text-base font-light text-foreground/60 mb-1">No recent scans</h3>
            <p className="text-xs font-light text-foreground/30 tracking-wide">
              Your scan history will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="surface-card flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center">
                <entry.icon className="w-4 h-4 text-foreground/60" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-light text-foreground tracking-wide">{entry.label}</span>
              </div>
              <span className="text-[10px] font-mono font-light text-foreground/40">{entry.time}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HistoryTab;
