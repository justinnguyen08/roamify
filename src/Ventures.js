import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import './style.css';

function Ventures( {onHomeClick, onBackClick, onNextClick} ) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Preferences' },
    { id: 2, name: 'Options' },
  ]);
  const [items, setItems] = useState([
    { id: 1, name: 'surfing', category: 2 },
    { id: 2, name: 'snorkeling', category: 2 },
    { id: 3, name: 'swimming', category: 2 },
    { id: 4, name: 'ziplining', category: 2 },
    { id: 5, name: 'hiking', category: 2 },
    { id: 6, name: 'nightlife', category: 2 },
    { id: 7, name: 'kayaking', category: 2 },
    { id: 8, name: 'sightseeing', category: 2 },
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
      <h1> What Are Your Top Vacation Ventures? </h1> 
      <button onClick={handleHomeClick}>Home</button>
      <button onClick={handleBackClick}>Back: Vacation Style</button>
      <button onClick={handleNextClick}>Next: Destinations</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="Categories" type="droppableItem">
            {(provided) => (
              <div ref={provided.innerRef}>
                {categories.map((category, index) => (
                  <Draggable
                    draggableId={`category-${category.id}`}
                    key={`category-${category.id}`}
                    index={index}
                  >
                    {(parentProvider) => (
                      <div
                        ref={parentProvider.innerRef}
                        {...parentProvider.draggableProps}
                      >
                        <Droppable droppableId={category.id.toString()}>
                          {(provided) => (
                            <div ref={provided.innerRef}>
                              <ul className="list-unstyled border p-3 mb-3">
                                <h6
                                  className="h6 mb-3"
                                  {...parentProvider.dragHandleProps}
                                >
                                  {category.name}
                                </h6>
                                {items
                                  .filter(
                                    (item) => item.category === category.id
                                  )
                                  .map((item, index) => (
                                    <Draggable
                                      draggableId={item.id.toString()}
                                      key={item.id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <li className="mb-3 d-flex align-items-center justify-content-between border p-3">
                                            <Item item={item} />
                                            <button className="btn btn-dark">
                                              ...
                                            </button>
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
export default Ventures;