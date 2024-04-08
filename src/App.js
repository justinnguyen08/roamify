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
  const [vacationStyleItems, setVacationStyleItems] = useState([
    { id: 1, name: 'historical', category: 2 },
    { id: 2, name: 'tropical', category: 2 },
    { id: 3, name: 'snowy', category: 2 },
    { id: 4, name: 'city', category: 2 },
    { id: 5, name: 'nature', category: 2 },
    { id: 6, name: 'beach', category: 2 },
  ]);
  
  function addVacationStyle(name) {
    const nextId = Math.max(...vacationStyleItems.map(item => item.id)) + 1;
    const newVacationStyle = {
      id: nextId,
      name: name,
      category: 2
    };
    setVacationStyleItems([...vacationStyleItems, newVacationStyle]);
  }



  const [venturesItems, setVenturesItems] = useState([
    { id: 1, name: 'surfing', category: 2 },
    { id: 2, name: 'snorkeling', category: 2 },
    { id: 3, name: 'swimming', category: 2 },
    { id: 4, name: 'ziplining', category: 2 },
    { id: 5, name: 'hiking', category: 2 },
    { id: 6, name: 'nightlife', category: 2 },
    { id: 7, name: 'kayaking', category: 2 },
    { id: 8, name: 'sightseeing', category: 2 },
  ]);

  function addVacationVenture(name) {
    const nextId = Math.max(...venturesItems.map(item => item.id)) + 1;
    const newVentureItem = {
      id: nextId,
      name: name,
      category: 2
    };
    setVenturesItems([...venturesItems, newVentureItem]);
  }

  const [destinationsItems, setDestinationsItems] = useState([
    { id: 1, name: 'Bahamas', category: 2 },
    { id: 2, name: 'Cancun', category: 2 },
    { id: 3, name: 'Bali', category: 2 },
    { id: 4, name: 'Fiji', category: 2 },
    { id: 5, name: 'Turks & Caicos', category: 2 },
    { id: 6, name: "Hawai'i", category: 2 },
    { id: 7, name: 'Phuket', category: 2 },
    { id: 8, name: 'Aruba', category: 2 },
  ]);


  function addVacationDestination(name) {
    const nextId = Math.max(...destinationsItems.map(item => item.id)) + 1;
    const newDestinationItem = {
      id: nextId,
      name: name,
      category: 2
    };
    setDestinationsItems([...destinationsItems, newDestinationItem]);
  }

  const userPreferences = {
    vacationStylePreferences: vacationStyleItems.filter(item => item.category === 1),
    venturesPreferences: venturesItems.filter(item => item.category === 1),
    destinationsPreferences: destinationsItems.filter(item => item.category === 1),
  };


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
      {currentPage === 'itineraries' && <ItineraryList onBackClick={destClick} onNextClick={firstItineraryClick} />}
      {currentPage === "firstItineraries" && (
        <GPT onBackClick={destClick} userPreferences={userPreferences}></GPT>
      )}
    </div>
  );
};

export default App;