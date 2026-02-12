import { AnimatePresence } from 'framer-motion';
import { AppProvider, useAppContext } from '@/contexts/AppContext';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import HomeTab from '@/components/tabs/HomeTab';
import VisionTab from '@/components/tabs/VisionTab';
import HistoryTab from '@/components/tabs/HistoryTab';
import SettingsTab from '@/components/tabs/SettingsTab';

const AppContent = () => {
  const { activeTab } = useAppContext();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-background">
      {/* App Header - Hidden on Vision tab */}
      {activeTab !== 'vision' && <AppHeader />}

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'home' && <HomeTab key="home" />}
        {activeTab === 'vision' && <VisionTab key="vision" />}
        {activeTab === 'history' && <HistoryTab key="history" />}
        {activeTab === 'settings' && <SettingsTab key="settings" />}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
