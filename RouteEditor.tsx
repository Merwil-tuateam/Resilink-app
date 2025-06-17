import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit3, Save, X, MapPin, Clock, Truck, Route, Trash2, Copy } from 'lucide-react';

// Add this declaration to inform TypeScript about the global 'google' namespace
declare global {
  interface Window {
    google: any;
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace google {
    export namespace maps {}
  }
}

interface RouteStop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  estimatedTime: number;
  wasteType: 'residential' | 'commercial' | 'industrial';
  priority: 'low' | 'medium' | 'high';
}

interface RouteData {
  id: string;
  name: string;
  description: string;
  stops: RouteStop[];
  vehicleType: 'small' | 'medium' | 'large';
  frequency: 'daily' | 'weekly' | 'biweekly';
  startTime: string;
  estimatedDuration: number;
  status: 'active' | 'inactive' | 'draft';
}

const RouteEditor: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  const [routes, setRoutes] = useState<RouteData[]>([
    {
      id: 'route-1',
      name: 'Valencia Centro',
      description: 'Ruta principal del centro histórico',
      stops: [
        {
          id: 'stop-1',
          name: 'Plaza del Ayuntamiento',
          address: 'Plaza del Ayuntamiento, Valencia',
          lat: 39.4699,
          lng: -0.3763,
          estimatedTime: 15,
          wasteType: 'commercial',
          priority: 'high'
        },
        {
          id: 'stop-2',
          name: 'Mercado Central',
          address: 'Plaza del Mercado, Valencia',
          lat: 39.4739,
          lng: -0.3790,
          estimatedTime: 20,
          wasteType: 'commercial',
          priority: 'high'
        }
      ],
      vehicleType: 'medium',
      frequency: 'daily',
      startTime: '08:00',
      estimatedDuration: 240,
      status: 'active'
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newStop, setNewStop] = useState<Partial<RouteStop>>({});
  const [showStopForm, setShowStopForm] = useState(false);

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 39.4699, lng: -0.3763 },
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        draggable: true,
        suppressMarkers: false
      });

      directionsRendererInstance.setMap(mapInstance);

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
      setMapLoaded(true);

      // Add click listener for adding new stops
      mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (editingRoute && event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          
          // Reverse geocoding to get address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              setNewStop({
                name: '',
                address: results[0].formatted_address,
                lat,
                lng,
                estimatedTime: 15,
                wasteType: 'residential',
                priority: 'medium'
              });
              setShowStopForm(true);
            }
          });
        }
      });
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

  useEffect(() => {
    if (map && editingRoute) {
      displayRouteOnMap(editingRoute);
    }
  }, [map, editingRoute]);

  const displayRouteOnMap = (route: RouteData) => {
    if (!map || !directionsService || !directionsRenderer) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    if (route.stops.length < 2) {
      // If less than 2 stops, just show individual markers
      const newMarkers: google.maps.Marker[] = [];
      route.stops.forEach((stop, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: stop.lat, lng: stop.lng },
          map: map,
          title: stop.name,
          label: (index + 1).toString()
        });
        newMarkers.push(marker);
      });
      setMarkers(newMarkers);
      return;
    }

    // Calculate route with multiple waypoints
    const origin = route.stops[0];
    const destination = route.stops[route.stops.length - 1];
    const waypoints = route.stops.slice(1, -1).map(stop => ({
      location: { lat: stop.lat, lng: stop.lng },
      stopover: true
    }));

    directionsService.route({
      origin: { lat: origin.lat, lng: origin.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    }, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
      }
    });
  };

  const handleCreateNewRoute = () => {
    const newRoute: RouteData = {
      id: `route-${Date.now()}`,
      name: 'Nueva Ruta',
      description: 'Descripción de la nueva ruta',
      stops: [],
      vehicleType: 'medium',
      frequency: 'daily',
      startTime: '08:00',
      estimatedDuration: 120,
      status: 'draft'
    };
    setEditingRoute(newRoute);
    setIsCreatingNew(true);
  };

  const handleEditRoute = (route: RouteData) => {
    setEditingRoute({ ...route });
    setIsCreatingNew(false);
  };

  const handleSaveRoute = () => {
    if (!editingRoute) return;

    if (isCreatingNew) {
      setRoutes([...routes, editingRoute]);
    } else {
      setRoutes(routes.map(r => r.id === editingRoute.id ? editingRoute : r));
    }

    setEditingRoute(null);
    setIsCreatingNew(false);
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes(routes.filter(r => r.id !== routeId));
    if (editingRoute?.id === routeId) {
      setEditingRoute(null);
    }
  };

  const handleAddStop = () => {
    if (!editingRoute || !newStop.name || !newStop.address) return;

    const stop: RouteStop = {
      id: `stop-${Date.now()}`,
      name: newStop.name,
      address: newStop.address,
      lat: newStop.lat || 0,
      lng: newStop.lng || 0,
      estimatedTime: newStop.estimatedTime || 15,
      wasteType: newStop.wasteType || 'residential',
      priority: newStop.priority || 'medium'
    };

    setEditingRoute({
      ...editingRoute,
      stops: [...editingRoute.stops, stop]
    });

    setNewStop({});
    setShowStopForm(false);
  };

  const handleRemoveStop = (stopId: string) => {
    if (!editingRoute) return;
    
    setEditingRoute({
      ...editingRoute,
      stops: editingRoute.stops.filter(s => s.id !== stopId)
    });
  };

  const handleDuplicateRoute = (route: RouteData) => {
    const duplicatedRoute: RouteData = {
      ...route,
      id: `route-${Date.now()}`,
      name: `${route.name} (Copia)`,
      status: 'draft'
    };
    setRoutes([...routes, duplicatedRoute]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Editor de Rutas</h2>
            <p className="text-slate-600">Crea y edita rutas de recogida de residuos</p>
          </div>
          <button
            onClick={handleCreateNewRoute}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Ruta</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routes List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Rutas Existentes</h3>
          <div className="space-y-3">
            {routes.map((route) => (
              <div key={route.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{route.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    route.status === 'active' ? 'bg-green-100 text-green-800' :
                    route.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {route.status === 'active' ? 'Activa' : 
                     route.status === 'inactive' ? 'Inactiva' : 'Borrador'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{route.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span>{route.stops.length} paradas</span>
                  <span>{Math.floor(route.estimatedDuration / 60)}h {route.estimatedDuration % 60}m</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRoute(route)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDuplicateRoute(route)}
                    className="flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium hover:bg-slate-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Duplicar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Editor */}
        <div className="lg:col-span-2 space-y-6">
          {editingRoute ? (
            <>
              {/* Route Details Form */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {isCreatingNew ? 'Crear Nueva Ruta' : 'Editar Ruta'}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveRoute}
                      className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingRoute(null);
                        setIsCreatingNew(false);
                      }}
                      className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Ruta</label>
                    <input
                      type="text"
                      value={editingRoute.name}
                      onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                    <select
                      value={editingRoute.status}
                      onChange={(e) => setEditingRoute({ ...editingRoute, status: e.target.value as RouteData['status'] })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="draft">Borrador</option>
                      <option value="active">Activa</option>
                      <option value="inactive">Inactiva</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Vehículo</label>
                    <select
                      value={editingRoute.vehicleType}
                      onChange={(e) => setEditingRoute({ ...editingRoute, vehicleType: e.target.value as RouteData['vehicleType'] })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="small">Pequeño</option>
                      <option value="medium">Mediano</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Frecuencia</label>
                    <select
                      value={editingRoute.frequency}
                      onChange={(e) => setEditingRoute({ ...editingRoute, frequency: e.target.value as RouteData['frequency'] })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="daily">Diaria</option>
                      <option value="weekly">Semanal</option>
                      <option value="biweekly">Quincenal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hora de Inicio</label>
                    <input
                      type="time"
                      value={editingRoute.startTime}
                      onChange={(e) => setEditingRoute({ ...editingRoute, startTime: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duración Estimada (min)</label>
                    <input
                      type="number"
                      value={editingRoute.estimatedDuration}
                      onChange={(e) => setEditingRoute({ ...editingRoute, estimatedDuration: parseInt(e.target.value) })}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                  <textarea
                    value={editingRoute.description}
                    onChange={(e) => setEditingRoute({ ...editingRoute, description: e.target.value })}
                    rows={3}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Stops Management */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Paradas de la Ruta</h3>
                  <p className="text-sm text-slate-600">Haz clic en el mapa para agregar paradas</p>
                </div>

                {editingRoute.stops.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {editingRoute.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{stop.name}</h4>
                          <p className="text-sm text-slate-600">{stop.address}</p>
                          <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                            <span>{stop.estimatedTime} min</span>
                            <span className="capitalize">{stop.wasteType}</span>
                            <span className="capitalize">Prioridad {stop.priority}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveStop(stop.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {editingRoute.stops.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay paradas definidas</p>
                    <p className="text-sm">Haz clic en el mapa para agregar la primera parada</p>
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-medium text-slate-800">Mapa de la Ruta</h3>
                  <p className="text-sm text-slate-600">Haz clic en el mapa para agregar nuevas paradas</p>
                </div>
                <div className="relative w-full h-96">
                  {!mapLoaded && (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 z-10">
                      <div className="text-center">
                        <Route className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-spin" />
                        <p className="text-slate-600">Cargando editor de rutas...</p>
                      </div>
                    </div>
                  )}
                  <div ref={mapRef} className="w-full h-full" />
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <Route className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">Selecciona una ruta para editar</h3>
              <p className="text-slate-600 mb-6">Elige una ruta existente de la lista o crea una nueva</p>
              <button
                onClick={handleCreateNewRoute}
                className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Crear Nueva Ruta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Stop Form Modal */}
      {showStopForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Agregar Nueva Parada</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Parada</label>
                <input
                  type="text"
                  value={newStop.name || ''}
                  onChange={(e) => setNewStop({ ...newStop, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ej: Plaza del Ayuntamiento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={newStop.address || ''}
                  onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tiempo Estimado (min)</label>
                  <input
                    type="number"
                    value={newStop.estimatedTime || 15}
                    onChange={(e) => setNewStop({ ...newStop, estimatedTime: parseInt(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prioridad</label>
                  <select
                    value={newStop.priority || 'medium'}
                    onChange={(e) => setNewStop({ ...newStop, priority: e.target.value as RouteStop['priority'] })}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Residuo</label>
                <select
                  value={newStop.wasteType || 'residential'}
                  onChange={(e) => setNewStop({ ...newStop, wasteType: e.target.value as RouteStop['wasteType'] })}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="residential">Residencial</option>
                  <option value="commercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddStop}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Agregar Parada
              </button>
              <button
                onClick={() => {
                  setShowStopForm(false);
                  setNewStop({});
                }}
                className="flex-1 bg-slate-600 text-white py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteEditor;