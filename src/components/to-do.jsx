import React, { useState } from "react";
import "./css/App.css";

function ToDo() {
  const storageKey = "mytask";

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
    if (task.length <= 2) return;

    const makeTask = { task: task, style: null };

    setTasks((t) => [...t, makeTask]);
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

  const handleCheck = (e, el, index) => {
    const parent = e.target.parentElement;
    const span = parent.children[0];
    const i = span.children[0]
    i.style.color = 'lightgreen'


    tasks.filter((element, i) => {
      if (i === index) {
        span.style.textDecoration = "line-through";

        element.style = "line-through";
        localStorage.setItem(storageKey, JSON.stringify(tasks));
      }
    });
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
        <button onClick={toggleDeleteTask}>toggle delete</button>
        <button onClick={handleEmptyList}>Clear all</button>
      </div>

      <div className="to-display-list-box">
        <ul>
          {tasks.length <= 0 ? (
            <span style={{ textAlign: "center" }}>create a task</span>
          ) : (
            tasks.map((element, index) => (
              <li key={index}>
                {element.style === null ? (
                  <span>
                    <i className="fa-regular fa-circle-check" style={{marginRight: '10px'}}></i>{element.task}
                  </span>
                ) : (
                  <span style={{ textDecoration: element.style }}>
                    <i className="fa-regular fa-circle-check" style={{color: 'lightgreen', marginRight: '10px'}}></i>
                    {element.task}
                  </span>
                )}
                {deleteTask === false ? null : (
                  <button onClick={() => handleRemoveTask(index)}>
                    <i className="fa-solid fa-delete-left"></i>
                  </button>
                )}
                <button
                  style={{ backgroundColor: "lightgreen" }}
                  onClick={(e) => handleCheck(e, element, index)}
                >
                  Check
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ToDo;
