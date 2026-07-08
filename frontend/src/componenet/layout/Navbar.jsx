import { CheckSquare, ListTodo, LogOut, UserCircle2 } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, authUser } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
            <CheckSquare className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">TaskTracker</h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Manage your tasks
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="hidden md:flex">
          <button className="flex items-center gap-2 rounded-xl bg-indigo-50 px-5 py-2 font-medium text-indigo-600 transition hover:bg-indigo-100">
            <ListTodo size={18} />
            My Tasks
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 md:flex">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-sm text-slate-600">
              {authUser?.name || "Personal Workspace"}
            </span>
          </div>

          <button
            onClick={logout}
            className="rounded-full p-2 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
