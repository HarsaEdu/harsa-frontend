export const Card = ({ image, title, desc, onClick }) => {
  return (
    <section
      onClick={onClick}
      className="mx-auto h-full w-fit cursor-pointer space-y-3 rounded-xl border bg-[#092C4C] p-5 text-white
      hover:border-black active:scale-95"
    >
      <div className="flex h-fit w-full items-center justify-center">
        {image}
      </div>
      <h3 className="text-center text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
        {title}
      </h3>
      <p className="text-center text-xs md:text-sm lg:text-base xl:text-xl">
        {desc}
      </p>
    </section>
  );
};
