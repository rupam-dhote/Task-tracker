import { AlertTriangle, Loader, X } from "lucide-react";

const DeleteTaskModal = ({
  open,
  onClose,
  onDelete,
  taskTitle = "",
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle
                size={20}
                className="text-red-500"
                strokeWidth={2}
              />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Delete Task
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-base  text-slate-800">
            Are you sure you want to delete{" "}
            <span className="font-semibold">"{taskTitle}"</span>?
          </p>

          <p className="mt-2 text-xs  text-slate-500">
            This action cannot be undone. The task will be permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-2xl bg-slate-100 px-6 py-2 text-lg font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-7 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader size={15} className="animate-spin" />
            ) : (
              <AlertTriangle size={15} />
            )}

            {loading ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
