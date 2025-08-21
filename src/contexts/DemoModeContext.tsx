import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from './TranslationContext';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'pollution' | 'event' | 'badge';
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
  duration?: number;
}

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  isGuidedTour: boolean;
  currentTourStep: number;
  startGuidedTour: () => void;
  nextTourStep: () => void;
  endGuidedTour: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};

interface DemoModeProviderProps {
  children: React.ReactNode;
}

export const DemoModeProvider: React.FC<DemoModeProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isGuidedTour, setIsGuidedTour] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);

  // Demo notifications templates
  const demoNotifications = [
    {
      type: 'pollution' as const,
      title: 'New Pollution Report',
      message: 'Plastic waste reported in St. Pauli',
      icon: '🚨',
      duration: 4000,
    },
    {
      type: 'event' as const,
      title: 'Event Joined',
      message: 'Anna Schmidt joined HafenCity cleanup',
      icon: '👥',
      duration: 3500,
    },
    {
      type: 'badge' as const,
      title: 'Badge Earned!',
      message: 'You earned the "Eco Warrior" badge!',
      icon: '🏆',
      duration: 4500,
    },
    {
      type: 'success' as const,
      title: 'Milestone Reached',
      message: '250 volunteers joined this month!',
      icon: '🎉',
      duration: 4000,
    },
    {
      type: 'info' as const,
      title: 'Weather Alert',
      message: 'Perfect weather for cleanup tomorrow',
      icon: '☀️',
      duration: 3000,
    },
    {
      type: 'warning' as const,
      title: 'High Priority',
      message: 'Chemical spill needs immediate attention',
      icon: '⚠️',
      duration: 5000,
    },
  ];

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, notification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
    if (!isDemoMode) {
      // Clear existing notifications when entering demo mode
      setNotifications([]);
    }
  };

  const startGuidedTour = () => {
    setIsGuidedTour(true);
    setCurrentTourStep(0);
  };

  const nextTourStep = () => {
    setCurrentTourStep(prev => prev + 1);
  };

  const endGuidedTour = () => {
    setIsGuidedTour(false);
    setCurrentTourStep(0);
  };

  // Demo mode simulation
  useEffect(() => {
    if (!isDemoMode) return;

    let notificationInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    // Start demo notifications after a short delay
    timeoutId = setTimeout(() => {
      // Add initial welcome notification
      addNotification({
        type: 'info',
        title: 'Demo Mode Active',
        message: 'Simulating live ElbeClean activity',
        icon: '🎬',
        duration: 3000,
      });

      // Set up interval for random notifications
      notificationInterval = setInterval(() => {
        const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
        addNotification(randomNotification);
      }, 6000); // Every 6 seconds

    }, 1000);

    return () => {
      if (notificationInterval) clearInterval(notificationInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isDemoMode, addNotification]);

  // Clean up notifications when demo mode is disabled
  useEffect(() => {
    if (!isDemoMode) {
      setNotifications([]);
    }
  }, [isDemoMode]);

  return (
    <DemoModeContext.Provider
      value={{
        isDemoMode,
        toggleDemoMode,
        notifications,
        addNotification,
        removeNotification,
        isGuidedTour,
        currentTourStep,
        startGuidedTour,
        nextTourStep,
        endGuidedTour,
      }}
    >
      {children}
    </DemoModeContext.Provider>
  );
};
