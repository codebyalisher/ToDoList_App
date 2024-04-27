import React, { useState } from "react";
import "./App.css";
import Plan from "./Plan";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    const newItem = {
      text: text,
      id: Date.now(),
      color: getRandomColor(),
    };
    setItems([...items, newItem]);
    setText("");
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleSave = (index, newText) => {
    const updatedItems = [...items];
    if (updatedItems[index]) {
      updatedItems[index].text = newText;
      setItems(updatedItems);
    } else {
      console.error("Item not found at index:", index);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const draggedItem = items[result.source.index];
    const newItems = [...items];
    newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, draggedItem);

    setItems(newItems);
  };

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-sm-6 mx-auto text-white shadow-lg p3">
          <h2 className="text-center">To Do List</h2>
          <div className="row">
            <div className="col-9">
              <input
                type="text"
                className="form-control"
                placeholder="write your plan here"
                value={text}
                onChange={handleChange}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-warning px-5 fw-bold"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul
                  className="list-unstyled row m-5"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <Plan
                            key={item.id}
                            index={index}
                            text={item.text}
                            color={item.color}
                            onDelete={() => handleDelete(item.id)}
                            onSave={handleSave}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
