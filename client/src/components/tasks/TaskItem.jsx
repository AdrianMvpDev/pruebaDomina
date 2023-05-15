import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const TaskItem = ({ task, handleUpdate, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const handleSave = () => {
    handleUpdate(task._id, {
      title: updatedTitle,
      description: updatedDescription,
    });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    handleDelete(task._id);
  };

  return (
    <tbody className="task-item__container">
      <tr className="task-item__title-row">
        <th className="task-item__title-heading">Title</th>
        <td className="task-item__title-cell">
          {isEditing ? (
            <TextField
            className="task-item__title-input"
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}               
              />
          ) : (
            <p className="task-item__title">{task.title}</p>
          )}
        </td>
      </tr>

      <tr className="task-item__description-row">
        <th className="task-item__description-heading">Description</th>
        <td className="task-item__description-cell">
          {isEditing ? (
            <TextField
                className="task-item__description-input"
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}                
              />
          ) : (
            <p className="task-item__description">{task.description}</p>
          )}
        </td>
      </tr>

      <tr className="task-item__action-row">
        <th className="task-item__action-heading">Action</th>
        <td className="task-item__action-cell">
          {isEditing ? (
            <div className="task-actions-buttons">
              <Button
                className="task-item__save-button"
                onClick={handleSave}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className="task-item__cancel-button"
                onClick={handleCancel}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="task-actions-buttons">
              <Button
                className="task-item__edit-button"
                onClick={handleEdit}
                variant="contained"
                color="success"
              >
                Edit
              </Button>
              <Button
                className="task-item__delete-button"
                onClick={handleDeleteClick}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default TaskItem;
