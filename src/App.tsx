import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapView from './components/MapView';
import ReportForm from './components/ReportForm';
import EventsList from './components/EventsList';
import Leaderboard from './components/Leaderboard';
import ImpactDashboard from './components/ImpactDashboard';
import Footer from './components/Footer';
import { mockPollutionSpots, mockCleanupEvents, mockVolunteers, mockImpactStats } from './data/mockData';
import { PollutionSpot, CleanupEvent } from './types';
import { useTranslation } from './contexts/TranslationContext';

function App() {
  const { t } = useTranslation();
  const [pollutionSpots, setPollutionSpots] = useState(mockPollutionSpots);
  const [cleanupEvents, setCleanupEvents] = useState(mockCleanupEvents);
  const [activeView, setActiveView] = useState<'map' | 'report' | 'events' | 'impact'>('map');

  const handleReportSubmit = (spot: Omit<PollutionSpot, 'id' | 'votes' | 'reportedAt'>) => {
    const newSpot: PollutionSpot = {
      ...spot,
      id: Date.now().toString(),
      votes: 0,
      reportedAt: new Date()
    };
    setPollutionSpots([...pollutionSpots, newSpot]);
    setActiveView('map');
  };

  const handleJoinEvent = (eventId: string) => {
    setCleanupEvents(events =>
      events.map(event =>
        event.id === eventId
          ? { ...event, participants: [...event.participants, 'current-user'] }
          : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      
      <main>
        {activeView === 'map' && (
          <>
            <Hero />
            <MapView pollutionSpots={pollutionSpots} />
            <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-2 gap-8">
                <ImpactDashboard stats={mockImpactStats} />
                <Leaderboard volunteers={mockVolunteers} />
              </div>
            </div>
          </>
        )}

        {activeView === 'report' && (
          <div className="container mx-auto px-4 py-12">
            <ReportForm onSubmit={handleReportSubmit} />
          </div>
        )}

        {activeView === 'events' && (
          <div className="container mx-auto px-4 py-12">
            <EventsList events={cleanupEvents} onJoinEvent={handleJoinEvent} />
          </div>
        )}

        {activeView === 'impact' && (
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('impact.ourImpact')}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('impact.subtitle')}</p>
            </div>
            <ImpactDashboard stats={mockImpactStats} detailed={true} />
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('impact.topContributors')}</h2>
              <Leaderboard volunteers={mockVolunteers} showAll={true} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
