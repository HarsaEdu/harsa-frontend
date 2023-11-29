export const CardTestimoni = ({ image, title, desc }) => {
    return (
        <section
        className="mx-auto h-full w-fit cursor-pointer space-y-3 rounded-xl border bg-[#092C4C] p-2 text-white"
        >
        <div className="flex h-fit w-full items-center justify-center">
            {image}
        </div>
        <h3 className="text-center text-xs sm:text-sm font-semibold md:text-xl lg:text-2xl xl:text-2xl">      
            {title}
        </h3>
        <p className="text-center text-xs md:text-sm lg:text-base xl:text-xl">
            {desc}
        </p>
        </section>
    );
};
