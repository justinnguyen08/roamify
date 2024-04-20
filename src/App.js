import React, { useState } from "react";
import VacationStyle from "./Components/VacationStyle";
import Ventures from "./Components/Ventures";
import Destinations from "./Components/Destinations";
import SettingsPage from "./Components/SettingsPage";
import ItineraryList from "./Components/ItineraryList";
import GPT from "./Components/gpt";
import './App.css'
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const [selectedDestination, setSelectedDestination] = useState("");

  const [generatedLocations, setGeneratedLocations]= useState(false);

  const styleClick = () => {
    setCurrentPage("vacation-style");
  };

  const ventureClick = () => {
    setCurrentPage("ventures");
  };

  const destClick = () => {
    setCurrentPage("destinations");
  };

  const handleHomeClick = () => {
    setCurrentPage("home");
  };

  const handleSettingsClick = () => {
    setCurrentPage("settings");
  };

  const itineraryClick = () => {
    setCurrentPage("itineraries");
  };

  const firstItineraryClick = () => {
    setCurrentPage("firstItineraries");
  };

  const onSelectItinerary = (destination) => {
    setSelectedDestination(destination);
    setCurrentPage("firstItineraries"); // Or whatever page you use to display the GPT-generated itinerary
  };


  const [vacationStyleItems, setVacationStyleItems] = useState([
    { id: 1, name: 'Historical', category: 2 },
    { id: 2, name: 'Tropical', category: 2 },
    { id: 3, name: 'Snowy', category: 2 },
    { id: 4, name: 'City', category: 2 },
    { id: 5, name: 'Nature', category: 2 },
    { id: 6, name: 'Beach', category: 2 },
    { id: 7, name: 'Mountains', category: 2 },
    { id: 8, name: 'Desert', category: 2 },
    { id: 9, name: 'Lake', category: 2 },
    { id: 10, name: 'Ocean/Sea', category: 2 },
  ]);
  
  function addVacationStyle(name) {
    const nextId = Math.max(...vacationStyleItems.map(item => item.id)) + 1;
    const newVacationStyle = {
      id: nextId,
      name: name,
      category: 2
    };
    setVacationStyleItems([newVacationStyle, ...vacationStyleItems]);
  }



  const [venturesItems, setVenturesItems] = useState([
    { id: 1, name: 'Foodie', category: 2 },
    { id: 2, name: 'Local Culture', category: 2 },
    { id: 3, name: 'Swimming', category: 2 },
    { id: 4, name: 'Hiking', category: 2 },
    { id: 5, name: 'Sightseeing', category: 2 },
    { id: 6, name: 'Nightlife', category: 2 },
    { id: 7, name: 'Shopping', category: 2 },
    { id: 8, name: 'Camping', category: 2 },
    { id: 9, name: 'Biking', category: 2 },
    { id: 10, name: 'Fishing', category: 2 },
  ]);

  function addVacationVenture(name) {
    const nextId = Math.max(...venturesItems.map(item => item.id)) + 1;
    const newVentureItem = {
      id: nextId,
      name: name,
      category: 2
    };
    setVenturesItems([newVentureItem,...venturesItems]);
  }

  const [destinationsItems, setDestinationsItems] = useState([
    { id: 1, name: 'LGBTQ+ friendly', category: 2 },
    { id: 2, name: 'Hearing/Vision Impaired', category: 2 },
    { id: 3, name: 'Kid friendly', category: 2 },
    { id: 4, name: 'Adult-only', category: 2 },
    { id: 5, name: 'High-Adrenaline', category: 2 },
    { id: 6, name: "Relaxing", category: 2 },
    { id: 7, name: 'Solo Traveler', category: 2 },
    { id: 8, name: 'Eco-Friendly', category: 2 },
    { id: 9, name: 'Low Cost', category: 2 },
  ]);


  function addVacationDestination(name) {
    const nextId = Math.max(...destinationsItems.map(item => item.id)) + 1;
    const newDestinationItem = {
      id: nextId,
      name: name,
      category: 2
    };
    setDestinationsItems([newDestinationItem,...destinationsItems]);
  }

  const userPreferences = {
    vacationStylePreferences: vacationStyleItems.filter(item => item.category === 1),
    venturesPreferences: venturesItems.filter(item => item.category === 1),
    destinationsPreferences: destinationsItems.filter(item => item.category === 1),
  };

  // In App component
  const [locations, setLocations] = useState(['New York', 'London', 'Paris']);

  const handleLocationsUpdate = (newLocations) => {
    // console.log("Updating locations with:", newLocations, "\narray length: ", newLocations.length);
    setLocations(newLocations);
  };


  console.log("App.js, locations.cities: ", locations.cities);
  return (
    <div>
      {currentPage === "home" && (
        <div className="container homepage">
          <div className="row">
            <div className="homeSpecificButtons d-flex justify-content-end">
              <button onClick={handleSettingsClick}>Settings</button>
            </div>
          </div>
          <div className="row">
            <div className="homeName col-12">
              <d1>Roamify</d1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 tagline">
              <d2>Planning trips made easy</d2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 nextPages d-flex justify-content-evenly">
              <button onClick={styleClick}>Let's Start: Vacation Style!</button>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'vacation-style' && <VacationStyle items={vacationStyleItems} setItems={setVacationStyleItems} VacationStyle onNextClick={ventureClick} onHomeClick={handleHomeClick} addVacationStyle={addVacationStyle} />}
      {currentPage === 'ventures' && <Ventures items={venturesItems} setItems={setVenturesItems} onBackClick={styleClick} onHomeClick={handleHomeClick} onNextClick={destClick} addVacationVenture={addVacationVenture} />}
      {currentPage === 'destinations' && <Destinations items={destinationsItems} setItems={setDestinationsItems} onBackClick={ventureClick} onHomeClick={handleHomeClick} onNextClick={itineraryClick} addVacationDestination={addVacationDestination} />}
      {currentPage === 'settings' && <SettingsPage onBackClick={handleHomeClick} />}
      {currentPage === 'itineraries' && <ItineraryList onBackClick={destClick} onNextClick={firstItineraryClick} locations={locations.cities} onSelectItinerary={onSelectItinerary} userPreferences={userPreferences} onLocationsUpdate={handleLocationsUpdate} generatedLocations={generatedLocations} setGeneratedLocations={setGeneratedLocations} />}
      {currentPage === "firstItineraries" && (
        <GPT onBackClick={itineraryClick} userPreferences={userPreferences} onLocationsUpdate={handleLocationsUpdate} locations={locations} selectedDestination={selectedDestination}></GPT> 
      )}
    </div>
  );
};

export default App;