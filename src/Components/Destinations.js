import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import Popup_Content from './Popup_Content';
import './rankings.css'


function Destinations({ items, setItems, onBackClick, onHomeClick, onNextClick, addVacationDestination }) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Preferences' },
    { id: 2, name: 'Options' },
  ]);

  const handleBackClick = () => {
    onBackClick();
  };

  const handleHomeClick = () => {
    onHomeClick();
  }

  const handleNextClick = () => {
    onNextClick();
  }

  const addVacationDestinationClick = (name) => {
    addVacationDestination(name);
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceCategory = parseInt(source.droppableId);
    const destinationCategory = parseInt(destination.droppableId);
    const draggedItemId = parseInt(result.draggableId);

    if (sourceCategory === destinationCategory) {
      setItems(prevItems => {
        const draggedItem = prevItems.find(item => item.id === draggedItemId);

        const remainingItems = prevItems.filter(item => item.id !== draggedItemId);

        const updatedItems = [
          ...remainingItems.slice(0, destination.index),
          draggedItem,
          ...remainingItems.slice(destination.index)
        ];

        return updatedItems;
      });
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === draggedItemId
            ? {
              ...item,
              category: destinationCategory,
            }
            : item
        )
      );
    }
  };

  return (
    <div className="container py-5">
      <div className='d-flex justify-content-between'>
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleBackClick}>Back: Vacation Ventures</button>
        <button onClick={handleNextClick}>Next: See My Itineraries!</button>
      </div>
      <h1 className='mainHeader'> Vacation Location</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='mainContent'>
        <h2 className='tagline'>DRAG AND DROP YOUR TOP LOCATIONS</h2>
          <Droppable droppableId="Categories" type="droppableItem">
            {(provided) => (
              <div ref={provided.innerRef} className='dragAndDropHolder'>
                {categories.map((category, categoryIndex) => (
                  <Draggable
                    draggableId={`category-${category.id}`}
                    key={`category-${category.id}`}
                    index={categoryIndex}
                  >
                    {(parentProvider) => (
                      <div
                        ref={parentProvider.innerRef}
                        {...parentProvider.draggableProps}
                        className='prefAndOptions'
                      >
                        <Droppable droppableId={category.id.toString()}>
                          {(provided) => (
                            <div ref={provided.innerRef}>
                              <ul className="list-unstyled border p-3 mb-3">
                                {category.name == 'Options' && (
                                  <div className="inputContainer">
                                    <input type="text" id="inputField" placeholder='Add Your Own Locations' />
                                    <button onClick={() => {
                                      const input = document.getElementById('newDestinationName').value;
                                      addVacationDestinationClick(input);
                                    }}>+</button>
                                  </div>
                                )}
                                <h6
                                  className="h6 mb-3"
                                  {...parentProvider.dragHandleProps}
                                >
                                  {category.name}
                                </h6>
                                {items
                                  .filter(item => item.category === category.id)
                                  .map((item, itemIndex) => (
                                    <Draggable
                                      draggableId={item.id.toString()}
                                      key={item.id}
                                      index={itemIndex}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <li className="mb-3 d-flex align-items-center justify-content-between border p-3 option ">
                                            {/* Conditionally display rank for items in "Preferences" */}
                                            {category.name === 'Preferences' && (
                                              <span className="rank-badge">{itemIndex + 1}</span>
                                            )}
                                            <Item item={item} />
                                            <Popup_Content />
                                          </li>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </ul>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
export default Destinations;