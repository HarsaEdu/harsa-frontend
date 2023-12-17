import React from "react";
import { Button } from "@/components/ui/button";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    if (!isNaN(newSize)) {
      onPageSizeChange(newSize);
    }
  };

  return (
    <div className="flex items-center space-x-3 text-white">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-[#667085] px-4 py-2 text-black hover:bg-slate-400"
      >
        {"<"}
      </Button>
      <span>{currentPage}</span>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-[#667085] px-4 py-2 text-black hover:bg-slate-400"
      >
        {">"}
      </Button>
      <select
        onChange={handlePageSizeChange}
        value={itemsPerPage}
        className="rounded-sm px-3 py-2 text-black"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
    </div>
  );
};

export default Pagination;
