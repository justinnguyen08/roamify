import React, { useState, useEffect } from "react";
import "./gpt.css";
const { Configuration, OpenAI } = require("openai");

function GPT({
  onBackClick,
  userPreferences,
  onLocationsUpdate,
  selectedDestination,
}) {
  const [gptResponse, setGptResponse] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [itinLoading, setItinLoading] = useState(false);
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

  const [data, setPageData] = useState({
    itinerary: {
      location: "Cape Town",
      days: [
        {
          day: "Day 1",
          places: [
            {
              place: "Table Mountain National Park",
              description:
                "Hike up Table Mountain for panoramic views of Cape Town and the surrounding coastline, a perfect spot for hiking and sightseeing.",
            },
            {
              place: "Camps Bay Beach",
              description:
                "Relax on the beautiful Camps Bay Beach with its golden sands and turquoise waters, ideal for swimming and sunbathing in a tropical setting.",
            },
            {
              place: "V&A Waterfront",
              description:
                "Explore the V&A Waterfront, a bustling hub of shops, restaurants, and entertainment venues, offering a mix of city vibes and seaside charm.",
            },
          ],
        },
        {
          day: "Day 2",
          places: [
            {
              place: "Lion's Head",
              description:
                "Hike up Lion's Head for a different perspective of Cape Town, with panoramic views of the city, Table Mountain, and the Atlantic Ocean, perfect for hiking and sightseeing.",
            },
            {
              place: "Long Street",
              description:
                "Experience the nightlife of Cape Town on Long Street, known for its eclectic mix of bars, clubs, and live music venues, offering a vibrant city atmosphere.",
            },
            {
              place: "Kirstenbosch National Botanical Garden",
              description:
                "Stroll through the Kirstenbosch National Botanical Garden, known for its diverse plant species, tranquil setting, and stunning views of Table Mountain, ideal for a relaxing nature walk.",
            },
          ],
        },
        {
          day: "Day 3",
          places: [
            {
              place: "Boulders Beach",
              description:
                "Visit Boulders Beach to see the famous African penguin colony, relax on the sandy shores, and swim in the clear waters, a unique experience combining wildlife viewing and beach activities.",
            },
            {
              place: "Bo-Kaap",
              description:
                "Explore the colorful streets of Bo-Kaap, known for its vibrant houses, rich culture, and historic significance, offering a mix of city exploration and cultural immersion.",
            },
            {
              place: "Signal Hill",
              description:
                "Watch the sunset from Signal Hill, a popular viewpoint overlooking the city and coastline, perfect for sightseeing and capturing breathtaking views of Cape Town.",
            },
          ],
        },
      ],
    },
  });

  const handleBackClick = () => {
    onBackClick();
  };

  const openai = new OpenAI({
    apiKey: "API KEY HERE",
    dangerouslyAllowBrowser: true,
  });

  async function getLocations() {
    setLocationLoading(true);
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
    console.log(preferences);
    console.log("Completion:", completion.choices[0].message.content);
    setGptResponse(completion.choices[0].message.content);
    const locationNames = JSON.parse(completion.choices[0].message.content);
    const cities = [];

    // Assuming data is already a parsed JSON object
    locationNames.forEach((item) => {
      cities.push(item.city);
    });

    console.log("After parsing", locationNames, " | ", cities);
    onLocationsUpdate({ cities });
    // setPageData(locationNames);
    console.log("Ran once");
    console.log(completion.choices[0].message.content);
    setLocationLoading(false);
  }

  async function getItinerary() {
    setItinLoading(true);
    const promptItin =
      'You are an assistant who creates sample itineraries based on user rankings in different travel-related categories.  The response must be in JSON format in the following template.  You must specify real-world locations and activities. You should aim to find activities and locations that maximize multiple points of the user\'s rankings. Use these to generate 1 itinerary, where the itinerary is for one location. The location must be a city or country. The itinerary should take up 3 days with 3 activities each. \n\n{\n  "itinerary": {\n    "location": "location Name",\n    "days": [\n      {\n        "day": "Day 1",\n        "places": [\n          {\n            "place": "Place 1",\n            "description": "Description of Place 1"\n          },\n          {\n            "place": "Place 2",\n            "description": "Description of Place 2"\n          },\n          {\n            "place": "Place 3",\n            "description": "Description of Place 3"\n          }\n        ]\n      },\n      {\n        "day": "Day 2",\n        "places": [\n          {\n            "place": "Place 4",\n            "description": "Description of Place 4"\n          },\n          {\n            "place": "Place 5",\n            "description": "Description of Place 5"\n          },\n          {\n            "place": "Place 6",\n            "description": "Description of Place 6"\n          }\n        ]\n      },\n      {\n        "day": "Day 3",\n        "places": [\n          {\n            "place": "Place 7",\n            "description": "Description of Place 7"\n          },\n          {\n            "place": "Place 8",\n            "description": "Description of Place 8"\n          },\n          {\n            "place": "Place 9",\n            "description": "Description of Place 9"\n          }\n        ]\n      }\n    ]\n  }\n}\n';
    const preferences = formatUserPreferences(
      userPreferences,
      selectedDestination
    );
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: promptItin,
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
      // console.log(preferences)
      setGptResponse(completion.choices[0].message.content);
      setPageData(JSON.parse(completion.choices[0].message.content));
      setItinLoading(false);
      // console.log("Ran once");
      // console.log(completion.choices[0].message.content);
    } catch (apiError) {
      console.error("API request failed: ", apiError);
      setItinLoading(false);
    }
  }
  console.log("gpt.js", selectedDestination);

  useEffect(() => {
    if (selectedDestination) {
      getItinerary(selectedDestination);
    }
  }, [selectedDestination]);
  return (
    <div className="itinerary">
      <button onClick={handleBackClick}>See Locations</button>
      <h1>Itinerary for {selectedDestination}</h1>
      {/* <div> className="itinerary-content"
        {gptResponse || "Generating itinerary..."}
      </div> */}
      <div className="holder">
        {itinLoading ? (
          <p>Loading itinerary...</p>
        ) : (
          data.itinerary.days.map((day, dayIndex) => (
            <div className="day" key={dayIndex}>
              <h2>{day.day}</h2>
              <ul>
                {day.places.map((place, placeIndex) => (
                  <li key={placeIndex}>
                    <h3>{place.place}</h3>
                    <p>{place.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GPT;
