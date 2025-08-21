import React from 'react';
import { motion } from 'framer-motion';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { LucideIcon } from 'lucide-react';

interface AnimatedMetricProps {
  icon: LucideIcon;
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  subtext?: string;
  color: string;
  bgColor: string;
  delay?: number;
  index?: number;
  showProgress?: boolean;
}

const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
  icon: Icon,
  label,
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  subtext,
  color,
  bgColor,
  delay = 0,
  index = 0,
  showProgress = false,
}) => {
  const animated = useAnimatedNumber(value, {
    duration: 2000,
    decimals,
    delay: delay + (index * 200),
    prefix,
    suffix,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: (delay + index * 200) / 1000 + 1, type: "spring" }}
          className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full"
        >
          +12%
        </motion.span>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1" ref={animated.ref}>
        {animated.displayValue}
      </div>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</div>
      {subtext && (
        <div className="text-xs text-gray-500 dark:text-gray-400">{subtext}</div>
      )}
      {showProgress && (
        <motion.div 
          className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (delay + index * 200) / 1000 + 0.5 }}
        >
          <motion.div
            className={`h-full ${bgColor}`}
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: (delay + index * 200) / 1000 + 0.7 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedMetric;
