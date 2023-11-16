export const Card = ({ title, desc, onClick }) => {
  return (
    <section
      onClick={onClick}
      className="h-[339px] w-[216px] cursor-pointer space-y-2 rounded-xl border p-2 hover:border-black active:scale-95 md:h-[377px] md:w-[240px] lg:h-[466px] lg:w-[267px] xl:h-[518px] xl:w-[297px] 2xl:h-[575px] 2xl:w-[330px] 2xl:space-y-3"
    >
      <div className="h-full max-h-[117px] w-full max-w-[117px] rounded-xl bg-gray-200 md:max-h-[149px] md:max-w-[149px] lg:max-h-[213px] lg:max-w-[213px] xl:max-h-[277px] xl:max-w-[277px] 2xl:max-h-[312px] 2xl:max-w-[312px]"></div>
      <h3 className="text-center font-semibold md:text-xl lg:text-2xl">
        {title}
      </h3>
      <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
        {desc}
      </p>
    </section>
  );
};
