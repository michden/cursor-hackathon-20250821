import React from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Eye, Zap } from 'lucide-react';
import { useDemoMode } from '../contexts/DemoModeContext';
import { useTranslation } from '../contexts/TranslationContext';

const DemoModeIndicator: React.FC = () => {
  const { isDemoMode, toggleDemoMode, startGuidedTour } = useDemoMode();
  const { t } = useTranslation();

  if (!isDemoMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-4 z-[60] bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div className="flex items-center space-x-2 mb-3">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="h-5 w-5 text-yellow-300" />
        </motion.div>
        <h3 className="font-bold text-sm">Demo Mode Active</h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 bg-red-400 rounded-full"
        />
      </div>
      
      <p className="text-xs text-purple-100 mb-3">
        Simulating live ElbeClean activity for presentation
      </p>

      <div className="flex space-x-2">
        <button
          onClick={startGuidedTour}
          className="flex items-center space-x-1 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors"
        >
          <Eye className="h-3 w-3" />
          <span>Guided Tour</span>
        </button>
        
        <button
          onClick={toggleDemoMode}
          className="flex items-center space-x-1 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors"
        >
          <Square className="h-3 w-3" />
          <span>Stop Demo</span>
        </button>
      </div>
    </motion.div>
  );
};

export default DemoModeIndicator;
