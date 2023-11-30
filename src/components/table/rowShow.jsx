import React from "react";

export default function RowShow(props) {
  const { table } = props;

  const pageSizes = [10, 25, 50];
  function handlePageSizeChange(e) {
    table.setPageSize(Number(e.target.value));
  }
  return (
    <div className="flex items-center">
      <span className="bg-[#092C4C] px-5 py-2 text-white">Row</span>
      <select
        className="border border-black px-3 py-2"
        value={table.getState().pagination.pageSize}
        onChange={handlePageSizeChange}
      >
        {pageSizes.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
