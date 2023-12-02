import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TablePagination from "./tablePagination";
import RowShow from "./rowShow";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Table(props) {
  const {
    columns = [],
    datas = [],
    classNameHeader,
    classNameCell,
    isVisible,
    rowVisible,
    searchComponent,
    onClick,
  } = props;

  const table = useReactTable({
    data: datas,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="my-4 flex w-full items-center justify-between">
          {rowVisible && <RowShow table={table} />}
          {searchComponent}
        </div>
      </div>
      <table className="w-full border-2 border-black">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnRelativeDepth = header.depth - header.column.depth;

                if (
                  !header.isPlaceholder &&
                  columnRelativeDepth > 1 &&
                  header.id === header.column.id
                ) {
                  return null;
                }

                let rowSpan = 1;
                if (header.isPlaceholder) {
                  const leafs = header.getLeafHeaders();
                  rowSpan = leafs[leafs.length - 1].depth - header.depth;
                }

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    className={`border-2 border-black p-2 ${classNameHeader}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border-2 border-black p-2 ${classNameCell}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isVisible && (
        <div className="mt-2 flex justify-end">
          <TablePagination table={table} />
        </div>
      )}
    </div>
  );
}
