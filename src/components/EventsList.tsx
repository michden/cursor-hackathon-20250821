import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Target } from 'lucide-react';
import { CleanupEvent } from '../types';
import { motion } from 'framer-motion';

interface EventsListProps {
  events: CleanupEvent[];
  onJoinEvent: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, onJoinEvent }) => {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cleanup Events</h1>
        <p className="text-lg text-gray-600 mb-6">Join our community events and make a difference</p>
        
        <div className="flex flex-wrap gap-2">
          {['all', 'upcoming', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterType
                  ? 'bg-elbe-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
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
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {event.imageUrl && (
              <div className="h-48 bg-gray-200 relative overflow-hidden">
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-elbe-blue" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-elbe-blue" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-elbe-blue" />
                  {event.location.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-elbe-blue" />
                  {event.participants.length} / {event.maxParticipants} participants
                </div>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center text-sm font-medium text-elbe-blue">
                  <Target className="h-4 w-4 mr-2" />
                  Impact Goal
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {event.impactGoal.wasteKg}kg waste • {event.impactGoal.area}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-xs text-gray-500 mb-2">
                  Organized by <span className="font-medium">{event.organizer}</span>
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
                    {event.participants.length >= event.maxParticipants ? 'Event Full' : 'Join Event'}
                  </button>
                )}
                
                {event.status === 'completed' && (
                  <div className="text-center text-green-600 font-semibold">
                    ✅ Completed
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found</p>
        </div>
      )}
    </div>
  );
};

export default EventsList;
