// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Item from './Item';
// import Popup_Content from './Popup_Content';
// import './rankings.css'

// function VacationStyle({ items, setItems, onNextClick, onHomeClick, addVacationStyle }) {
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Preferences' },
//     { id: 2, name: 'Options' },
//   ]);

//   const [moreInfo, setInfo] = useState([
//     { id: 1, name: 'historical', locations: ['Rome, Italy', 'Athens, Greece', 'Cairo, Egypt'], images: ['logo512.png'], description: 'From the cradle of civilization to the streets of silicon valley. Learn about the people and locations that drove humanity forward. ' }
//   ]);

//   const handleNextClick = () => {
//     onNextClick();
//   };

//   const handleHomeClick = () => {
//     onHomeClick();
//   };

//   const addVacationStyleClick = (name) => {
//     addVacationStyle(name);
//   }

//   // Your onDragEnd logic remains the same, utilizing setItems to update the items array
//   const onDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     const sourceCategory = parseInt(source.droppableId);
//     const destinationCategory = parseInt(destination.droppableId);
//     const draggedItemId = parseInt(result.draggableId);

//     if (sourceCategory === destinationCategory) {
//       setItems(prevItems => {
//         const draggedItem = prevItems.find(item => item.id === draggedItemId);
//         const remainingItems = prevItems.filter(item => item.id !== draggedItemId);
//         const updatedItems = [
//           ...remainingItems.slice(0, destination.index),
//           draggedItem,
//           ...remainingItems.slice(destination.index)
//         ];

//         return updatedItems;
//       });
//     } else {
//       setItems(prevItems =>
//         prevItems.map(item =>
//           item.id === draggedItemId
//             ? { ...item, category: destinationCategory }
//             : item
//         )
//       );
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className='d-flex justify-content-between'>
//         <button onClick={handleHomeClick} >Home</button>
//         <button onClick={handleNextClick}>Next: Vacation Ventures</button>
//       </div>
//       <h1 className='mainHeader'> Vacation Style </h1>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className='mainContent'>
//           <h2 className='tagline'>DRAG AND DROP YOUR TOP PREFERENCES</h2>
//           <Droppable droppableId="Categories" type="droppableItem">
//             {(provided) => (
//               <div ref={provided.innerRef} className='dragAndDropHolder'>
//                 {categories.map((category, categoryIndex) => (
//                   <Draggable
//                     draggableId={`category-${category.id}`}
//                     key={`category-${category.id}`}
//                     index={categoryIndex}
//                   >
//                     {(parentProvider) => (
//                       <div
//                         ref={parentProvider.innerRef}
//                         {...parentProvider.draggableProps}
//                         className='prefAndOptions'
//                       >
//                         <Droppable droppableId={category.id.toString()}>
//                           {(provided) => (
//                             <div ref={provided.innerRef}>
//                               <ul className="list-unstyled border p-3 mb-3">
//                                 {category.name === 'Options' && (
//                                   <div className="inputContainer">
//                                     <input type="text" id="newStyleName" placeholder='Add Your Own Style' />
//                                     <button onClick={() => {
//                                       const input = document.getElementById('newStyleName').value;
//                                       addVacationStyleClick(input);
//                                     }}>+</button>
//                                   </div>
//                                 )}
//                                 <h6
//                                   className="h6 mb-3"
//                                   {...parentProvider.dragHandleProps}
//                                 >
//                                   {category.name}
//                                 </h6>
//                                 {items
//                                   .filter(item => item.category === category.id)
//                                   .map((item, itemIndex) => (
//                                     <Draggable
//                                       draggableId={item.id.toString()}
//                                       key={item.id}
//                                       index={itemIndex}
//                                     >
//                                       {(provided) => (
//                                         <div
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}

//                                         >
//                                           <li className="mb-3 d-flex align-items-center justify-content-between border p-3 option">
//                                             {/* Conditionally display rank for items in "Preferences" */}
//                                             {category.name === 'Preferences' && (
//                                               <span className="rank-badge">{itemIndex + 1}</span>
//                                             )}
//                                             <Item item={item} />
//                                             <Popup_Content />
//                                           </li>
//                                         </div>
//                                       )}
//                                     </Draggable>
//                                   ))}
//                                 {provided.placeholder}
//                               </ul>
//                             </div>
//                           )}
//                         </Droppable>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}

//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }
// export default VacationStyle;

import React, { useState } from "react";
import Item from "./Item";
import Popup_Content from "./Popup_Content";
import "./rankings.css";

function VacationStyle({
  items,
  setItems,
  onHomeClick,
  onNextClick,
  addVacationStyle,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  const handleHomeClick = () => {
    onHomeClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const addVacationStyleClick = (name) => {
    document.getElementById("newStyleName").value = "";
    addVacationStyle(name);
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

  const swapItems = (secondItemId) => {
    setItems((prevItems) => {
      let index1 = prevItems.findIndex((item) => item.id === selectedItem);
      let index2 = prevItems.findIndex((item) => item.id === secondItemId);
      let newItems = [...prevItems];
      [newItems[index1], newItems[index2]] = [
        newItems[index2],
        newItems[index1],
      ];
      return newItems;
    });
    setSelectedItem(null);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleNextClick}>Next: Vacation Ventures</button>
      </div>
      <h1 className="mainHeader">Vacation Style</h1>
      <div className="mainContent">
        <h2 className="tagline">CLICK TO ADD AND REORDER PREFERENCES</h2>
        <div className="prefAndOptions" style={{ marginBottom: "20px" }}>
          <h6>Preferences</h6>
          <ul className="list-unstyled border p-3">
            {items
              .filter((item) => item.category === 1)
              .map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`mb-3 d-flex align-items-center justify-content-between border p-3 option ${
                    selectedItem === item.id ? "selected-item" : ""
                  }`} // Changed here
                >
                  <span className="rank-badge">{index + 1}</span>
                  <div style={{ flexGrow: 1, textAlign: "center" }}>
                    <Item item={item} />
                  </div>
                  <Popup_Content />
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="btn btn-small btn-secondary"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Remove from Preferences
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
                id="newStyleName"
                placeholder="Add Your Own Style"
              />
              <button
                onClick={() => {
                  const input = document.getElementById("newStyleName").value;
                  addVacationStyleClick(input);
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

export default VacationStyle;
