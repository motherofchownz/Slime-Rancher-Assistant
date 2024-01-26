import React, { useState, useRef, useEffect } from 'react';
import SidebarComponent from '../components/organisms/Sidebar';
import MapComponent from '../components/organisms/Map';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:1337/api/',
  timeout: 1000,
  headers: { 'Authorization': 'bearer 727908a49e75aa78306ae09bc5a3dcaf6779c506beb1247640f615a100c92a9f39657625892784f298ebd674b391d3ce3fffe50bab5f49f7eae4b58856effac50b58dc7ab3b2cca0c8a4ca696cacb6d448c1f0ef69e6bb813127f568d977ebde9386aadcd004438f17f420f220892c515bbf8f2b913d60d21e7f7ff54bccccc5' }
});

const HomePage = ({ data }) => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const getCoordinates = (marker, isLatitude) => {
    const mapInstance = mapRef.current.getMap();
    console.log(marker);
    // Convert pixel coordinates to geographical coordinates
    const coordinates = mapInstance.unproject([marker.layerX, marker.layerY]);
    
    console.log(coordinates);
    return isLatitude ? coordinates.lat : coordinates.lng;
  };

  const handleMarkerClick = (item, event) => {
    // Extract latitude and longitude from the event object
    const { lngLat } = event;

    // Create a new marker based on the clicked item and cursor's position
    const newMarker = {
      id: markers.length + 1,
      latitude: getCoordinates(event, true),
      longitude: getCoordinates(event, true),
      x: event.pageX,
      y: event.pageY,
      item: item, // Store the item data
    };

    setMarkers([...markers, newMarker]);
  };

  const handleMapClick = (event) => {
    // Handle map click, e.g., add a new marker
    const newMarker = {
      id: markers.length + 1,
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    };

    setMarkers([...markers, newMarker]);
  };

  const handleMarkerDrag = (markerId, newCoordinates, event) => {
    /*
  console.log('All Markers:', markers);
    console.log(newCoordinates);
    console.log(event);
    */
    // Update the coordinates of the dragged marker
    setMarkers((prevMarkers) => {
      const updatedMarkers = prevMarkers.map((marker) => {
        const updatedMarker = marker.id === markerId
          ? { ...marker, latitude: newCoordinates.lat, longitude: newCoordinates.lng }
          : marker;
  
        return updatedMarker;
      });
      console.log('New Markers:', updatedMarkers);
      return updatedMarkers;
    });
  };

  return (
    <div className="h-screen">
      <SidebarComponent 
        data={data} 
        onMarkerClick={handleMarkerClick} 
      />
      <MapComponent
        mapRef={mapRef}
        markers={markers}
        onMarkerDragEnd={handleMarkerDrag}
      />
    </div>
  );
}

export async function getStaticProps() {
  
  const slimesList = await instance.get('slimes?populate=Icon');
  const foodList = await instance.get('foods?populate=Icon');
  const gadgetList = await instance.get('gadgets?populate=Icon');

  const data = {
    "slimesList": slimesList.data.data,
    "foodList": foodList.data.data,
    "gadgetList": gadgetList.data.data
  };

  return {
    props: {
      data,
    },
  };
}

export default HomePage;