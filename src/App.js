import React, { useState } from 'react';
import VacationStyle from './Components/VacationStyle';
import Ventures from './Components/Ventures';
import Destinations from './Components/Destinations';
import SettingsPage from './Components/SettingsPage';
import ItineraryList from './Components/ItineraryList';


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const styleClick = () => {
    setCurrentPage('vacation-style');
  };

  const ventureClick = () => {
    setCurrentPage('ventures');
  };

  const destClick = () => {
    setCurrentPage('destinations');
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
  };

  const handleSettingsClick = () => {
    setCurrentPage('settings');
  };

  const itineraryClick = () => {
    setCurrentPage('itineraries');
  }

  const [vacationStyleItems, setVacationStyleItems] = useState([
    { id: 1, name: 'historical', category: 2 },
    { id: 2, name: 'tropical', category: 2 },
    { id: 3, name: 'snowy', category: 2 },
    { id: 4, name: 'city', category: 2 },
    { id: 5, name: 'nature', category: 2 },
    { id: 6, name: 'beach', category: 2 },
  ]);
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


  return (
    <div>
      {currentPage === 'home' && (
        <button onClick={handleSettingsClick}>Settings</button>
      )}

      {currentPage === 'home' && (
        <div>
          <h1>Home</h1>
          <button onClick={styleClick}>Let's Start: Vacation Style!</button>
        </div>
      )}
      {currentPage === 'vacation-style' && <VacationStyle items={vacationStyleItems} setItems={setVacationStyleItems} VacationStyle onNextClick={ventureClick} onHomeClick={handleHomeClick} />}
      {currentPage === 'ventures' && <Ventures items={venturesItems} setItems={setVenturesItems} onBackClick={styleClick} onHomeClick={handleHomeClick} onNextClick={destClick} />}
      {currentPage === 'destinations' && <Destinations items={destinationsItems} setItems={setDestinationsItems} onBackClick={ventureClick} onHomeClick={handleHomeClick} onNextClick={itineraryClick} />}
      {currentPage === 'settings' && <SettingsPage onBackClick={handleHomeClick} />}
      {currentPage === 'itineraries' && <ItineraryList onBackClick={destClick} />}
    </div>
  );
};

export default App;
