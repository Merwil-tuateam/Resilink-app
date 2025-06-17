import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const vehicleData = [
    { id: 'V-024', lat: 39.4699, lng: -0.3763, status: 'En ruta', progress: 65 },
    { id: 'V-031', lat: 39.4669, lng: -0.3808, status: 'Recogiendo', progress: 40 },
    { id: 'V-018', lat: 39.4759, lng: -0.3820, status: 'Retornando', progress: 90 },
    { id: 'V-012', lat: 39.4620, lng: -0.3740, status: 'En ruta', progress: 25 }
  ];

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 39.4699, lng: -0.3763 }, // Valencia center
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Add vehicle markers
      vehicleData.forEach(vehicle => {
        const marker = new window.google.maps.Marker({
          position: { lat: vehicle.lat, lng: vehicle.lng },
          map: map,
          title: vehicle.id,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#10b981" stroke="white" stroke-width="2"/>
                <path d="M12 16h8m-4-4v8" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold text-slate-800">${vehicle.id}</h3>
              <p class="text-sm text-slate-600">Estado: ${vehicle.status}</p>
              <p class="text-sm text-slate-600">Progreso: ${vehicle.progress}%</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      setMapLoaded(true);
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3NC9OPj4oVQnK4FxvjmJmYHXLp8zy-M4&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Monitorización en Tiempo Real</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Todos los vehículos
            </button>
            <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
              Solo activos
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {vehicleData.map(vehicle => (
            <div key={vehicle.id} className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800">{vehicle.id}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  vehicle.status === 'En ruta' ? 'bg-blue-500' :
                  vehicle.status === 'Recogiendo' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}></div>
              </div>
              <p className="text-sm text-slate-600 mb-2">{vehicle.status}</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${vehicle.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{vehicle.progress}% completado</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="relative w-full h-96" style={{ minHeight: '400px' }}>
          {!mapLoaded && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 z-10">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-spin" />
                <p className="text-slate-600">Cargando mapa de Valencia...</p>
              </div>
            </div>
          )}
          <div 
            ref={mapRef} 
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-medium text-slate-800 mb-4">Leyenda del Mapa</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Vehículo en ruta</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Recogiendo residuos</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Retornando a base</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;