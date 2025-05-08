import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useState } from "react";

const Dragable = () => {
  const [lists, setLists] = useState({
    list1: [
      { id: "1", name: "Rohit" },
      { id: "2", name: "Chandan" },
      { id: "3", name: "Govinda" },
      { id: "4", name: "King" },
    ],
    list2: [
      { id: "5", name: "Ram" },
      { id: "6", name: "Karan" },
      { id: "7", name: "Krishna" },
      { id: "8", name: "KiQueenng" },
    ],
    list3: [
      { id: "10", name: "India" },
      { id: "12", name: "Dubai" },
      { id: "11", name: "USA" },
      { id: "13", name: "UK" },
    ],
  });

  const [idCounter, setIdCounter] = useState(9);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = Array.from(lists[source.droppableId]);
    const destList = Array.from(lists[destination.droppableId]);
    const [movedItem] = sourceList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, movedItem);
      setLists((prev) => ({
        ...prev,
        [source.droppableId]: sourceList,
      }));
    } else {
      destList.splice(destination.index, 0, movedItem);
      setLists((prev) => ({
        ...prev,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      }));
    }
  };

  const addItem = (listId) => {
    const newItem = {
      id: idCounter.toString(),
      name: `New Item ${idCounter}`,
    };
    setLists((prev) => ({
      ...prev,
      [listId]: [...prev[listId], newItem],
    }));
    setIdCounter((prev) => prev + 1);
  };

  return (
    <div className="h-screen p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5">
          {["list1", "list2", "list3"].map((listId) => (
            <div key={listId} className="flex flex-col items-center">
              <Droppable droppableId={listId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 p-3 w-52 h-64 border-2 border-red-500 rounded overflow-y-auto"
                  >
                    {lists[listId].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white border border-gray-300 p-2 mb-2 rounded shadow-sm"
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <button
                onClick={() => addItem(listId)}
                className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dragable;
