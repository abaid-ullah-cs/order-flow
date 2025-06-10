import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ModuleType = 'orders' | 'milk' | 'lending' | 'inventory';

interface ModulesContextType {
  activeModules: ModuleType[];
  hasCompletedOnboarding: boolean;
  toggleModule: (module: ModuleType) => void;
  setActiveModules: (modules: ModuleType[]) => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
}

const ModulesContext = createContext<ModulesContextType>({
  activeModules: [],
  hasCompletedOnboarding: false,
  toggleModule: () => {},
  setActiveModules: () => {},
  setHasCompletedOnboarding: () => {},
});

export const ModulesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModules, setActiveModules] = useState<ModuleType[]>([]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedModules = await AsyncStorage.getItem('activeModules');
        const storedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        
        if (storedModules) {
          setActiveModules(JSON.parse(storedModules));
        }
        
        if (storedOnboarding) {
          setHasCompletedOnboarding(JSON.parse(storedOnboarding));
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStoredData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        try {
          await AsyncStorage.setItem('activeModules', JSON.stringify(activeModules));
          await AsyncStorage.setItem('hasCompletedOnboarding', JSON.stringify(hasCompletedOnboarding));
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
      
      saveData();
    }
  }, [activeModules, hasCompletedOnboarding, isLoading]);

  const toggleModule = (module: ModuleType) => {
    setActiveModules(prev => {
      if (prev.includes(module)) {
        return prev.filter(m => m !== module);
      } else {
        return [...prev, module];
      }
    });
  };

  const value = {
    activeModules,
    hasCompletedOnboarding,
    toggleModule,
    setActiveModules,
    setHasCompletedOnboarding,
  };

  return (
    <ModulesContext.Provider value={value}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = () => useContext(ModulesContext);