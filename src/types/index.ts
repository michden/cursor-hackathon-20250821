export interface PollutionSpot {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  type: 'plastic' | 'chemical' | 'trash' | 'oil' | 'other';
  severity: 'low' | 'medium' | 'high';
  description: string;
  imageUrl?: string;
  reportedBy: string;
  reportedAt: Date;
  status: 'reported' | 'cleaning' | 'cleaned';
  votes: number;
}

export interface CleanupEvent {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  date: Date;
  time: string;
  organizer: string;
  participants: string[];
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  imageUrl?: string;
  impactGoal: {
    wasteKg: number;
    area: string;
  };
}

export interface Volunteer {
  id: string;
  name: string;
  email?: string;
  district: string;
  points: number;
  eventsJoined: number;
  wasteCollected: number; // in kg
  avatar?: string;
  badges: Badge[];
  joinedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface ImpactStats {
  totalWasteCollected: number; // kg
  totalVolunteers: number;
  totalEvents: number;
  activeSpots: number;
  cleanedSpots: number;
  co2Saved: number; // kg
}
