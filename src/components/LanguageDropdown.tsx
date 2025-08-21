import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Languages } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageOption {
  code: 'en' | 'de' | 'pl';
  name: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
];

interface LanguageDropdownProps {
  isMobile?: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ isMobile = false }) => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode: 'en' | 'de' | 'pl') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ${
          isMobile ? 'text-sm min-w-[80px]' : 'text-sm min-w-[90px]'
        }`}
        aria-label="Select language"
      >
        <span className={isMobile ? 'text-sm' : 'text-base'}>{currentLanguage?.flag}</span>
        <span className={`font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {currentLanguage?.code.toUpperCase()}
        </span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              isMobile ? 'right-0' : 'left-0'
            } mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden`}
          >
            <div className="py-1">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageSelect(option.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    language === option.code 
                      ? 'bg-elbe-blue text-white dark:bg-blue-600' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{option.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{option.name}</div>
                    <div className={`text-xs ${
                      language === option.code 
                        ? 'text-blue-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {option.code.toUpperCase()}
                    </div>
                  </div>
                  {language === option.code && (
                    <div className="text-white">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Languages className="h-3 w-3" />
                <span>Language</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;
