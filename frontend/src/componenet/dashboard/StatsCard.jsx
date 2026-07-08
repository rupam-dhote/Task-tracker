const StatsCard = ({
  grid,
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  valueColor = "text-slate-900",
  borderColor = "border-slate-200",
}) => {
  return (
    <div
      className={`rounded-3xl border ${grid} ${borderColor} bg-white p-5 sm:p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-md ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <span className="text-sm font-medium sm:tracking-wide text-slate-500 uppercase">
          {title}
        </span>
      </div>

      <h2
        className={`mt-5 text-2xl sm:text-3xl font-bold font-mono ${valueColor}`}
      >
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default StatsCard;
