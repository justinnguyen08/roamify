import React, { useState } from 'react';
import VacationStyle from './VacationStyle';
import Ventures from './Ventures';
import Destinations from './Destinations';
import SettingsPage from './SettingsPage';
import ItineraryList from './ItineraryList';


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
      {currentPage === 'vacation-style' && <VacationStyle onNextClick={ventureClick} onHomeClick={handleHomeClick} />}
      {currentPage === 'ventures' && <Ventures onBackClick={styleClick} onHomeClick={handleHomeClick} onNextClick={destClick} />}
      {currentPage === 'destinations' && <Destinations onBackClick={ventureClick} onHomeClick={handleHomeClick} onNextClick={itineraryClick}/>}
      {currentPage === 'settings' && <SettingsPage onBackClick={handleHomeClick}/>}
      {currentPage === 'itineraries' && <ItineraryList onBackClick={destClick}/>}
    </div>
  );
};

export default App;
