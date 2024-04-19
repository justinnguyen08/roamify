import React, { useEffect, useState } from "react";
import "./ItineraryList.css";
const { Configuration, OpenAI } = require("openai");

function ItineraryItem({ destination, imageUrl, onItineraryClick }) {
  return (
    <div className="itinerary-item">
      <h2 className="name">{destination}</h2>
      {/* <div
        className="itinerary-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      /> */}
      <button className="itinerary-button" onClick={onItineraryClick}>
        SEE ITINERARY
      </button>
    </div>
  );
}

function ItineraryList({
  onBackClick,
  onSelectItinerary,
  locations,
  onNextClick,
  userPreferences,
  onLocationsUpdate,
  generatedLocations,
  setGeneratedLocations,
}) {
  useEffect(() => {
    console.log("Get Locations");
    getLocations();
  }, []);

  function formatUserPreferences(preferences, destination) {
    let formattedString = `Creating an itinerary for: ${destination}\n\nRankings:\n\n`;

    if (preferences.vacationStylePreferences.length) {
      formattedString += "Location: ";
      formattedString += preferences.vacationStylePreferences
        .map((item, index) => `${index + 1}st- ${item.name}`)
        .join(", ");
      formattedString += "\n";
    }

    if (preferences.venturesPreferences.length) {
      formattedString += "Activities: ";
      formattedString += preferences.venturesPreferences
        .map((item, index) => `${index + 1}st- ${item.name}`)
        .join(", ");
      formattedString += "\n";
    }

    if (preferences.destinationsPreferences.length) {
      formattedString += "Activities: ";
      formattedString += preferences.destinationsPreferences
        .map((item, index) => `${index + 1}st- ${item.name}`)
        .join(", ");
      formattedString += "\n";
    }

    return formattedString;
  }

  const openai = new OpenAI({
    apiKey: "API KEY HERE",
    dangerouslyAllowBrowser: true,
  });

  function forceGenerate() {
    setGeneratedLocations(false);
    getLocations();
  }
  async function getLocations() {
    if (generatedLocations === true) {
      console.log("Already Generated Locations");
      return;
    }
    const preferences = formatUserPreferences(userPreferences);

    // const prompt = 'You are a travel assistant who comes up with destinations for people to travel to, based on their preferences around various aspects of travel and vacationing. Each destination must be a country or a city. Return a string containing these 3 destinations, using this format: \'["Destination 1", "Destination 2", "Destination 3"]\'. Replace these strings with the destinations you generate. Include no other information or text, besides this one string containing the three locations.'
    const promptLocation =
      'You are a travel assistant who comes up with destinations for people to travel to, based on their preferences around various aspects of travel and vacationing. Each destination must be a country or a city. Return a string containing these 3 destinations, using this format: [{"city": "Destination 1"}, {"city": "Destination 2"}, {"city": "Destination 3"}] Replace these strings with the destinations you generate. Include no other information or text, besides this one string containing the three locations.';
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: promptLocation,
        },
        {
          role: "user",
          content: preferences,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 1028,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const locationNames = JSON.parse(completion.choices[0].message.content);
    const cities = [];
    locationNames.forEach((item) => {
      cities.push(item.city);
    });
    onLocationsUpdate({ cities });
    setGeneratedLocations(true);
    console.log("END OF ITERARY LIST API CALL");
  }
  const handleBackClick = () => {
    onBackClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  // const test = ["hi", "hrllo"];
  console.log("Itinerary List", locations);
  return (
    <div>
      <button onClick={handleBackClick}>Back: Destinations</button>
      <button onClick={forceGenerate}>Generate New Locations</button>
      <div className="header">
        <p>BASED ON YOUR RANKINGS, HERE ARE OUR RECOMMENDED ITINERARIES!</p>
      </div>

      <div className="itinerary-list">
        {/* Rendering ItineraryItem components for each location */}
        {locations &&
          locations.map((locationName, index) => (
            <ItineraryItem
              key={index}
              destination={locationName}
              imageUrl={"defaultImageUrl.jpg"} // Replace this with the actual image URL if available
              onItineraryClick={() => onSelectItinerary(locationName)}
            />
          ))}
      </div>
    </div>
  );
}

export default ItineraryList;
