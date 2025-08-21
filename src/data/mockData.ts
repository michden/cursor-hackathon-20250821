import { PollutionSpot, CleanupEvent, Volunteer, ImpactStats } from '../types';

export const mockPollutionSpots: PollutionSpot[] = [
  {
    id: '1',
    location: {
      lat: 53.5411,
      lng: 9.9937,
      address: 'Landungsbrücken, Hamburg'
    },
    type: 'plastic',
    severity: 'high',
    description: 'Large amount of plastic waste accumulated near the ferry terminal',
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400',
    reportedBy: 'Anna Schmidt',
    reportedAt: new Date('2025-01-10'),
    status: 'reported',
    votes: 45
  },
  {
    id: '2',
    location: {
      lat: 53.5446,
      lng: 10.0099,
      address: 'HafenCity, Hamburg'
    },
    type: 'trash',
    severity: 'medium',
    description: 'Overflowing trash bins near the waterfront promenade',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400',
    reportedBy: 'Max Müller',
    reportedAt: new Date('2025-01-12'),
    status: 'cleaning',
    votes: 28
  },
  {
    id: '3',
    location: {
      lat: 53.5635,
      lng: 9.9601,
      address: 'Alster Lake, Hamburg'
    },
    type: 'oil',
    severity: 'low',
    description: 'Small oil spill detected near the boat rental',
    reportedBy: 'Lisa Wagner',
    reportedAt: new Date('2025-01-08'),
    status: 'cleaned',
    votes: 15
  },
  {
    id: '4',
    location: {
      lat: 53.4631,
      lng: 9.9778,
      address: 'Wilhelmsburg, Hamburg'
    },
    type: 'chemical',
    severity: 'high',
    description: 'Suspicious chemical containers found near industrial area',
    reportedBy: 'Tom Fischer',
    reportedAt: new Date('2025-01-14'),
    status: 'reported',
    votes: 62
  },
  {
    id: '5',
    location: {
      lat: 53.5503,
      lng: 9.9330,
      address: 'St. Pauli, Hamburg'
    },
    type: 'trash',
    severity: 'medium',
    description: 'Weekend party waste along the Reeperbahn area',
    reportedBy: 'Sarah Klein',
    reportedAt: new Date('2025-01-13'),
    status: 'reported',
    votes: 33
  }
];

export const mockCleanupEvents: CleanupEvent[] = [
  {
    id: '1',
    title: 'HafenCity Waterfront Cleanup',
    description: 'Join us for a community cleanup along the HafenCity waterfront. We\'ll provide all equipment and refreshments!',
    location: {
      lat: 53.5446,
      lng: 10.0099,
      address: 'HafenCity Promenade, Hamburg'
    },
    date: new Date('2025-01-20'),
    time: '10:00',
    organizer: 'Hamburg Clean Initiative',
    participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
    maxParticipants: 30,
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    impactGoal: {
      wasteKg: 100,
      area: '2km waterfront'
    }
  },
  {
    id: '2',
    title: 'Alster Lake Clean Dive',
    description: 'Experienced divers needed to help clean the bottom of Alster Lake. Diving equipment provided.',
    location: {
      lat: 53.5635,
      lng: 9.9601,
      address: 'Outer Alster Lake, Hamburg'
    },
    date: new Date('2025-01-25'),
    time: '09:00',
    organizer: 'Hamburg Diving Club',
    participants: ['user6', 'user7'],
    maxParticipants: 10,
    status: 'upcoming',
    impactGoal: {
      wasteKg: 50,
      area: 'Lake bottom'
    }
  },
  {
    id: '3',
    title: 'Wilhelmsburg Green Day',
    description: 'Family-friendly cleanup event with activities for kids. Let\'s make Wilhelmsburg shine!',
    location: {
      lat: 53.4631,
      lng: 9.9778,
      address: 'Wilhelmsburg Park, Hamburg'
    },
    date: new Date('2025-01-27'),
    time: '14:00',
    organizer: 'Wilhelmsburg Community',
    participants: ['user8', 'user9', 'user10', 'user11'],
    maxParticipants: 50,
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
    impactGoal: {
      wasteKg: 150,
      area: 'Park area'
    }
  }
];

export const mockVolunteers: Volunteer[] = [
  {
    id: '1',
    name: 'Anna Schmidt',
    district: 'HafenCity',
    points: 1250,
    eventsJoined: 12,
    wasteCollected: 156,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    badges: [
      {
        id: 'b1',
        name: 'Eco Warrior',
        description: 'Collected over 100kg of waste',
        icon: '🌟',
        earnedAt: new Date('2024-11-15')
      },
      {
        id: 'b2',
        name: 'Event Leader',
        description: 'Organized 5 cleanup events',
        icon: '👑',
        earnedAt: new Date('2024-12-01')
      }
    ],
    joinedAt: new Date('2024-06-01')
  },
  {
    id: '2',
    name: 'Max Müller',
    district: 'St. Pauli',
    points: 890,
    eventsJoined: 8,
    wasteCollected: 98,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    badges: [
      {
        id: 'b3',
        name: 'Rising Star',
        description: 'Joined 5 events in first month',
        icon: '⭐',
        earnedAt: new Date('2024-10-15')
      }
    ],
    joinedAt: new Date('2024-09-15')
  },
  {
    id: '3',
    name: 'Lisa Wagner',
    district: 'Altona',
    points: 750,
    eventsJoined: 6,
    wasteCollected: 67,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    badges: [],
    joinedAt: new Date('2024-10-01')
  },
  {
    id: '4',
    name: 'Tom Fischer',
    district: 'Wilhelmsburg',
    points: 620,
    eventsJoined: 5,
    wasteCollected: 45,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
    badges: [],
    joinedAt: new Date('2024-11-01')
  },
  {
    id: '5',
    name: 'Sarah Klein',
    district: 'Eimsbüttel',
    points: 540,
    eventsJoined: 4,
    wasteCollected: 38,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    badges: [],
    joinedAt: new Date('2024-11-15')
  }
];

export const mockImpactStats: ImpactStats = {
  totalWasteCollected: 3456,
  totalVolunteers: 234,
  totalEvents: 48,
  activeSpots: 12,
  cleanedSpots: 36,
  co2Saved: 892
};

// Districts of Hamburg for filtering
export const hamburgDistricts = [
  'Altona',
  'Eimsbüttel',
  'Hamburg-Mitte',
  'Hamburg-Nord',
  'Wandsbek',
  'Bergedorf',
  'Harburg',
  'HafenCity',
  'St. Pauli',
  'Wilhelmsburg'
];
