import React from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Volunteer } from '../types';
import { motion } from 'framer-motion';
import { useSimpleAnimatedNumber } from '../hooks/useSimpleAnimatedNumber';

interface LeaderboardProps {
  volunteers: Volunteer[];
  showAll?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ volunteers, showAll = false }) => {
  const sortedVolunteers = [...volunteers].sort((a, b) => b.points - a.points);
  const displayVolunteers = showAll ? sortedVolunteers : sortedVolunteers.slice(0, 5);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-orange-600" />;
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-300 dark:border-yellow-700';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-gray-300 dark:border-gray-600';
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-300 dark:border-orange-700';
    return 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Eco Warriors</h2>
        <Trophy className="h-8 w-8 text-yellow-500" />
      </div>

      <div className="space-y-3">
        {displayVolunteers.map((volunteer, index) => {
          const rank = index + 1;
          const animatedPoints = useSimpleAnimatedNumber(volunteer.points, {
            duration: 2000,
            delay: 300 + (index * 150),
          });
          
          return (
            <motion.div
              key={volunteer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${getRankStyle(rank)} transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(rank)}
                  </div>
                  <img
                    src={volunteer.avatar}
                    alt={volunteer.name}
                    className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{volunteer.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{volunteer.district}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold gradient-text" ref={animatedPoints.ref}>
                    {animatedPoints.displayValue}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">points</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                  <span>📅 {volunteer.eventsJoined} events</span>
                  <span>♻️ {volunteer.wasteCollected}kg</span>
                </div>
                {volunteer.badges.length > 0 && (
                  <div className="flex space-x-1">
                    {volunteer.badges.slice(0, 3).map(badge => (
                      <span key={badge.id} title={badge.name} className="text-lg">
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {rank <= 3 && (
                <motion.div
                  className="mt-2 h-1 bg-gradient-to-r from-elbe-blue to-eco-green rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(volunteer.points / sortedVolunteers[0].points) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {!showAll && volunteers.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-elbe-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
            View all {volunteers.length} volunteers →
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
