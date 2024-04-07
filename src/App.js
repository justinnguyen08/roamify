import React, { useState } from "react";
import VacationStyle from "./Components/VacationStyle";
import Ventures from "./Components/Ventures";
import Destinations from "./Components/Destinations";
import SettingsPage from "./Components/SettingsPage";
import ItineraryList from "./Components/ItineraryList";
import GPT from "./Components/gpt";
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

  return (
    <div>
      {currentPage === "home" && (
        <button onClick={handleSettingsClick}>Settings</button>
      )}
      {currentPage === "home" && (
        <div>
          <h1>Home</h1>
          <button onClick={styleClick}>Let's Start: Vacation Style!</button>
        </div>
      )}
      {currentPage === "vacation-style" && (
        <VacationStyle
          onNextClick={ventureClick}
          onHomeClick={handleHomeClick}
        />
      )}
      {currentPage === "ventures" && (
        <Ventures
          onBackClick={styleClick}
          onHomeClick={handleHomeClick}
          onNextClick={destClick}
        />
      )}
      {currentPage === "destinations" && (
        <Destinations
          onBackClick={ventureClick}
          onHomeClick={handleHomeClick}
          onNextClick={itineraryClick}
        />
      )}
      {currentPage === "settings" && (
        <SettingsPage onBackClick={handleHomeClick} />
      )}
      {currentPage === "itineraries" && (
        <ItineraryList
          onBackClick={destClick}
          onNextClick={firstItineraryClick}
        />
      )}
      {currentPage === "firstItineraries" && (
        <GPT onBackClick={destClick}></GPT>
      )}
    </div>
  );
};

export default App;
