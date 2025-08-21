import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PollutionSpot } from '../types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Fix for default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  pollutionSpots: PollutionSpot[];
}

const MapView: React.FC<MapViewProps> = ({ pollutionSpots }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Hamburg
    mapRef.current = L.map(mapContainerRef.current).setView([53.5511, 9.9937], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add markers for pollution spots
    pollutionSpots.forEach(spot => {
      const icon = L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute -top-3 -left-3 w-6 h-6 rounded-full ${
              spot.status === 'cleaned' ? 'bg-green-500' :
              spot.status === 'cleaning' ? 'bg-yellow-500' :
              'bg-red-500'
            } animate-pulse"></div>
            <div class="absolute -top-2 -left-2 w-4 h-4 rounded-full ${
              spot.status === 'cleaned' ? 'bg-green-400' :
              spot.status === 'cleaning' ? 'bg-yellow-400' :
              'bg-red-400'
            }"></div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([spot.location.lat, spot.location.lng], { icon })
        .addTo(mapRef.current!);

      const statusIcon = spot.status === 'cleaned' ? '✅' :
                        spot.status === 'cleaning' ? '🧹' : '⚠️';

      const popupContent = `
        <div class="p-4 max-w-xs">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-lg">${spot.type.charAt(0).toUpperCase() + spot.type.slice(1)} Pollution</h3>
            <span class="text-2xl">${statusIcon}</span>
          </div>
          <p class="text-sm text-gray-600 mb-2">${spot.location.address}</p>
          <p class="text-sm mb-3">${spot.description}</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Reported by ${spot.reportedBy}</span>
            <span class="font-semibold ${
              spot.severity === 'high' ? 'text-red-600' :
              spot.severity === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }">
              ${spot.severity.toUpperCase()}
            </span>
          </div>
          <div class="mt-3 pt-3 border-t flex items-center justify-between">
            <span class="text-sm text-gray-500">👍 ${spot.votes} votes</span>
            <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
              Vote to Clean
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });
    });
  }, [pollutionSpots]);

  const stats = {
    reported: pollutionSpots.filter(s => s.status === 'reported').length,
    cleaning: pollutionSpots.filter(s => s.status === 'cleaning').length,
    cleaned: pollutionSpots.filter(s => s.status === 'cleaned').length,
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
          <div className="p-6 bg-gradient-to-r from-elbe-blue to-blue-600 dark:from-blue-800 dark:to-blue-900 text-white">
            <h2 className="text-2xl font-bold mb-2">Pollution Map</h2>
            <p className="text-blue-100">Click on markers to see details and vote for cleanup priority</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium dark:text-gray-300">Reported ({stats.reported})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium dark:text-gray-300">Being Cleaned ({stats.cleaning})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium dark:text-gray-300">Cleaned ({stats.cleaned})</span>
              </div>
            </div>
          </div>

          <div ref={mapContainerRef} className="h-[600px] w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
