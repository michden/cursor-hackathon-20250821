import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, MapPin, Plus, BarChart3, Users } from 'lucide-react';
import { useDemoMode } from '../contexts/DemoModeContext';
import { useTranslation } from '../contexts/TranslationContext';

const GuidedTour: React.FC = () => {
  const { isGuidedTour, currentTourStep, nextTourStep, endGuidedTour } = useDemoMode();
  const { t } = useTranslation();

  const tourSteps = [
    {
      title: 'Welcome to ElbeClean',
      description: 'Your community-driven platform for keeping Hamburg\'s waterways clean',
      position: 'center',
      icon: '🌊',
    },
    {
      title: 'Interactive Map',
      description: 'View pollution hotspots across Hamburg with real-time status updates',
      position: 'bottom-left',
      target: 'map-section',
      icon: '🗺️',
    },
    {
      title: 'Report Pollution',
      description: 'Easy reporting with photo upload and location tagging',
      position: 'top-right',
      target: 'report-button',
      icon: '📸',
    },
    {
      title: 'Join Events',
      description: 'Participate in community cleanup events and make a difference',
      position: 'bottom-center',
      target: 'events-section',
      icon: '🎯',
    },
    {
      title: 'Track Impact',
      description: 'See your environmental impact and compete with other eco-warriors',
      position: 'top-center',
      target: 'impact-section',
      icon: '📊',
    },
    {
      title: 'Multilingual',
      description: 'Available in English, German, and Polish for Hamburg\'s diverse community',
      position: 'top-right',
      target: 'language-dropdown',
      icon: '🌍',
    },
  ];

  const currentStep = tourSteps[currentTourStep];
  const isLastStep = currentTourStep === tourSteps.length - 1;

  if (!isGuidedTour || !currentStep) return null;

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'top-center':
        return 'top-24 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-24 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-24 right-8';
      case 'bottom-left':
        return 'bottom-24 left-8';
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-[70] backdrop-blur-sm"
        onClick={endGuidedTour}
      />

      {/* Tour Step */}
      <AnimatePresence>
        <motion.div
          key={currentTourStep}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed z-[80] ${getPositionClasses(currentStep.position)}`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentStep.icon}</span>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {currentStep.title}
                </h3>
              </div>
              <button
                onClick={endGuidedTour}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              {currentStep.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTourStep
                        ? 'bg-elbe-blue'
                        : index < currentTourStep
                        ? 'bg-green-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                {!isLastStep ? (
                  <button
                    onClick={nextTourStep}
                    className="flex items-center space-x-2 px-4 py-2 bg-elbe-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={endGuidedTour}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <span>Finish Tour</span>
                    <span>🎉</span>
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Step {currentTourStep + 1} of {tourSteps.length}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default GuidedTour;
