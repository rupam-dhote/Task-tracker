import Task from "../Models/Task.js";

// create task
export const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    let { title, description, status, priority, dueDate } = req.body;

    // Trim input
    title = title?.trim();
    description = description?.trim();

    // Check required field
    if (!title) {
      return res.status(400).json({
        message: "Please provide a title",
      });
    }

    // Validate status
    const validStatus = ["Pending", "In Progress", "Completed"];

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // Validate priority
    const validPriority = ["Low", "Medium", "High"];

    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    // Validate due date
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(dueDate);

      if (selectedDate < today) {
        return res.status(400).json({
          message: "Due date cannot be in the past",
        });
      }
    }

    const newTask = await Task.create({
      userId,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    let { title, description, status, priority, dueDate } = req.body;

    // Trim strings
    title = title?.trim();
    description = description?.trim();

    // Find task belonging to logged in user
    const task = await Task.findOne({
      _id: id,
      userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Validate status
    const validStatus = ["Pending", "In Progress", "Completed"];

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // Validate priority
    const validPriority = ["Low", "Medium", "High"];

    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    // Validate due date
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(dueDate);

      if (selectedDate < today) {
        return res.status(400).json({
          message: "Due date cannot be in the past",
        });
      }
    }

    // Updating only provided fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
