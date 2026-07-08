import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import React from "react";

const TaskRow = ({ task, onEdit, onDelete }) => {
  // setting color based on priority
  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  // setting color for status
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  // formating mongo date schema to locale date string
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <tr
      key={task._id}
      className="group border-b border-slate-200 transition hover:bg-slate-50"
    >
      {/* Task */}

      <td className="px-8 py-6">
        <h3 className="font-semibold text-slate-900">{task.title}</h3>

        <p className="mt-1 max-w-sm text-sm text-slate-500">
          {task.description}
        </p>
      </td>

      {/* Priority */}

      <td className="px-8 py-6">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </td>

      {/* Status */}

      <td className="px-8 py-6">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColor[task.status]
          }`}
        >
          {task.status}
        </span>
      </td>

      {/* Due Date */}

      <td className="px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />

          {formatDate(task.dueDate)}
        </div>
      </td>

      {/* Created */}

      <td className="px-8 py-6 text-sm text-slate-500">
        {formatDate(task.createdAt)}
      </td>

      {/* Actions */}

      <td className="flex py-6 justify-center">
        <div className="flex justify-end pr-8 gap-2 md:opacity-0 transition duration-200 md:group-hover:opacity-100">
          <button className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-100 hover:text-indigo-600">
            <Pencil onClick={() => onEdit(task)} size={18} />
          </button>

          <button
            onClick={() => onDelete(task)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
