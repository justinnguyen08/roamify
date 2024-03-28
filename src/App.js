import React, { useState } from 'react';
import VacationStyle from './VacationStyle';
import Ventures from './Ventures';
import Destinations from './Destinations';

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
  }

  const handleHomeClick = () => {
    setCurrentPage('home');
  };

  return (
    <div>
      {currentPage === 'home' && (
        <div>
          <h1>Home</h1>
          {/* <button onClick={() => handlePageChange('vacation-style')}> */}
          <button onClick={styleClick}>Let's Start: Vacation Style!</button>
        </div>
      )}
      {currentPage === 'vacation-style' && <VacationStyle onNextClick={ventureClick} onHomeClick={handleHomeClick}/>}
      {currentPage === 'ventures' && <Ventures onBackClick={styleClick} onHomeClick={handleHomeClick} onNextClick={destClick}/>}
      {currentPage === 'destinations' && <Destinations onBackClick={ventureClick} onHomeClick={handleHomeClick} />}


    </div>
  );
};

export default App;