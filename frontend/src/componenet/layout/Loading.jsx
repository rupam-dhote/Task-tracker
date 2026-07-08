import { LoaderCircle } from "lucide-react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg">
          <LoaderCircle size={32} className="animate-spin text-white" />
        </div>

        <h2 className="mt-6 text-xl font-semibold text-slate-900">
          TaskTracker
        </h2>

        <p className="mt-2 text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
