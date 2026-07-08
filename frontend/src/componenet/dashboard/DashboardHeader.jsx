import { Plus } from "lucide-react";

const DashboardHeader = ({ onAddTask }) => {
  return (
    <section className="flex flex-col sm:flex-row items-start justify-between gap-4">
      {/* Left */}
      <div className=" flex-1">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
          My Tasks
        </h1>

        <p className="mt-2 max-w-xl text-sm sm:leading-6 text-slate-500 sm:text-base">
          Manage your personal tasks — create, prioritize, and track completion.
        </p>
      </div>

      {/* Right */}
      <button
        onClick={() => onAddTask(true)}
        className="inline-flex  shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-3  sm:px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span className="">New Task</span>
      </button>
    </section>
  );
};

export default DashboardHeader;
