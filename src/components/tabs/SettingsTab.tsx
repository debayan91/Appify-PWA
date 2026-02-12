import { motion } from 'framer-motion';
import { Vibrate, Volume2, Cloud, Code, Contrast, Sun, Moon } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from 'sonner';

interface SettingToggleProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

const SettingToggle = ({ icon: Icon, label, description, checked, onChange }: SettingToggleProps) => (
  <motion.button
    onClick={onChange}
    className="w-full surface-card flex items-center gap-4 active:scale-[0.98] transition-transform"
    whileTap={{ scale: 0.98 }}
  >
    <div className="w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center">
      <Icon className="w-4 h-4 text-foreground/60" strokeWidth={1.5} />
    </div>
    <div className="flex-1 text-left">
      <span className="text-sm font-light tracking-wide text-foreground">{label}</span>
      {description && (
        <p className="text-[10px] font-light tracking-wide text-foreground/40 mt-0.5">{description}</p>
      )}
    </div>
    <div 
      className={`toggle-track ${checked ? 'bg-primary' : 'bg-muted'}`}
      data-state={checked ? 'checked' : 'unchecked'}
    >
      <div 
        className="toggle-thumb"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </div>
  </motion.button>
);

const SettingsTab = () => {
  const {
    hapticEnabled,
    autoReadEnabled,
    saveToCloud,
    isDemoMode,
    highContrastMode,
    theme,
    toggleHaptic,
    toggleAutoRead,
    toggleSaveToCloud,
    enableDemoMode,
    disableDemoMode,
    toggleHighContrast,
    toggleTheme,
  } = useAppContext();

  const handleDemoToggle = () => {
    if (isDemoMode) {
      disableDemoMode();
      toast.info('Demo mode disabled');
    } else {
      enableDemoMode();
      toast.success('Device Connected', {
        description: 'Demo mode is now active',
      });
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    toast.info(highContrastMode ? 'Standard mode' : 'High contrast mode');
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast.info(theme === 'dark' ? 'Light mode' : 'Dark mode');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-8 p-6 pt-20 pb-28 h-full overflow-y-auto"
    >
      {/* Display Settings */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-4 px-1">Display</h3>
        <div className="flex flex-col gap-3">
          <SettingToggle
            icon={theme === 'dark' ? Moon : Sun}
            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            description="Switch between dark and light themes"
            checked={theme === 'light'}
            onChange={handleThemeToggle}
          />
          <SettingToggle
            icon={Contrast}
            label="High Contrast"
            description="Maximum visibility with extra bold fonts"
            checked={highContrastMode}
            onChange={handleHighContrastToggle}
          />
        </div>
      </div>

      {/* General Settings */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-4 px-1">General</h3>
        <div className="flex flex-col gap-3">
          <SettingToggle
            icon={Vibrate}
            label="Haptic Feedback"
            description="Vibrate on alerts and actions"
            checked={hapticEnabled}
            onChange={toggleHaptic}
          />
          <SettingToggle
            icon={Volume2}
            label="Auto-Read Text"
            description="Speak detected text automatically"
            checked={autoReadEnabled}
            onChange={toggleAutoRead}
          />
          <SettingToggle
            icon={Cloud}
            label="Save to Cloud"
            description="Sync scan history to cloud"
            checked={saveToCloud}
            onChange={toggleSaveToCloud}
          />
        </div>
      </div>

      {/* Developer Section */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-4 px-1">Developer</h3>
        <div className="flex flex-col gap-3">
          <SettingToggle
            icon={Code}
            label="Enable Demo Mode"
            description="Simulate connected device"
            checked={isDemoMode}
            onChange={handleDemoToggle}
          />
        </div>
      </div>

      {/* App Info */}
      <div className="mt-auto pt-6">
        <div className="text-center">
          <p className="text-[10px] tracking-widest uppercase text-foreground/30">Omni v1.0.0</p>
          <p className="text-[10px] tracking-wide text-foreground/20 mt-1">Built for accessibility</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsTab;
