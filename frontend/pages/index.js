import React, { useState, useRef } from 'react';
import SidebarComponent from '../components/organisms/Sidebar';
import MapComponent from '../components/organisms/Map';
import { Button, Modal } from "flowbite-react";
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: { 'Authorization': 'bearer '+process.env.MAPBOX_API_KEY }
});

const HomePage = ({ data }) => {
  const [openModal, setOpenModal] = useState(true);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const getCoordinates = (marker, isLatitude) => {
    const mapInstance = mapRef.current.getMap();
    // Convert pixel coordinates to geographical coordinates
    const coordinates = mapInstance.unproject([marker.clientX, marker.clientY]);
    
    return isLatitude ? coordinates.lat : coordinates.lng;
  };

  const handleNewMarkerDragEnd = (item, event) => {

    // Create a new marker based on the clicked item and cursor's position
    const newMarker = {
      id: markers.length + 1,
      latitude: getCoordinates(event, true),
      longitude: getCoordinates(event, false),
      x: event.pageX,
      y: event.pageY,
      item: item, // Store the item data
    };

    setMarkers([...markers, newMarker]);
  };

  const handleMarkerDragEnd = (markerId, newCoordinates, event) => {
    // Update the coordinates of the dragged marker
    setMarkers((prevMarkers) => {
      const updatedMarkers = prevMarkers.map((marker) => {
        const updatedMarker = marker.id === markerId
          ? { ...marker, latitude: newCoordinates.lat, longitude: newCoordinates.lng }
          : marker;
  
        return updatedMarker;
      });
      
      return updatedMarkers;
    });

  };

  return (
    <div className="h-screen">
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Slime Rancher Assistant</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This project is built by <a className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300" href="https://motherofchownz.github.io/portfolio/" target="_blank">Bronwyn</a> with ❤ to provide a visual assistant for the Slime Rancher game.
              No profit is being made from this project and all assets are owned by <a className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300" href="http://www.monomipark.com/" target="_blank">Monomi Park</a>.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              To get started, drag the icons from the sidebar onto the map.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Let's get started!</Button>
        </Modal.Footer>
      </Modal>
      <SidebarComponent 
        data={data} 
        onNewMarkerDragEnd={handleNewMarkerDragEnd} 
      />
      <MapComponent
        mapRef={mapRef}
        markers={markers}
        onExistingMarkerDragEnd={handleMarkerDragEnd}
      />
    </div>
  );
}

export async function getStaticProps() {
  
  const slimesList = await instance.get('slimes?populate=Icon');
  const foodList = await instance.get('foods?populate=Icon');
  const buildingList = await instance.get('buildings?populate=Icon');
  const gadgetList = await instance.get('gadgets?populate=Icon');

  const data = {
    "slimesList": slimesList.data.data,
    "foodList": foodList.data.data,
    "buildingList": buildingList.data.data,
    "gadgetList": gadgetList.data.data
  };

  return {
    props: {
      data,
    },
  };
}

export default HomePage;