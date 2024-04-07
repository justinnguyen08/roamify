import React from "react";
import "./ItineraryList.css";

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

function ItineraryList({ onBackClick, onNextClick }) {
  const itineraries = [
    { destination: "Costa Rica", imageUrl: "costaRicaImage.jpg" },
    { destination: "Cancún", imageUrl: "cancun.jpg" },
    { destination: "Bahamas", imageUrl: "bahamas.jpg" },
  ];

  const handleBackClick = () => {
    onBackClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  return (
    <div className="itinerary-list">
      <button onClick={handleBackClick}>Back: Vacation Ventures</button>
      <button onClick={handleNextClick}>Itinerary Page</button>
      <div className="header">
        <p>
          BASED ON YOUR GROUP'S RANKINGS, HERE ARE OUR RECOMMENDED ITINERARIES!
        </p>
      </div>
      {itineraries.map((itinerary, index) => (
        <ItineraryItem key={index} {...itinerary} />
      ))}
    </div>
  );
}

export default ItineraryList;
