import Skeleton from "react-loading-skeleton";

const CountryLoader = () => {
  return (
    <div className="text-primary cursor-pointer pb-[22px] bg-white  overflow-hidden rounded-x/2 shadow-[0px_0px_7px_2px_rgba(0,0,0,0.03)]">
      <Skeleton height={160} />
      <div className="p-6">
        <Skeleton height={20} className="mb-4" width={250} />
        <Skeleton count={3} width={200} />
      </div>
    </div>
  );
};

export default CountryLoader;
