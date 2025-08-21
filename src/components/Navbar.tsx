import React from 'react';
import { Waves, MapPin, Calendar, TrendingUp, Plus } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: 'map' | 'report' | 'events' | 'impact') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'report', label: 'Report', icon: Plus },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'impact', label: 'Impact', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-elbe-blue" />
            <span className="text-2xl font-bold gradient-text">ElbeClean</span>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeView === item.id
                      ? 'bg-elbe-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <button className="md:hidden flex items-center">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
                      ? 'bg-elbe-blue text-white'
                      : 'text-gray-700 bg-gray-100'
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
