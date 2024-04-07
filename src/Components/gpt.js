import React, { useState, useEffect } from "react";
const { Configuration, OpenAI } = require("openai");

function GPT({ onBackClick }) {
  const [gptResponse, setGptResponse] = useState("");
  const [data, setPageData] = useState({
    itinerary: {
      city: "Cape Town",
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

  async function fetchResponse() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'You are an assistant who creates sample itineraries based on user rankings in different travel-related categories.  The response must be in JSON format in the following template.  You must specify real-world locations and activities. You should aim to find activities and locations that maximize multiple points of the user\'s rankings. Each itinerary must be of 1 city and take up 3 days with 3 activities each. \n\n{\n  "itinerary": {\n    "city": "City Name",\n    "days": [\n      {\n        "day": "Day 1",\n        "places": [\n          {\n            "place": "Place 1",\n            "description": "Description of Place 1"\n          },\n          {\n            "place": "Place 2",\n            "description": "Description of Place 2"\n          },\n          {\n            "place": "Place 3",\n            "description": "Description of Place 3"\n          }\n        ]\n      },\n      {\n        "day": "Day 2",\n        "places": [\n          {\n            "place": "Place 4",\n            "description": "Description of Place 4"\n          },\n          {\n            "place": "Place 5",\n            "description": "Description of Place 5"\n          },\n          {\n            "place": "Place 6",\n            "description": "Description of Place 6"\n          }\n        ]\n      },\n      {\n        "day": "Day 3",\n        "places": [\n          {\n            "place": "Place 7",\n            "description": "Description of Place 7"\n          },\n          {\n            "place": "Place 8",\n            "description": "Description of Place 8"\n          },\n          {\n            "place": "Place 9",\n            "description": "Description of Place 9"\n          }\n        ]\n      }\n    ]\n  }\n}\n',
        },
        {
          role: "user",
          content:
            "Rankings: \n\nLocation:  1st- Tropical, 2nd- City, 3rd- Beach\nActivities: 1st- Hiking, 2nd- Nightlife, 3rd-Swimming",
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 1028,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setGptResponse(completion.choices[0].message.content);
    setPageData(JSON.parse(completion.choices[0].message.content));
    console.log("Ran once");
    console.log(completion.choices[0].message.content);
  }
  return (
    <div className="itinerary">
      <button onClick={handleBackClick}>Go Home</button>
      <h1>Itinerary for {data.itinerary.city}</h1>
      {data.itinerary.days.map((day, dayIndex) => (
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
      ))}
      <button onClick={fetchResponse}>TESTING BUTTON FOR FETCH RESPONSE</button>
    </div>
  );
}

export default GPT;
