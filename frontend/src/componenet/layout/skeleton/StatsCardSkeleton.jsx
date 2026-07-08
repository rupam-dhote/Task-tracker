const StatsCardSkeleton = ({ grid = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md ${grid}`}
    >
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="h-8 w-8 animate-pulse rounded-md bg-slate-200" />

        {/* Title */}
        <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
      </div>

      {/* Value */}
      <div className="mt-5 h-8 w-20 animate-pulse rounded bg-slate-200" />

      {/* Description */}
      <div className="mt-3 h-4 w-28 animate-pulse rounded bg-slate-100" />
    </div>
  );
};

export default StatsCardSkeleton;
