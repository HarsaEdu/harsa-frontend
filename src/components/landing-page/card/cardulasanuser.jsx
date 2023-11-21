export const CardUlasanUser = ({ image, title, desc, time }) => {
  
    return (
        <section
        className="mx-start h-[140px] w-[770px] cursor-pointer space-y-3 rounded-xl border bg-[#FFFFFF] p-2 text-black border-[#A2D2FF]"
      >
        <div className="flex items-start justify-start">
          {image}
          <div style={{ marginLeft: '1rem' }}>
            <h3 className="text-start text-xs sm:text-sm font-semibold md:text-lg lg:text-xl xl:text-xl">
              {title}
            </h3>
            <p className="text-start text-xs text-gray-500 md:text-sm lg:text-base xl:text-xl mt-1">
              {time}
            </p>
          </div>
        </div>
        <p className="text-start text-xs md:text-sm lg:text-base xl:text-xl">
          {desc}
        </p>
      </section>
    );
  };