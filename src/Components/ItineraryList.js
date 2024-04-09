import React from "react";
import "./ItineraryList.css";

function ItineraryItem({ destination, imageUrl, onItineraryClick }) {
  return (
    <div className="itinerary-item">
      <h2>{destination}</h2>
      {/* <div
        className="itinerary-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      /> */}
      <button className="itinerary-button" onClick={onItineraryClick}>SEE ITINERARY</button>
    </div>
  );
}

function ItineraryList({ onBackClick, onNextClick, locations }) {
  const handleBackClick = () => {
    onBackClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const test = ["hi", "hrllo"];
  console.log("Itinerary List", test, " | ", locations);
  return (
    <div className="itinerary-list">
      <button onClick={handleBackClick}>Back: Destinations</button>
      <button onClick={handleNextClick}>Itinerary Page</button>
      <div className="header">
        <p>
          BASED ON YOUR GROUP'S RANKINGS, HERE ARE OUR RECOMMENDED ITINERARIES!
        </p>
      </div>
        {locations.map((locationName, index) => (
          <ItineraryItem key={index} destination={locationName} onItineraryClick={() => handleNextClick(locationName)} />
        ))}


    </div>
  );
}

export default ItineraryList;
