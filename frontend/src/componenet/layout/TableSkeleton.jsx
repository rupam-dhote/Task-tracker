const TableSkeleton = () => {
  return (
    <div className="overflow-hidden mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <div className="min-w-212.5">
          {/* Header */}
          <div className="grid grid-cols-[2.5fr_1.2fr_1.2fr_1.2fr_80px] border-b border-slate-200 bg-slate-50 px-6 py-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-20 animate-pulse rounded bg-slate-200"
              />
            ))}
          </div>

          {/* Rows */}
          {[...Array(6)].map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-[2.5fr_1.2fr_1.2fr_1.2fr_80px] items-center border-b border-slate-100 px-6 py-5 last:border-none"
            >
              {/* Title */}
              <div>
                <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-28 animate-pulse rounded bg-slate-100" />
              </div>

              {/* Status */}
              <div>
                <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
              </div>

              {/* Priority */}
              <div>
                <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200" />
              </div>

              {/* Due Date */}
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
