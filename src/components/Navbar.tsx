import React from 'react';
import { Waves, MapPin, Calendar, TrendingUp, Plus, Moon, Sun, Languages } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useTranslation } from '../contexts/TranslationContext';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: 'map' | 'report' | 'events' | 'impact') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t } = useTranslation();
  
  const navItems = [
    { id: 'map', label: t('nav.map'), icon: MapPin },
    { id: 'report', label: t('nav.report'), icon: Plus },
    { id: 'events', label: t('nav.events'), icon: Calendar },
    { id: 'impact', label: t('nav.impact'), icon: TrendingUp },
  ];

  const toggleLanguage = () => {
    const languages: Array<'en' | 'de' | 'pl'> = ['en', 'de', 'pl'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'en': return '🇬🇧';
      case 'de': return '🇩🇪';
      case 'pl': return '🇵🇱';
      default: return '🌍';
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-elbe-blue dark:text-blue-400" />
            <span className="text-2xl font-bold gradient-text">ElbeClean</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeView === item.id
                      ? 'bg-elbe-blue text-white dark:bg-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-semibold text-sm min-w-[60px] flex items-center justify-center space-x-1"
              aria-label="Toggle language"
              title={`Switch language (${language.toUpperCase()})`}
            >
              <span className="text-base">{getLanguageFlag(language)}</span>
              <span>{language.toUpperCase()}</span>
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm min-w-[50px] flex items-center justify-center space-x-1"
              aria-label="Toggle language"
            >
              <span className="text-sm">{getLanguageFlag(language)}</span>
              <span className="text-xs">{language.toUpperCase()}</span>
            </button>
            
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button className="flex items-center">
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-3">
          <div className="flex flex-wrap gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                    activeView === item.id
                      ? 'bg-elbe-blue text-white dark:bg-blue-600'
                      : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
