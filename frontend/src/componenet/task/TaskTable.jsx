import { CalendarDays, ChevronsUpDown, Pencil, Trash2 } from "lucide-react";
import TaskRow from "./TaskRow";
import EmptyState from "./EmptyState";

const TaskTable = ({ tasks = [], onDelete, onEdit }) => {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <div className="min-w-262.5">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {[
                  "Task",
                  "Priority",
                  "Status",
                  "Due Date",
                  "Created",
                  "Action",
                ].map((heading) => (
                  <th key={heading} className="px-8 py-5 text-left">
                    <div className="inline-flex items-center gap-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {heading}
                      </span>

                      <ChevronsUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-slate-500">
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <TaskRow
                    key={task._id}
                    task={task}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
