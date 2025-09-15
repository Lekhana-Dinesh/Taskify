import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import taskLogo from "../assets/task.jpeg";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../apiCalls/taskCalls.js";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", category: "" });
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTasks(filter === "all" ? "" : filter);
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filter]);

  // Toggle task (mark done/undone)
  const toggleTask = async (id, isDone) => {
    try {
      const updated = await updateTask(id, { isDone: !isDone });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTask.title || !newTask.category) {
      return alert("Fill all fields");
    }
    try {
      const saved = await createTask(newTask);
      setTasks([saved, ...tasks]);
      setNewTask({ title: "", category: "" });
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  // Delete task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-200 via-blue-200 to-blue-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src={taskLogo}
            alt="Taskify Logo"
            className="w-12 h-12 rounded-lg shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800">Taskify Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 px-6 pb-8">
        {/* Task List */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>

          {/* Category Filter */}
          <div className="flex gap-2 mb-4">
            {["all", "work", "personal"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  filter === cat
                    ? "bg-gradient-to-r from-pink-400 to-blue-400 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Task Items */}
          {loading ? (
            <p className="text-sm text-gray-500">Loading tasks...</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => toggleTask(task._id, task.isDone)}
                    className="w-5 h-5 accent-pink-500"
                  />
                  <span
                    className={`${
                      task.isDone
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}{" "}
                    <span className="text-xs text-gray-500">
                      [{task.category}]
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => removeTask(task._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tasks found.</p>
          )}
        </div>

        {/* Add Task Form */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
          />

          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Select category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>

          <button
            onClick={addTask}
            className="w-full h-10 bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
