import React from 'react';
import './ItineraryList.css'; 
import costaRicaImage from '../images/costarica.jpg';
import cancunImage from '../images/cancun.jpg';
import bahamasImage from '../images/bahamas.jpg';

function ItineraryItem({ destination, imageUrl }) {
  return (
    <div className="itinerary-item">
      <h2>{destination}</h2>
      <div
        className="itinerary-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <button className="itinerary-button">SEE ITINERARY</button>
    </div>
  );
}

function ItineraryList() {
  const itineraries = [
    { destination: 'Costa Rica', imageUrl: costaRicaImage },
    { destination: 'Cancún', imageUrl: cancunImage },
    { destination: 'Bahamas', imageUrl: bahamasImage },
  ];
  

  return (
    <div className="itinerary-list">
      <div className="header">
        <p>BASED ON YOUR GROUP'S RANKINGS, HERE ARE OUR RECOMMENDED ITINERARIES!</p>
      </div>
      {itineraries.map((itinerary, index) => (
        <ItineraryItem key={index} {...itinerary} />
      ))}
    </div>
  );
}

export default ItineraryList;
