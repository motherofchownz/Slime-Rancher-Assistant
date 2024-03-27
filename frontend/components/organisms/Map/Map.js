import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import customMapStyle from './styles.json';

const MapComponent = ({ mapRef, markers, onExistingMarkerDragEnd }) => {

  const [viewport, setViewport] = useState({
      width: '100vw',
      height: '100vh',
      latitude: -75, // Initial map center latitude
      longitude: -80, // Initial map center longitude
      zoom: 2.7, // Initial zoom level
  });
  
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
            latitude={marker.latitude}
            longitude={marker.longitude}
            style={{
              zIndex: 100,
            }}
            draggable
            onDragEnd={(event) => onExistingMarkerDragEnd(marker.id, event.lngLat, event)}
          >
            <div>
              <img 
                src={process.env.NEXT_PUBLIC_API_URL + marker.item.attributes.Icon.data.attributes.url} 
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