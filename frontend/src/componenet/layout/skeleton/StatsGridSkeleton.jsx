import StatsCardSkeleton from "./StatsCardSkeleton.jsx";

const StatsGridSkeleton = () => {
  return (
    <section className="mt-8 grid grid-cols-2 gap-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <StatsCardSkeleton
          key={index}
          grid={index === 4 ? "col-span-2 md:col-span-1" : ""}
        />
      ))}
    </section>
  );
};

export default StatsGridSkeleton;
