import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ListTodo,
  TrendingUp,
} from "lucide-react";

import { useMemo } from "react";
import StatsCard from "./StatsCard.jsx";

const StatsGrid = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;

    const today = new Date().toDateString();

    const completedToday = tasks.filter((task) => {
      if (task.status !== "Completed") return false;

      return new Date(task.updatedAt).toDateString() === today;
    }).length;

    const overdue = tasks.filter((task) => {
      if (!task.dueDate) return false;

      return task.status !== "Completed" && new Date(task.dueDate) < new Date();
    }).length;

    const active = tasks.filter((task) => task.status === "In Progress").length;

    const completed = tasks.filter(
      (task) => task.status === "Completed",
    ).length;

    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return [
      {
        title: "TOTAL",
        value: total,
        description: "All tasks",
        icon: ListTodo,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
      },
      {
        title: "TODAY",
        value: completedToday,
        description: "Completed today",
        icon: CheckCircle2,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        valueColor: "text-emerald-600",
      },
      {
        title: "OVERDUE",
        value: overdue,
        description:
          overdue === 0 ? "Nothing overdue" : "Need immediate attention",
        icon: AlertTriangle,
        iconBg: overdue === 0 ? "bg-slate-100" : "bg-red-100",
        iconColor: overdue === 0 ? "text-slate-500" : "text-red-500",
        valueColor: overdue === 0 ? "text-slate-600" : "text-red-600",
        borderColor: overdue === 0 ? "border-slate-100" : "border-red-200",
      },
      {
        title: "ACTIVE",
        value: active,
        description: "In progress",
        icon: Clock3,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-500",
        valueColor: "text-amber-600",
      },
      {
        title: "RATE",
        value: `${completionRate}%`,
        description: "Completion rate",
        icon: TrendingUp,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
        valueColor: "text-violet-600",
      },
    ];
  }, [tasks]);
  return (
    <section className="grid mt-8 gap-2 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.title}
          {...stat}
          grid={index === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}
        />
      ))}
    </section>
  );
};

export default StatsGrid;
