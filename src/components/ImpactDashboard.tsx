import React from 'react';
import { Trash2, Users, Calendar, MapPin, Zap, TrendingUp } from 'lucide-react';
import { ImpactStats } from '../types';
import { motion } from 'framer-motion';

interface ImpactDashboardProps {
  stats: ImpactStats;
  detailed?: boolean;
}

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ stats, detailed = false }) => {
  const impactMetrics = [
    {
      icon: Trash2,
      label: 'Waste Collected',
      value: `${(stats.totalWasteCollected / 1000).toFixed(1)}t`,
      subtext: `${stats.totalWasteCollected} kg total`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      label: 'Active Volunteers',
      value: stats.totalVolunteers,
      subtext: '+23 this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      label: 'Total Events',
      value: stats.totalEvents,
      subtext: '8 upcoming',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: MapPin,
      label: 'Active Spots',
      value: stats.activeSpots,
      subtext: `${stats.cleanedSpots} cleaned`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Zap,
      label: 'CO₂ Saved',
      value: `${stats.co2Saved}kg`,
      subtext: 'Equivalent to 45 trees',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: '+34%',
      subtext: 'vs last month',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  if (!detailed) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          {impactMetrics.slice(0, 4).map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-3 rounded-full ${metric.bgColor} mb-2`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{metric.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{metric.subtext}</div>
              <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${metric.bgColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional detailed stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monthly Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Cleanup Goal</span>
              <span className="font-semibold dark:text-white">82% Complete</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-elbe-blue to-eco-green"
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Volunteer Target</span>
              <span className="font-semibold dark:text-white">117% Achieved</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Area Coverage</span>
              <span className="font-semibold dark:text-white">65% Covered</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Environmental Impact</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                Your efforts have saved {stats.co2Saved}kg of CO₂ emissions this month
              </p>
            </div>
            <div className="text-2xl">🌱</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
