import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  // Add Task
  function addTask(title) {
    const newTask = {
      title,
      completed: false,
    };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((r) => r.json())
      .then((task) => setTasks([...tasks, task]));
  }

  // Toggle Complete
  function toggleComplete(id) {
    const task = tasks.find((t) => t.id === id);

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((r) => r.json())
      .then((updatedTask) => {
        const updatedTasks = tasks.map((t) =>
          t.id === id ? updatedTask : t
        );
        setTasks(updatedTasks);
      });
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
