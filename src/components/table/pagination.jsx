import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";

const generatePagesToDisplay = (currentPage, totalPages) => {
  const maxPagesToShow = 5;
  let pagesToDisplay = [currentPage];

  if (totalPages <= maxPagesToShow) {
    pagesToDisplay = Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  } else if (currentPage <= 3) {
    pagesToDisplay = [1, 2, 3, 4, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    pagesToDisplay = [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pagesToDisplay = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return pagesToDisplay;
};

const Pagination = (props) => {
  const { meta, onClickPrevious, onClickNext, onClickPage, limitValue } = props;

  const totalPages = Math.ceil(meta.total / limitValue) || 1;
  const currentPage = Math.ceil(meta.offset / limitValue) + 1 || 1;

  const pagesToDisplay = useMemo(
    () => generatePagesToDisplay(currentPage, totalPages),
    [currentPage, totalPages],
  );
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="rounded-md border border-[b3b3b3] p-2"
        disabled={meta.offset === 0}
        onClick={onClickPrevious}
      >
        <ChevronLeft size={20} color={meta.offset !== 0 ? "black" : "gray"} />
      </button>
      {pagesToDisplay.map((page, index) => (
        <Button
          variant="outline"
          size="icon"
          key={`${page}-${index}`}
          onClick={() => {
            const newOffset = (page - 1) * meta.limit;
            onClickPage(newOffset);
          }}
          className={
            meta.offset === (page - 1) * meta.limit
              ? "bg-[#213571] text-white"
              : "bg-white"
          }
        >
          {page}
        </Button>
      ))}
      <button
        className="rounded-md border border-[b3b3b3] p-2"
        disabled={meta.offset + meta.limit >= meta.total}
        onClick={onClickNext}
      >
        <ChevronRight
          size={20}
          color={meta.offset + meta.limit <= meta.total ? "black" : "gray"}
        />
      </button>
    </div>
  );
};

export default Pagination;
