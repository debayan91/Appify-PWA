// App Context - Global State Management
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type TabType = 'home' | 'vision' | 'history' | 'settings';
type ThemeType = 'dark' | 'light';

interface AppState {
  activeTab: TabType;
  isConnected: boolean;
  isDemoMode: boolean;
  batteryLevel: number;
  hapticEnabled: boolean;
  autoReadEnabled: boolean;
  saveToCloud: boolean;
  highContrastMode: boolean;
  theme: ThemeType;
}

interface AppContextType extends AppState {
  setActiveTab: (tab: TabType) => void;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  toggleHaptic: () => void;
  toggleAutoRead: () => void;
  toggleSaveToCloud: () => void;
  toggleHighContrast: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    activeTab: 'home',
    isConnected: false,
    isDemoMode: false,
    batteryLevel: 0,
    hapticEnabled: true,
    autoReadEnabled: true,
    saveToCloud: false,
    highContrastMode: false,
    theme: 'dark',
  });

  // Apply theme and high contrast classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Handle theme
    if (state.theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    
    // Handle high contrast
    if (state.highContrastMode) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [state.highContrastMode, state.theme]);

  const setActiveTab = useCallback((tab: TabType) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  const enableDemoMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isConnected: true,
      isDemoMode: true,
      batteryLevel: 92,
    }));
  }, []);

  const disableDemoMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isConnected: false,
      isDemoMode: false,
      batteryLevel: 0,
    }));
  }, []);

  const toggleHaptic = useCallback(() => {
    setState(prev => ({ ...prev, hapticEnabled: !prev.hapticEnabled }));
  }, []);

  const toggleAutoRead = useCallback(() => {
    setState(prev => ({ ...prev, autoReadEnabled: !prev.autoReadEnabled }));
  }, []);

  const toggleSaveToCloud = useCallback(() => {
    setState(prev => ({ ...prev, saveToCloud: !prev.saveToCloud }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setState(prev => ({ ...prev, highContrastMode: !prev.highContrastMode }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setActiveTab,
        enableDemoMode,
        disableDemoMode,
        toggleHaptic,
        toggleAutoRead,
        toggleSaveToCloud,
        toggleHighContrast,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
