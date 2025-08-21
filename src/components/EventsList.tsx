import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Target } from 'lucide-react';
import { CleanupEvent } from '../types';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';

interface EventsListProps {
  events: CleanupEvent[];
  onJoinEvent: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, onJoinEvent }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return event.status === 'upcoming';
    if (filter === 'completed') return event.status === 'completed';
    return false;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('events.title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{t('events.subtitle')}</p>
        
        <div className="flex flex-wrap gap-2">
          {(['all', 'upcoming', 'completed'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterType
                  ? 'bg-elbe-blue text-white dark:bg-blue-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t(`events.filter.${filterType}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {event.imageUrl && (
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'upcoming' ? 'bg-green-500 text-white' :
                    event.status === 'ongoing' ? 'bg-yellow-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {event.status.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 text-elbe-blue" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2 text-elbe-blue" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2 text-elbe-blue" />
                  {event.location.address}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2 text-elbe-blue" />
                                      {event.participants.length} / {event.maxParticipants} {t('events.participants')}
                </div>
              </div>

              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-center text-sm font-medium text-elbe-blue dark:text-blue-400">
                  <Target className="h-4 w-4 mr-2" />
                  {t('events.impactGoal')}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                  {event.impactGoal.wasteKg}kg waste • {event.impactGoal.area}
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {t('events.organizedBy')} <span className="font-medium">{event.organizer}</span>
                </div>
                
                {event.status === 'upcoming' && (
                  <button
                    onClick={() => onJoinEvent(event.id)}
                    disabled={event.participants.length >= event.maxParticipants}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                      event.participants.length >= event.maxParticipants
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-elbe-blue text-white hover:bg-blue-700'
                    }`}
                  >
                    {event.participants.length >= event.maxParticipants ? t('events.eventFull') : t('events.joinEvent')}
                  </button>
                )}
                
                {event.status === 'completed' && (
                  <div className="text-center text-green-600 font-semibold">
                    ✅ {t('events.completed')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t('events.noEvents')}</p>
        </div>
      )}
    </div>
  );
};

export default EventsList;
