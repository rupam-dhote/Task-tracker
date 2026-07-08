import { useEffect, useState } from "react";
import { CalendarDays, Loader, Loader2, Loader2Icon, X } from "lucide-react";

const AddTaskModal = ({
  open,
  onClose,
  onCreate,
  isEdit = false,
  task,
  loading,
}) => {
  const initialState = {
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    onCreate(formData);
  };

  useEffect(() => {
    if (!open) return;

    if (isEdit) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData(initialState);
    }
  }, [open, isEdit, task]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full  max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {isEdit ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {isEdit
                ? "Update task details below"
                : "Fill in the details below to create a task."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          id="task-form"
          onSubmit={handleSubmit}
          className="max-h-[65vh] overflow-y-auto px-6 md:px-8 py-2 md:py-4"
        >
          {/* Task Title */}

          <div>
            <label className=" mb-1.5 text-sm block font-medium text-slate-700">
              Task Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              required
              name="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={handleChange}
              className="h-10 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Description */}

          <div className="mt-4">
            <label className="mb-1.5 text-sm block font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              placeholder="Describe your task..."
              value={formData.description}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="mt-3 md:mt-4 grid gap-5 md:grid-cols-2">
            {/* Priority */}

            <div>
              <label className="mb-1.5 text-sm block font-medium text-slate-700">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="mb-1.5 text-sm block font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date */}

          <div className="mt-2 ">
            <label className="mb-1.5 text-sm block font-medium text-slate-700">
              Due Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </form>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-8 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="task-form"
            disabled={loading}
            className="rounded-xl flex items-center justify-center gap-2 bg-indigo-500 px-6 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            {loading && <Loader2Icon size={18} className="animate-spin" />}

            {loading
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Update Task"
                : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
