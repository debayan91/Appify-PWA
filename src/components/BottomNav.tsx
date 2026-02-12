import { LayoutGrid, Eye, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';

type TabType = 'home' | 'vision' | 'history' | 'settings';

interface NavItem {
  id: TabType;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: LayoutGrid, label: 'Home' },
  { id: 'vision', icon: Eye, label: 'Vision' },
  { id: 'history', icon: Clock, label: 'History' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const BottomNav = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <nav className="bottom-nav flex items-center justify-around px-6">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center gap-1.5 py-3 px-5 transition-all"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? 'text-foreground' : 'text-foreground/30'
                }`}
                strokeWidth={isActive ? 1.5 : 1}
              />
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-px bg-foreground"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </div>
            <span
              className={`text-[10px] tracking-widest uppercase transition-all duration-300 ${
                isActive ? 'text-foreground font-normal' : 'text-foreground/30 font-light'
              }`}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
