import React, { useState } from "react";
import Item from "./Item";
import Popup_Content from "./Popup_Content";
import "./rankings.css";

function Destinations({
  items,
  setItems,
  onHomeClick,
  onBackClick,
  onNextClick,
  addVacationDestination,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  const handleBackClick = () => {
    onBackClick();
  };

  const handleHomeClick = () => {
    onHomeClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const addVacationDestinationClick = (name) => {
    document.getElementById("newDestinationName").value = "";
    addVacationDestination(name);
  };

  const toggleItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, category: item.category === 1 ? 2 : 1 }
          : item
      )
    );
  };

  const handleItemClick = (id) => {
    if (selectedItem === null) {
      setSelectedItem(id);
    } else if (selectedItem === id) {
      setSelectedItem(null);
    } else {
      swapItems(id);
    }
  };

  const swapItems = (currentIndex, direction) => {
    const filteredItems = items.filter(item => item.category === 1);
    const itemToMove = filteredItems[currentIndex];
    const swapWithIndex = currentIndex + (direction === 'up' ? -1 : 1);
    const itemToSwapWith = filteredItems[swapWithIndex];
  
    const realCurrentIndex = items.findIndex(item => item.id === itemToMove.id);
    const realSwapWithIndex = items.findIndex(item => item.id === itemToSwapWith.id);
  
    setItems(prevItems => {
      const newItems = [...prevItems];
      [newItems[realCurrentIndex], newItems[realSwapWithIndex]] = [newItems[realSwapWithIndex], newItems[realCurrentIndex]];
      return newItems;
    });
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between">
        <button className="home-button" onClick={handleHomeClick}></button>
        <button onClick={handleBackClick}>Back: Vacation Ventures</button>
        <button onClick={handleNextClick}>Next: See My Itineraries!</button>
      </div>
      <h1 className="mainHeader">Additional Preferences</h1>
      <div className="mainContent">
        <h2 className="tagline">CLICK TO ADD AND REORDER PREFERENCES</h2>
        <div className="prefAndOptions" style={{ marginBottom: "20px" }}>
          <h6>Preferences</h6>
          <ul className="list-unstyled border p-3">
            {items
              .filter((item) => item.category === 1)
              .map((item, index, filteredItems) => ( 
                <li
                  key={item.id}
                  className={`mb-3 d-flex align-items-center justify-content-between border p-3 option ${
                    selectedItem === item.id ? "selected-item" : ""
                  }`}
                >
                  <span className="rank-badge">{index + 1}</span>
                  <div style={{ flexGrow: 1, textAlign: "center" }}>
                    <Item item={item} />
                  </div>
                  <div className="item-controls">
                    <button 
                      onClick={() => index > 0 && swapItems(index, 'up')}
                      disabled={index === 0}
                      className="btn btn-small btn-secondary"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => index < filteredItems.length - 1 && swapItems(index, 'down')}
                      disabled={index === filteredItems.length - 1} 
                      className="btn btn-small btn-secondary"
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="btn btn-small btn-secondary"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="prefAndOptions">
          <h6>Options</h6>
          <ul className="list-unstyled border p-3">
            <div className="inputContainer">
              <input
                type="text"
                id="newDestinationName"
                placeholder="Add Your Own Preference"
              />
              <button
                onClick={() => {
                  const input =
                    document.getElementById("newDestinationName").value;
                  console.log(input);
                  addVacationDestinationClick(input);
                }}
              >
                +
              </button>
            </div>
            {items
              .filter((item) => item.category === 2)
              .map((item) => (
                <li
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`mb-3 d-flex align-items-center justify-content-between border p-3 option ${
                    selectedItem === item.id ? "selected" : ""
                  }`}
                >
                  <div style={{ flexGrow: 1, textAlign: "center" }}>
                    <Item item={item} />
                  </div>
                  <Popup_Content />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Destinations;
