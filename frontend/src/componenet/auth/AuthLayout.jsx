import { CheckCircle2 } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center  px-3 md:px-4 py-8 md:py-10 ">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          {/* Left Side */}

          <div className="hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  ✓
                </div>

                <h1 className="text-3xl font-bold">TaskTracker</h1>
              </div>

              <h2 className="mt-14 text-5xl font-bold leading-tight">
                Stay Organized,
                <br />
                Stay Productive.
              </h2>

              <p className="mt-6 max-w-md text-lg text-indigo-100">
                Manage your daily work, track progress, and complete tasks
                faster with an intuitive task management system.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Create unlimited tasks",
                "Track progress easily",
                "Manage priorities efficiently",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}

          <div className="flex items-center justify-center p-8 md:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {title}
                </h2>

                <p className="mt-2 text-sm md:text-base text-slate-500">
                  {subtitle}
                </p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
