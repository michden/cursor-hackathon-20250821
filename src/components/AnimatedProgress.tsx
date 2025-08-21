import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  delay?: number;
  className?: string;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'bg-gradient-to-r from-elbe-blue to-eco-green',
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">{label}</span>
          {showPercentage && (
            <span className="font-semibold dark:text-white">
              {isVisible ? `${Math.round(percentage)}%` : '0%'}
              {percentage > 100 && ' Achieved'}
            </span>
          )}
        </div>
      )}
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ 
            duration: 1.5, 
            ease: 'easeOut',
            delay: delay / 1000 
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedProgress;
