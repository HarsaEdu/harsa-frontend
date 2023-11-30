import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination(props) {
  const { table } = props;

  const pageIndices = Array.from(
    { length: table.getPageCount() },
    (_, index) => index + 1,
  );
  const currentPageIndex = table.getState().pagination.pageIndex + 1;

  return (
    <div className="flex space-x-1">
      <button
        className="rounded-md border border-[b3b3b3] p-1 text-black"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft
          size={25}
          color={table.getCanPreviousPage() ? "black" : "gray"}
        />
      </button>
      {pageIndices.map((pageIndex) => (
        <button
          key={pageIndex}
          className={`rounded-md border border-[b3b3b3] p-1 px-3 font-semibold text-black ${
            currentPageIndex === pageIndex ? "bg-[#092C4C] text-white" : ""
          }`}
        >
          {pageIndex}
        </button>
      ))}
      <button
        className="rounded-md border border-[b3b3b3] p-1 text-black"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight
          size={25}
          color={table.getCanNextPage() ? "black" : "gray"}
        />
      </button>
    </div>
  );
}
