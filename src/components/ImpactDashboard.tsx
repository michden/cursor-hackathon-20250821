import React from 'react';
import { Trash2, Users, Calendar, MapPin, Zap, TrendingUp } from 'lucide-react';
import { ImpactStats } from '../types';
import { motion } from 'framer-motion';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import AnimatedMetric from './AnimatedMetric';
import AnimatedProgress from './AnimatedProgress';

interface ImpactDashboardProps {
  stats: ImpactStats;
  detailed?: boolean;
}

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ stats, detailed = false }) => {
  const impactMetrics = [
    {
      icon: Trash2,
      label: 'Waste Collected',
      value: stats.totalWasteCollected / 1000,
      decimals: 1,
      suffix: 't',
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
      value: stats.co2Saved,
      suffix: 'kg',
      subtext: 'Equivalent to 45 trees',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: 34,
      prefix: '+',
      suffix: '%',
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
            const animated = useAnimatedNumber(metric.value, {
              duration: 2000,
              decimals: metric.decimals || 0,
              delay: 200 + (index * 200),
              prefix: metric.prefix || '',
              suffix: metric.suffix || '',
            });
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
                <div className="text-2xl font-bold text-gray-900 dark:text-white" ref={animated.ref}>
                  {animated.displayValue}
                </div>
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
        {impactMetrics.map((metric, index) => (
          <AnimatedMetric
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            decimals={metric.decimals}
            prefix={metric.prefix}
            suffix={metric.suffix}
            subtext={metric.subtext}
            color={metric.color}
            bgColor={metric.bgColor}
            delay={200}
            index={index}
            showProgress={true}
          />
        ))}
      </div>

      {/* Additional detailed stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monthly Progress</h3>
        <div className="space-y-4">
          <AnimatedProgress
            value={82}
            label="Cleanup Goal"
            delay={500}
            color="bg-gradient-to-r from-elbe-blue to-eco-green"
          />
          
          <AnimatedProgress
            value={117}
            label="Volunteer Target"
            delay={700}
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />

          <AnimatedProgress
            value={65}
            label="Area Coverage"
            delay={900}
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
          />
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
