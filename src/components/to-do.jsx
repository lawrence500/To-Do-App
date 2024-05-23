import React, { useState } from "react";
import "./css/App.css";

function ToDo(props) {
  const storageKey = props.localKey;

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );
  const [deleteTask, setDeleteTask] = useState(false);

  localStorage.setItem(storageKey, JSON.stringify(tasks));

  const handleTaskInput = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if(task.length <= 2) return

    setTasks((t) => [...t, task]);
    setTask("");
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleDeleteTask = () => {
    setDeleteTask(true);

    if (deleteTask === true) {
      setDeleteTask(false);
    }
  };

  const handleEmptyList = () => {
    localStorage.removeItem(storageKey);
    setTasks([]);
  };

  return (
    <div className="to-do-main-container">
      <div className="to-do-input-box">
        <input
          type="text"
          value={task}
          onChange={handleTaskInput}
          placeholder="Your Task..."
          id="input"
        />
        <button onClick={handleAddTask}>
          <i className="fa-regular fa-floppy-disk"></i>
        </button>
      </div>

      <div className="delete-box">
        <button onClick={toggleDeleteTask}>
          toggle delete
        </button>
        <button  onClick={handleEmptyList}>
          Clear all
        </button>
      </div>

      <div className="to-display-list-box">
        <h1>{storageKey}</h1>
        <ul>
          {tasks.length <= 0 ? (
            <span style={{ textAlign: "center" }}>create a task</span>
          ) : (
            tasks.map((element, index) => (
              <li key={index}>
                <span>{element}</span>
                {deleteTask === false ? null : (
                  <button onClick={() => handleRemoveTask(index)}>
                    <i class="fa-solid fa-delete-left"></i>
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ToDo;
