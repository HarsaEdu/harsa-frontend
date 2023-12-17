export const CardUlasanUser = ({ image, title, desc, time }) => {
  
  return (
      <section
        className="mx-start min-h-[140px] w-full cursor-pointer space-y-3 rounded-xl border bg-[#FFFFFF] p-2 text-black border-[#A2D2FF]"
      >
        <div className="flex justify-start items-center">
          <img
            src={image}
            alt={`Module ${title}`}
            className="w-8 h-8 object-cover rounded-full"
          />
          <div style={{ marginLeft: '1rem' }}>
            <h3 className="text-start text-xs sm:text-sm font-semibold md:text-lg lg:text-xl xl:text-xl">
              {title} <span className="text-gray-500 text-xs md:text-sm lg:text-base xl:text-xl ml-1">
                {time}</span>
            </h3>
          </div>
        </div>
        <p className="text-start text-xs md:text-sm lg:text-base xl:text-xl">
          {desc}
        </p>
      </section>
  );
};
