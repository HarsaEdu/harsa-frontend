import { Button } from "./ui/button";
export default function TablePagination(props) {
  const { table } = props;

  return (
    <div className="join">
      <Button
        className="bg-[#092C4C] text-white"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        className="bg-[#092C4C] text-white"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button className="bg-[#092C4C] text-white">
        Page {table.getState().pagination.pageIndex + 1}
      </Button>
      <Button
        className="bg-[#092C4C] text-white"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </Button>
      <Button
        className="bg-[#092C4C] text-white"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button>
    </div>
  );
}
