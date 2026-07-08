import { Search, SlidersHorizontal } from "lucide-react";

const SearchFilter = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  total,
}) => {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-slate-500">
            <SlidersHorizontal size={18} />
            <span className="text-sm font-medium">Filter:</span>
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-200 pt-3">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-800">{total}</span>{" "}
          tasks
        </p>
      </div>
    </section>
  );
};

export default SearchFilter;
