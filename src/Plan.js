import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function Plan({
  id,
  index,
  text,
  color,
  onDelete,
  onSave,
  draggableProps,
  dragHandleProps,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(index, editedText);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <li
      style={{
        backgroundColor: color,
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "5px",
        color: "white",
        cursor: "grab",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...draggableProps}
      {...dragHandleProps}
    >
      {isEditing ? (
        <>
          <input type="text" value={editedText} onChange={handleChange} />
          <button className="btn btn-success" onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </>
      ) : (
        <>
          {text}
          <button
            className="btn btn-danger ms-auto"
            onClick={handleDeleteClick}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button className="btn btn-primary m-2" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        </>
      )}
    </li>
  );
}

export default Plan;
