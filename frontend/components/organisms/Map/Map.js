import React, { useState, useRef, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import customMapStyle from './styles.json';

const MapComponent = ({ markers, onMarkerClick, onMarkerDrag, onMapClick }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Access mapRef.current here if needed
    if (mapRef.current) {
      // Perform actions after the map has loaded
    }
  }, []);

  const [viewport, setViewport] = useState({
      width: '100vw',
      height: '100vh',
      latitude: -75, // Initial map center latitude
      longitude: -80, // Initial map center longitude
      zoom: 2.7, // Initial zoom level
  });

  const getCoordinates = (marker, isLatitude) => {
    const mapInstance = mapRef.current.getMap();
    // Convert pixel coordinates to geographical coordinates
    const coordinates = mapInstance.unproject([marker.x, marker.y]);
    
    return isLatitude ? Math.floor(coordinates.lat) : Math.floor(coordinates.lng);
  };
  
    return (
      <Map
        ref={mapRef}
        renderWorldCopies={false}
        initialViewState={viewport}
        mapStyle={customMapStyle}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        mapboxAccessToken="pk.eyJ1IjoibW90aGVyb2ZjaG93bnoiLCJhIjoiY2xvbzd4OTc5MWplZDJxbW9tM3hveDQ1diJ9.3LXtYaK0r3Wzwt2nKJch9g" //{process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={getCoordinates(marker, true)}
            longitude={getCoordinates(marker, false)}
            style={{
              zIndex: 100,
            }}
            draggable
            onDragEnd={(event) => onMarkerDrag(marker.id, event.lngLat, event)}
          >
            <div>
              <img 
                src={"http://localhost:1337" + marker.item.attributes.Icon.data.attributes.url} 
                alt={marker.item.attributes.Name}
                className="w-8"
              />
            </div>
          </Marker>
        ))}
      </Map>
    );
  }
  
export default MapComponent;