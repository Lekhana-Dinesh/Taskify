import Task from "../models/task.model.js";

// Get tasks by user (and optional category filter)
export const getTasks = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { userId: req.user._id };
    if (category) query.category = category;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const task = new Task({
      userId: req.user._id,
      title,
      description,
      category,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update task (e.g., mark as done)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
