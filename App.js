import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [showAddTimer, setShowAddTimer] = useState(false);
  const [time, setTime] = useState("");
  const [taskName, setTaskName] = useState("");
  const [filterType, setFilterType] = useState("running");

  useEffect(() => {
    if (tasks.length > 0) {
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [tasks]);

  const handleAddTimer = () => {
    setShowAddTimer(true);
  };

  const handleTimerSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      time,
      taskName: taskName.split("\n").filter((task) => task.trim() !== ""),
      taskId: new Date().getTime(), // Assign unique id to each task
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTime("");
    setTaskName("");
    setShowAddTimer(false);
  };

  const handleCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const renderTasks = () => {
    let filteredTasks = tasks;
    if (filterType === "running") {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else if (filterType === "expired") {
      filteredTasks = tasks.filter((task) => task.completed);
    }

    if (filteredTasks.length === 0) {
      return (
        <div className="no-tasks">
          <b>
            <p>No tasks</p>
          </b>
          <p>Add Tasks and set Timers</p>
          {filterType === "running" && (
            <button className="add-timer-button" onClick={handleAddTimer}>
              Add Timer
            </button>
          )}
        </div>
      );
    }

    return filteredTasks.map((task) => (
      <div
        className={`task-card ${task.completed ? "completed" : ""}`}
        key={task.taskId}
      >
        <h3>{task.time}</h3>
        {task.taskName.map((taskItem, index) => (
          <div className="task-item" key={index}>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id={`checkbox-${task.taskId}-${index}`}
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.taskId)}
                disabled={task.completed}
              />
              <label htmlFor={`checkbox-${task.taskId}-${index}`}></label>
            </div>
            <p>{taskItem}</p>
            {!task.completed}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="navbar">
        <button
          className={filterType === "running" ? "active" : ""}
          onClick={() => handleFilterChange("running")}
        >
          Running
        </button>
        <button
          className={filterType === "expired" ? "active" : ""}
          onClick={() => handleFilterChange("expired")}
        >
          Expired
        </button>
        <button
          className={filterType === "all" ? "active" : ""}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        {timerActive && (
          <button className="add-timer-button-mobile" onClick={handleAddTimer}>
            Add Timer
          </button>
        )}
      </div>
      <div className="content">
        {showAddTimer ? (
          <form className="timer-form" onSubmit={handleTimerSubmit}>
            <div className="time-input">
              <label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Add Time"
                  required
                />
              </label>
            </div>
            <div className="task-input">
              <label>
                <input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Add Task 1"
                  required
                ></input>
              </label>
            </div>
            <button className="submit-button" type="submit">
              Create
            </button>
          </form>
        ) : (
          <div className="task-container">{renderTasks()}</div>
        )}
      </div>
    </div>
  );
};

export default App;
