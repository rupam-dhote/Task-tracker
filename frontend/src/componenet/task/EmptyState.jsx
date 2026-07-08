import { ClipboardList } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      {/* Icon */}
      <div className="flex h-14 w-14 mb-4 items-center justify-center rounded-2xl bg-indigo-50">
        <ClipboardList size={42} strokeWidth={2} className="text-indigo-600" />
      </div>

      {/* Title */}
      <h3 className="mb-1 text-base  font-semibold  text-slate-900">
        No tasks found
      </h3>

      {/* Description */}
      <p className=" max-w-xs  text-sm  text-slate-500">
        No tasks match your current filters. Try adjusting the search or filter
        criteria, or create a new task.
      </p>
    </div>
  );
};

export default EmptyState;
