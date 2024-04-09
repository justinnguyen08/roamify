import React from "react";
import "./ItineraryList.css";
// const { Configuration, OpenAI } = require("openai");

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

function ItineraryList({ onBackClick, onSelectItinerary, locations, onNextClick }) {
  const handleBackClick = () => {
    onBackClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  // const test = ["hi", "hrllo"];
  console.log("Itinerary List",locations);
  return (
    <div className="itinerary-list">
      <button onClick={handleBackClick}>Back: Destinations</button>
      <button onClick={handleNextClick}>Itinerary Page</button>
      <div className="header">
        <p>
          BASED ON YOUR GROUP'S RANKINGS, HERE ARE OUR RECOMMENDED ITINERARIES!
        </p>
      </div>
        {/* Rendering ItineraryItem components for each location */}
          {locations && locations.map((locationName, index) => (
            <ItineraryItem
              key={index}
              destination={locationName}
              imageUrl={"defaultImageUrl.jpg"} // Replace this with the actual image URL if available
              onItineraryClick={() => onSelectItinerary(locationName)}
            />
          ))}


    </div>
  );
}

export default ItineraryList;
